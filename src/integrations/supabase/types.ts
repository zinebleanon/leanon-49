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
      brands: {
        Row: {
          bg_color: string
          category: string
          created_at: string | null
          description: string
          discount_code: string
          discount_value: string
          id: string
          logo: string
          name: string
          updated_at: string | null
          website: string
        }
        Insert: {
          bg_color: string
          category: string
          created_at?: string | null
          description: string
          discount_code: string
          discount_value: string
          id?: string
          logo: string
          name: string
          updated_at?: string | null
          website: string
        }
        Update: {
          bg_color?: string
          category?: string
          created_at?: string | null
          description?: string
          discount_code?: string
          discount_value?: string
          id?: string
          logo?: string
          name?: string
          updated_at?: string | null
          website?: string
        }
        Relationships: []
      }
      button_clicks: {
        Row: {
          button_name: string
          clicked_at: string
          id: string
          page_path: string
          user_id: string | null
        }
        Insert: {
          button_name: string
          clicked_at?: string
          id?: string
          page_path: string
          user_id?: string | null
        }
        Update: {
          button_name?: string
          clicked_at?: string
          id?: string
          page_path?: string
          user_id?: string | null
        }
        Relationships: []
      }
      connection_requests: {
        Row: {
          created_at: string | null
          id: string
          recipient_id: string
          requester_id: string
          status: Database["public"]["Enums"]["connection_status"] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          recipient_id: string
          requester_id: string
          status?: Database["public"]["Enums"]["connection_status"] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          recipient_id?: string
          requester_id?: string
          status?: Database["public"]["Enums"]["connection_status"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      connections: {
        Row: {
          connected_user_id: string | null
          created_at: string | null
          id: string
          status: string | null
          user_id: string | null
        }
        Insert: {
          connected_user_id?: string | null
          created_at?: string | null
          id?: string
          status?: string | null
          user_id?: string | null
        }
        Update: {
          connected_user_id?: string | null
          created_at?: string | null
          id?: string
          status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      kids: {
        Row: {
          birth_date: string
          created_at: string | null
          gender: string
          id: string
          user_id: string | null
        }
        Insert: {
          birth_date: string
          created_at?: string | null
          gender: string
          id?: string
          user_id?: string | null
        }
        Update: {
          birth_date?: string
          created_at?: string | null
          gender?: string
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "kids_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      marketplace_listings: {
        Row: {
          age_group: string
          approved: boolean | null
          brand: string
          category: string
          condition: string
          created_at: string | null
          description: string
          id: string
          image_url: string | null
          price: string
          size: string | null
          status: string | null
          sub_category: string
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          age_group: string
          approved?: boolean | null
          brand: string
          category: string
          condition: string
          created_at?: string | null
          description: string
          id?: string
          image_url?: string | null
          price: string
          size?: string | null
          status?: string | null
          sub_category: string
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          age_group?: string
          approved?: boolean | null
          brand?: string
          category?: string
          condition?: string
          created_at?: string | null
          description?: string
          id?: string
          image_url?: string | null
          price?: string
          size?: string | null
          status?: string | null
          sub_category?: string
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          image_url: string | null
          read_at: string | null
          receiver_id: string
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          read_at?: string | null
          receiver_id: string
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          read_at?: string | null
          receiver_id?: string
          sender_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          feature: string | null
          id: string
          link: string | null
          message: string
          read: boolean | null
          title: string
          type: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          feature?: string | null
          id?: string
          link?: string | null
          message: string
          read?: boolean | null
          title: string
          type?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          feature?: string | null
          id?: string
          link?: string | null
          message?: string
          read?: boolean | null
          title?: string
          type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          bio: string | null
          birth_date: string | null
          created_at: string | null
          email: string
          first_name: string | null
          id: string
          interests: string | null
          last_name: string | null
          location: Json | null
          location_sharing: boolean | null
          manual_location_update: boolean | null
          nationality: string | null
          neighborhood: string | null
          phone: string | null
          profile_needs_update: boolean | null
          profile_picture_url: string | null
          profile_visibility: string | null
          referral_code: string | null
          updated_at: string | null
          use_geolocation_for_neighborhood: boolean | null
          work_status: string | null
        }
        Insert: {
          bio?: string | null
          birth_date?: string | null
          created_at?: string | null
          email: string
          first_name?: string | null
          id: string
          interests?: string | null
          last_name?: string | null
          location?: Json | null
          location_sharing?: boolean | null
          manual_location_update?: boolean | null
          nationality?: string | null
          neighborhood?: string | null
          phone?: string | null
          profile_needs_update?: boolean | null
          profile_picture_url?: string | null
          profile_visibility?: string | null
          referral_code?: string | null
          updated_at?: string | null
          use_geolocation_for_neighborhood?: boolean | null
          work_status?: string | null
        }
        Update: {
          bio?: string | null
          birth_date?: string | null
          created_at?: string | null
          email?: string
          first_name?: string | null
          id?: string
          interests?: string | null
          last_name?: string | null
          location?: Json | null
          location_sharing?: boolean | null
          manual_location_update?: boolean | null
          nationality?: string | null
          neighborhood?: string | null
          phone?: string | null
          profile_needs_update?: boolean | null
          profile_picture_url?: string | null
          profile_visibility?: string | null
          referral_code?: string | null
          updated_at?: string | null
          use_geolocation_for_neighborhood?: boolean | null
          work_status?: string | null
        }
        Relationships: []
      }
      question_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          question_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          question_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          question_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "question_comments_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      question_reactions: {
        Row: {
          created_at: string
          id: string
          question_id: string
          reaction_type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          question_id: string
          reaction_type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          question_id?: string
          reaction_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "question_reactions_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          category: string
          content: string
          created_at: string
          id: string
          is_neighborhood: boolean
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          content: string
          created_at?: string
          id?: string
          is_neighborhood?: boolean
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          content?: string
          created_at?: string
          id?: string
          is_neighborhood?: boolean
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_activities: {
        Row: {
          activity_type: string
          created_at: string
          description: string
          id: string
          metadata: Json | null
          user_id: string | null
        }
        Insert: {
          activity_type: string
          created_at?: string
          description: string
          id?: string
          metadata?: Json | null
          user_id?: string | null
        }
        Update: {
          activity_type?: string
          created_at?: string
          description?: string
          id?: string
          metadata?: Json | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      app_role: "admin" | "user"
      connection_status: "pending" | "declined" | "connected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      connection_status: ["pending", "declined", "connected"],
    },
  },
} as const
