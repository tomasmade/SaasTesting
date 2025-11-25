
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { CreateTest } from './pages/CreateTest';
import { CampaignDetails } from './pages/CampaignDetails';
import { TesterDashboard } from './pages/TesterDashboard';
import { Community } from './pages/Community';
import { SignupTester } from './pages/SignupTester';
import { TesterProfilePage } from './pages/TesterProfilePage';
import { ClientSiteSimulator } from './components/ClientSiteSimulator';
import { MOCK_CURRENT_USER, MOCK_TESTER_FULL_PROFILE, MOCK_CAMPAIGNS, MOCK_ASSIGNMENTS } from './constants';
import { TestCampaign, Feedback, UserRole, TestAssignment, TesterProfile } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userRole, setUserRole] = useState<UserRole>(UserRole.CREATOR);
  const [showAuth, setShowAuth] = useState(true);
  
  // Data State
  const [campaigns, setCampaigns] = useState<TestCampaign[]>(MOCK_CAMPAIGNS);
  const [assignments, setAssignments] = useState<TestAssignment[]>(MOCK_ASSIGNMENTS);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'info'} | undefined>(undefined);
  
  // Current Tester Profile State (Allows updates)
  const [currentTesterProfile, setCurrentTesterProfile] = useState<TesterProfile>(MOCK_TESTER_FULL_PROFILE);

  // Navigation State
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [activeSimulationCampaignId, setActiveSimulationCampaignId] = useState<string | null>(null);

  const currentUser = userRole === UserRole.CREATOR ? MOCK_CURRENT_USER : currentTesterProfile;

  // Toggle Role (for demo purposes)
  const handleToggleRole = () => {
    setUserRole(prev => prev === UserRole.CREATOR ? UserRole.TESTER : UserRole.CREATOR);
    setActiveTab('dashboard'); // Reset tab when switching context
    setSelectedCampaignId(null);
  };

  // Create Campaign & Assign Testers
  const handleCreateCampaign = (newCampaign: TestCampaign) => {
    setCampaigns([newCampaign, ...campaigns]);
    
    // DEMO LOGIC: Automatically invite our mock tester 't1' (Jean Dev) to this new campaign
    const newAssignment: TestAssignment = {
        id: `a${Date.now()}`,
        campaignId: newCampaign.id,
        testerId: currentTesterProfile.id,
        status: 'INVITED',
        invitedAt: new Date().toISOString().split('T')[0]
    };
    setAssignments([newAssignment, ...assignments]);

    setActiveTab('dashboard');
  };

  // Invite specific tester manually (from Community page)
  const handleInviteTester = (testerId: string) => {
    const activeCampaign = campaigns.find(c => c.status === 'ACTIVE');
    if(activeCampaign) {
        setNotification({ message: `Invitation envoyée pour le test "${activeCampaign.title}"`, type: 'success' });
        setTimeout(() => setNotification(undefined), 3000);
    } else {
        setNotification({ message: "Aucune campagne active pour inviter.", type: 'info' });
        setTimeout(() => setNotification(undefined), 3000);
    }
  };

  // Tester Logic: Accept Invite
  const handleAcceptInvite = (assignmentId: string) => {
    setAssignments(prev => prev.map(a => a.id === assignmentId ? { ...a, status: 'IN_PROGRESS' } : a));
  };

  // Tester Logic: Update Profile
  const handleUpdateTesterProfile = (updatedProfile: TesterProfile) => {
    setCurrentTesterProfile(updatedProfile);
    // In a real app, we would make an API call here.
  };

  // Tester Logic: Submit Feedback (Ends the test)
  const handleAddFeedback = (campaignId: string, feedback: Feedback) => {
    // 1. Add feedback to campaign
    setCampaigns(prevCampaigns => 
      prevCampaigns.map(campaign => 
        campaign.id === campaignId 
          ? { ...campaign, feedbacks: [feedback, ...campaign.feedbacks] }
          : campaign
      )
    );

    // 2. Mark assignment as completed (if acting as tester)
    if (userRole === UserRole.TESTER) {
        setAssignments(prev => prev.map(a => 
            (a.campaignId === campaignId && a.testerId === currentUser.id)
            ? { ...a, status: 'COMPLETED' }
            : a
        ));
        setActiveSimulationCampaignId(null); // Close simulator
    }

    // 3. Notify Creator
    if (userRole === UserRole.TESTER) {
        // We set notification but since we are switching views potentially, 
        // in a real app this would be a backend push. 
        // Here we just simulate it appearing if we were to switch back or if we stay.
    } else {
        setNotification({ message: "Nouveau feedback reçu !", type: 'success' });
        setTimeout(() => setNotification(undefined), 3000);
    }
  };

  // Auth Flow Handling
  if (showAuth) {
    return (
        <SignupTester 
            onComplete={(profileData) => {
                // Merge signup data with mock ID for the demo
                setCurrentTesterProfile({
                    ...currentTesterProfile,
                    ...profileData
                });
                setUserRole(UserRole.TESTER);
                setShowAuth(false);
            }} 
            onSkip={() => setShowAuth(false)}
        />
    );
  }

  // Render Logic
  const renderContent = () => {
    // 1. Creator View - Campaign Details
    if (userRole === UserRole.CREATOR && selectedCampaignId) {
      const campaign = campaigns.find(c => c.id === selectedCampaignId);
      if (campaign) {
        return (
          <CampaignDetails 
            campaign={campaign} 
            onBack={() => setSelectedCampaignId(null)}
            onAddFeedback={(feedback) => handleAddFeedback(campaign.id, feedback)}
          />
        );
      }
    }

    // 2. Tester View
    if (userRole === UserRole.TESTER) {
       if (activeTab === 'profile') {
           return (
               <TesterProfilePage 
                    profile={currentTesterProfile} 
                    onUpdate={handleUpdateTesterProfile} 
               />
           );
       }

       return (
         <TesterDashboard 
            user={currentUser}
            assignments={assignments.filter(a => a.testerId === currentUser.id)}
            campaigns={campaigns}
            onAcceptInvite={handleAcceptInvite}
            onStartTest={(cId) => setActiveSimulationCampaignId(cId)}
         />
       );
    }

    // 3. Creator View - Main Tabs
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            user={currentUser} 
            campaigns={campaigns} 
            onSelectCampaign={(id) => setSelectedCampaignId(id)}
          />
        );
      case 'create':
        return <CreateTest onSave={handleCreateCampaign} />;
      case 'community':
        return <Community onInvite={handleInviteTester} />;
      default:
        return <Dashboard user={currentUser} campaigns={campaigns} onSelectCampaign={setSelectedCampaignId} />;
    }
  };

  // Simulation Overlay (Independent of Layout)
  if (activeSimulationCampaignId) {
    const campaign = campaigns.find(c => c.id === activeSimulationCampaignId);
    if (campaign) {
        return (
            <ClientSiteSimulator 
                campaignId={campaign.id}
                campaignTitle={campaign.title}
                onClose={() => setActiveSimulationCampaignId(null)}
                onSubmitFeedback={(fb) => handleAddFeedback(campaign.id, fb)}
            />
        );
    }
  }

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={(tab) => {
        setActiveTab(tab);
        setSelectedCampaignId(null);
      }}
      currentRole={userRole}
      onToggleRole={handleToggleRole}
      notification={notification}
    >
      {renderContent()}
    </Layout>
  );
}
