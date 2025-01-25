import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { toast } from "sonner";
import { SocialLinks } from "@/types/profile";

export const BrandAssets = () => {
  const [socialUrls, setSocialUrls] = useState<SocialLinks>({
    instagram: "",
    tiktok: "",
    youtube: "",
  });

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
      
      if (profile?.social_links) {
        const typedSocialLinks = profile.social_links as SocialLinks;
        setSocialUrls(typedSocialLinks);
      }
      
      return profile;
    },
  });

  const handleSave = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("You must be logged in to update your profile");
        return;
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          social_links: socialUrls as unknown as Json,
        })
        .eq('id', user.id);

      if (error) throw error;

      toast.success("Social media links updated successfully");
      refetch();
    } catch (error) {
      console.error('Error updating social links:', error);
      toast.error("Failed to update social media links");
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <h2 className="text-xl font-semibold">Social Media Links</h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="instagram">Instagram Profile URL</Label>
          <Input
            id="instagram"
            placeholder="https://instagram.com/yourusername"
            value={socialUrls.instagram}
            onChange={(e) => setSocialUrls(prev => ({ ...prev, instagram: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tiktok">TikTok Video URL</Label>
          <Input
            id="tiktok"
            placeholder="https://tiktok.com/@username/video/..."
            value={socialUrls.tiktok}
            onChange={(e) => setSocialUrls(prev => ({ ...prev, tiktok: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="youtube">YouTube Video URL</Label>
          <Input
            id="youtube"
            placeholder="https://youtube.com/watch?v=..."
            value={socialUrls.youtube}
            onChange={(e) => setSocialUrls(prev => ({ ...prev, youtube: e.target.value }))}
          />
        </div>

        <Button onClick={handleSave} className="w-full">
          Save Changes
        </Button>
      </div>
    </Card>
  );
};