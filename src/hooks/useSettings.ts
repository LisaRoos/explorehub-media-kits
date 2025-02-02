import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SettingsState, SettingsActions } from "@/types/settings";
import { useProfileForm } from "./settings/useProfileForm";
import { useSocialLinks } from "./settings/useSocialLinks";
import { Json } from "@/integrations/supabase/types";

export const useSettings = (): SettingsState & SettingsActions => {
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
      
      return profile;
    },
  });

  const {
    name,
    email,
    bio,
    setName,
    setEmail,
    setBio,
    resetProfileForm
  } = useProfileForm(profile);

  const {
    platformUrls,
    contentUrls,
    thumbnails,
    handleUrlChange,
    handleContentUrlChange,
    resetSocialLinks
  } = useSocialLinks(profile);

  const handleSave = async () => {
    if (!profile?.id) return;

    const socialLinks = {
      instagram: platformUrls.instagram[0],
      tiktok: platformUrls.tiktok[0],
      youtube: platformUrls.youtube[0],
      content_urls: contentUrls
    } as Json;

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
    resetProfileForm();
    resetSocialLinks();
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