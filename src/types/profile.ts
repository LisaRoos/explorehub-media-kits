export interface SocialLinks {
  instagram: string;
  tiktok: string;
  youtube: string;
}

export interface ProfileData {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  categories: string[] | null;
  primary_platform: string | null;
  location: string | null;
  role: 'influencer' | 'brand' | 'admin';
  social_links?: SocialLinks;
  email?: string;
}