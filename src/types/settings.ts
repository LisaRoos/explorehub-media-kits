import { Json } from "@/integrations/supabase/types";
import { ProfileData } from "@/types/profile";

export interface SocialLinks {
  instagram: string[];
  tiktok: string[];
  youtube: string[];
  [key: string]: any; // Add index signature to make it compatible with Json type
}

export interface ContentUrls {
  instagram: string[];
  tiktok: string[];
  youtube: string[];
  [key: string]: any; // Add index signature to make it compatible with Json type
}

export interface SettingsState {
  name: string;
  email: string;
  bio: string;
  profile: ProfileData | null;
  platformUrls: SocialLinks;
  thumbnails: SocialLinks;
  contentUrls: ContentUrls;
}

export interface SettingsActions {
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setBio: (bio: string) => void;
  handleUrlChange: (platform: keyof SocialLinks, index: number, value: string) => void;
  handleContentUrlChange: (platform: keyof ContentUrls, index: number, value: string) => void;
  handleSave: () => Promise<void>;
  resetForm: () => void;
  refetchProfile: () => Promise<void>;
}