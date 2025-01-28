import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SocialLinks, SettingsState, SettingsActions, ContentUrls } from "@/types/settings";
import { 
  initializeSocialLinks, 
  updateProfileInDatabase, 
  generateThumbnailUrl 
} from "@/utils/settingsUtils";
import { ProfileData } from "@/types/profile";

export const useSettings = (): SettingsState & SettingsActions => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [platformUrls, setPlatformUrls] = useState<SocialLinks>(initializeSocialLinks());
  const [contentUrls, setContentUrls] = useState<ContentUrls>(initializeSocialLinks());
  const [thumbnails, setThumbnails] = useState<SocialLinks>(initializeSocialLinks());

  const { data: profile, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();
      
      if (profile) {
        setName(profile.full_name || "");
        setBio(profile.bio || "");
        setEmail(profile.email || "");
        if (profile.social_links) {
          const socialLinks = profile.social_links as ProfileData['social_links'];
          setPlatformUrls({
            instagram: [socialLinks?.instagram || ""],
            tiktok: [socialLinks?.tiktok || ""],
            youtube: [socialLinks?.youtube || ""]
          });
          // Initialize content URLs if they exist
          if (socialLinks?.content_urls) {
            setContentUrls(socialLinks.content_urls as ContentUrls);
          }
        }
      }
      return profile;
    },
  });

  const handleUrlChange = (platform: keyof SocialLinks, index: number, value: string) => {
    setPlatformUrls(prev => ({
      ...prev,
      [platform]: prev[platform].map((url, i) => i === index ? value : url)
    }));
  };

  const handleContentUrlChange = (platform: keyof ContentUrls, index: number, value: string) => {
    setContentUrls(prev => ({
      ...prev,
      [platform]: prev[platform].map((url, i) => i === index ? value : url)
    }));

    // Update thumbnails when content URL changes
    setThumbnails(prev => ({
      ...prev,
      [platform]: prev[platform].map((thumb, i) => 
        i === index ? generateThumbnailUrl(platform, value) : thumb
      )
    }));
  };

  const resetForm = () => {
    if (profile) {
      setName(profile.full_name || "");
      setBio(profile.bio || "");
      setEmail(profile.email || "");
      if (profile.social_links) {
        const socialLinks = profile.social_links as ProfileData['social_links'];
        setPlatformUrls({
          instagram: [socialLinks?.instagram || ""],
          tiktok: [socialLinks?.tiktok || ""],
          youtube: [socialLinks?.youtube || ""]
        });
        if (socialLinks?.content_urls) {
          setContentUrls(socialLinks.content_urls as ContentUrls);
        }
      }
    }
  };

  const handleSave = async () => {
    if (!profile?.id) return;

    const socialLinks = {
      instagram: platformUrls.instagram[0],
      tiktok: platformUrls.tiktok[0],
      youtube: platformUrls.youtube[0],
      content_urls: contentUrls
    };

    await updateProfileInDatabase(profile.id, {
      full_name: name,
      bio,
      email,
      social_links: socialLinks
    });

    await refetch();
  };

  const refetchProfile = async () => {
    await refetch();
  };

  return {
    name,
    email,
    bio,
    profile,
    platformUrls,
    contentUrls,
    thumbnails,
    setName,
    setEmail,
    setBio,
    handleUrlChange,
    handleContentUrlChange,
    handleSave,
    resetForm,
    refetchProfile
  };
};