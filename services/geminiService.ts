import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateLegalDraft = async (
  category: string,
  draftType: string,
  parties: string,
  keyFacts: string,
  language: 'English' | 'Hindi'
): Promise<string> => {
  try {
    const prompt = `
      You are an expert Indian Lawyer AI assistant.
      Task: Draft a legal document for use in an Indian Court.
      
      Parameters:
      - Case Category: ${category} (e.g., Civil, Criminal, Corporate, Family)
      - Document Type: ${draftType}
      - Language: ${language}
      - Parties Involved: ${parties}
      - Key Facts/Context: ${keyFacts}
      
      Requirements:
      1. Structure: Follow standard Indian legal drafting conventions (Cause Title, Body, Prayer/Relief, Verification).
      2. Acts/Sections: Cite relevant Indian laws (IPC, CrPC, CPC, Evidence Act, Hindu Marriage Act, etc.) based on the context provided.
      3. Tone: Formal, precise, and authoritative.
      4. Placeholders: Use clear placeholders like [DATE], [PLACE], [COURT NAME] where specific info is missing.
      5. Language Script: If Hindi is selected, output strictly in formal Hindi legal script (Devanagari). If English, use standard legal English.
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