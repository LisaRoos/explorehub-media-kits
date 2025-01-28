import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { type Json } from "@/integrations/supabase/types";
import { type SocialLinks } from "@/components/dashboard/settings/SocialMediaUrls";

export const useSettings = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [platformUrls, setPlatformUrls] = useState<SocialLinks>({
    instagram: Array(5).fill(""),
    tiktok: Array(5).fill(""),
    youtube: Array(5).fill("")
  });
  const [thumbnails, setThumbnails] = useState<SocialLinks>({
    instagram: Array(5).fill(""),
    tiktok: Array(5).fill(""),
    youtube: Array(5).fill("")
  });

  const { data: profile, refetch: refetchProfile } = useQuery({
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
        i === index ? `https://placeholder.com/thumb_${platform}_${index}` : thumb
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
    try {
      if (!profile?.id) return;

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: name,
          bio,
          email,
          social_links: platformUrls as unknown as Json
        })
        .eq('id', profile.id);

      if (error) throw error;

      await refetchProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error("Failed to update profile");
      throw error;
    }
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