
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { MOCK_TESTERS } from '../constants';
import { matchTestersWithAI, generateTestBrief } from '../services/geminiService';
import { AIMatchResult, TestCampaign } from '../types';
import { Sparkles, Search, CheckCircle, Loader2, Wand2, Users, DollarSign } from 'lucide-react';

interface CreateTestProps {
  onSave: (campaign: TestCampaign) => void;
}

export const CreateTest: React.FC<CreateTestProps> = ({ onSave }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetAudience: '',
    reward: 20,
    maxTesters: 5
  });
  const [isMatching, setIsMatching] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [matches, setMatches] = useState<AIMatchResult[]>([]);

  const handleGenerateBrief = async () => {
    if (!formData.description) return;
    setIsGenerating(true);
    const brief = await generateTestBrief(formData.description);
    if (brief.title) {
        setFormData(prev => ({
            ...prev,
            title: brief.title,
            description: brief.description,
            targetAudience: brief.audience
        }));
    }
    setIsGenerating(false);
  };

  const handleFindTesters = async () => {
    if (!formData.targetAudience) return;
    setIsMatching(true);
    const results = await matchTestersWithAI(formData.targetAudience + " " + formData.description, MOCK_TESTERS);
    setMatches(results);
    setIsMatching(false);
    if (results.length > 0) setStep(2);
  };

  const handleCreate = () => {
    const newCampaign: TestCampaign = {
      id: `c${Date.now()}`,
      title: formData.title,
      description: formData.description,
      targetAudience: formData.targetAudience,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      feedbacks: [],
      reward: formData.reward,
      maxTesters: formData.maxTesters
    };
    onSave(newCampaign);
  };

  const totalBudget = formData.reward * formData.maxTesters;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Créer un nouveau test</h1>
        <p className="text-gray-500">Définissez vos besoins et laissez l'IA trouver les meilleurs testeurs.</p>
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Détails du test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quoi tester ? (Idée brute)</label>
              <div className="relative">
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none min-h-[100px]"
                  placeholder="Ex: Une nouvelle modal d'export qui permet de choisir le format CSV ou PDF..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
                <button 
                    onClick={handleGenerateBrief}
                    disabled={isGenerating || !formData.description}
                    className="absolute bottom-3 right-3 flex items-center gap-1 text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-md hover:bg-indigo-200 transition-colors disabled:opacity-50"
                >
                    {isGenerating ? <Loader2 className="animate-spin" size={12}/> : <Wand2 size={12}/>}
                    Améliorer avec IA
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Titre du test</label>
              <input 
                type="text" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Ex: Test UX export données"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Audience Cible</label>
              <input 
                type="text" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.targetAudience}
                onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                placeholder="Ex: Freelances utilisant souvent Excel"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Récompense par testeur ($)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input 
                    type="number" 
                    min="1"
                    className="w-full pl-8 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={formData.reward}
                    onChange={(e) => setFormData({...formData, reward: Number(e.target.value)})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de testeurs max</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Users size={16} className="text-gray-500" />
                  </div>
                  <input 
                    type="number" 
                    min="1"
                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    value={formData.maxTesters}
                    onChange={(e) => setFormData({...formData, maxTesters: Number(e.target.value)})}
                  />
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 p-4 rounded-lg flex items-center justify-between border border-indigo-100">
                <div className="flex items-center gap-2 text-indigo-900">
                    <DollarSign size={20} />
                    <span className="font-medium">Budget total estimé</span>
                </div>
                <div className="text-2xl font-bold text-indigo-700">
                    ${totalBudget}
                </div>
            </div>

            <button 
              onClick={handleFindTesters}
              disabled={isMatching || !formData.title || !formData.targetAudience}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isMatching ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
              Trouver des testeurs avec Gemini
            </button>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <div className="space-y-6">
           <Card>
            <CardHeader>
              <CardTitle>Testeurs suggérés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                Vous recherchez <strong>{formData.maxTesters} testeurs</strong>. L'IA a analysé la base de données et suggère les profils suivants :
              </div>

              <div className="space-y-4">
                {matches.map((match, idx) => {
                   const tester = MOCK_TESTERS.find(t => t.id === match.testerId);
                   if(!tester) return null;
                   return (
                    <div key={match.testerId} className="flex items-start gap-4 p-4 border border-gray-100 rounded-lg bg-gray-50">
                      <img src={tester.avatar} alt={tester.name} className="w-12 h-12 rounded-full" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-gray-900">{tester.name}</h4>
                          <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">{match.matchScore}% Match</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{tester.bio}</p>
                        <p className="text-xs text-indigo-600 mt-2 flex items-center gap-1">
                          <Sparkles size={12} /> AI Reason: {match.reason}
                        </p>
                      </div>
                      <CheckCircle className="text-indigo-600" />
                    </div>
                   )
                })}
                {matches.length === 0 && <p className="text-center text-gray-500">Aucun testeur parfait trouvé, mais on peut lancer en public.</p>}
              </div>
              
              <div className="mt-6 flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50">Retour</button>
                <button onClick={handleCreate} className="flex-1 bg-indigo-600 text-white px-4 py-3 rounded-lg font-bold hover:bg-indigo-700">
                    Lancer la campagne (${totalBudget})
                </button>
              </div>
            </CardContent>
           </Card>
        </div>
      )}
    </div>
  );
};
