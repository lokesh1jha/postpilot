export const APP_CONFIG = {
  name: "PostPilot",
  description: "Your AI-powered social media assistant for solo creators and small teams",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  version: "1.0.0",
} as const

// AI Configuration
export const AI_CONFIG = {
  provider: (process.env.AI_PROVIDER as "gemini" | "openai") || "gemini",
  models: {
    gemini: "gemini-1.5-flash",
    openai: "gpt-4o-mini",
  },
  maxTokens: 1000,
  temperature: 0.7,
} as const

// Social Media Platforms
export const PLATFORMS = {
  TWITTER: "twitter",
  LINKEDIN: "linkedin",
  FACEBOOK: "facebook",
  INSTAGRAM: "instagram",
} as const

export const PLATFORM_CONFIGS = {
  [PLATFORMS.TWITTER]: {
    name: "X (Twitter)",
    maxLength: 280,
    icon: "Twitter",
    color: "#000000",
  },
  [PLATFORMS.LINKEDIN]: {
    name: "LinkedIn",
    maxLength: 3000,
    icon: "Linkedin",
    color: "#0077B5",
  },
  [PLATFORMS.FACEBOOK]: {
    name: "Facebook",
    maxLength: 63206,
    icon: "Facebook",
    color: "#1877F2",
  },
} as const

// Post Status
export const POST_STATUS = {
  DRAFT: "draft",
  SCHEDULED: "scheduled",
  PUBLISHED: "published",
  FAILED: "failed",
} as const

// Content Tones
export const CONTENT_TONES = {
  PROFESSIONAL: "professional",
  CASUAL: "casual",
  FUNNY: "funny",
  INSPIRING: "inspiring",
  EDUCATIONAL: "educational",
  PROMOTIONAL: "promotional",
} as const

// User Roles
export const USER_ROLES = {
  USER: "user",
  ADMIN: "admin",
} as const

// Subscription Plans
export const SUBSCRIPTION_PLANS = {
  FREE: "free",
  CREATOR: "creator",
  PRO: "pro",
} as const

export const PLAN_LIMITS = {
  [SUBSCRIPTION_PLANS.FREE]: {
    accounts: 1,
    postsPerMonth: 10,
    aiGenerations: 20,
  },
  [SUBSCRIPTION_PLANS.CREATOR]: {
    accounts: 3,
    postsPerMonth: 100,
    aiGenerations: 200,
  },
  [SUBSCRIPTION_PLANS.PRO]: {
    accounts: 10,
    postsPerMonth: -1, // unlimited
    aiGenerations: -1, // unlimited
  },
} as const

// Database Table Names
export const TABLES = {
  USERS: "users",
  PROFILES: "profiles",
  POSTS: "posts",
  SOCIAL_ACCOUNTS: "social_accounts",
  ANALYTICS: "analytics",
  SUBSCRIPTIONS: "subscriptions",
  AI_GENERATIONS: "ai_generations",
} as const

// Error Messages
export const ERROR_MESSAGES = {
  UNAUTHORIZED: "You must be logged in to perform this action",
  FORBIDDEN: "You don't have permission to perform this action",
  NOT_FOUND: "The requested resource was not found",
  VALIDATION_ERROR: "Please check your input and try again",
  RATE_LIMIT: "Too many requests. Please try again later",
  AI_ERROR: "Failed to generate content. Please try again",
  SOCIAL_MEDIA_ERROR: "Failed to connect to social media platform",
} as const

// Success Messages
export const SUCCESS_MESSAGES = {
  POST_CREATED: "Post created successfully",
  POST_SCHEDULED: "Post scheduled successfully",
  POST_PUBLISHED: "Post published successfully",
  ACCOUNT_CONNECTED: "Social media account connected successfully",
  PROFILE_UPDATED: "Profile updated successfully",
} as const
