import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Instagram, Youtube } from "lucide-react";
import { TikTokIcon } from "@/components/landing/media-kit/TikTokIcon";
import { SocialLinks, ContentUrls } from "@/types/settings";
import { SocialPlatformCard } from "./social/SocialPlatformCard";

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
  const { data: subscription } = useQuery({
    queryKey: ['subscription'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      
      const { data: subscription } = await supabase
        .from('subscriptions')
        .select('status')
        .eq('profile_id', user.id)
        .single();
      
      return subscription;
    },
  });

  const maxUrls = subscription?.status === 'pro' ? 10 : 3;

  const socialPlatforms = [
    {
      name: "instagram" as keyof SocialLinks,
      icon: Instagram,
      label: "Instagram",
      placeholder: "@username",
      contentPlaceholder: "Post URL",
    },
    {
      name: "tiktok" as keyof SocialLinks,
      icon: TikTokIcon,
      label: "TikTok",
      placeholder: "@username",
      contentPlaceholder: "Video URL",
    },
    {
      name: "youtube" as keyof SocialLinks,
      icon: Youtube,
      label: "YouTube",
      placeholder: "@channel",
      contentPlaceholder: "Video URL",
    },
  ];

  return (
    <div className="space-y-6">
      {subscription?.status !== 'pro' && (
        <Alert variant="default" className="bg-yellow-50 border-yellow-200">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            Free users can add up to 3 URLs per platform. Upgrade to Pro to add up to 10 URLs.
          </AlertDescription>
        </Alert>
      )}
      
      {socialPlatforms.map((platform) => (
        <SocialPlatformCard
          key={platform.name}
          platform={platform}
          platformUrls={platformUrls}
          contentUrls={contentUrls}
          thumbnails={thumbnails}
          maxUrls={maxUrls}
          onUrlChange={onUrlChange}
          onContentUrlChange={onContentUrlChange}
        />
      ))}
    </div>
  );
};