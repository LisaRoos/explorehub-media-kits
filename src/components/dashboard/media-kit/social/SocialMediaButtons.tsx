import { SocialMediaButton } from "../SocialMediaButton";
import { Instagram, Youtube } from "lucide-react";
import { TikTokIcon } from "@/components/landing/media-kit/TikTokIcon";
import { ProfileData } from "@/types/profile";
import { LucideIcon } from "lucide-react";

interface SocialMediaButtonsProps {
  profile: ProfileData | null;
}

export const SocialMediaButtons = ({ profile }: SocialMediaButtonsProps) => {
  const socialLinks = [
    {
      platform: "Instagram",
      icon: Instagram,
      color: "bg-pink-500",
      followers: "156K",
      url: profile?.social_links?.instagram || "#",
    },
    {
      platform: "TikTok",
      icon: TikTokIcon as unknown as LucideIcon,
      color: "bg-black",
      followers: "892K",
      url: profile?.social_links?.tiktok || "#",
    },
    {
      platform: "YouTube",
      icon: Youtube,
      color: "bg-red-500",
      followers: "245K",
      url: profile?.social_links?.youtube || "#",
    },
  ];

  return (
    <div className="grid gap-3">
      {socialLinks.map((link) => (
        <SocialMediaButton
          key={link.platform}
          platform={link.platform}
          icon={link.icon}
          color={link.color}
          followers={link.followers}
          url={link.url}
        />
      ))}
    </div>
  );
};