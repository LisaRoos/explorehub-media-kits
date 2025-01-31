import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ProfileData, SocialLinks } from "@/types/profile";
import { ContentHeader } from "./content/ContentHeader";
import { ContentEditForm } from "./content/ContentEditForm";
import { ContentPreview } from "./content/ContentPreview";

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
  const [url, setUrl] = useState(
    profile?.social_links?.[platform.toLowerCase() as keyof SocialLinks] || ""
  );

  const handleSave = async () => {
    try {
      if (!profile?.id) return;

      const updatedSocialLinks: SocialLinks = {
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
      <ContentHeader
        platform={platform}
        icon={icon}
        isEditable={isEditable}
        isEditing={isEditing}
        onEdit={() => setIsEditing(true)}
      />
      
      {isEditing && isEditable ? (
        <ContentEditForm
          url={url as string}
          platform={platform}
          onUrlChange={setUrl}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <ContentPreview
          url={url as string}
          platform={platform}
          isEditable={isEditable}
          onEdit={() => setIsEditing(true)}
        />
      )}
    </div>
  );
};