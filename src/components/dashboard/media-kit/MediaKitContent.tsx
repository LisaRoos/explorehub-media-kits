import { Card } from "@/components/ui/card";
import { Share, MessageCircle, Package, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TikTokIcon } from "@/components/landing/media-kit/TikTokIcon";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SocialMediaButton } from "./SocialMediaButton";
import { ProfileData } from "@/types/profile";

export const MediaKitContent = () => {
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      return profile as ProfileData;
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
      icon: Instagram, // Temporarily using Instagram icon as TikTokIcon doesn't match LucideIcon type
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

  const handleEmailClick = () => {
    window.location.href = `mailto:${profile?.email || 'contact@example.com'}`;
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-white dark:bg-gray-900 shadow-lg rounded-3xl">
        <div className="space-y-6">
          {/* Header with Profile Info */}
          <div className="flex items-start gap-4">
            <div className="relative group">
              <img
                src={profile?.avatar_url || "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb"}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <label htmlFor="avatar-upload" className="cursor-pointer text-white">
                  <Share className="w-6 h-6" />
                </label>
                <input 
                  type="file" 
                  id="avatar-upload" 
                  className="hidden" 
                  accept="image/*"
                  onChange={async (e) => {
                    if (!e.target.files || !e.target.files[0]) return;
                    // Handle file upload logic here
                  }}
                />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{profile?.full_name || "Sarah Johnson"}</h2>
              <p className="text-gray-500">{profile?.bio || "Travel & Adventure Creator"}</p>
            </div>
          </div>

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

          {/* Content Carousels */}
          <div className="space-y-6">
            {/* Instagram Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Instagram className="w-5 h-5" />
                <h3 className="font-semibold">Instagram</h3>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <img
                  src="https://images.unsplash.com/photo-1469474968028-56623f02e42e"
                  alt="Gallery 1"
                  className="w-full h-24 object-cover rounded-lg"
                />
                <img
                  src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb"
                  alt="Gallery 2"
                  className="w-full h-24 object-cover rounded-lg"
                />
                <img
                  src="https://images.unsplash.com/photo-1518495973542-4542c06a5843"
                  alt="Gallery 3"
                  className="w-full h-24 object-cover rounded-lg"
                />
              </div>
            </div>

            {/* TikTok Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <TikTokIcon className="w-5 h-5" />
                <h3 className="font-semibold">TikTok</h3>
              </div>
              <div className="aspect-video rounded-lg bg-gray-100 dark:bg-gray-800">
                {profile?.social_links?.tiktok && (
                  <iframe
                    src={profile.social_links.tiktok}
                    className="w-full h-full rounded-lg"
                    allowFullScreen
                  />
                )}
              </div>
            </div>

            {/* YouTube Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Youtube className="w-5 h-5 text-red-500" />
                <h3 className="font-semibold">YouTube</h3>
              </div>
              <div className="aspect-video rounded-lg bg-gray-100 dark:bg-gray-800">
                {profile?.social_links?.youtube && (
                  <iframe
                    src={profile.social_links.youtube}
                    className="w-full h-full rounded-lg"
                    allowFullScreen
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};