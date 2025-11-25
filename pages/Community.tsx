
import React, { useState } from 'react';
import { Card, CardContent } from '../components/Card';
import { MOCK_TESTERS } from '../constants';
import { Search, Filter, UserPlus, Star, Briefcase, CheckCircle } from 'lucide-react';

interface CommunityProps {
  onInvite: (testerId: string) => void;
}

export const Community: React.FC<CommunityProps> = ({ onInvite }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSkill, setFilterSkill] = useState('');
  const [invitedTesters, setInvitedTesters] = useState<string[]>([]);

  const handleInvite = (id: string) => {
    onInvite(id);
    setInvitedTesters([...invitedTesters, id]);
  };

  const filteredTesters = MOCK_TESTERS.filter(tester => {
    const matchesSearch = tester.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tester.bio.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = filterSkill ? tester.skills.some(s => s.toLowerCase().includes(filterSkill.toLowerCase())) : true;
    return matchesSearch && matchesSkill;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Communauté de Testeurs</h1>
          <p className="text-gray-500">Recherchez des profils spécifiques pour vos tests pointus.</p>
        </div>
      </div>

      {/* Search & Filters */}
      <Card>
        <CardContent className="p-4 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Rechercher par nom ou mot-clé..." 
              className="w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-64 relative">
            <Filter className="absolute left-3 top-3 text-gray-400" size={20} />
            <select 
              className="w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none appearance-none bg-white"
              value={filterSkill}
              onChange={(e) => setFilterSkill(e.target.value)}
            >
              <option value="">Toutes les compétences</option>
              <option value="React">React</option>
              <option value="Finance">Finance</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTesters.map(tester => (
          <Card key={tester.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img src={tester.avatar} alt={tester.name} className="w-12 h-12 rounded-full border border-gray-100" />
                  <div>
                    <h3 className="font-bold text-gray-900">{tester.name}</h3>
                    <div className="flex items-center text-xs text-gray-500 gap-1">
                        <Briefcase size={12} />
                        {tester.jobTitle || 'Testeur'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center bg-yellow-50 text-yellow-700 px-2 py-1 rounded-full text-xs font-bold gap-1">
                  <Star size={12} fill="currentColor" />
                  {tester.rating}
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">{tester.bio}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {tester.skills.slice(0, 3).map(skill => (
                  <span key={skill} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">
                    {skill}
                  </span>
                ))}
                {tester.skills.length > 3 && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">+{tester.skills.length - 3}</span>
                )}
              </div>

              <button 
                onClick={() => handleInvite(tester.id)}
                disabled={invitedTesters.includes(tester.id)}
                className={`w-full py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-colors ${
                  invitedTesters.includes(tester.id) 
                    ? 'bg-green-100 text-green-700 cursor-default' 
                    : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                }`}
              >
                {invitedTesters.includes(tester.id) ? (
                  <>
                    <CheckCircle size={16} />
                    Invité
                  </>
                ) : (
                  <>
                    <UserPlus size={16} />
                    Inviter au test
                  </>
                )}
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
