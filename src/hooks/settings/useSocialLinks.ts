import { useState } from "react";
import { SocialLinks, ContentUrls } from "@/types/settings";
import { ProfileData } from "@/types/profile";
import { generateThumbnailUrl } from "@/utils/settingsUtils";

export const initializeSocialLinks = (): SocialLinks => ({
  instagram: [""],
  tiktok: [""],
  youtube: [""]
});

export const useSocialLinks = (profile: ProfileData | null) => {
  const [platformUrls, setPlatformUrls] = useState<SocialLinks>(initializeSocialLinks());
  const [contentUrls, setContentUrls] = useState<ContentUrls>({
    instagram: [""],
    tiktok: [""],
    youtube: [""]
  });
  const [thumbnails, setThumbnails] = useState<SocialLinks>(initializeSocialLinks());

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

    setThumbnails(prev => ({
      ...prev,
      [platform]: prev[platform].map((thumb, i) => 
        i === index ? generateThumbnailUrl(platform, value) : thumb
      )
    }));
  };

  const resetSocialLinks = () => {
    if (profile?.social_links) {
      const socialLinks = profile.social_links;
      setPlatformUrls({
        instagram: [socialLinks?.instagram || ""],
        tiktok: [socialLinks?.tiktok || ""],
        youtube: [socialLinks?.youtube || ""]
      });
      if (socialLinks?.content_urls) {
        setContentUrls(socialLinks.content_urls as ContentUrls);
      }
    }
  };

  return {
    platformUrls,
    contentUrls,
    thumbnails,
    handleUrlChange,
    handleContentUrlChange,
    resetSocialLinks
  };
};