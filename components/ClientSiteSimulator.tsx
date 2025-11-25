
import React from 'react';
import { X, ExternalLink } from 'lucide-react';
import { FeedbackWidget } from './FeedbackWidget';
import { Feedback } from '../types';

interface ClientSiteSimulatorProps {
  campaignTitle: string;
  campaignId: string;
  onClose: () => void;
  onSubmitFeedback: (feedback: Feedback) => void;
}

export const ClientSiteSimulator: React.FC<ClientSiteSimulatorProps> = ({ campaignTitle, campaignId, onClose, onSubmitFeedback }) => {
  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Browser Chrome Simulator */}
      <div className="bg-gray-100 border-b border-gray-300 p-2 flex items-center gap-4">
        <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
        <div className="flex-1 bg-white rounded-md px-3 py-1.5 text-xs text-gray-500 flex items-center gap-2 shadow-sm">
            <ExternalLink size={12} />
            <span>https://client-app.com/features/new-test</span>
        </div>
        <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-sm font-medium px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
        >
            Fermer la simulation
        </button>
      </div>

      {/* Simulated Content */}
      <div className="flex-1 overflow-y-auto bg-slate-50 relative p-8">
        {/* Placeholder for Client Content */}
        <div className="max-w-4xl mx-auto space-y-8 opacity-50 pointer-events-none select-none grayscale-[50%]">
            <div className="h-12 w-48 bg-slate-300 rounded mb-8"></div>
            <div className="grid grid-cols-3 gap-6">
                <div className="h-32 bg-slate-200 rounded-lg"></div>
                <div className="h-32 bg-slate-200 rounded-lg"></div>
                <div className="h-32 bg-slate-200 rounded-lg"></div>
            </div>
            <div className="h-64 bg-slate-200 rounded-lg w-full"></div>
            <div className="space-y-4">
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                <div className="h-4 bg-slate-200 rounded w-5/6"></div>
            </div>
        </div>

        {/* The overlay message explaining what's happening */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-indigo-100 text-center max-w-md pointer-events-auto">
                <h2 className="text-xl font-bold text-indigo-900 mb-2">
                    Vous êtes sur le site du client : "{campaignTitle}"
                </h2>
                <p className="text-gray-600 mb-4 text-sm">
                    En tant que testeur, vous naviguez ici. Le widget FeedbackFast est chargé automatiquement en bas à droite.
                </p>
                <div className="animate-bounce mt-4 text-indigo-500 font-bold">
                    👇 Testez le widget
                </div>
            </div>
        </div>

        {/* THE REAL WIDGET */}
        <FeedbackWidget 
            campaignId={campaignId}
            campaignTitle={campaignTitle}
            onSubmit={onSubmitFeedback}
            onClose={() => {}} // In simulation, closing just hides the form part, handled inside widget usually, or we can leave empty
        />
      </div>
    </div>
  );
};
