import { GoogleGenAI, Type } from "@google/genai";
import { Feedback, TesterProfile } from "../types";

const API_KEY = process.env.API_KEY || '';

// Initialize Gemini Client
// Note: In a real production app, backend would handle this to protect the key.
// For this frontend demo, we assume process.env.API_KEY is available.
const ai = new GoogleGenAI({ apiKey: API_KEY });

/**
 * Uses Gemini to match a test description with the most relevant testers from a list.
 */
export const matchTestersWithAI = async (
  requirement: string,
  testers: TesterProfile[]
): Promise<any[]> => {
  if (!API_KEY) return [];

  const prompt = `
    Agis comme un expert en recrutement produit.
    Voici une exigence de test : "${requirement}".
    Voici une liste de profils de testeurs disponibles : ${JSON.stringify(testers)}.

    Sélectionne les 3 meilleurs profils pour ce test.
    Retourne uniquement un JSON (Array) contenant les objets avec : 
    - testerId
    - matchScore (0-100)
    - reason (une phrase courte expliquant pourquoi en Français)
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              testerId: { type: Type.STRING },
              matchScore: { type: Type.NUMBER },
              reason: { type: Type.STRING },
            }
          }
        }
      }
    });

    const text = response.text;
    if (text) {
      return JSON.parse(text);
    }
    return [];
  } catch (error) {
    console.error("Gemini matching error:", error);
    return [];
  }
};

/**
 * Uses Gemini to summarize a list of user feedbacks into actionable insights.
 */
export const summarizeFeedbackWithAI = async (feedbacks: Feedback[]): Promise<string> => {
  if (!API_KEY) return "Clé API manquante.";
  if (feedbacks.length === 0) return "Aucun feedback à analyser.";

  const feedbackText = feedbacks.map(f => `- ${f.testerName}: ${f.content}`).join('\n');

  const prompt = `
    Tu es un Product Manager senior. Analyse les retours utilisateurs suivants pour une fonctionnalité SaaS.
    
    Retours:
    ${feedbackText}

    Tâche:
    1. Synthétise les points positifs.
    2. Identifie les problèmes majeurs (Pain points).
    3. Propose 3 actions concrètes pour améliorer la feature.

    Formatte la réponse en Markdown propre et concis.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text || "Erreur lors de la génération du résumé.";
  } catch (error) {
    console.error("Gemini summary error:", error);
    return "Une erreur est survenue lors de l'analyse AI.";
  }
};

/**
 * Generates a test brief based on a loose idea.
 */
export const generateTestBrief = async (idea: string): Promise<{ title: string, description: string, audience: string }> => {
    if (!API_KEY) return { title: '', description: '', audience: '' };

    const prompt = `
      Je veux tester cette idée de fonctionnalité SaaS : "${idea}".
      Génère un titre accrocheur, une description claire pour les testeurs, et le public cible idéal.
      Réponds en JSON.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING },
                        description: { type: Type.STRING },
                        audience: { type: Type.STRING }
                    }
                }
            }
        });
        const text = response.text;
        return text ? JSON.parse(text) : { title: '', description: '', audience: '' };
    } catch (e) {
        console.error(e);
        return { title: '', description: '', audience: '' };
    }
}
