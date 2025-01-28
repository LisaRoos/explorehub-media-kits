import { SocialLinks } from "@/types/settings";
import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";
import { toast } from "sonner";

export const initializeSocialLinks = (): SocialLinks => ({
  instagram: Array(5).fill(""),
  tiktok: Array(5).fill(""),
  youtube: Array(5).fill("")
});

export const updateProfileInDatabase = async (
  profileId: string,
  data: {
    full_name: string;
    bio: string;
    email: string;
    social_links: SocialLinks;
  }
) => {
  const { error } = await supabase
    .from('profiles')
    .update({
      full_name: data.full_name,
      bio: data.bio,
      email: data.email,
      social_links: data.social_links as unknown as Json
    })
    .eq('id', profileId);

  if (error) {
    console.error('Error updating profile:', error);
    toast.error("Failed to update profile");
    throw error;
  }
};

export const generateThumbnailUrl = (platform: string, index: number): string => 
  `https://placeholder.com/thumb_${platform}_${index}`;