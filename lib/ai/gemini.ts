import { GoogleGenerativeAI } from "@google/generative-ai"
import { AI_CONFIG } from "@/lib/constants"
import { buildPrompt, type AIGenerationRequest, type AIGenerationResponse } from "./index"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function generateWithGemini(request: AIGenerationRequest): Promise<AIGenerationResponse> {
  try {
    const model = genAI.getGenerativeModel({
      model: AI_CONFIG.models.gemini,
      generationConfig: {
        temperature: AI_CONFIG.temperature,
        maxOutputTokens: AI_CONFIG.maxTokens,
      },
    })

    const prompt = buildPrompt(request)
    const result = await model.generateContent(prompt)
    const response = await result.response
    const content = response.text()

    return {
      content: content.trim(),
      model: AI_CONFIG.models.gemini,
      tokensUsed: response.usageMetadata?.totalTokenCount,
    }
  } catch (error) {
    console.error("Gemini API error:", error)
    throw new Error("Failed to generate content with Gemini")
  }
}
