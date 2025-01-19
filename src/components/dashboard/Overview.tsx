import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ProfileHeader } from "./profile/ProfileHeader";
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

  const handleChatClick = () => {
    navigate("/dashboard/messages");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      <ProfileHeader />
      <SocialLinks />

      {/* Chat Button */}
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

      {/* Analytics Section */}
      <div className="px-4">
        <h2 className="text-xl font-semibold mb-4">Analytics Overview</h2>
        <AnalyticsCards />
      </div>

      {/* Featured Content Carousels */}
      <div className="space-y-8 px-4">
        <h2 className="text-xl font-semibold text-center">Featured Content</h2>
        <ContentCarousel platform="Instagram" content={featuredContent.instagram} />
        <ContentCarousel platform="TikTok" content={featuredContent.tiktok} />
        <ContentCarousel platform="YouTube" content={featuredContent.youtube} />
      </div>
    </div>
  );
};