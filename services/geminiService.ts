import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the AI Construction Consultant for "SSV Developers", a premier construction company.
Your goal is to assist website visitors with questions about construction processes, materials, cost estimates (rough ranges only), and interior design ideas.

Key Company Info:
- Name: SSV Developers
- Specialization: Residential, Commercial, and Industrial construction.
- Values: Quality, Safety, Innovation, Sustainability.
- Contact: contact@ssvdevelopers.com, +1 (555) 123-4567.

Guidelines:
- Be professional, polite, and helpful.
- If asked about specific quotes, politely direct them to the "Contact Us" form for a detailed assessment.
- Keep answers concise (under 150 words).
- Format responses cleanly.
`;

export const sendMessageToGemini = async (
  message: string,
  history: { role: 'user' | 'model'; text: string }[]
): Promise<string> => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey || apiKey === "") {
    throw new Error("AUTH_REQUIRED");
  }

  try {
    // Create a new instance right before the call to ensure we use the latest injected key
    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({
          role: h.role,
          parts: [{ text: h.text }]
        })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        thinkingConfig: { thinkingBudget: 0 }
      },
    });

    return response.text || "I'm sorry, I couldn't generate a response at this time.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    if (error.message?.includes("entity was not found") || error.message?.includes("apiKey") || error.status === 401) {
      throw new Error("AUTH_REQUIRED");
    }
    
    throw new Error("Failed to connect to the AI consultant.");
  }
};