import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SocialLinks, ContentUrls, SettingsState, SettingsActions } from "@/types/settings";
import { generateThumbnailUrl } from "@/utils/settingsUtils";
import { ProfileData } from "@/types/profile";

export const initializeSocialLinks = (): SocialLinks => ({
  instagram: [""],
  tiktok: [""],
  youtube: [""]
});

export const useSettings = (): SettingsState & SettingsActions => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [platformUrls, setPlatformUrls] = useState<SocialLinks>(initializeSocialLinks());
  const [contentUrls, setContentUrls] = useState<ContentUrls>({
    instagram: [""],
    tiktok: [""],
    youtube: [""]
  });
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
          if (socialLinks?.content_urls) {
            setContentUrls(socialLinks.content_urls as ContentUrls);
            // Generate thumbnails for existing content URLs
            Object.entries(socialLinks.content_urls).forEach(([platform, urls]) => {
              const platformKey = platform as keyof ContentUrls;
              const newThumbnails = urls.map(url => generateThumbnailUrl(platform, url));
              setThumbnails(prev => ({
                ...prev,
                [platformKey]: newThumbnails
              }));
            });
          }
        }
      }
      return profile as ProfileData;
    },
  });

  const handleUrlChange = (platform: keyof SocialLinks, index: number, value: string) => {
    setPlatformUrls(prev => ({
      ...prev,
      [platform]: [value]
    }));
  };

  const handleContentUrlChange = (platform: keyof ContentUrls, index: number, value: string) => {
    setContentUrls(prev => {
      const newUrls = [...prev[platform]];
      newUrls[index] = value;
      return {
        ...prev,
        [platform]: newUrls
      };
    });

    // Update thumbnails when content URL changes
    setThumbnails(prev => ({
      ...prev,
      [platform]: prev[platform].map((thumb, i) => 
        i === index ? generateThumbnailUrl(platform, value) : thumb
      )
    }));
  };

  const handleSave = async () => {
    if (!profile?.id) return;

    const socialLinks = {
      instagram: platformUrls.instagram[0],
      tiktok: platformUrls.tiktok[0],
      youtube: platformUrls.youtube[0],
      content_urls: contentUrls
    };

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: name,
        bio,
        email,
        social_links: socialLinks
      })
      .eq('id', profile.id);

    if (error) throw error;
    await refetch();
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
