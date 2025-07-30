import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { getPosts } from "@/app/actions/posts"

export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const posts = await getPosts()
    return NextResponse.json(posts)
  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
