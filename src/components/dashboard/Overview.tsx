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

export const Overview = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [view, setView] = useState<"analytics" | "public">(
    searchParams.get("view") as "analytics" | "public" || "analytics"
  );

  const { data: subscription } = useQuery({
    queryKey: ['subscription'],
    queryFn: async () => {
      const { data: subscription } = await supabase
        .from('subscriptions')
        .select('status')
        .maybeSingle();
      return subscription;
    },
  });

  const handleViewChange = (newView: "analytics" | "public") => {
    setView(newView);
  };

  const isAnalyticsBlurred = view === "analytics" && 
    (!subscription || subscription.status !== "brand");

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
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
            className="w-full glass-card group hover:scale-105 transition-transform"
          >
            <Package className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            My Packages
          </Button>
          <div className={`px-4 relative ${isAnalyticsBlurred ? "select-none" : ""}`}>
            {isAnalyticsBlurred && (
              <div className="absolute inset-0 backdrop-blur-md z-10 flex items-center justify-center">
                <div className="bg-background/80 p-6 rounded-lg text-center">
                  <h3 className="text-lg font-semibold mb-2">Subscribe to View Analytics</h3>
                  <p className="text-muted-foreground mb-4">
                    Get access to detailed analytics by upgrading to a brand subscription
                  </p>
                  <Button
                    onClick={() => window.location.href = "/pricing"}
                    variant="default"
                  >
                    Upgrade Now
                  </Button>
                </div>
              </div>
            )}
            <h2 className="text-xl font-semibold mb-4">Analytics Overview</h2>
            <AnalyticsCards />
          </div>
        </>
      )}

      <FeaturedContent />

      {view === "public" && <SignUpCTA />}
    </div>
  );
};