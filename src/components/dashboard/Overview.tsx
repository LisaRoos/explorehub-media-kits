import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ProfileHeader } from "./profile/ProfileHeader";
import { ProfileToggle } from "./profile/ProfileToggle";
import { SocialLinks } from "./social/SocialLinks";
import { ContentCarousel } from "./content/ContentCarousel";
import { AnalyticsCards } from "./analytics/AnalyticsCards";

const featuredContent = {
  instagram: [
    {
      thumbnail: "/placeholder.svg",
      title: "Latest Instagram Post",
      url: "#"
    },
    {
      thumbnail: "/placeholder.svg",
      title: "Featured Reel",
      url: "#"
    },
    {
      thumbnail: "/placeholder.svg",
      title: "Popular Post",
      url: "#"
    }
  ],
  tiktok: [
    {
      thumbnail: "/placeholder.svg",
      title: "Viral TikTok",
      url: "#"
    },
    {
      thumbnail: "/placeholder.svg",
      title: "Latest Dance",
      url: "#"
    },
    {
      thumbnail: "/placeholder.svg",
      title: "Tutorial Video",
      url: "#"
    }
  ],
  youtube: [
    {
      thumbnail: "/placeholder.svg",
      title: "Latest Video",
      url: "#"
    },
    {
      thumbnail: "/placeholder.svg",
      title: "Popular Tutorial",
      url: "#"
    },
    {
      thumbnail: "/placeholder.svg",
      title: "Channel Highlight",
      url: "#"
    }
  ]
};

export const Overview = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<"analytics" | "public">("analytics");

  const handleChatClick = () => {
    navigate("/dashboard/messages");
  };

  const handleViewChange = (newView: "analytics" | "public") => {
    setView(newView);
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      <ProfileToggle view={view} onViewChange={handleViewChange} />
      <ProfileHeader />
      <SocialLinks />

      {/* Chat Button - Only show in analytics view */}
      {view === "analytics" && (
        <div className="px-4">
          <Button 
            onClick={handleChatClick}
            className="w-full glass-card group hover:scale-105 transition-transform"
            variant="outline"
          >
            <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Chat Now
          </Button>
        </div>
      )}

      {/* Analytics Section - Only show in analytics view */}
      {view === "analytics" && (
        <div className="px-4">
          <h2 className="text-xl font-semibold mb-4">Analytics Overview</h2>
          <AnalyticsCards />
        </div>
      )}

      {/* Featured Content Carousels */}
      <div className="space-y-8 px-4">
        <h2 className="text-xl font-semibold text-center">Featured Content</h2>
        <ContentCarousel platform="Instagram" content={featuredContent.instagram} />
        <ContentCarousel platform="TikTok" content={featuredContent.tiktok} />
        <ContentCarousel platform="YouTube" content={featuredContent.youtube} />
      </div>

      {/* Sign Up CTA - Only show in public view */}
      {view === "public" && (
        <div className="px-4 pb-8">
          <Button 
            onClick={handleSignupClick}
            className="w-full glass-card group hover:scale-105 transition-transform"
            size="lg"
          >
            <UserPlus className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Create Your Own Profile
          </Button>
          <p className="text-center text-sm text-muted-foreground mt-2">
            Join our community of creators and start showcasing your content
          </p>
        </div>
      )}
    </div>
  );
};