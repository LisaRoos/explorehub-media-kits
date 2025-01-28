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
import { useLocation } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export const MediaKitContent = () => {
  const location = useLocation();
  const isSharedView = !location.pathname.includes('/dashboard');

  const { data: profile, refetch, isError } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();
      
      if (!profileData) return null;

      const typedProfile: ProfileData = {
        ...profileData,
        social_links: profileData.social_links as SocialLinks | null
      };
      
      return typedProfile;
    },
  });

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load profile. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-white shadow-lg rounded-3xl border border-gray-100">
        <div className="space-y-6">
          <ProfileSection 
            profile={profile} 
            refetchProfile={refetch} 
            isEditable={!isSharedView && profile?.role === 'influencer'} 
          />
          <SocialMediaButtons profile={profile} />
          <ContactSection 
            profile={profile} 
            refetchProfile={refetch} 
            isEditable={!isSharedView && profile?.role === 'influencer'} 
          />

          <div className="space-y-6">
            <ContentBlock
              platform="Instagram"
              icon={<Instagram className="w-5 h-5" />}
              profile={profile}
              refetchProfile={refetch}
              isEditable={!isSharedView && profile?.role === 'influencer'}
            />
            <ContentBlock
              platform="TikTok"
              icon={<TikTokIcon className="w-5 h-5" />}
              profile={profile}
              refetchProfile={refetch}
              isEditable={!isSharedView && profile?.role === 'influencer'}
            />
            <ContentBlock
              platform="YouTube"
              icon={<Youtube className="w-5 h-5 text-red-500" />}
              profile={profile}
              refetchProfile={refetch}
              isEditable={!isSharedView && profile?.role === 'influencer'}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};