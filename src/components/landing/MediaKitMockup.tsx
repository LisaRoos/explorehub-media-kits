import { Card } from "@/components/ui/card";
import { ProfileHeader, SocialStats } from "./media-kit/ProfileHeader";
import { EngagementMetrics } from "./media-kit/EngagementMetrics";
import { FeatureHighlights } from "./media-kit/FeatureHighlights";
import { ContentCarousel } from "@/components/dashboard/content/ContentCarousel";
import { Badge } from "@/components/ui/badge";
import { Share } from "lucide-react";

const sampleContent = {
  instagram: [
    {
      thumbnail: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      title: "Exploring Hidden Mountain Trails 🏔️",
      url: "#"
    },
    {
      thumbnail: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
      title: "Serenity in the Swiss Alps ✨",
      url: "#"
    },
    {
      thumbnail: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
      title: "Aerial Views of New Zealand 🌿",
      url: "#"
    }
  ],
  tiktok: [
    {
      thumbnail: "https://images.unsplash.com/photo-1469041797191-50ace28483c3",
      title: "Desert Safari Adventure Guide 🐪",
      url: "#"
    },
    {
      thumbnail: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
      title: "Wildlife Spotting in Kenya 🦁",
      url: "#"
    },
    {
      thumbnail: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      title: "Hidden Gems in the Rockies 🏔️",
      url: "#"
    }
  ],
  youtube: [
    {
      thumbnail: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
      title: "Complete Guide to Backpacking Asia",
      url: "#"
    },
    {
      thumbnail: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
      title: "Top 10 Mountain Photography Tips",
      url: "#"
    },
    {
      thumbnail: "https://images.unsplash.com/photo-1469041797191-50ace28483c3",
      title: "Ultimate Desert Camping Guide",
      url: "#"
    }
  ]
};

export const MediaKitMockup = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Professional <span className="gradient-text">Media Kits</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Showcase your influence with beautiful, data-driven media kits
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            {/* Phone mockup container */}
            <div className="mx-auto w-[320px] h-[640px] bg-black rounded-[3rem] p-4 shadow-2xl relative overflow-hidden">
              {/* Phone notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-black rounded-b-2xl z-10"></div>
              {/* Phone screen */}
              <div className="w-full h-full bg-background rounded-[2.5rem] overflow-y-auto">
                <Card className="p-4 glass-card">
                  <div className="flex justify-between items-start mb-4">
                    <ProfileHeader />
                    <Badge variant="secondary" className="flex items-center gap-2 scale-90">
                      <Share className="w-3 h-3" />
                      Shareable
                    </Badge>
                  </div>
                  <SocialStats />
                  <EngagementMetrics />
                  
                  <div className="space-y-6 mt-6">
                    <ContentCarousel 
                      platform="Instagram" 
                      content={sampleContent.instagram}
                    />
                    <ContentCarousel 
                      platform="TikTok" 
                      content={sampleContent.tiktok}
                    />
                    <ContentCarousel 
                      platform="YouTube" 
                      content={sampleContent.youtube}
                    />
                  </div>
                </Card>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <FeatureHighlights />
          </div>
        </div>
      </div>
    </section>
  );
};