import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardHeader } from "./layout/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { ProfilePhotoUpload } from "./settings/ProfilePhotoUpload";
import { ProfileForm } from "./settings/ProfileForm";
import { SocialMediaUrls, type SocialLinks } from "./settings/SocialMediaUrls";

const Settings = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [platformUrls, setPlatformUrls] = useState<SocialLinks>({
    instagram: Array(5).fill(""),
    tiktok: Array(5).fill(""),
    youtube: Array(5).fill("")
  });
  const [thumbnails, setThumbnails] = useState<SocialLinks>({
    instagram: Array(5).fill(""),
    tiktok: Array(5).fill(""),
    youtube: Array(5).fill("")
  });

  const { data: profile, refetch: refetchProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (profile) {
        setName(profile.full_name || "");
        setBio(profile.bio || "");
        setEmail(profile.email || "");
        if (profile.social_links) {
          const socialLinks = profile.social_links as unknown as SocialLinks;
          setPlatformUrls(prev => ({
            instagram: socialLinks.instagram || Array(5).fill(""),
            tiktok: socialLinks.tiktok || Array(5).fill(""),
            youtube: socialLinks.youtube || Array(5).fill("")
          }));
        }
      }
      return profile;
    },
  });

  const handleUrlChange = async (platform: keyof SocialLinks, index: number, value: string) => {
    setPlatformUrls(prev => ({
      ...prev,
      [platform]: prev[platform].map((url, i) => i === index ? value : url)
    }));

    setThumbnails(prev => ({
      ...prev,
      [platform]: prev[platform].map((thumb, i) => 
        i === index ? `https://placeholder.com/thumb_${platform}_${index}` : thumb
      )
    }));
  };

  const handleSave = async () => {
    try {
      if (!profile?.id) return;

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: name,
          bio,
          email,
          social_links: platformUrls as unknown as Json
        })
        .eq('id', profile.id);

      if (error) throw error;

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <main className="flex-1">
          <DashboardHeader 
            title="Settings" 
            description="Manage your account preferences"
          />
          <div className="p-8">
            <div className="grid gap-6 max-w-2xl">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <ProfilePhotoUpload
                      profileId={profile?.id}
                      avatarUrl={profile?.avatar_url}
                      onPhotoUpdate={refetchProfile}
                    />
                    <ProfileForm
                      name={name}
                      email={email}
                      bio={bio}
                      onNameChange={setName}
                      onEmailChange={setEmail}
                      onBioChange={setBio}
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Social Media Content</h2>
                <SocialMediaUrls
                  platformUrls={platformUrls}
                  thumbnails={thumbnails}
                  onUrlChange={handleUrlChange}
                />
              </Card>

              <Button onClick={handleSave} className="w-full">
                Save Changes
              </Button>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Settings;