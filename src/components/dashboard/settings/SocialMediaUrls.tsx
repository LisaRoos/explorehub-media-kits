import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Instagram, Youtube, Plus, Minus } from "lucide-react";
import { TikTokIcon } from "@/components/landing/media-kit/TikTokIcon";
import { SocialLinks, ContentUrls } from "@/types/settings";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

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

  const addContentUrl = (platform: keyof ContentUrls) => {
    if (contentUrls[platform].length < maxUrls) {
      onContentUrlChange(platform, contentUrls[platform].length, "");
    }
  };

  const removeContentUrl = (platform: keyof ContentUrls, index: number) => {
    const newUrls = [...contentUrls[platform]];
    newUrls.splice(index, 1);
    onContentUrlChange(platform, index, "");
  };

  return (
    <div className="space-y-6">
      {subscription?.status !== 'pro' && (
        <Alert variant="warning" className="bg-yellow-50 border-yellow-200">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            Free users can add up to 3 URLs per platform. Upgrade to Pro to add up to 10 URLs.
          </AlertDescription>
        </Alert>
      )}
      
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
                  value={platformUrls[platform.name][0] || ""}
                  onChange={(e) =>
                    onUrlChange(platform.name, 0, e.target.value)
                  }
                  placeholder={platform.placeholder}
                  className="max-w-md"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Featured Content URLs</Label>
                  {contentUrls[platform.name].length < maxUrls && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addContentUrl(platform.name)}
                      className="flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      Add URL
                    </Button>
                  )}
                </div>
                
                <div className="space-y-3">
                  {contentUrls[platform.name].map((url, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="flex-1">
                        <Input
                          value={url}
                          onChange={(e) =>
                            onContentUrlChange(platform.name, index, e.target.value)
                          }
                          placeholder={platform.contentPlaceholder}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeContentUrl(platform.name, index)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      {thumbnails[platform.name][index] && (
                        <img
                          src={thumbnails[platform.name][index]}
                          alt={`${platform.name} content preview`}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};