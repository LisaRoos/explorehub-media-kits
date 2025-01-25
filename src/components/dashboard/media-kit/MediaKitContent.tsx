import { Card } from "@/components/ui/card";
import { MessageCircle, Package, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TikTokIcon } from "@/components/landing/media-kit/TikTokIcon";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SocialMediaButton } from "./SocialMediaButton";
import { ProfileData } from "@/types/profile";
import { ProfileSection } from "./ProfileSection";
import { ContentBlock } from "./ContentBlock";

export const MediaKitContent = () => {
  const { data: profile, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      return profile as unknown as ProfileData;
    },
  });

  const socialLinks = [
    {
      platform: "Instagram",
      icon: <Instagram className="w-5 h-5" />,
      color: "bg-pink-500",
      followers: "156K",
      url: profile?.social_links?.instagram || "#",
    },
    {
      platform: "TikTok",
      icon: <TikTokIcon className="w-5 h-5" />,
      color: "bg-black",
      followers: "892K",
      url: profile?.social_links?.tiktok || "#",
    },
    {
      platform: "YouTube",
      icon: <Youtube className="w-5 h-5 text-red-500" />,
      color: "bg-red-500",
      followers: "245K",
      url: profile?.social_links?.youtube || "#",
    },
  ];

  const handleEmailClick = () => {
    window.location.href = `mailto:${profile?.email || 'contact@example.com'}`;
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-white dark:bg-gray-900 shadow-lg rounded-3xl">
        <div className="space-y-6">
          <ProfileSection profile={profile} refetchProfile={refetch} />

          {/* Social Media Links */}
          <div className="grid gap-3">
            {socialLinks.map((link) => (
              <SocialMediaButton
                key={link.platform}
                {...link}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
              onClick={handleEmailClick}
            >
              <MessageCircle className="w-4 h-4" />
              Chat Now
            </Button>
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
              onClick={() => window.location.href = '/dashboard/packages'}
            >
              <Package className="w-4 h-4" />
              View Packages
            </Button>
          </div>

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