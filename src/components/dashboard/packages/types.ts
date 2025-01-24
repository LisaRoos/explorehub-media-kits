import { Json } from "@/integrations/supabase/types";

export interface PackageMedia {
  images?: string[];
  videos?: string[];
}

export interface PackageFeature {
  title: string;
  description?: string;
}

export interface Package {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  media: PackageMedia | null;
  features: PackageFeature[] | null;
  created_at?: string | null;
  updated_at?: string | null;
  profile_id: string;
}