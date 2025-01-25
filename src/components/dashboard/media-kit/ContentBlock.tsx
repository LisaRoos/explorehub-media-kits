import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ProfileData } from "@/types/profile";

interface ContentBlockProps {
  platform: string;
  icon: React.ReactNode;
  profile: ProfileData | null;
  refetchProfile: () => void;
}

export const ContentBlock = ({ platform, icon, profile, refetchProfile }: ContentBlockProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [url, setUrl] = useState(profile?.social_links?.[platform.toLowerCase()] || "");

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
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="font-semibold">{platform}</h3>
      </div>
      {isEditing ? (
        <div className="space-y-2">
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={`Enter ${platform} URL`}
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSave}>Save</Button>
            <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div 
          className="aspect-video rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          onClick={() => setIsEditing(true)}
        >
          {url ? (
            <iframe
              src={url}
              className="w-full h-full rounded-lg"
              allowFullScreen
            />
          ) : (
            <p className="text-gray-500">Click to add {platform} content</p>
          )}
        </div>
      )}
    </div>
  );
};