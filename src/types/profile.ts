import { Json } from "@/integrations/supabase/types";

export interface SocialLinks {
  instagram: string;
  tiktok: string;
  youtube: string;
}

export interface ProfileData {
  id: string;
  role: 'influencer' | 'brand' | 'admin';
  username: string;
  full_name: string;
  avatar_url: string;
  bio: string;
  created_at: string;
  updated_at: string;
  categories: string[];
  primary_platform: string;
  location: string;
  social_links: SocialLinks | null;
}