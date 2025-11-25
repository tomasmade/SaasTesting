
import React, { useState } from 'react';
import { TesterProfile } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { Save, User, Briefcase, Laptop, Plus, X } from 'lucide-react';

interface TesterProfilePageProps {
  profile: TesterProfile;
  onUpdate: (updatedProfile: TesterProfile) => void;
}

export const TesterProfilePage: React.FC<TesterProfilePageProps> = ({ profile, onUpdate }) => {
  const [formData, setFormData] = useState<TesterProfile>(profile);
  const [newSkill, setNewSkill] = useState('');
  const [newDevice, setNewDevice] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    onUpdate(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({ ...formData, skills: [...formData.skills, newSkill.trim()] });
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
  };

  const addDevice = () => {
    if (newDevice.trim() && !formData.devices.includes(newDevice.trim())) {
      setFormData({ ...formData, devices: [...formData.devices, newDevice.trim()] });
      setNewDevice('');
    }
  };

  const removeDevice = (device: string) => {
    setFormData({ ...formData, devices: formData.devices.filter(d => d !== device) });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <header className="flex justify-between items-center mb-6">
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Mon Profil</h1>
            <p className="text-gray-500">Mettez à jour vos infos pour recevoir plus de missions pertinentes.</p>
        </div>
        <button 
            onClick={handleSave}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold text-white transition-all ${isSaved ? 'bg-green-600' : 'bg-indigo-600 hover:bg-indigo-700'}`}
        >
            {isSaved ? <CheckIcon /> : <Save size={18} />}
            {isSaved ? 'Enregistré !' : 'Enregistrer'}
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Identity */}
        <div className="md:col-span-1 space-y-6">
            <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                    <img 
                        src={formData.avatar} 
                        alt="Avatar" 
                        className="w-24 h-24 rounded-full border-4 border-indigo-50 mb-4"
                    />
                    <h2 className="text-xl font-bold text-gray-900">{formData.name}</h2>
                    <div className="flex items-center gap-1 mt-1 text-yellow-500 font-bold">
                        <span className="text-lg">{formData.rating}</span>
                        <span className="text-xs text-gray-400 font-normal">/ 5.0 (Note moyenne)</span>
                    </div>
                    
                    <div className="w-full mt-6 text-left">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Bio</label>
                        <textarea 
                            className="w-full p-2 text-sm border border-gray-200 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            rows={4}
                            value={formData.bio}
                            onChange={(e) => setFormData({...formData, bio: e.target.value})}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>

        {/* Right Column: Details */}
        <div className="md:col-span-2 space-y-6">
            
            {/* Professional Info */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2 text-indigo-900">
                        <Briefcase size={20} />
                        <CardTitle>Profil Professionnel</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Métier / Titre</label>
                        <input 
                            type="text" 
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={formData.jobTitle || ''}
                            onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Secteur</label>
                        <input 
                            type="text" 
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={formData.industry || ''}
                            onChange={(e) => setFormData({...formData, industry: e.target.value})}
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Années d'expérience</label>
                        <select 
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={formData.yearsOfExperience || '0-2 ans'}
                            onChange={(e) => setFormData({...formData, yearsOfExperience: e.target.value})}
                        >
                            <option>Étudiant</option>
                            <option>0-2 ans</option>
                            <option>2-5 ans</option>
                            <option>5-10 ans</option>
                            <option>10+ ans</option>
                        </select>
                    </div>
                </CardContent>
            </Card>

            {/* Skills */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2 text-indigo-900">
                        <User size={20} />
                        <CardTitle>Compétences</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2 mb-3">
                        <input 
                            type="text" 
                            className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
                            placeholder="Ex: React, Photoshop, Finance..."
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                        />
                        <button onClick={addSkill} className="bg-gray-100 p-2 rounded-md hover:bg-gray-200"><Plus size={20} /></button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {formData.skills.map(skill => (
                            <span key={skill} className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                                {skill}
                                <button onClick={() => removeSkill(skill)} className="hover:text-indigo-900"><X size={14}/></button>
                            </span>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Devices */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2 text-indigo-900">
                        <Laptop size={20} />
                        <CardTitle>Appareils de test</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                     <div className="flex gap-2 mb-3">
                        <input 
                            type="text" 
                            className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
                            placeholder="Ex: iPhone 14, PC Windows 11..."
                            value={newDevice}
                            onChange={(e) => setNewDevice(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addDevice()}
                        />
                        <button onClick={addDevice} className="bg-gray-100 p-2 rounded-md hover:bg-gray-200"><Plus size={20} /></button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {formData.devices.map(device => (
                            <span key={device} className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                                {device}
                                <button onClick={() => removeDevice(device)} className="hover:text-emerald-900"><X size={14}/></button>
                            </span>
                        ))}
                    </div>
                </CardContent>
            </Card>

        </div>
      </div>
    </div>
  );
};

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
);
