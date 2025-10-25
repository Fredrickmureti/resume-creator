export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      cover_letters: {
        Row: {
          company_name: string
          content: string
          created_at: string | null
          id: string
          job_description: string
          job_title: string
          last_notified_at: string | null
          letter_type: string | null
          resume_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          company_name: string
          content: string
          created_at?: string | null
          id?: string
          job_description: string
          job_title: string
          last_notified_at?: string | null
          letter_type?: string | null
          resume_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          company_name?: string
          content?: string
          created_at?: string | null
          id?: string
          job_description?: string
          job_title?: string
          last_notified_at?: string | null
          letter_type?: string | null
          resume_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cover_letters_resume_id_fkey"
            columns: ["resume_id"]
            isOneToOne: false
            referencedRelation: "resumes"
            referencedColumns: ["id"]
          },
        ]
      }
      cv_revamps: {
        Row: {
          ai_model_used: string | null
          changes_tracked: Json | null
          created_at: string | null
          extracted_content: Json | null
          id: string
          job_description: string | null
          keyword_match_percentage: number | null
          optimization_goals: string[] | null
          original_ats_score: number | null
          original_impact_score: number | null
          original_resume_id: string | null
          processing_time_seconds: number | null
          revamped_ats_score: number | null
          revamped_content: Json | null
          revamped_impact_score: number | null
          revamped_resume_id: string | null
          status: Database["public"]["Enums"]["revamp_status"] | null
          target_role_description: Json | null
          tone_preference: string | null
          updated_at: string | null
          uploaded_file_name: string | null
          uploaded_file_path: string | null
          user_id: string
        }
        Insert: {
          ai_model_used?: string | null
          changes_tracked?: Json | null
          created_at?: string | null
          extracted_content?: Json | null
          id?: string
          job_description?: string | null
          keyword_match_percentage?: number | null
          optimization_goals?: string[] | null
          original_ats_score?: number | null
          original_impact_score?: number | null
          original_resume_id?: string | null
          processing_time_seconds?: number | null
          revamped_ats_score?: number | null
          revamped_content?: Json | null
          revamped_impact_score?: number | null
          revamped_resume_id?: string | null
          status?: Database["public"]["Enums"]["revamp_status"] | null
          target_role_description?: Json | null
          tone_preference?: string | null
          updated_at?: string | null
          uploaded_file_name?: string | null
          uploaded_file_path?: string | null
          user_id: string
        }
        Update: {
          ai_model_used?: string | null
          changes_tracked?: Json | null
          created_at?: string | null
          extracted_content?: Json | null
          id?: string
          job_description?: string | null
          keyword_match_percentage?: number | null
          optimization_goals?: string[] | null
          original_ats_score?: number | null
          original_impact_score?: number | null
          original_resume_id?: string | null
          processing_time_seconds?: number | null
          revamped_ats_score?: number | null
          revamped_content?: Json | null
          revamped_impact_score?: number | null
          revamped_resume_id?: string | null
          status?: Database["public"]["Enums"]["revamp_status"] | null
          target_role_description?: Json | null
          tone_preference?: string | null
          updated_at?: string | null
          uploaded_file_name?: string | null
          uploaded_file_path?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cv_revamps_original_resume_id_fkey"
            columns: ["original_resume_id"]
            isOneToOne: false
            referencedRelation: "resumes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cv_revamps_revamped_resume_id_fkey"
            columns: ["revamped_resume_id"]
            isOneToOne: false
            referencedRelation: "resumes"
            referencedColumns: ["id"]
          },
        ]
      }
      email_logs: {
        Row: {
          attachments_info: Json | null
          created_at: string | null
          error_message: string | null
          id: string
          letter_id: string | null
          letter_type: string | null
          recipient_email: string
          resume_id: string | null
          sent_at: string | null
          status: string | null
          subject: string
          user_id: string
        }
        Insert: {
          attachments_info?: Json | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          letter_id?: string | null
          letter_type?: string | null
          recipient_email: string
          resume_id?: string | null
          sent_at?: string | null
          status?: string | null
          subject: string
          user_id: string
        }
        Update: {
          attachments_info?: Json | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          letter_id?: string | null
          letter_type?: string | null
          recipient_email?: string
          resume_id?: string | null
          sent_at?: string | null
          status?: string | null
          subject?: string
          user_id?: string
        }
        Relationships: []
      }
      job_applications: {
        Row: {
          availability_date: string | null
          company_name: string
          content: string
          created_at: string | null
          id: string
          job_description: string
          job_title: string
          last_notified_at: string | null
          letter_type: string | null
          resume_id: string | null
          salary_expectation: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          availability_date?: string | null
          company_name: string
          content: string
          created_at?: string | null
          id?: string
          job_description: string
          job_title: string
          last_notified_at?: string | null
          letter_type?: string | null
          resume_id?: string | null
          salary_expectation?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          availability_date?: string | null
          company_name?: string
          content?: string
          created_at?: string | null
          id?: string
          job_description?: string
          job_title?: string
          last_notified_at?: string | null
          letter_type?: string | null
          resume_id?: string | null
          salary_expectation?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_resume_id_fkey"
            columns: ["resume_id"]
            isOneToOne: false
            referencedRelation: "resumes"
            referencedColumns: ["id"]
          },
        ]
      }
      linkedin_optimizations: {
        Row: {
          about_section: string | null
          created_at: string | null
          headline: string | null
          id: string
          optimized_experience: Json | null
          resume_id: string | null
          suggested_skills: string[] | null
          user_id: string
        }
        Insert: {
          about_section?: string | null
          created_at?: string | null
          headline?: string | null
          id?: string
          optimized_experience?: Json | null
          resume_id?: string | null
          suggested_skills?: string[] | null
          user_id: string
        }
        Update: {
          about_section?: string | null
          created_at?: string | null
          headline?: string | null
          id?: string
          optimized_experience?: Json | null
          resume_id?: string | null
          suggested_skills?: string[] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "linkedin_optimizations_resume_id_fkey"
            columns: ["resume_id"]
            isOneToOne: false
            referencedRelation: "resumes"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          is_public: boolean
          profile_image_url: string | null
          selected_resume_id: string | null
          updated_at: string
          user_id: string
          username: string | null
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id?: string
          is_public?: boolean
          profile_image_url?: string | null
          selected_resume_id?: string | null
          updated_at?: string
          user_id: string
          username?: string | null
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          is_public?: boolean
          profile_image_url?: string | null
          selected_resume_id?: string | null
          updated_at?: string
          user_id?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_selected_resume_id_fkey"
            columns: ["selected_resume_id"]
            isOneToOne: false
            referencedRelation: "resumes"
            referencedColumns: ["id"]
          },
        ]
      }
      resume_optimizations: {
        Row: {
          created_at: string | null
          id: string
          improvements_applied: Json | null
          optimization_type: string | null
          optimized_resume_id: string | null
          original_resume_id: string | null
          score_after: number | null
          score_before: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          improvements_applied?: Json | null
          optimization_type?: string | null
          optimized_resume_id?: string | null
          original_resume_id?: string | null
          score_after?: number | null
          score_before?: number | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          improvements_applied?: Json | null
          optimization_type?: string | null
          optimized_resume_id?: string | null
          original_resume_id?: string | null
          score_after?: number | null
          score_before?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "resume_optimizations_optimized_resume_id_fkey"
            columns: ["optimized_resume_id"]
            isOneToOne: false
            referencedRelation: "resumes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resume_optimizations_original_resume_id_fkey"
            columns: ["original_resume_id"]
            isOneToOne: false
            referencedRelation: "resumes"
            referencedColumns: ["id"]
          },
        ]
      }
      resume_uploads: {
        Row: {
          created_at: string | null
          extracted_content: Json | null
          file_name: string
          file_path: string
          file_size: number | null
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          extracted_content?: Json | null
          file_name: string
          file_path: string
          file_size?: number | null
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          extracted_content?: Json | null
          file_name?: string
          file_path?: string
          file_size?: number | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      resumes: {
        Row: {
          certifications: Json | null
          created_at: string | null
          custom_sections: Json | null
          document_type: string | null
          education: Json | null
          experience: Json | null
          id: string
          languages: Json | null
          personal_info: Json | null
          photo_url: string | null
          projects: Json | null
          skills: Json | null
          template_id: string
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          certifications?: Json | null
          created_at?: string | null
          custom_sections?: Json | null
          document_type?: string | null
          education?: Json | null
          experience?: Json | null
          id?: string
          languages?: Json | null
          personal_info?: Json | null
          photo_url?: string | null
          projects?: Json | null
          skills?: Json | null
          template_id?: string
          title?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          certifications?: Json | null
          created_at?: string | null
          custom_sections?: Json | null
          document_type?: string | null
          education?: Json | null
          experience?: Json | null
          id?: string
          languages?: Json | null
          personal_info?: Json | null
          photo_url?: string | null
          projects?: Json | null
          skills?: Json | null
          template_id?: string
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      user_letters: {
        Row: {
          company_name: string | null
          content: string | null
          created_at: string | null
          id: string | null
          last_notified_at: string | null
          letter_type: string | null
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_old_letters_needing_notification: {
        Args: never
        Returns: {
          old_letters_count: number
          user_email: string
          user_id: string
        }[]
      }
      get_user_emails_for_admin: {
        Args: never
        Returns: {
          email: string
          user_id: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      mark_letters_notified: { Args: { p_user_id: string }; Returns: undefined }
    }
    Enums: {
      app_role: "admin" | "user"
      revamp_status: "processing" | "completed" | "failed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      revamp_status: ["processing", "completed", "failed"],
    },
  },
} as const
