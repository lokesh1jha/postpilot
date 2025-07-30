"use server"

import { createServerActionSupabaseClient } from "@/lib/supabase/client"
import { revalidatePath } from "next/cache"
import { signInSchema, signUpSchema, resetPasswordSchema } from "@/lib/validations/auth"
import { AuthError } from "@supabase/supabase-js"

export type AuthActionResult = {
  success: boolean
  error?: string
  fieldErrors?: Record<string, string[]>
  redirectTo?: string
}

export async function signInAction(formData: FormData): Promise<AuthActionResult> {
  const supabase = await createServerActionSupabaseClient()

  // Extract and validate form data
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  const validation = signInSchema.safeParse(rawData)

  if (!validation.success) {
    return {
      success: false,
      fieldErrors: validation.error.flatten().fieldErrors,
    }
  }

  const { email, password } = validation.data

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      // Handle specific Supabase auth errors
      let errorMessage = "Failed to sign in"

      if (error instanceof AuthError) {
        switch (error.message) {
          case "Invalid login credentials":
            errorMessage = "Invalid email or password"
            break
          case "Email not confirmed":
            errorMessage = "Please check your email and click the confirmation link"
            break
          case "Too many requests":
            errorMessage = "Too many login attempts. Please try again later"
            break
          default:
            errorMessage = error.message
        }
      }

      return {
        success: false,
        error: errorMessage,
      }
    }

    revalidatePath("/")
    return { success: true, redirectTo: "/dashboard" }
  } catch (error: unknown) {
    console.error("Sign in error:", error)
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    }
  }
}

export async function signUpAction(formData: FormData): Promise<AuthActionResult> {
  const supabase = await createServerActionSupabaseClient()

  // Extract and validate form data
  const rawData = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    company: formData.get("company") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
    terms: formData.get("terms") === "on",
    marketing: formData.get("marketing") === "on",
  }

  const validation = signUpSchema.safeParse(rawData)

  if (!validation.success) {
    return {
      success: false,
      fieldErrors: validation.error.flatten().fieldErrors,
    }
  }

  const { firstName, lastName, email, company, password } = validation.data
  const fullName = `${firstName} ${lastName}`.trim()

  try {
    // Check if user already exists
    const { data: existingUser } = await supabase.from("profiles").select("email").eq("email", email).single()

    if (existingUser) {
      return {
        success: false,
        error: "An account with this email already exists",
      }
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          company: company || null,
        },
      },
    })

    if (error) {
      let errorMessage = "Failed to create account"

      if (error instanceof AuthError) {
        switch (error.message) {
          case "User already registered":
            errorMessage = "An account with this email already exists"
            break
          case "Password should be at least 6 characters":
            errorMessage = "Password must be at least 6 characters long"
            break
          case "Signup requires a valid password":
            errorMessage = "Please enter a valid password"
            break
          default:
            errorMessage = error.message
        }
      }

      return {
        success: false,
        error: errorMessage,
      }
    }

    if (data.user && !data.user.email_confirmed_at) {
      // User needs to confirm email
      revalidatePath("/")
      return { success: true, redirectTo: "/auth/verify-email" }
    } else if (data.user) {
      // Auto sign-in successful
      revalidatePath("/")
      return { success: true, redirectTo: "/dashboard" }
    }

    return { success: true }
  } catch (error: unknown) {
    console.error("Sign up error:", error)
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    }
  }
}

export async function signOutAction(): Promise<AuthActionResult> {
  const supabase = await createServerActionSupabaseClient()

  try {
    await supabase.auth.signOut()
    revalidatePath("/")
    return { success: true, redirectTo: "/auth/login" }
  } catch (error: unknown) {
    console.error("Sign out error:", error)
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    }
  }
}

export async function resetPasswordAction(formData: FormData): Promise<AuthActionResult> {
  const supabase = await createServerActionSupabaseClient()

  const rawData = {
    email: formData.get("email") as string,
  }

  const validation = resetPasswordSchema.safeParse(rawData)

  if (!validation.success) {
    return {
      success: false,
      fieldErrors: validation.error.flatten().fieldErrors,
    }
  }

  const { email } = validation.data

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
    })

    if (error) {
      return {
        success: false,
        error: "Failed to send reset email. Please try again.",
      }
    }

    return { success: true }
  } catch (error: unknown) {
    console.error("Reset password error:", error)
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    }
  }
}

// Form action version that returns void
export async function logoutFormAction(): Promise<void> {
  await signOutAction()
}

// Export the form action as logoutAction
export { logoutFormAction as logoutAction }

// Backward compatibility
export { signInAction as loginAction }
