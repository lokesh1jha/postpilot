import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import type { Analytics } from "@/lib/types"

export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Mock analytics data - replace with real analytics
    const analytics: Analytics = {
      followers: 12400,
      engagement: 4.2,
      postsScheduled: 28,
      bestTime: "2 PM",
    }

    return NextResponse.json(analytics)
  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
