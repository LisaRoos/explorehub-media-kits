import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProfileData, SocialLinks } from "@/types/profile";
import { ProfileSection } from "./profile/ProfileSection";
import { SocialMediaButtons } from "./social/SocialMediaButtons";
import { ContactSection } from "./contact/ContactSection";
import { ContentBlock } from "./ContentBlock";
import { Instagram, Youtube } from "lucide-react";
import { TikTokIcon } from "@/components/landing/media-kit/TikTokIcon";

export const MediaKitContent = () => {
  const { data: profile, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (!profileData) return null;

      const typedProfile: ProfileData = {
        ...profileData,
        social_links: profileData.social_links as SocialLinks | null
      };
      
      return typedProfile;
    },
  });

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-white shadow-lg rounded-3xl border border-gray-100">
        <div className="space-y-6">
          <ProfileSection profile={profile} refetchProfile={refetch} />
          <SocialMediaButtons profile={profile} />
          <ContactSection profile={profile} refetchProfile={refetch} />

          {/* Content Blocks */}
          <div className="space-y-6">
            <ContentBlock
              platform="Instagram"
              icon={<Instagram className="w-5 h-5" />}
              profile={profile}
              refetchProfile={refetch}
            />
            <ContentBlock
              platform="TikTok"
              icon={<TikTokIcon className="w-5 h-5" />}
              profile={profile}
              refetchProfile={refetch}
            />
            <ContentBlock
              platform="YouTube"
              icon={<Youtube className="w-5 h-5 text-red-500" />}
              profile={profile}
              refetchProfile={refetch}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};