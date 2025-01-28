import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Instagram, Youtube } from "lucide-react";
import { TikTokIcon } from "@/components/landing/media-kit/TikTokIcon";

export interface SocialLinks {
  instagram: string[];
  tiktok: string[];
  youtube: string[];
}

interface SocialMediaUrlsProps {
  platformUrls: SocialLinks;
  thumbnails: SocialLinks;
  onUrlChange: (platform: keyof SocialLinks, index: number, value: string) => void;
}

export const SocialMediaUrls = ({ platformUrls, thumbnails, onUrlChange }: SocialMediaUrlsProps) => {
  return (
    <Tabs defaultValue="instagram" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="instagram" className="flex items-center gap-2">
          <Instagram className="w-4 h-4" />
          Instagram
        </TabsTrigger>
        <TabsTrigger value="tiktok" className="flex items-center gap-2">
          <TikTokIcon className="w-4 h-4" />
          TikTok
        </TabsTrigger>
        <TabsTrigger value="youtube" className="flex items-center gap-2">
          <Youtube className="w-4 h-4" />
          YouTube
        </TabsTrigger>
      </TabsList>
      {Object.entries(platformUrls).map(([platform, urls]) => (
        <TabsContent key={platform} value={platform}>
          <div className="space-y-4">
            {urls.map((url, index) => (
              <div key={index} className="flex gap-4">
                <Input
                  value={url}
                  onChange={(e) => onUrlChange(platform as keyof SocialLinks, index, e.target.value)}
                  placeholder={`Enter ${platform} content URL`}
                />
                {thumbnails[platform as keyof SocialLinks][index] && (
                  <img
                    src={thumbnails[platform as keyof SocialLinks][index]}
                    alt={`${platform} thumbnail ${index + 1}`}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
              </div>
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};