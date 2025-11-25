
import React from 'react';
import { Card, CardContent } from '../components/Card';
import { TestAssignment, TestCampaign, User } from '../types';
import { Play, CheckCircle, Clock, DollarSign, ArrowRight } from 'lucide-react';

interface TesterDashboardProps {
  user: User;
  assignments: TestAssignment[];
  campaigns: TestCampaign[];
  onStartTest: (campaignId: string) => void;
  onAcceptInvite: (assignmentId: string) => void;
}

export const TesterDashboard: React.FC<TesterDashboardProps> = ({ 
    user, 
    assignments, 
    campaigns, 
    onStartTest,
    onAcceptInvite 
}) => {
  // Join assignments with campaign data
  const myMissions = assignments.map(a => {
    const campaign = campaigns.find(c => c.id === a.campaignId);
    return { ...a, campaign };
  }).filter(item => item.campaign !== undefined); // Safety check

  const pending = myMissions.filter(m => m.status === 'INVITED');
  const active = myMissions.filter(m => m.status === 'IN_PROGRESS');
  const completed = myMissions.filter(m => m.status === 'COMPLETED');

  const totalEarned = completed.reduce((acc, curr) => acc + (curr.campaign?.reward || 0), 0);

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Espace Testeur</h1>
            <p className="text-gray-500">Bienvenue, {user.name}. Prêt à gagner de l'argent ?</p>
        </div>
        <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg border border-emerald-100 flex items-center gap-2">
            <DollarSign size={18} />
            <span className="font-bold text-lg">{totalEarned}</span>
            <span className="text-sm font-medium">gagnés</span>
        </div>
      </header>

      {/* New Invitations */}
      {pending.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                Nouvelles Invitations
            </h2>
            <div className="grid grid-cols-1 gap-4">
                {pending.map((mission) => (
                    <Card key={mission.id} className="border-blue-100 bg-blue-50/30">
                        <CardContent className="p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                            <div>
                                <h3 className="font-bold text-lg text-gray-900">{mission.campaign?.title}</h3>
                                <p className="text-gray-600 text-sm mb-2">{mission.campaign?.description}</p>
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                    <span className="bg-white px-2 py-1 rounded border border-gray-200">Invité le {mission.invitedAt}</span>
                                    <span className="font-bold text-emerald-600 flex items-center gap-1">
                                        <DollarSign size={12}/> Récompense: ${mission.campaign?.reward}
                                    </span>
                                </div>
                            </div>
                            <button 
                                onClick={() => onAcceptInvite(mission.id)}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-sm shadow-blue-200 transition-all flex items-center gap-2 whitespace-nowrap"
                            >
                                Accepter la mission
                                <ArrowRight size={16} />
                            </button>
                        </CardContent>
                    </Card>
                ))}
            </div>
          </section>
      )}

      {/* Active Tests */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
            Tests en cours
        </h2>
        {active.length === 0 ? (
            <div className="text-gray-400 text-sm italic border border-dashed border-gray-200 rounded-lg p-6 text-center">
                Aucun test en cours. Acceptez une invitation ci-dessus !
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {active.map((mission) => (
                    <Card key={mission.id} className="hover:border-indigo-300 transition-colors">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-bold text-gray-900">{mission.campaign?.title}</h3>
                                <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full font-bold">
                                    ${mission.campaign?.reward}
                                </span>
                            </div>
                            <p className="text-sm text-gray-500 mb-6 line-clamp-2">
                                {mission.campaign?.description}
                            </p>
                            <button 
                                onClick={() => onStartTest(mission.campaignId)}
                                className="w-full bg-gray-900 hover:bg-black text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
                            >
                                <Play size={16} className="fill-current" />
                                Tester le produit
                            </button>
                            <p className="text-center text-xs text-gray-400 mt-2">
                                Redirige vers le site du client
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        )}
      </section>

      {/* History */}
      <section className="opacity-75">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            Historique
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-500 border-b border-gray-100">
                    <tr>
                        <th className="px-6 py-3 font-medium">Test</th>
                        <th className="px-6 py-3 font-medium">Date</th>
                        <th className="px-6 py-3 font-medium">Statut</th>
                        <th className="px-6 py-3 font-medium text-right">Gain</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {completed.map((mission) => (
                        <tr key={mission.id}>
                            <td className="px-6 py-4 font-medium text-gray-900">{mission.campaign?.title}</td>
                            <td className="px-6 py-4 text-gray-500">{mission.invitedAt}</td>
                            <td className="px-6 py-4">
                                <span className="flex items-center gap-1 text-green-600 font-medium">
                                    <CheckCircle size={14} /> Payé
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right font-bold text-gray-900">${mission.campaign?.reward}</td>
                        </tr>
                    ))}
                    {completed.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                                Pas encore de tests terminés.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </section>
    </div>
  );
};
