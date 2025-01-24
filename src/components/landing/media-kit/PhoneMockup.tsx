import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Share } from "lucide-react";
import { ProfileHeader, SocialStats } from "./ProfileHeader";
import { EngagementMetrics } from "./EngagementMetrics";
import { ActionButtons } from "./ActionButtons";
import { ContentCarousel } from "@/components/dashboard/content/ContentCarousel";
import { SampleContent } from "./types";

interface PhoneMockupProps {
  content: SampleContent;
}

export const PhoneMockup = ({ content }: PhoneMockupProps) => {
  return (
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
          <ActionButtons />
          
          <div className="space-y-4">
            <ContentCarousel 
              platform="Instagram" 
              content={content.instagram}
            />
            <ContentCarousel 
              platform="TikTok" 
              content={content.tiktok}
            />
            <ContentCarousel 
              platform="YouTube" 
              content={content.youtube}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};