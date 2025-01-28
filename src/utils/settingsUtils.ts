import { SocialLinks } from "@/types/settings";
import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";
import { toast } from "sonner";

export const initializeSocialLinks = (): SocialLinks => ({
  instagram: [""],
  tiktok: [""],
  youtube: [""]
});

export const updateProfileInDatabase = async (
  profileId: string,
  data: {
    full_name: string;
    bio: string;
    email: string;
    social_links: any;
  }
) => {
  const { error } = await supabase
    .from('profiles')
    .update({
      full_name: data.full_name,
      bio: data.bio,
      email: data.email,
      social_links: data.social_links as Json
    })
    .eq('id', profileId);

  if (error) {
    console.error('Error updating profile:', error);
    toast.error("Failed to update profile");
    throw error;
  }
};

export const generateThumbnailUrl = (platform: string, url: string): string => {
  // Extract video/post ID from URL and generate thumbnail URL
  if (!url) return "";
  
  try {
    switch (platform) {
      case 'instagram':
        // Instagram post URL format: https://www.instagram.com/p/{post-id}/
        const instaMatch = url.match(/instagram\.com\/p\/([^\/]+)/);
        return instaMatch ? `https://www.instagram.com/p/${instaMatch[1]}/media/?size=t` : "";
      
      case 'tiktok':
        // TikTok URL format: https://www.tiktok.com/@username/video/{video-id}
        const tiktokMatch = url.match(/video\/(\d+)/);
        return tiktokMatch ? `https://www.tiktok.com/oembed?url=${url}` : "";
      
      case 'youtube':
        // YouTube URL format: https://www.youtube.com/watch?v={video-id}
        const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
        return ytMatch ? `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg` : "";
      
      default:
        return "";
    }
  } catch (error) {
    console.error('Error generating thumbnail URL:', error);
    return "";
  }
};