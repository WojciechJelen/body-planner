export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      activity_logs: {
        Row: {
          activity_type: string | null;
          created_at: string;
          description: string | null;
          id: string;
          plan_id: string | null;
          user_id: string;
        };
        Insert: {
          activity_type?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          plan_id?: string | null;
          user_id: string;
        };
        Update: {
          activity_type?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          plan_id?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "activity_logs_plan_id_fkey";
            columns: ["plan_id"];
            isOneToOne: false;
            referencedRelation: "training_plans";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "activity_logs_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          age: number;
          body_fat: number | null;
          id: string;
          injuries: string | null;
          training_experience_months: number | null;
          training_experience_years: number | null;
          training_goal: string | null;
          updated_at: string;
          user_id: string;
          weight: number | null;
        };
        Insert: {
          age: number;
          body_fat?: number | null;
          id?: string;
          injuries?: string | null;
          training_experience_months?: number | null;
          training_experience_years?: number | null;
          training_goal?: string | null;
          updated_at?: string;
          user_id: string;
          weight?: number | null;
        };
        Update: {
          age?: number;
          body_fat?: number | null;
          id?: string;
          injuries?: string | null;
          training_experience_months?: number | null;
          training_experience_years?: number | null;
          training_goal?: string | null;
          updated_at?: string;
          user_id?: string;
          weight?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      training_plans: {
        Row: {
          created_at: string;
          id: string;
          plan_data: Json;
          updated_at: string;
          user_id: string;
          version: number | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          plan_data: Json;
          updated_at?: string;
          user_id: string;
          version?: number | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          plan_data?: Json;
          updated_at?: string;
          user_id?: string;
          version?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "training_plans_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      users: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          password_hash: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: string;
          password_hash: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          password_hash?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

// Helper type functions
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type InsertType<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type UpdateType<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];
