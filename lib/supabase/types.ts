export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: "user" | "admin"
          subscription_plan: "free" | "creator" | "pro"
          subscription_ends_at: string | null
          onboarding_completed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: "user" | "admin"
          subscription_plan?: "free" | "creator" | "pro"
          subscription_ends_at?: string | null
          onboarding_completed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: "user" | "admin"
          subscription_plan?: "free" | "creator" | "pro"
          subscription_ends_at?: string | null
          onboarding_completed?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      social_accounts: {
        Row: {
          id: string
          user_id: string
          platform: "twitter" | "linkedin" | "facebook" | "instagram"
          platform_user_id: string
          username: string
          display_name: string | null
          avatar_url: string | null
          access_token: string
          refresh_token: string | null
          token_expires_at: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          platform: "twitter" | "linkedin" | "facebook" | "instagram"
          platform_user_id: string
          username: string
          display_name?: string | null
          avatar_url?: string | null
          access_token: string
          refresh_token?: string | null
          token_expires_at?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          platform?: "twitter" | "linkedin" | "facebook" | "instagram"
          platform_user_id?: string
          username?: string
          display_name?: string | null
          avatar_url?: string | null
          access_token?: string
          refresh_token?: string | null
          token_expires_at?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          user_id: string
          content: string
          platform: "twitter" | "linkedin" | "facebook" | "instagram"
          status: "draft" | "scheduled" | "published" | "failed"
          scheduled_at: string | null
          published_at: string | null
          platform_post_id: string | null
          social_account_id: string | null
          ai_generated: boolean
          ai_prompt: string | null
          ai_tone: "professional" | "casual" | "funny" | "inspiring" | "educational" | "promotional" | null
          likes_count: number
          comments_count: number
          shares_count: number
          impressions_count: number
          media_urls: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          content: string
          platform: "twitter" | "linkedin" | "facebook" | "instagram"
          status?: "draft" | "scheduled" | "published" | "failed"
          scheduled_at?: string | null
          published_at?: string | null
          platform_post_id?: string | null
          social_account_id?: string | null
          ai_generated?: boolean
          ai_prompt?: string | null
          ai_tone?: "professional" | "casual" | "funny" | "inspiring" | "educational" | "promotional" | null
          likes_count?: number
          comments_count?: number
          shares_count?: number
          impressions_count?: number
          media_urls?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          content?: string
          platform?: "twitter" | "linkedin" | "facebook" | "instagram"
          status?: "draft" | "scheduled" | "published" | "failed"
          scheduled_at?: string | null
          published_at?: string | null
          platform_post_id?: string | null
          social_account_id?: string | null
          ai_generated?: boolean
          ai_prompt?: string | null
          ai_tone?: "professional" | "casual" | "funny" | "inspiring" | "educational" | "promotional" | null
          likes_count?: number
          comments_count?: number
          shares_count?: number
          impressions_count?: number
          media_urls?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      ai_generations: {
        Row: {
          id: string
          user_id: string
          prompt: string
          generated_content: string
          tone: "professional" | "casual" | "funny" | "inspiring" | "educational" | "promotional" | null
          platform: "twitter" | "linkedin" | "facebook" | "instagram" | null
          model_used: string
          tokens_used: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          prompt: string
          generated_content: string
          tone?: "professional" | "casual" | "funny" | "inspiring" | "educational" | "promotional" | null
          platform?: "twitter" | "linkedin" | "facebook" | "instagram" | null
          model_used: string
          tokens_used?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          prompt?: string
          generated_content?: string
          tone?: "professional" | "casual" | "funny" | "inspiring" | "educational" | "promotional" | null
          platform?: "twitter" | "linkedin" | "facebook" | "instagram" | null
          model_used?: string
          tokens_used?: number | null
          created_at?: string
        }
      }
      analytics: {
        Row: {
          id: string
          user_id: string
          date: string
          platform: "twitter" | "linkedin" | "facebook" | "instagram" | null
          followers_count: number
          following_count: number
          posts_count: number
          total_likes: number
          total_comments: number
          total_shares: number
          total_impressions: number
          engagement_rate: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date: string
          platform?: "twitter" | "linkedin" | "facebook" | "instagram" | null
          followers_count?: number
          following_count?: number
          posts_count?: number
          total_likes?: number
          total_comments?: number
          total_shares?: number
          total_impressions?: number
          engagement_rate?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          platform?: "twitter" | "linkedin" | "facebook" | "instagram" | null
          followers_count?: number
          following_count?: number
          posts_count?: number
          total_likes?: number
          total_comments?: number
          total_shares?: number
          total_impressions?: number
          engagement_rate?: number
          created_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          plan: "free" | "creator" | "pro"
          status: string
          current_period_start: string
          current_period_end: string
          posts_used_this_month: number
          ai_generations_used_this_month: number
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan: "free" | "creator" | "pro"
          status?: string
          current_period_start: string
          current_period_end: string
          posts_used_this_month?: number
          ai_generations_used_this_month?: number
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan?: "free" | "creator" | "pro"
          status?: string
          current_period_start?: string
          current_period_end?: string
          posts_used_this_month?: number
          ai_generations_used_this_month?: number
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: "user" | "admin"
      subscription_plan: "free" | "creator" | "pro"
      post_status: "draft" | "scheduled" | "published" | "failed"
      social_platform: "twitter" | "linkedin" | "facebook" | "instagram"
      content_tone: "professional" | "casual" | "funny" | "inspiring" | "educational" | "promotional"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
