
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, ScamType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeThreat = async (content: string, type: ScamType): Promise<AnalysisResult> => {
  const prompt = `
    You are Fincys AI, a world-class cybersecurity expert.
    Analyze the following ${type} content for potential scams, phishing, or credential harvesting.
    
    Content to analyze:
    "${content}"

    Be extremely vigilant about:
    - Urgent calls to action (FOMO)
    - Requests for OTP, passwords, or PINs
    - Mismatched URLs or suspicious senders
    - Grammar errors and impersonation of banks
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskScore: { type: Type.NUMBER, description: "0-100 scale of risk" },
            verdict: { type: Type.STRING, description: "SAFE, SUSPICIOUS, or DANGEROUS" },
            summary: { type: Type.STRING, description: "Brief overview of the threat" },
            threats: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Specific red flags found" },
            recommendations: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Steps for the user to take" }
          },
          required: ["riskScore", "verdict", "summary", "threats", "recommendations"]
        }
      }
    });

    return JSON.parse(response.text || "{}") as AnalysisResult;
  } catch (error) {
    console.error("AI Analysis failed", error);
    throw new Error("Unable to analyze content at this time.");
  }
};
