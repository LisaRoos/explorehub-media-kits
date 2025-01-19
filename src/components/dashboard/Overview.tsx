import { useState } from "react";
import { ProfileHeader } from "./profile/ProfileHeader";
import { ProfileToggle } from "./profile/ProfileToggle";
import { SocialLinks } from "./social/SocialLinks";
import { ChatButton } from "./profile/ChatButton";
import { AnalyticsCards } from "./analytics/AnalyticsCards";
import { FeaturedContent } from "./content/FeaturedContent";
import { SignUpCTA } from "./profile/SignUpCTA";

export const Overview = () => {
  const [view, setView] = useState<"analytics" | "public">("analytics");

  const handleViewChange = (newView: "analytics" | "public") => {
    setView(newView);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      <ProfileToggle view={view} onViewChange={handleViewChange} />
      <ProfileHeader />
      <SocialLinks />

      {/* Chat Button - Only show in analytics view */}
      {view === "analytics" && <ChatButton />}

      {/* Analytics Section - Only show in analytics view */}
      {view === "analytics" && (
        <div className="px-4">
          <h2 className="text-xl font-semibold mb-4">Analytics Overview</h2>
          <AnalyticsCards />
        </div>
      )}

      {/* Featured Content */}
      <FeaturedContent />

      {/* Sign Up CTA - Only show in public view */}
      {view === "public" && <SignUpCTA />}
    </div>
  );
};