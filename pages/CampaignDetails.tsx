
import React, { useState } from 'react';
import { TestCampaign, Feedback } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { summarizeFeedbackWithAI } from '../services/geminiService';
import { ArrowLeft, Star, Sparkles, Loader2, FileText, Play, Code, Bug, Lightbulb, CheckCircle, XCircle, Image as ImageIcon } from 'lucide-react';
import { FeedbackWidget } from '../components/FeedbackWidget';

interface CampaignDetailsProps {
  campaign: TestCampaign;
  onBack: () => void;
  onAddFeedback?: (feedback: Feedback) => void;
}

export const CampaignDetails: React.FC<CampaignDetailsProps> = ({ campaign, onBack, onAddFeedback }) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [showWidgetSimulation, setShowWidgetSimulation] = useState(false);

  const handleSummarize = async () => {
    setIsSummarizing(true);
    const result = await summarizeFeedbackWithAI(campaign.feedbacks);
    setSummary(result);
    setIsSummarizing(false);
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
        case 'BUG': return <span className="flex items-center gap-1 bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full font-bold border border-red-200"><Bug size={12}/> Bug</span>;
        case 'IDEA': return <span className="flex items-center gap-1 bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-bold border border-blue-200"><Lightbulb size={12}/> Idée</span>;
        default: return <span className="flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full font-bold border border-gray-200">Avis</span>;
    }
  };

  return (
    <div className="space-y-6 relative">
      {/* Widget Simulation Overlay */}
      {showWidgetSimulation && onAddFeedback && (
        <FeedbackWidget 
            campaignId={campaign.id}
            campaignTitle={campaign.title}
            onSubmit={onAddFeedback}
            onClose={() => setShowWidgetSimulation(false)}
        />
      )}

      <button onClick={onBack} className="flex items-center text-sm text-gray-500 hover:text-indigo-600">
        <ArrowLeft size={16} className="mr-1" /> Retour au tableau de bord
      </button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{campaign.title}</h1>
          <p className="text-gray-500 mt-1">{campaign.description}</p>
        </div>
        <div className="flex gap-2">
             <span className={`px-3 py-1 rounded-full text-sm font-medium ${campaign.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {campaign.status}
             </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* AI Summary Section */}
          <Card className="border-indigo-100 overflow-hidden">
            <div className="bg-indigo-50 p-4 border-b border-indigo-100 flex justify-between items-center">
                <div className="flex items-center gap-2 text-indigo-900 font-bold">
                    <Sparkles size={18} />
                    <span>Synthèse IA des retours</span>
                </div>
                {!summary && (
                    <button 
                        onClick={handleSummarize}
                        disabled={isSummarizing || campaign.feedbacks.length === 0}
                        className="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                    >
                        {isSummarizing ? 'Analyse en cours...' : 'Générer le résumé'}
                    </button>
                )}
            </div>
            <CardContent className="bg-white min-h-[100px]">
                {summary ? (
                    <div className="prose prose-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {summary}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-gray-400 text-sm">
                        {isSummarizing ? <Loader2 className="animate-spin mb-2" /> : <FileText className="mb-2 opacity-50" />}
                        {isSummarizing ? 'Gemini analyse les retours...' : "Cliquez pour analyser les feedbacks avec l'IA."}
                    </div>
                )}
            </CardContent>
          </Card>

          {/* Feedback List */}
          <h2 className="text-xl font-bold text-gray-900">Retours détaillés ({campaign.feedbacks.length})</h2>
          {campaign.feedbacks.map(fb => (
             <Card key={fb.id}>
                <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                             <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                                {fb.testerName.charAt(0)}
                             </div>
                             <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-sm text-gray-900">{fb.testerName}</span>
                                    {getTypeBadge(fb.type)}
                                </div>
                                <div className="text-xs text-gray-400">{fb.deviceInfo || 'Appareil inconnu'}</div>
                             </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <div className="flex items-center text-yellow-400 gap-1">
                                {Array.from({length: 5}).map((_, i) => (
                                    <Star key={i} size={14} fill={i < fb.rating ? "currentColor" : "none"} className={i < fb.rating ? "" : "text-gray-300"} />
                                ))}
                            </div>
                            <span className="text-xs text-gray-400">{fb.date}</span>
                        </div>
                    </div>
                    
                    <div className="mb-3">
                        <p className="text-gray-700 leading-relaxed">{fb.content}</p>
                    </div>

                    <div className="flex items-center gap-4 border-t border-gray-100 pt-3">
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-500 text-xs font-medium uppercase">Tâche :</span>
                            {fb.taskSuccess ? (
                                <span className="flex items-center text-green-600 text-xs font-bold gap-1"><CheckCircle size={14}/> Réussie</span>
                            ) : (
                                <span className="flex items-center text-red-600 text-xs font-bold gap-1"><XCircle size={14}/> Échouée</span>
                            )}
                        </div>
                        {fb.screenshotUrl && (
                             <div className="flex items-center gap-2 text-sm">
                                <span className="text-gray-500 text-xs font-medium uppercase">Preuve :</span>
                                <a href={fb.screenshotUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-indigo-600 text-xs font-bold gap-1 hover:underline">
                                    <ImageIcon size={14}/> Voir capture
                                </a>
                            </div>
                        )}
                    </div>
                </CardContent>
             </Card>
          ))}
          {campaign.feedbacks.length === 0 && (
              <p className="text-gray-500 italic">Aucun feedback pour le moment.</p>
          )}
        </div>

        <div className="space-y-6">
            <Card className="border-2 border-indigo-100">
                <CardHeader>
                    <div className="flex items-center gap-2 text-indigo-900">
                        <Code size={20} />
                        <CardTitle>Intégration</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                        Copiez ce script dans le <code>&lt;head&gt;</code> de votre application SaaS pour collecter les avis directement.
                    </p>
                    <div className="bg-gray-900 text-gray-100 p-3 rounded-md text-xs font-mono overflow-x-auto mb-4">
                        {`<script src="https://cdn.feedbackfast.io/widget.js" \n data-id="${campaign.id}"></script>`}
                    </div>
                    
                    <button 
                        onClick={() => setShowWidgetSimulation(true)}
                        className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-colors border border-indigo-200"
                    >
                        <Play size={16} />
                        Simuler le widget
                    </button>
                    <p className="text-xs text-center text-gray-400 mt-2">
                        Cliquez pour voir ce que vos utilisateurs verront.
                    </p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
};
