
import React, { useState } from 'react';
import { Card, CardContent } from '../components/Card';
import { UserRole, TesterProfile } from '../types';
import { ArrowRight, User, Briefcase, Laptop, Check } from 'lucide-react';

interface SignupTesterProps {
  onComplete: (profileData: Partial<TesterProfile>) => void;
  onSkip: () => void;
}

export const SignupTester: React.FC<SignupTesterProps> = ({ onComplete, onSkip }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<TesterProfile>>({
    name: 'Jean Dupont',
    role: UserRole.TESTER,
    bio: '',
    jobTitle: '',
    industry: '',
    yearsOfExperience: '0-2 ans',
    skills: [],
    devices: []
  });

  const [newSkill, setNewSkill] = useState('');
  const [newDevice, setNewDevice] = useState('');

  const handleNext = () => setStep(step + 1);
  const handleSubmit = () => onComplete(formData);

  const addSkill = () => {
    if (newSkill && formData.skills) {
      setFormData({ ...formData, skills: [...formData.skills, newSkill] });
      setNewSkill('');
    } else if (newSkill) {
        setFormData({ ...formData, skills: [newSkill] });
        setNewSkill('');
    }
  };

  const addDevice = () => {
    if (newDevice && formData.devices) {
      setFormData({ ...formData, devices: [...formData.devices, newDevice] });
      setNewDevice('');
    } else if (newDevice) {
        setFormData({ ...formData, devices: [newDevice] });
        setNewDevice('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Bienvenue sur FeedbackFast 🚀</h1>
            <p className="text-gray-500">Créez votre profil testeur pour recevoir des missions rémunérées.</p>
        </div>

        {/* Steps Indicator */}
        <div className="flex justify-between mb-8 px-4">
            {[1, 2, 3].map(i => (
                <div key={i} className="flex flex-col items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= i ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                        {i}
                    </div>
                    <span className="text-xs text-gray-500 uppercase font-medium">
                        {i === 1 ? 'Identité' : i === 2 ? 'Pro' : 'Tech'}
                    </span>
                </div>
            ))}
        </div>

        <Card>
            <CardContent className="p-8">
                {step === 1 && (
                    <div className="space-y-4">
                        <div className="text-center mb-4">
                            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-2">
                                <User size={32} />
                            </div>
                            <h2 className="font-bold text-lg">Qui êtes-vous ?</h2>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                            <input 
                                type="text" 
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mini Bio</label>
                            <textarea 
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                placeholder="Qu'est-ce qui vous décrit le mieux ?"
                                rows={3}
                                value={formData.bio}
                                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                            />
                        </div>
                        <button onClick={handleNext} className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 mt-4 hover:bg-indigo-700">
                            Suivant <ArrowRight size={18} />
                        </button>
                        <button onClick={onSkip} className="w-full text-gray-400 text-sm py-2 hover:text-gray-600">Passer pour le moment</button>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-4">
                         <div className="text-center mb-4">
                            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                                <Briefcase size={32} />
                            </div>
                            <h2 className="font-bold text-lg">Votre profil Pro</h2>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Intitulé de poste</label>
                            <input 
                                type="text" 
                                placeholder="Ex: Product Manager, Étudiant..."
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={formData.jobTitle}
                                onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Secteur d'activité</label>
                            <input 
                                type="text" 
                                placeholder="Ex: Tech, Santé, Retail..."
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={formData.industry}
                                onChange={(e) => setFormData({...formData, industry: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Années d'expérience</label>
                            <select 
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                                value={formData.yearsOfExperience}
                                onChange={(e) => setFormData({...formData, yearsOfExperience: e.target.value})}
                            >
                                <option>Étudiant</option>
                                <option>0-2 ans</option>
                                <option>2-5 ans</option>
                                <option>5-10 ans</option>
                                <option>10+ ans</option>
                            </select>
                        </div>
                        <button onClick={handleNext} className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 mt-4 hover:bg-indigo-700">
                            Suivant <ArrowRight size={18} />
                        </button>
                    </div>
                )}

                {step === 3 && (
                     <div className="space-y-4">
                        <div className="text-center mb-4">
                            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                                <Laptop size={32} />
                            </div>
                            <h2 className="font-bold text-lg">Vos atouts</h2>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Compétences / Outils</label>
                            <div className="flex gap-2">
                                <input 
                                    type="text" 
                                    className="flex-1 p-2 border border-gray-300 rounded-lg text-sm"
                                    placeholder="Ex: Excel, Figma..."
                                    value={newSkill}
                                    onChange={(e) => setNewSkill(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                                />
                                <button onClick={addSkill} className="bg-gray-100 px-3 rounded-lg text-sm font-bold">+</button>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {formData.skills?.map((s, i) => (
                                    <span key={i} className="bg-purple-50 text-purple-700 px-2 py-1 rounded text-xs">{s}</span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Appareils disponibles</label>
                            <div className="flex gap-2">
                                <input 
                                    type="text" 
                                    className="flex-1 p-2 border border-gray-300 rounded-lg text-sm"
                                    placeholder="Ex: iPhone 12, Mac..."
                                    value={newDevice}
                                    onChange={(e) => setNewDevice(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && addDevice()}
                                />
                                <button onClick={addDevice} className="bg-gray-100 px-3 rounded-lg text-sm font-bold">+</button>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {formData.devices?.map((d, i) => (
                                    <span key={i} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">{d}</span>
                                ))}
                            </div>
                        </div>

                        <button onClick={handleSubmit} className="w-full bg-green-600 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 mt-6 hover:bg-green-700 shadow-lg shadow-green-200">
                            Terminer l'inscription <Check size={18} />
                        </button>
                    </div>
                )}
            </CardContent>
        </Card>
      </div>
    </div>
  );
};
