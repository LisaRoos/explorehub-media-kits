import { useState } from "react";
import { ProfileHeader } from "./profile/ProfileHeader";
import { ProfileToggle } from "./profile/ProfileToggle";
import { ShareableLink } from "./profile/ShareableLink";
import { SocialLinks } from "./social/SocialLinks";
import { ChatButton } from "./profile/ChatButton";
import { AnalyticsCards } from "./analytics/AnalyticsCards";
import { FeaturedContent } from "./content/FeaturedContent";
import { SignUpCTA } from "./profile/SignUpCTA";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const Overview = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [view, setView] = useState<"analytics" | "public">(
    searchParams.get("view") as "analytics" | "public" || "analytics"
  );

  const { data: subscription, isError } = useQuery({
    queryKey: ['subscription'],
    queryFn: async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Not authenticated');

        const { data: subscription, error } = await supabase
          .from('subscriptions')
          .select('status')
          .eq('profile_id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Subscription fetch error:', error);
          throw error;
        }

        return subscription;
      } catch (error) {
        console.error('Error fetching subscription:', error);
        throw error;
      }
    },
    retry: 1,
    meta: {
      onError: () => {
        toast.error('Failed to load subscription data');
      }
    }
  });

  const handleViewChange = (newView: "analytics" | "public") => {
    setView(newView);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4 md:space-y-8 px-3 md:px-4 animate-fade-in">
      <ProfileToggle view={view} onViewChange={handleViewChange} />
      <ShareableLink view={view} />
      <ProfileHeader />
      <SocialLinks />

      {view === "analytics" && (
        <>
          <ChatButton />
          <Button
            onClick={() => navigate("/dashboard/packages")}
            variant="outline"
            className="w-full text-sm md:text-base glass-card group hover:scale-105 transition-transform"
          >
            <Package className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            My Packages
          </Button>
          <div className="relative">
            <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Analytics Overview</h2>
            <AnalyticsCards />
          </div>
        </>
      )}

      <FeaturedContent />

      {view === "public" && <SignUpCTA />}
    </div>
  );
};