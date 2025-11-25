
import React from 'react';
import { Activity, PlusCircle, User, LayoutDashboard, LogOut, RefreshCw, Settings } from 'lucide-react';
import { UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentRole: UserRole;
  onToggleRole: () => void;
  notification?: { message: string, type: 'success' | 'info' };
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, currentRole, onToggleRole, notification }) => {
  const isCreator = currentRole === UserRole.CREATOR;

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-[100] animate-in slide-in-from-top-5 fade-in duration-300">
            <div className={`px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 ${notification.type === 'success' ? 'bg-green-600 text-white' : 'bg-indigo-600 text-white'}`}>
                <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                <span className="font-medium text-sm">{notification.message}</span>
            </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col justify-between">
        <div>
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold ${isCreator ? 'bg-indigo-600' : 'bg-emerald-600'}`}>
                {isCreator ? 'F' : 'T'}
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-800">FeedbackFast</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">
                    {isCreator ? 'Espace Créateur' : 'Espace Testeur'}
                </span>
              </div>
            </div>
          </div>
          
          <nav className="p-4 space-y-2">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors relative ${activeTab === 'dashboard' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <LayoutDashboard size={20} />
              {isCreator ? 'Tableau de bord' : 'Mes Missions'}
              {isCreator && notification && (
                  <span className="absolute right-4 top-4 w-2 h-2 rounded-full bg-red-500"></span>
              )}
            </button>
            
            {isCreator && (
                <>
                    <button 
                    onClick={() => setActiveTab('create')}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'create' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                    <PlusCircle size={20} />
                    Nouveau Test
                    </button>

                    <button 
                    onClick={() => setActiveTab('community')}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'community' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                    <User size={20} />
                    Testeurs
                    </button>
                </>
            )}
             {!isCreator && (
                <>
                    <button 
                    onClick={() => setActiveTab('history')}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'history' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                    <Activity size={20} />
                    Historique
                    </button>

                    <button 
                    onClick={() => setActiveTab('profile')}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'profile' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                    <User size={20} />
                    Mon Profil
                    </button>
                </>
            )}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-100 space-y-2">
          {/* Role Switcher for Demo */}
          <button 
            onClick={onToggleRole}
            className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors mb-2"
          >
            <RefreshCw size={16} />
            {isCreator ? 'Voir Vue Testeur' : 'Voir Vue Créateur'}
          </button>

          <div className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg cursor-pointer transition-colors">
            <LogOut size={20} />
            <span className="text-sm font-medium">Déconnexion</span>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-white z-10 border-b p-4 flex items-center justify-between">
        <span className="font-bold">FeedbackFast</span>
        <button onClick={onToggleRole} className="text-sm bg-gray-100 px-3 py-1 rounded">Switch Role</button>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto pt-20 md:pt-8">
        {children}
      </main>
    </div>
  );
};
