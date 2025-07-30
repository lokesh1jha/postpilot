import { AI_CONFIG } from "@/lib/constants"
import { generateWithGemini } from "./gemini"
import { generateWithOpenAI } from "./openai"

export interface AIGenerationRequest {
  prompt: string
  tone: string
  platform: string
  maxLength?: number
}

export interface AIGenerationResponse {
  content: string
  model: string
  tokensUsed?: number
}

export async function generateContent(request: AIGenerationRequest): Promise<AIGenerationResponse> {
  const { provider } = AI_CONFIG

  try {
    switch (provider) {
      case "gemini":
        return await generateWithGemini(request)
      case "openai":
        return await generateWithOpenAI(request)
      default:
        throw new Error(`Unsupported AI provider: ${provider}`)
    }
  } catch (error) {
    console.error("AI generation failed:", error)
    throw new Error("Failed to generate content. Please try again.")
  }
}

export function buildPrompt(request: AIGenerationRequest): string {
  const { prompt, tone, platform, maxLength } = request

  const platformInstructions = {
    twitter: "Create a Twitter/X post that is engaging and concise.",
    linkedin: "Create a LinkedIn post that is professional and informative.",
    facebook: "Create a Facebook post that encourages engagement and discussion.",
    instagram: "Create an Instagram caption that is visually appealing and hashtag-friendly.",
  }

  const toneInstructions = {
    professional: "Use a professional, authoritative tone.",
    casual: "Use a casual, friendly tone.",
    funny: "Use humor and wit to make it entertaining.",
    inspiring: "Use an inspiring, motivational tone.",
    educational: "Use an educational, informative tone.",
    promotional: "Use a promotional tone that drives action.",
  }

  return `
${platformInstructions[platform as keyof typeof platformInstructions] || "Create a social media post."}

Content topic: ${prompt}

Tone: ${toneInstructions[tone as keyof typeof toneInstructions] || "Use an appropriate tone."}

${maxLength ? `Character limit: ${maxLength}` : ""}

Requirements:
- Make it engaging and shareable
- Include relevant hashtags if appropriate
- Ensure it fits the platform's style
- Keep it within character limits
- Make it authentic and valuable to the audience

Generate only the post content, no additional text or explanations.
  `.trim()
}
