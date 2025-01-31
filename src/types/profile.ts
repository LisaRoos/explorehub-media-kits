export interface SocialLinks {
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  content_urls?: {
    instagram: string[];
    tiktok: string[];
    youtube: string[];
  };
  [key: string]: any; // Add index signature to make it compatible with Json type
}

export interface ProfileData {
  id: string;
  role: 'influencer' | 'brand' | 'admin';
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  email: string | null;
  created_at: string;
  updated_at: string;
  categories: string[] | null;
  primary_platform: string | null;
  location: string | null;
  social_links: SocialLinks | null;
}