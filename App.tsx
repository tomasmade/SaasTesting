import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { CreateTest } from './pages/CreateTest';
import { CampaignDetails } from './pages/CampaignDetails';
import { MOCK_CURRENT_USER, MOCK_CAMPAIGNS } from './constants';
import { TestCampaign } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [campaigns, setCampaigns] = useState<TestCampaign[]>(MOCK_CAMPAIGNS);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);

  // Simulate creating a campaign
  const handleCreateCampaign = (newCampaign: TestCampaign) => {
    setCampaigns([newCampaign, ...campaigns]);
    setActiveTab('dashboard');
  };

  // Basic Routing Logic
  const renderContent = () => {
    if (selectedCampaignId) {
      const campaign = campaigns.find(c => c.id === selectedCampaignId);
      if (campaign) {
        return <CampaignDetails campaign={campaign} onBack={() => setSelectedCampaignId(null)} />;
      }
    }

    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            user={MOCK_CURRENT_USER} 
            campaigns={campaigns} 
            onSelectCampaign={(id) => setSelectedCampaignId(id)}
          />
        );
      case 'create':
        return <CreateTest onSave={handleCreateCampaign} />;
      case 'community':
        return (
          <div className="p-12 text-center text-gray-500">
            <h2 className="text-xl font-bold mb-2">Communauté de Testeurs</h2>
            <p>Fonctionnalité en cours de développement.</p>
          </div>
        );
      default:
        return <Dashboard user={MOCK_CURRENT_USER} campaigns={campaigns} onSelectCampaign={setSelectedCampaignId} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={(tab) => {
      setActiveTab(tab);
      setSelectedCampaignId(null);
    }}>
      {renderContent()}
    </Layout>
  );
}
