export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface Post {
  id: string
  content: string
  platform: "twitter" | "linkedin" | "facebook"
  status: "draft" | "scheduled" | "published"
  scheduledAt?: Date
  publishedAt?: Date
  userId: string
  createdAt: Date
  updatedAt: Date
}

export interface Analytics {
  followers: number
  engagement: number
  postsScheduled: number
  bestTime: string
}
