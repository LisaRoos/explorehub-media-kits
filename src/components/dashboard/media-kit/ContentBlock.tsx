import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ProfileData } from "@/types/profile";
import { Pencil } from "lucide-react";

interface ContentBlockProps {
  platform: string;
  icon: React.ReactNode;
  profile: ProfileData | null;
  refetchProfile: () => void;
  isEditable: boolean;
}

export const ContentBlock = ({ 
  platform, 
  icon, 
  profile, 
  refetchProfile,
  isEditable 
}: ContentBlockProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [url, setUrl] = useState(profile?.social_links?.[platform.toLowerCase() as keyof typeof profile.social_links] || "");

  const handleSave = async () => {
    try {
      if (!profile?.id) return;

      const updatedSocialLinks = {
        ...(profile.social_links || {}),
        [platform.toLowerCase()]: url,
      };

      const { error } = await supabase
        .from('profiles')
        .update({
          social_links: updatedSocialLinks,
        })
        .eq('id', profile.id);

      if (error) throw error;

      toast.success(`${platform} URL updated successfully`);
      refetchProfile();
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating URL:', error);
      toast.error(`Failed to update ${platform} URL`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="font-semibold text-gray-900">{platform}</h3>
        </div>
        {isEditable && !isEditing && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditing(true)}
            className="h-8 w-8"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </div>
      {isEditing && isEditable ? (
        <div className="space-y-2">
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={`Enter your ${platform} content URL`}
            className="bg-white border-gray-200 focus:border-primary"
          />
          <p className="text-sm text-gray-500">
            Please enter the URL of the content you want to display (e.g., a post or video URL)
          </p>
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSave} className="bg-primary hover:bg-primary/90">
              Save
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => setIsEditing(false)}
              className="bg-white hover:bg-gray-50"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div 
          className={`aspect-video rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors ${isEditable ? 'cursor-pointer' : ''}`}
          onClick={() => isEditable && setIsEditing(true)}
        >
          {url ? (
            <iframe
              src={url}
              className="w-full h-full rounded-lg"
              allowFullScreen
            />
          ) : (
            <div className="text-center p-4">
              <p className="text-gray-500">
                {isEditable ? (
                  <>
                    Click to add {platform} content
                    <br />
                    <span className="text-sm">
                      (You'll need to provide a content URL)
                    </span>
                  </>
                ) : (
                  'No content available'
                )}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};