import { Card } from "@/components/ui/card";
import { MessageCircle, Package, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TikTokIcon } from "@/components/landing/media-kit/TikTokIcon";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SocialMediaButton } from "./SocialMediaButton";
import { ProfileData, SocialLinks } from "@/types/profile";
import { ProfileSection } from "./ProfileSection";
import { ContentBlock } from "./ContentBlock";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const MediaKitContent = () => {
  const [editingEmail, setEditingEmail] = useState(false);
  const [email, setEmail] = useState("");

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
      
      if (typedProfile.email) {
        setEmail(typedProfile.email);
      }
      
      return typedProfile;
    },
  });

  const socialLinks = [
    {
      platform: "Instagram",
      icon: Instagram,
      color: "bg-pink-500",
      followers: "156K",
      url: profile?.social_links?.instagram || "#",
    },
    {
      platform: "TikTok",
      icon: TikTokIcon as typeof Instagram,
      color: "bg-black",
      followers: "892K",
      url: profile?.social_links?.tiktok || "#",
    },
    {
      platform: "YouTube",
      icon: Youtube,
      color: "bg-red-500",
      followers: "245K",
      url: profile?.social_links?.youtube || "#",
    },
  ];

  const handleEmailSave = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("You must be logged in to update your profile");
        return;
      }

      const { error } = await supabase
        .from('profiles')
        .update({ email })
        .eq('id', user.id);

      if (error) throw error;

      toast.success("Email updated successfully");
      setEditingEmail(false);
      refetch();
    } catch (error) {
      console.error('Error updating email:', error);
      toast.error("Failed to update email");
    }
  };

  const handleEmailClick = () => {
    if (profile?.role === 'influencer') {
      setEditingEmail(true);
    } else {
      window.location.href = `mailto:${email || 'contact@example.com'}`;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-white shadow-lg rounded-3xl border border-gray-100">
        <div className="space-y-6">
          <ProfileSection profile={profile} refetchProfile={refetch} />

          {/* Social Media Links */}
          <div className="grid gap-3">
            {socialLinks.map((link) => (
              <SocialMediaButton
                key={link.platform}
                platform={link.platform}
                icon={link.icon}
                color={link.color}
                followers={link.followers}
                url={link.url}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {editingEmail ? (
              <div className="space-y-2">
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your contact email"
                  className="w-full"
                />
                <div className="flex gap-2">
                  <Button 
                    onClick={handleEmailSave}
                    className="flex-1"
                  >
                    Save
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setEditingEmail(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50"
                onClick={handleEmailClick}
              >
                <MessageCircle className="w-4 h-4" />
                {profile?.role === 'influencer' ? 'Edit Contact Email' : 'Chat Now'}
              </Button>
            )}
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50"
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