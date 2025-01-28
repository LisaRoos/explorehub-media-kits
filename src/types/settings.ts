import { Json } from "@/integrations/supabase/types";

export interface SocialLinks {
  instagram: string[];
  tiktok: string[];
  youtube: string[];
}

export interface SettingsState {
  name: string;
  email: string;
  bio: string;
  platformUrls: SocialLinks;
  thumbnails: SocialLinks;
}

export interface SettingsActions {
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setBio: (bio: string) => void;
  handleUrlChange: (platform: keyof SocialLinks, index: number, value: string) => void;
  handleSave: () => Promise<void>;
  resetForm: () => void;
  refetchProfile: () => Promise<void>;
}