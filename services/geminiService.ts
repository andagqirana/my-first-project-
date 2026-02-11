import { GoogleGenAI, Type } from '@google/genai';
import { UserFormData, GeneratedPlan } from '../types';

// Ensure API key is available in the environment this runs in.
const getGenAIClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable is missing.");
  }
  return new GoogleGenAI({ apiKey });
};

const planSchema = {
  type: Type.OBJECT,
  properties: {
    dailyRoutine: {
      type: Type.ARRAY,
      description: "A suggested daily schedule broken down by time of day.",
      items: {
        type: Type.OBJECT,
        properties: {
          timeOfDay: { type: Type.STRING, description: "e.g., Morning (7:00 AM - 9:00 AM)" },
          activity: { type: Type.STRING, description: "The specific routine activity" },
          duration: { type: Type.STRING, description: "Estimated duration" },
        },
      },
    },
    habitsToBuild: {
      type: Type.ARRAY,
      description: "List of 3-5 specific, small habits to start building.",
      items: { type: Type.STRING },
    },
    actionableSteps: {
      type: Type.ARRAY,
      description: "List of 3-5 immediate actionable steps towards the short-term goal.",
      items: { type: Type.STRING },
    },
    motivationalQuote: {
      type: Type.STRING,
      description: "A customized, inspiring quote relevant to their specific goals and obstacles.",
    },
  },
  required: ["dailyRoutine", "habitsToBuild", "actionableSteps", "motivationalQuote"],
};

export const generateLifePlan = async (formData: UserFormData): Promise<GeneratedPlan> => {
  const ai = getGenAIClient();
  
  const prompt = `
    Create a personalized life and productivity plan for ${formData.name}.
    
    Their primary focus area is: ${formData.primaryFocus}.
    Their short-term goal is: ${formData.shortTermGoal}.
    Their long-term goal is: ${formData.longTermGoal}.
    They have approximately ${formData.dailyAvailability} of free time daily to dedicate to this.
    Their biggest current obstacle is: ${formData.biggestObstacle}.
    
    Based on this information, generate a highly practical, actionable, and encouraging plan.
    Structure the response strictly according to the provided JSON schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: planSchema,
        systemInstruction: "You are an expert life coach and productivity planner. Your advice is realistic, highly actionable, empathetic, and structured.",
        temperature: 0.7,
      },
    });

    const textResult = response.text;
    if (!textResult) {
       throw new Error("No text returned from Gemini API.");
    }

    const plan: GeneratedPlan = JSON.parse(textResult);
    return plan;
  } catch (error) {
    console.error("Error generating life plan:", error);
    throw new Error("Failed to generate plan. Please try again later.");
  }
};
