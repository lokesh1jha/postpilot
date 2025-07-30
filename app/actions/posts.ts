"use server"

import { createServerClient } from "@/lib/supabase/client"
import { requireAuth } from "@/lib/auth"
import { generateContent } from "@/lib/ai"
import { PLATFORM_CONFIGS, POST_STATUS } from "@/lib/constants"
import { revalidatePath } from "next/cache"

export async function generatePostAction(formData: FormData) {
  const user = await requireAuth()
  const supabase = await createServerClient()

  const prompt = formData.get("prompt") as string
  const tone = formData.get("tone") as string
  const platform = formData.get("platform") as string

  try {
    // Check usage limits
    const { data: subscription } = await supabase.from("subscriptions").select("*").eq("user_id", user.id).single()

    if (!subscription) {
      throw new Error("No subscription found")
    }

    // Generate content with AI
    const platformConfig = PLATFORM_CONFIGS[platform as keyof typeof PLATFORM_CONFIGS]
    const aiResponse = await generateContent({
      prompt,
      tone,
      platform,
      maxLength: platformConfig?.maxLength,
    })

    // Save AI generation record
    await supabase.from("ai_generations").insert({
      user_id: user.id,
      prompt,
      generated_content: aiResponse.content,
      tone: tone as "professional" | "casual" | "funny" | "inspiring" | "educational" | "promotional" | null,
      platform: platform as "twitter" | "linkedin" | "facebook" | "instagram" | null,
      model_used: aiResponse.model,
      tokens_used: aiResponse.tokensUsed,
    })

    // Update usage count
    await supabase
      .from("subscriptions")
      .update({
        ai_generations_used_this_month: subscription.ai_generations_used_this_month + 1,
      })
      .eq("id", subscription.id)

    revalidatePath("/dashboard")
    return { success: true, content: aiResponse.content }
  } catch (error: unknown) {
    console.error("Generate post error:", error)
    throw new Error(error instanceof Error ? error.message : "Failed to generate post")
  }
}

export async function createPostAction(formData: FormData) {
  const user = await requireAuth()
  const supabase = await createServerClient()

  const content = formData.get("content") as string
  const platform = formData.get("platform") as string
  const scheduledAt = formData.get("scheduledAt") as string
  const aiGenerated = formData.get("aiGenerated") === "true"
  const aiPrompt = formData.get("aiPrompt") as string
  const aiTone = formData.get("aiTone") as string

  try {
    const { data, error } = await supabase
      .from("posts")
      .insert({
        user_id: user.id,
        content,
        platform: platform as "twitter" | "linkedin" | "facebook" | "instagram",
        status: scheduledAt ? POST_STATUS.SCHEDULED : POST_STATUS.DRAFT,
        scheduled_at: scheduledAt || null,
        ai_generated: aiGenerated,
        ai_prompt: aiPrompt || null,
        ai_tone: (aiTone as "professional" | "casual" | "funny" | "inspiring" | "educational" | "promotional" | null) || null,
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    revalidatePath("/dashboard")
    return { success: true, post: data }
  } catch (error: unknown) {
    console.error("Create post error:", error)
    throw new Error(error instanceof Error ? error.message : "Failed to create post")
  }
}

export async function getPostsAction() {
  const user = await requireAuth()
  const supabase = await createServerClient()

  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      throw error
    }

    return data
  } catch (error: unknown) {
    console.error("Get posts error:", error)
    throw new Error("Failed to fetch posts")
  }
}

export async function deletePostAction(postId: string) {
  const user = await requireAuth()
  const supabase = await createServerClient()

  try {
    const { error } = await supabase.from("posts").delete().eq("id", postId).eq("user_id", user.id)

    if (error) {
      throw error
    }

    revalidatePath("/dashboard")
    return { success: true }
  } catch (error: unknown) {
    console.error("Delete post error:", error)
    throw new Error("Failed to delete post")
  }
}

// Export aliases for backward compatibility
export const createPost = createPostAction
export const getPosts = getPostsAction
