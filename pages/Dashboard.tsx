import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { TestCampaign, User } from '../types';
import { Activity, Users, MessageSquare, ArrowRight } from 'lucide-react';

interface DashboardProps {
  user: User;
  campaigns: TestCampaign[];
  onSelectCampaign: (id: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, campaigns, onSelectCampaign }) => {
  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Bonjour, {user.name} 👋</h1>
        <p className="text-gray-500">Voici un aperçu de vos tests en cours.</p>
      </header>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-full mr-4">
              <Activity size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Tests Actifs</p>
              <p className="text-2xl font-bold">2</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="p-3 bg-green-100 text-green-600 rounded-full mr-4">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Testeurs</p>
              <p className="text-2xl font-bold">14</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-full mr-4">
              <MessageSquare size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Nouveaux Retours</p>
              <p className="text-2xl font-bold">8</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns List */}
      <h2 className="text-lg font-bold text-gray-900 mt-8 mb-4">Vos Campagnes Récentes</h2>
      <div className="grid grid-cols-1 gap-4">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <div onClick={() => onSelectCampaign(campaign.id)} className="flex flex-col md:flex-row items-center justify-between p-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold text-lg">{campaign.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${campaign.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {campaign.status === 'ACTIVE' ? 'Actif' : 'Terminé'}
                  </span>
                </div>
                <p className="text-gray-500 text-sm line-clamp-1">{campaign.description}</p>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <MessageSquare size={16} />
                  <span>{campaign.feedbacks.length} feedbacks</span>
                </div>
                <div className="flex items-center gap-2 font-medium text-gray-900">
                  <span>${campaign.reward}/testeur</span>
                </div>
                <ArrowRight className="text-gray-400" size={20} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
