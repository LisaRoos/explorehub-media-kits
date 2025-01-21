export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      influencer_stats_history: {
        Row: {
          average_comments: number | null
          average_likes: number | null
          engagement_rate: number | null
          followers_count: number | null
          id: string
          platform: string
          profile_id: string | null
          recorded_at: string | null
          total_posts: number | null
        }
        Insert: {
          average_comments?: number | null
          average_likes?: number | null
          engagement_rate?: number | null
          followers_count?: number | null
          id?: string
          platform: string
          profile_id?: string | null
          recorded_at?: string | null
          total_posts?: number | null
        }
        Update: {
          average_comments?: number | null
          average_likes?: number | null
          engagement_rate?: number | null
          followers_count?: number | null
          id?: string
          platform?: string
          profile_id?: string | null
          recorded_at?: string | null
          total_posts?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "influencer_stats_history_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      media_kits: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          profile_id: string | null
          social_links: Json | null
          stats: Json | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          profile_id?: string | null
          social_links?: Json | null
          stats?: Json | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          profile_id?: string | null
          social_links?: Json | null
          stats?: Json | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "media_kits_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          categories: string[] | null
          created_at: string | null
          full_name: string | null
          id: string
          location: string | null
          primary_platform: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
          username: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          categories?: string[] | null
          created_at?: string | null
          full_name?: string | null
          id: string
          location?: string | null
          primary_platform?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          username: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          categories?: string[] | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          location?: string | null
          primary_platform?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
      social_media_accounts: {
        Row: {
          access_token: string | null
          created_at: string | null
          id: string
          last_sync_at: string | null
          platform: string
          platform_stats: Json | null
          platform_user_id: string | null
          profile_id: string | null
          refresh_token: string | null
          token_expires_at: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          access_token?: string | null
          created_at?: string | null
          id?: string
          last_sync_at?: string | null
          platform: string
          platform_stats?: Json | null
          platform_user_id?: string | null
          profile_id?: string | null
          refresh_token?: string | null
          token_expires_at?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          access_token?: string | null
          created_at?: string | null
          id?: string
          last_sync_at?: string | null
          platform?: string
          platform_stats?: Json | null
          platform_user_id?: string | null
          profile_id?: string | null
          refresh_token?: string | null
          token_expires_at?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "social_media_accounts_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          created_at: string | null
          id: string
          profile_id: string
          status: Database["public"]["Enums"]["subscription_status"] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          profile_id: string
          status?: Database["public"]["Enums"]["subscription_status"] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          profile_id?: string
          status?: Database["public"]["Enums"]["subscription_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      verification_requests: {
        Row: {
          admin_notes: string | null
          created_at: string | null
          documents: Json | null
          id: string
          profile_id: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string | null
          documents?: Json | null
          id?: string
          profile_id?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          admin_notes?: string | null
          created_at?: string | null
          documents?: Json | null
          id?: string
          profile_id?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "verification_requests_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      update_platform_stats: {
        Args: {
          account_id: string
          new_stats: Json
        }
        Returns: undefined
      }
    }
    Enums: {
      subscription_status: "free" | "brand" | "influencer"
      user_role: "influencer" | "brand" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
