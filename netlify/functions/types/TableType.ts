export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      date: {
        Row: {
          end_time: string;
          event_date: string;
          event_id: string;
          memo: string | null;
          start_time: string;
        };
        Insert: {
          end_time: string;
          event_date: string;
          event_id: string;
          memo?: string | null;
          start_time: string;
        };
        Update: {
          end_time?: string;
          event_date?: string;
          event_id?: string;
          memo?: string | null;
          start_time?: string;
        };
        Relationships: [
          {
            foreignKeyName: "date_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "event";
            referencedColumns: ["event_id"];
          },
          {
            foreignKeyName: "date_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "event_detail";
            referencedColumns: ["event_id"];
          },
        ];
      };
      event: {
        Row: {
          create_at: string;
          creator_id: string;
          default_end_time: string;
          default_start_time: string;
          description: string | null;
          event_id: string;
          last_update_at: string;
          title: string;
        };
        Insert: {
          create_at?: string;
          creator_id: string;
          default_end_time: string;
          default_start_time: string;
          description?: string | null;
          event_id: string;
          last_update_at?: string;
          title: string;
        };
        Update: {
          create_at?: string;
          creator_id?: string;
          default_end_time?: string;
          default_start_time?: string;
          description?: string | null;
          event_id?: string;
          last_update_at?: string;
          title?: string;
        };
        Relationships: [];
      };
      schedule: {
        Row: {
          event_date: string;
          event_id: string;
          schedule_id: number;
          status_id: number;
          user_id: string;
        };
        Insert: {
          event_date: string;
          event_id: string;
          schedule_id?: number;
          status_id: number;
          user_id: string;
        };
        Update: {
          event_date?: string;
          event_id?: string;
          schedule_id?: number;
          status_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "schedule_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "event";
            referencedColumns: ["event_id"];
          },
          {
            foreignKeyName: "schedule_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "event_detail";
            referencedColumns: ["event_id"];
          },
          {
            foreignKeyName: "schedule_status_id_fkey";
            columns: ["status_id"];
            isOneToOne: false;
            referencedRelation: "status";
            referencedColumns: ["status_id"];
          },
          {
            foreignKeyName: "schedule_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["user_id"];
          },
        ];
      };
      schedule_time: {
        Row: {
          end_time: string | null;
          schedule_id: number;
          schedule_time_id: number;
          start_time: string | null;
        };
        Insert: {
          end_time?: string | null;
          schedule_id: number;
          schedule_time_id?: number;
          start_time?: string | null;
        };
        Update: {
          end_time?: string | null;
          schedule_id?: number;
          schedule_time_id?: number;
          start_time?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "schedule_time_schedule_id_fkey";
            columns: ["schedule_id"];
            isOneToOne: false;
            referencedRelation: "event_detail";
            referencedColumns: ["schedule_id"];
          },
          {
            foreignKeyName: "schedule_time_schedule_id_fkey";
            columns: ["schedule_id"];
            isOneToOne: false;
            referencedRelation: "schedule";
            referencedColumns: ["schedule_id"];
          },
        ];
      };
      status: {
        Row: {
          status: string;
          status_id: number;
        };
        Insert: {
          status: string;
          status_id?: number;
        };
        Update: {
          status?: string;
          status_id?: number;
        };
        Relationships: [];
      };
      user: {
        Row: {
          user_id: string;
          user_name: string;
        };
        Insert: {
          user_id: string;
          user_name: string;
        };
        Update: {
          user_id?: string;
          user_name?: string;
        };
        Relationships: [];
      };
      user_event: {
        Row: {
          event_id: string;
          memo: string | null;
          user_id: string;
        };
        Insert: {
          event_id: string;
          memo?: string | null;
          user_id: string;
        };
        Update: {
          event_id?: string;
          memo?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_event_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "event";
            referencedColumns: ["event_id"];
          },
          {
            foreignKeyName: "user_event_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "event_detail";
            referencedColumns: ["event_id"];
          },
          {
            foreignKeyName: "user_event_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["user_id"];
          },
        ];
      };
    };
    Views: {
      event_detail: {
        Row: {
          create_at: string | null;
          date_memo: string | null;
          default_end_time: string | null;
          default_start_time: string | null;
          description: string | null;
          end_time: string | null;
          event_date: string | null;
          event_id: string | null;
          last_update_at: string | null;
          schedule_end_time: string | null;
          schedule_id: number | null;
          schedule_start_time: string | null;
          schedule_time_id: number | null;
          start_time: string | null;
          status: string | null;
          status_id: number | null;
          title: string | null;
          user_id: string | null;
          user_memo: string | null;
          user_name: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "schedule_status_id_fkey";
            columns: ["status_id"];
            isOneToOne: false;
            referencedRelation: "status";
            referencedColumns: ["status_id"];
          },
          {
            foreignKeyName: "user_event_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["user_id"];
          },
        ];
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

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
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

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
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

// Schema: public
// Tables
export type Date = Database["public"]["Tables"]["date"]["Row"];
export type InsertDate = Database["public"]["Tables"]["date"]["Insert"];
export type UpdateDate = Database["public"]["Tables"]["date"]["Update"];

export type Event = Database["public"]["Tables"]["event"]["Row"];
export type InsertEvent = Database["public"]["Tables"]["event"]["Insert"];
export type UpdateEvent = Database["public"]["Tables"]["event"]["Update"];

export type Schedule = Database["public"]["Tables"]["schedule"]["Row"];
export type InsertSchedule = Database["public"]["Tables"]["schedule"]["Insert"];
export type UpdateSchedule = Database["public"]["Tables"]["schedule"]["Update"];

export type ScheduleTime = Database["public"]["Tables"]["schedule_time"]["Row"];
export type InsertScheduleTime =
  Database["public"]["Tables"]["schedule_time"]["Insert"];
export type UpdateScheduleTime =
  Database["public"]["Tables"]["schedule_time"]["Update"];

export type Status = Database["public"]["Tables"]["status"]["Row"];
export type InsertStatus = Database["public"]["Tables"]["status"]["Insert"];
export type UpdateStatus = Database["public"]["Tables"]["status"]["Update"];

export type User = Database["public"]["Tables"]["user"]["Row"];
export type InsertUser = Database["public"]["Tables"]["user"]["Insert"];
export type UpdateUser = Database["public"]["Tables"]["user"]["Update"];

export type UserEvent = Database["public"]["Tables"]["user_event"]["Row"];
export type InsertUserEvent =
  Database["public"]["Tables"]["user_event"]["Insert"];
export type UpdateUserEvent =
  Database["public"]["Tables"]["user_event"]["Update"];

// Views
export type EventDetail = Database["public"]["Views"]["event_detail"]["Row"];
