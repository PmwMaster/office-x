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
      products: {
        Row: {
          id: string;
          name: string;
          price: number;
          specs: string;
          image: string;
          image_alt: string;
          category: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          price: number;
          specs: string;
          image: string;
          image_alt: string;
          category: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          price?: number;
          specs?: string;
          image?: string;
          image_alt?: string;
          category?: string;
          updated_at?: string;
        };
      };
      services: {
        Row: {
          id: string;
          name: string;
          price: number;
          peripheral_brand: string;
          peripheral_model: string;
          description: string;
          category: string;
          details: string[];
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          price: number;
          peripheral_brand: string;
          peripheral_model: string;
          description: string;
          category: string;
          details: string[];
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          price?: number;
          peripheral_brand?: string;
          peripheral_model?: string;
          description?: string;
          category?: string;
          details?: string[];
        };
      };
      service_orders: {
        Row: {
          id: string;
          title: string;
          description: string;
          status: string;
          priority: string;
          technician: string;
          tracking: string | null;
          progress: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          status: string;
          priority: string;
          technician: string;
          tracking?: string | null;
          progress?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          status?: string;
          priority?: string;
          technician?: string;
          tracking?: string | null;
          progress?: number | null;
          updated_at?: string;
        };
      };
      purchase_history: {
        Row: {
          id: string;
          item: string;
          item_sub: string;
          transaction_id: string;
          date: string;
          status: string;
          value: number;
          icon: string;
          icon_color: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          item: string;
          item_sub: string;
          transaction_id: string;
          date: string;
          status: string;
          value: number;
          icon: string;
          icon_color: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          item?: string;
          item_sub?: string;
          transaction_id?: string;
          date?: string;
          status?: string;
          value?: number;
          icon?: string;
          icon_color?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string | null;
          status: string;
          total: number;
          items: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          status: string;
          total: number;
          items: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          status?: string;
          total?: number;
          items?: Json;
        };
      };
      rentals: {
        Row: {
          id: string;
          name: string;
          price_per_day: number;
          status: string;
          specs: string;
          image: string;
          image_alt: string;
          category: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          price_per_day: number;
          status: string;
          specs: string;
          image: string;
          image_alt: string;
          category: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          price_per_day?: number;
          status?: string;
          specs?: string;
          image?: string;
          image_alt?: string;
          category?: string;
        };
      };
      brands: {
        Row: {
          id: string;
          name: string;
          logo: string;
          description: string;
          category: string;
          website: string;
          featured: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          logo: string;
          description: string;
          category: string;
          website: string;
          featured: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          logo?: string;
          description?: string;
          category?: string;
          website?: string;
          featured?: boolean;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
