import OpenAI from "openai"
import { AI_CONFIG } from "@/lib/constants"
import { buildPrompt, type AIGenerationRequest, type AIGenerationResponse } from "./index"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function generateWithOpenAI(request: AIGenerationRequest): Promise<AIGenerationResponse> {
  try {
    const prompt = buildPrompt(request)

    const completion = await openai.chat.completions.create({
      model: AI_CONFIG.models.openai,
      messages: [
        {
          role: "system",
          content:
            "You are a social media content expert. Generate engaging, platform-appropriate content based on the user's requirements.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: AI_CONFIG.temperature,
      max_tokens: AI_CONFIG.maxTokens,
    })

    const content = completion.choices[0]?.message?.content || ""

    return {
      content: content.trim(),
      model: AI_CONFIG.models.openai,
      tokensUsed: completion.usage?.total_tokens,
    }
  } catch (error) {
    console.error("OpenAI API error:", error)
    throw new Error("Failed to generate content with OpenAI")
  }
}
