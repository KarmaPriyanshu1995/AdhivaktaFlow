import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateLegalDraft = async (
  draftType: string,
  parties: string,
  keyFacts: string,
  language: 'English' | 'Hindi'
): Promise<string> => {
  try {
    const prompt = `
      You are an expert Indian Lawyer AI assistant.
      Task: Draft a ${draftType} for use in an Indian Court.
      Language: ${language}.
      
      Details:
      Parties Involved: ${parties}
      Key Facts/Context: ${keyFacts}
      
      Requirements:
      - Use professional legal terminology applicable in Indian Law (IPC, CrPC, CPC, etc. where relevant).
      - Format clearly with placeholders like [DATE], [PLACE] where appropriate.
      - Keep it concise but legally sound.
      - If Hindi is selected, draft strictly in formal Hindi legal script (Devanagari).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Failed to generate draft. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to AI service. Please check your API key.";
  }
};