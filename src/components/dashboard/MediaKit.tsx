import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardHeader } from "./layout/DashboardHeader";
import { PhoneFrame } from "./media-kit/PhoneFrame";
import { MediaKitContent } from "./media-kit/MediaKitContent";
import { BrandAssets } from "./media-kit/BrandAssets";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const MediaKit = () => {
  const navigate = useNavigate();

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
      
      return profile;
    },
  });

  const isInfluencer = profile?.role === 'influencer';
  const hasIncompleteProfile = isInfluencer && (!profile?.full_name || !profile?.bio || !profile?.avatar_url);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <main className="flex-1">
          <DashboardHeader 
            title="Media Kit" 
            description="Manage your brand assets and information"
          />
          
          {hasIncompleteProfile && (
            <div className="p-4">
              <Alert variant="destructive" className="bg-yellow-50 border-yellow-200">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="flex items-center justify-between">
                  <span className="text-yellow-800">
                    Complete your profile to make your media kit more attractive to brands
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate('/dashboard/settings')}
                    className="ml-4"
                  >
                    Edit Profile
                  </Button>
                </AlertDescription>
              </Alert>
            </div>
          )}
          
          <div className="p-3 md:p-6 space-y-6 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
            <div className="flex justify-center">
              <PhoneFrame>
                <MediaKitContent />
              </PhoneFrame>
            </div>
            <div className="space-y-6">
              <BrandAssets />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MediaKit;