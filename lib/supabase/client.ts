import { createBrowserClient, createServerClient as createSupabaseServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import type { Database } from "./types"

/* ------------------------------------------------------------------------ */
/*  1. Resolve Supabase credentials & normalise URL                         */
/* ------------------------------------------------------------------------ */
function cleanUrl(raw?: string): string | undefined {
  if (!raw || raw === "undefined") return undefined
  // Add protocol if missing
  if (!/^https?:\/\//i.test(raw)) return `https://${raw}`
  return raw
}

const supabaseUrl =
  cleanUrl(process.env.NEXT_PUBLIC_SUPABASE_URL) ?? cleanUrl(process.env.SUPABASE_URL) ?? "https://demo.supabase.co" // harmless fallback for previews

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.SUPABASE_ANON_KEY ??
  // clearly fake key - for local preview only
  "eyJhbnN2IjoiZmFrZS1kZW1vLWtleSJ9.dGVzdA"

/* ------------------------------------------------------------------------ */
/*  2. Helper creators that ALWAYS receive url/key                          */
/* ------------------------------------------------------------------------ */
export const createClient = () =>
  createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)

export const createServerClient = async () => {
  const cookieStore = await cookies()
  return createSupabaseServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet: any[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })
}

export const createRouteHandlerSupabaseClient = async () => {
  const cookieStore = await cookies()
  return createSupabaseServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet: any[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })
}

/* ------------------------------------------------------------------------ */
/*  3. Alias used in Server Actions so import stays the same                */
/* ------------------------------------------------------------------------ */
export const createServerActionSupabaseClient = async () => {
  const cookieStore = await cookies()
  return createSupabaseServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet: any[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })
}
