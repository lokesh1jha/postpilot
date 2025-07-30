import { createServerClient } from "@/lib/supabase/client"
import { redirect } from "next/navigation"
import type { Database } from "@/lib/supabase/types"

export type User = Database["public"]["Tables"]["profiles"]["Row"]

export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createServerClient()

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error || !user) {
      return null
    }

    const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

    return profile
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth/login")
  }

  return user
}

export async function createUserProfile(userId: string, email: string, fullName?: string) {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from("profiles")
    .insert({
      id: userId,
      email,
      full_name: fullName,
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create user profile: ${error.message}`)
  }

  return data
}
