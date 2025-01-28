import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Instagram, Youtube } from "lucide-react";
import { TikTokIcon } from "@/components/landing/media-kit/TikTokIcon";
import { SocialLinks, ContentUrls } from "@/types/settings";
import { Card } from "@/components/ui/card";

interface SocialMediaUrlsProps {
  platformUrls: SocialLinks;
  contentUrls: ContentUrls;
  thumbnails: SocialLinks;
  onUrlChange: (platform: keyof SocialLinks, index: number, value: string) => void;
  onContentUrlChange: (platform: keyof ContentUrls, index: number, value: string) => void;
}

export const SocialMediaUrls = ({
  platformUrls,
  contentUrls,
  thumbnails,
  onUrlChange,
  onContentUrlChange,
}: SocialMediaUrlsProps) => {
  const socialPlatforms = [
    {
      name: "instagram",
      icon: Instagram,
      label: "Instagram",
      placeholder: "@username",
      contentPlaceholder: "Post URL",
    },
    {
      name: "tiktok",
      icon: TikTokIcon,
      label: "TikTok",
      placeholder: "@username",
      contentPlaceholder: "Video URL",
    },
    {
      name: "youtube",
      icon: Youtube,
      label: "YouTube",
      placeholder: "@channel",
      contentPlaceholder: "Video URL",
    },
  ];

  return (
    <div className="space-y-6">
      {socialPlatforms.map((platform) => (
        <Card key={platform.name} className="p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <platform.icon className="w-5 h-5" />
              <Label className="text-lg font-medium">{platform.label}</Label>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`${platform.name}-handle`}>Handle</Label>
                <Input
                  id={`${platform.name}-handle`}
                  value={platformUrls[platform.name as keyof SocialLinks][0] || ""}
                  onChange={(e) =>
                    onUrlChange(platform.name as keyof SocialLinks, 0, e.target.value)
                  }
                  placeholder={platform.placeholder}
                  className="max-w-md"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`${platform.name}-content`}>Featured Content URL</Label>
                <Input
                  id={`${platform.name}-content`}
                  value={contentUrls[platform.name as keyof ContentUrls][0] || ""}
                  onChange={(e) =>
                    onContentUrlChange(platform.name as keyof ContentUrls, 0, e.target.value)
                  }
                  placeholder={platform.contentPlaceholder}
                  className="max-w-md"
                />
                {contentUrls[platform.name as keyof ContentUrls][0] && (
                  <div className="mt-2">
                    <img
                      src={thumbnails[platform.name as keyof SocialLinks][0] || "/placeholder.svg"}
                      alt={`${platform.name} content preview`}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};