import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { SocialLinks, ContentUrls } from "@/types/settings";

interface SocialPlatformCardProps {
  platform: {
    name: keyof SocialLinks;
    icon: React.ComponentType<any>;
    label: string;
    placeholder: string;
    contentPlaceholder: string;
  };
  platformUrls: SocialLinks;
  contentUrls: ContentUrls;
  thumbnails: SocialLinks;
  maxUrls: number;
  onUrlChange: (platform: keyof SocialLinks, index: number, value: string) => void;
  onContentUrlChange: (platform: keyof ContentUrls, index: number, value: string) => void;
}

export const SocialPlatformCard = ({
  platform,
  platformUrls,
  contentUrls,
  thumbnails,
  maxUrls,
  onUrlChange,
  onContentUrlChange
}: SocialPlatformCardProps) => {
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
    <Card className="p-4">
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
              onChange={(e) => onUrlChange(platform.name, 0, e.target.value)}
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
  );
};