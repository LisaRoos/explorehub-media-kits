import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardHeader } from "./layout/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Instagram, Youtube } from "lucide-react";
import { TikTokIcon } from "@/components/landing/media-kit/TikTokIcon";

interface SocialLinks {
  instagram: string[];
  tiktok: string[];
  youtube: string[];
}

const Settings = () => {
  const [uploading, setUploading] = useState(false);
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
          const socialLinks = profile.social_links as SocialLinks;
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

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0) return;
      
      const file = event.target.files[0];
      setUploading(true);

      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('profile_photos')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('profile_photos')
        .getPublicUrl(fileName);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', profile?.id);

      if (updateError) throw updateError;

      toast.success('Profile photo updated successfully');
      refetchProfile();
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast.error('Failed to upload profile photo');
    } finally {
      setUploading(false);
    }
  };

  const handleUrlChange = async (platform: keyof SocialLinks, index: number, value: string) => {
    setPlatformUrls(prev => ({
      ...prev,
      [platform]: prev[platform].map((url, i) => i === index ? value : url)
    }));

    // Here you would implement the logic to fetch thumbnails based on the URL
    // This is a placeholder - you'd need to implement platform-specific API calls
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
          social_links: platformUrls
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
                    <div className="relative">
                      <img
                        src={profile?.avatar_url || "/placeholder.svg"}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover"
                      />
                      <Input
                        type="file"
                        id="photo-upload"
                        className="hidden"
                        onChange={handlePhotoUpload}
                        accept="image/*"
                        disabled={uploading}
                      />
                      <label
                        htmlFor="photo-upload"
                        className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full cursor-pointer hover:bg-primary/90"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="17 8 12 3 7 8" />
                          <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                      </label>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="space-y-1">
                        <Label htmlFor="name">Display Name</Label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell us about yourself"
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Social Media Content</h2>
                <Tabs defaultValue="instagram" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="instagram" className="flex items-center gap-2">
                      <Instagram className="w-4 h-4" />
                      Instagram
                    </TabsTrigger>
                    <TabsTrigger value="tiktok" className="flex items-center gap-2">
                      <TikTokIcon className="w-4 h-4" />
                      TikTok
                    </TabsTrigger>
                    <TabsTrigger value="youtube" className="flex items-center gap-2">
                      <Youtube className="w-4 h-4" />
                      YouTube
                    </TabsTrigger>
                  </TabsList>
                  {Object.entries(platformUrls).map(([platform, urls]) => (
                    <TabsContent key={platform} value={platform}>
                      <div className="space-y-4">
                        {urls.map((url, index) => (
                          <div key={index} className="flex gap-4">
                            <Input
                              value={url}
                              onChange={(e) => handleUrlChange(platform, index, e.target.value)}
                              placeholder={`Enter ${platform} content URL`}
                            />
                            {thumbnails[platform][index] && (
                              <img
                                src={thumbnails[platform][index]}
                                alt={`${platform} thumbnail ${index + 1}`}
                                className="w-16 h-16 object-cover rounded"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
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
