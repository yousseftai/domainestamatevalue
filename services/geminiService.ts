
import { GoogleGenAI, Type } from "@google/genai";
import { ValuationResult } from "../types";
import { SYSTEM_INSTRUCTION, VALUATION_PROMPT_TEMPLATE } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const valuationSchema = {
  type: Type.OBJECT,
  properties: {
    domain: { type: Type.STRING },
    lowValue: { type: Type.NUMBER },
    fairValue: { type: Type.NUMBER },
    premiumValue: { type: Type.NUMBER },
    wholesalePrice: { type: Type.NUMBER },
    retailPrice: { type: Type.NUMBER },
    confidenceScore: { type: Type.NUMBER },
    liquidityScore: { type: Type.NUMBER },
    appealScore: { type: Type.NUMBER },
    logic: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    comparableSales: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          domain: { type: Type.STRING },
          price: { type: Type.NUMBER },
          date: { type: Type.STRING }
        },
        required: ["domain", "price", "date"]
      }
    },
    recommendation: { type: Type.STRING, description: "One of: HOLD, SELL, PRICE_HIGH, PRICE_FAST, DROP" },
    recommendationReason: { type: Type.STRING },
    analysis: {
      type: Type.OBJECT,
      properties: {
        tldStrength: { type: Type.NUMBER },
        commercialIntent: { type: Type.NUMBER },
        brandability: { type: Type.NUMBER },
        lengthScore: { type: Type.NUMBER }
      },
      required: ["tldStrength", "commercialIntent", "brandability", "lengthScore"]
    }
  },
  required: [
    "domain", "lowValue", "fairValue", "premiumValue", "wholesalePrice", "retailPrice", 
    "confidenceScore", "liquidityScore", "appealScore", "logic", "comparableSales", 
    "recommendation", "recommendationReason", "analysis"
  ]
};

export async function valuateDomain(domain: string): Promise<ValuationResult> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: VALUATION_PROMPT_TEMPLATE(domain),
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: valuationSchema
      }
    });

    const result = JSON.parse(response.text);
    return result as ValuationResult;
  } catch (error) {
    console.error("Valuation Error:", error);
    throw new Error("Failed to valuate domain. Please try again later.");
  }
}

export async function valuatePortfolio(domains: string[]): Promise<ValuationResult[]> {
  // To stay within token limits and maintain quality, we process in small batches or one-by-one
  // For this implementation, we'll demonstrate a batch-friendly approach
  const results: ValuationResult[] = [];
  for (const domain of domains.slice(0, 10)) { // Limit demo to 10 for performance
    const res = await valuateDomain(domain);
    results.push(res);
  }
  return results;
}
