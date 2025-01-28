import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SocialLinks, SettingsState, SettingsActions } from "@/types/settings";
import { 
  initializeSocialLinks, 
  updateProfileInDatabase, 
  generateThumbnailUrl 
} from "@/utils/settingsUtils";

export const useSettings = (): SettingsState & SettingsActions => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [platformUrls, setPlatformUrls] = useState<SocialLinks>(initializeSocialLinks());
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
          const socialLinks = profile.social_links as unknown as SocialLinks;
          setPlatformUrls(prev => ({
            instagram: socialLinks.instagram || Array(5).fill(""),
            tiktok: socialLinks.tiktok || Array(5).fill(""),
            youtube: socialLinks.youtube || Array(5).fill("")
          }));
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

    setThumbnails(prev => ({
      ...prev,
      [platform]: prev[platform].map((thumb, i) => 
        i === index ? generateThumbnailUrl(platform, index) : thumb
      )
    }));
  };

  const resetForm = () => {
    if (profile) {
      setName(profile.full_name || "");
      setBio(profile.bio || "");
      setEmail(profile.email || "");
      if (profile.social_links) {
        const socialLinks = profile.social_links as unknown as SocialLinks;
        setPlatformUrls({
          instagram: socialLinks.instagram || Array(5).fill(""),
          tiktok: socialLinks.tiktok || Array(5).fill(""),
          youtube: socialLinks.youtube || Array(5).fill("")
        });
      }
    }
  };

  const handleSave = async () => {
    if (!profile?.id) return;

    await updateProfileInDatabase(profile.id, {
      full_name: name,
      bio,
      email,
      social_links: platformUrls
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
    thumbnails,
    setName,
    setEmail,
    setBio,
    handleUrlChange,
    handleSave,
    resetForm,
    refetchProfile
  };
};