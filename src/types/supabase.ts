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
      application_resumes: {
        Row: {
          id: string
          job_id: string
          key: string
          name: string
          url: string
          user_id: string
        }
        Insert: {
          id?: string
          job_id: string
          key: string
          name: string
          url: string
          user_id: string
        }
        Update: {
          id?: string
          job_id?: string
          key?: string
          name?: string
          url?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "application_resumes_fk"
            columns: ["user_id", "job_id"]
            isOneToOne: true
            referencedRelation: "applications"
            referencedColumns: ["user_id", "job_id"]
          },
        ]
      }
      applications: {
        Row: {
          created_at: string
          email: string
          first_name: string
          job_id: string
          last_name: string
          phone_number: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          job_id: string
          last_name: string
          phone_number?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          job_id?: string
          last_name?: string
          phone_number?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_job_id_jobs_id_fk"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_user_id_users_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          about: string | null
          address: string
          created_at: string
          email: string
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          about?: string | null
          address: string
          created_at?: string
          email: string
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          about?: string | null
          address?: string
          created_at?: string
          email?: string
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      jobs: {
        Row: {
          company_id: string
          created_at: string
          description: string
          expires_at: string
          id: string
          location: string
          moderator_id: string
          position: Database["public"]["Enums"]["job_position"]
          requirements: string
          salary: number
          title: string
          type: Database["public"]["Enums"]["job_type"]
          updated_at: string | null
          years_of_experience: number
        }
        Insert: {
          company_id: string
          created_at?: string
          description: string
          expires_at: string
          id?: string
          location: string
          moderator_id: string
          position: Database["public"]["Enums"]["job_position"]
          requirements: string
          salary: number
          title: string
          type: Database["public"]["Enums"]["job_type"]
          updated_at?: string | null
          years_of_experience?: number
        }
        Update: {
          company_id?: string
          created_at?: string
          description?: string
          expires_at?: string
          id?: string
          location?: string
          moderator_id?: string
          position?: Database["public"]["Enums"]["job_position"]
          requirements?: string
          salary?: number
          title?: string
          type?: Database["public"]["Enums"]["job_type"]
          updated_at?: string | null
          years_of_experience?: number
        }
        Relationships: [
          {
            foreignKeyName: "jobs_company_id_companies_id_fk"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_moderator_id_moderators_id_fk"
            columns: ["moderator_id"]
            isOneToOne: false
            referencedRelation: "moderators"
            referencedColumns: ["id"]
          },
        ]
      }
      moderators: {
        Row: {
          admin: boolean
          company_id: string
          created_at: string
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          admin: boolean
          company_id: string
          created_at?: string
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          admin?: boolean
          company_id?: string
          created_at?: string
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "moderators_company_id_companies_id_fk"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "moderators_user_id_users_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_resumes: {
        Row: {
          id: string
          key: string
          name: string
          url: string
          user_id: string
        }
        Insert: {
          id?: string
          key: string
          name: string
          url: string
          user_id: string
        }
        Update: {
          id?: string
          key?: string
          name?: string
          url?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_resumes_user_id_users_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          first_name: string
          id: string
          image_url: string
          last_name: string
          phone_number: string
          skills: Json[]
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          first_name?: string
          id: string
          image_url: string
          last_name?: string
          phone_number?: string
          skills?: Json[]
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          image_url?: string
          last_name?: string
          phone_number?: string
          skills?: Json[]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      job_position:
        | "construction technician"
        | "stonemason"
        | "bricklayer"
        | "roofer"
        | "plasterer"
        | "ceramist"
        | "plumber"
        | "pipefitter"
        | "electrician"
        | "house painter/decorator"
        | "glazier"
        | "carpenter"
        | "flooring installer"
        | "heavy equipment operator"
        | "reinforcing ironworker"
        | "structural ironworker"
      job_type: "Full-time" | "Part-time" | "Contract" | "Temporary"
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
