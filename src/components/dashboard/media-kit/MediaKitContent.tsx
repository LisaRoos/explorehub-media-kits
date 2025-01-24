import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Share } from "lucide-react";
import { ProfileHeader, SocialStats } from "@/components/landing/media-kit/ProfileHeader";
import { EngagementMetrics } from "@/components/landing/media-kit/EngagementMetrics";
import { ActionButtons } from "@/components/landing/media-kit/ActionButtons";

export const MediaKitContent = () => {
  return (
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
    </Card>
  );
};