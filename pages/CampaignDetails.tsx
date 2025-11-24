import React, { useState } from 'react';
import { TestCampaign, Feedback } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { summarizeFeedbackWithAI } from '../services/geminiService';
import { ArrowLeft, Star, Sparkles, Loader2, FileText } from 'lucide-react';
import ReactMarkdown from 'react-markdown'; // We will just render text for now to avoid adding dep in instruction, or just render whitespace-pre-wrap

interface CampaignDetailsProps {
  campaign: TestCampaign;
  onBack: () => void;
}

export const CampaignDetails: React.FC<CampaignDetailsProps> = ({ campaign, onBack }) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);

  const handleSummarize = async () => {
    setIsSummarizing(true);
    const result = await summarizeFeedbackWithAI(campaign.feedbacks);
    setSummary(result);
    setIsSummarizing(false);
  };

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="flex items-center text-sm text-gray-500 hover:text-indigo-600">
        <ArrowLeft size={16} className="mr-1" /> Retour au tableau de bord
      </button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{campaign.title}</h1>
          <p className="text-gray-500 mt-1">{campaign.description}</p>
        </div>
        <div className="flex gap-2">
             <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
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
                             <span className="font-bold text-sm">{fb.testerName}</span>
                        </div>
                        <div className="flex items-center text-yellow-400 gap-1">
                            <span className="text-gray-400 text-xs font-medium mr-1">Note:</span>
                            {Array.from({length: 5}).map((_, i) => (
                                <Star key={i} size={14} fill={i < fb.rating ? "currentColor" : "none"} className={i < fb.rating ? "" : "text-gray-300"} />
                            ))}
                        </div>
                    </div>
                    <p className="text-gray-700">{fb.content}</p>
                    <div className="mt-3 text-xs text-gray-400">Posté le {fb.date}</div>
                </CardContent>
             </Card>
          ))}
          {campaign.feedbacks.length === 0 && (
              <p className="text-gray-500 italic">Aucun feedback pour le moment.</p>
          )}
        </div>

        <div className="space-y-6">
            <Card>
                <CardHeader><CardTitle>Widget d'intégration</CardTitle></CardHeader>
                <CardContent>
                    <p className="text-sm text-gray-600 mb-4">Ajoutez ce code à votre site pour récolter les avis.</p>
                    <div className="bg-gray-900 text-gray-100 p-3 rounded-md text-xs font-mono overflow-x-auto">
                        {`<script src="https://cdn.feedbackfast.io/widget.js" \n data-id="${campaign.id}"></script>`}
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
};
