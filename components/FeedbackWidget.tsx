
import React, { useState } from 'react';
import { X, MessageSquare, Send, Star, Bug, Lightbulb, Image as ImageIcon, ThumbsUp, ThumbsDown, Check } from 'lucide-react';
import { Feedback, FeedbackType } from '../types';

interface FeedbackWidgetProps {
  campaignId: string;
  campaignTitle: string;
  onSubmit: (feedback: Feedback) => void;
  onClose: () => void;
}

export const FeedbackWidget: React.FC<FeedbackWidgetProps> = ({ campaignId, campaignTitle, onSubmit, onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [step, setStep] = useState(1);
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('GENERAL');
  const [taskSuccess, setTaskSuccess] = useState<boolean | null>(null);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [hasScreenshot, setHasScreenshot] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;

    const newFeedback: Feedback = {
      id: `f${Date.now()}`,
      testerId: 'guest-user',
      testerName: 'Moi (Testeur)',
      content: content,
      rating: rating,
      sentiment: rating >= 4 ? 'positive' : rating === 3 ? 'neutral' : 'negative',
      date: new Date().toISOString().split('T')[0],
      type: feedbackType,
      taskSuccess: taskSuccess === true,
      screenshotUrl: hasScreenshot ? 'https://placehold.co/600x400/png?text=Captured+Screen' : undefined,
      deviceInfo: 'Chrome / Simulator'
    };

    onSubmit(newFeedback);
    setStep(2); // Success state
    setTimeout(() => {
        setIsOpen(false);
        onClose();
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
        {/* Widget Container */}
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 w-[350px] overflow-hidden transition-all duration-300 transform translate-y-0">
            {/* Header */}
            <div className="bg-indigo-600 p-4 flex justify-between items-center text-white">
                <div>
                    <h3 className="font-bold text-sm flex items-center gap-2">
                        <MessageSquare size={16} />
                        Feedback Rapide
                    </h3>
                </div>
                <button onClick={onClose} className="hover:bg-indigo-700 p-1 rounded">
                    <X size={16} />
                </button>
            </div>

            {/* Body */}
            <div className="p-5">
                {step === 2 ? (
                    <div className="text-center py-8 animate-in fade-in zoom-in duration-300">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Send size={32} />
                        </div>
                        <h4 className="font-bold text-gray-800 text-lg">Merci !</h4>
                        <p className="text-sm text-gray-500 mt-2">Votre retour est précieux pour l'équipe produit.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                        
                        {/* 1. Type Selector */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">De quoi s'agit-il ?</label>
                            <div className="grid grid-cols-3 gap-2">
                                <button 
                                    type="button"
                                    onClick={() => setFeedbackType('BUG')}
                                    className={`flex flex-col items-center justify-center p-2 rounded-lg border text-xs font-medium transition-all ${feedbackType === 'BUG' ? 'bg-red-50 border-red-200 text-red-600 ring-1 ring-red-200' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                                >
                                    <Bug size={20} className="mb-1" />
                                    Bug
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setFeedbackType('IDEA')}
                                    className={`flex flex-col items-center justify-center p-2 rounded-lg border text-xs font-medium transition-all ${feedbackType === 'IDEA' ? 'bg-blue-50 border-blue-200 text-blue-600 ring-1 ring-blue-200' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                                >
                                    <Lightbulb size={20} className="mb-1" />
                                    Idée
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setFeedbackType('GENERAL')}
                                    className={`flex flex-col items-center justify-center p-2 rounded-lg border text-xs font-medium transition-all ${feedbackType === 'GENERAL' ? 'bg-gray-100 border-gray-300 text-gray-800 ring-1 ring-gray-300' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                                >
                                    <MessageSquare size={20} className="mb-1" />
                                    Avis
                                </button>
                            </div>
                        </div>

                        {/* 2. Task Success */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Avez-vous réussi votre tâche ?</label>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setTaskSuccess(true)}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md border text-sm ${taskSuccess === true ? 'bg-green-600 text-white border-green-600 shadow-sm' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                >
                                    <ThumbsUp size={16} /> Oui
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setTaskSuccess(false)}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md border text-sm ${taskSuccess === false ? 'bg-red-600 text-white border-red-600 shadow-sm' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                                >
                                    <ThumbsDown size={16} /> Non
                                </button>
                            </div>
                        </div>

                        {/* 3. Rating & Comment */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Détails</label>
                            <textarea
                                className="w-full p-3 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none bg-gray-50 mb-3"
                                rows={3}
                                placeholder={feedbackType === 'BUG' ? "Décrivez ce qui s'est passé..." : feedbackType === 'IDEA' ? "Quelle est votre suggestion ?" : "Dites-nous ce que vous en pensez..."}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            />
                            
                            <div className="flex justify-between items-center">
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            className="focus:outline-none transition-transform hover:scale-110"
                                        >
                                            <Star 
                                                size={20} 
                                                fill={star <= rating ? "#FBBF24" : "none"} 
                                                className={star <= rating ? "text-yellow-400" : "text-gray-300"} 
                                            />
                                        </button>
                                    ))}
                                </div>
                                <button 
                                    type="button"
                                    onClick={() => setHasScreenshot(!hasScreenshot)}
                                    className={`text-xs flex items-center gap-1 px-2 py-1 rounded transition-colors ${hasScreenshot ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                                >
                                    <ImageIcon size={14} />
                                    {hasScreenshot ? 'Capture jointe' : 'Joindre écran'}
                                </button>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={rating === 0 || content.length < 5 || taskSuccess === null}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
                        >
                            <span>Envoyer le feedback</span>
                            <Send size={16} />
                        </button>
                    </form>
                )}
            </div>
            
            <div className="bg-gray-50 px-4 py-2 text-center border-t border-gray-100">
                <span className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
                    Powered by <span className="font-bold text-gray-600">FeedbackFast</span>
                </span>
            </div>
        </div>
    </div>
  );
};
