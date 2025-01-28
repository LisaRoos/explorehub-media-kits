import { Input } from "@/components/ui/input";
import { Instagram, Youtube } from "lucide-react";
import { TikTokIcon } from "@/components/landing/media-kit/TikTokIcon";
import { SocialLinks } from "@/types/settings";

interface SocialMediaUrlsProps {
  platformUrls: SocialLinks;
  thumbnails: SocialLinks;
  onUrlChange: (platform: keyof SocialLinks, index: number, value: string) => void;
}

export const SocialMediaUrls = ({
  platformUrls,
  thumbnails,
  onUrlChange,
}: SocialMediaUrlsProps) => {
  const socialPlatforms = [
    {
      name: "instagram",
      icon: Instagram,
      label: "Instagram Handle",
      placeholder: "@username",
    },
    {
      name: "tiktok",
      icon: TikTokIcon,
      label: "TikTok Handle",
      placeholder: "@username",
    },
    {
      name: "youtube",
      icon: Youtube,
      label: "YouTube Channel",
      placeholder: "@channel",
    },
  ];

  return (
    <div className="space-y-4">
      {socialPlatforms.map((platform) => (
        <div key={platform.name} className="space-y-2">
          <div className="flex items-center gap-2">
            <platform.icon className="w-5 h-5" />
            <label htmlFor={platform.name} className="text-sm font-medium">
              {platform.label}
            </label>
          </div>
          <Input
            id={platform.name}
            value={platformUrls[platform.name as keyof SocialLinks][0] || ""}
            onChange={(e) =>
              onUrlChange(platform.name as keyof SocialLinks, 0, e.target.value)
            }
            placeholder={platform.placeholder}
            className="max-w-md"
          />
        </div>
      ))}
    </div>
  );
};