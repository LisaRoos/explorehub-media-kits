import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Pen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

export const ProfileHeader = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("@username");
  const [bio, setBio] = useState("Digital creator sharing daily inspiration and creative content");
  const [role, setRole] = useState<string | null>(null);

  // Fetch profile data including role
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
      
      if (profile) {
        setUsername(profile.username);
        setBio(profile.bio || "");
        setRole(profile.role);
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
          username,
          bio,
        })
        .eq('id', user.id);

      if (error) throw error;

      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error("Failed to update profile");
    }
  };

  const isInfluencer = role === 'influencer';

  return (
    <div className="text-center space-y-6 relative">
      <div className="relative inline-block">
        <Avatar className="w-32 h-32 mx-auto hover:scale-105 transition-transform">
          <AvatarImage src="/placeholder.svg" alt="Profile" className="object-cover" />
          <AvatarFallback>IN</AvatarFallback>
        </Avatar>
        {isInfluencer && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-0 right-0 rounded-full bg-background shadow-md hover:bg-accent"
            onClick={() => toast.info("Avatar upload coming soon!")}
          >
            <Pen className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <div className="space-y-2">
        {isEditing ? (
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="text-center max-w-[200px] mx-auto"
          />
        ) : (
          <div className="relative inline-block">
            <h1 className="text-3xl font-bold">{username}</h1>
            {isInfluencer && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute -right-8 top-1/2 -translate-y-1/2"
                onClick={() => setIsEditing(true)}
              >
                <Pen className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
        <div className="flex items-center justify-center gap-2">
          <span className="px-3 py-1 rounded-full bg-primary/10 text-sm font-medium">
            Lifestyle Influencer
          </span>
        </div>
      </div>

      <div className="relative max-w-md mx-auto">
        {isEditing ? (
          <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="text-center min-h-[100px]"
          />
        ) : (
          <p className="text-muted-foreground">
            {bio}
            {isInfluencer && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute -right-8 top-1/2 -translate-y-1/2"
                onClick={() => setIsEditing(true)}
              >
                <Pen className="h-4 w-4" />
              </Button>
            )}
          </p>
        )}
      </div>

      {isEditing && (
        <div className="flex justify-center gap-2">
          <Button variant="outline" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
};