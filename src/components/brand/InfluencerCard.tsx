import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface InfluencerCardProps {
  influencer: {
    id: number;
    name: string;
    type: string;
    location: string;
    followers: string;
    engagement: string;
    demographics: string;
    profileImage: string;
  };
}

export const InfluencerCard = ({ influencer }: InfluencerCardProps) => {
  return (
    <Card className="p-6 glass-card">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={influencer.profileImage}
          alt={influencer.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="font-bold">{influencer.name}</h3>
          <p className="text-sm text-gray-500">{influencer.type}</p>
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Location:</span>
          <span className="text-sm">{influencer.location}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Followers:</span>
          <span className="text-sm">{influencer.followers}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Engagement:</span>
          <span className="text-sm">{influencer.engagement}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Demographics:</span>
          <span className="text-sm">{influencer.demographics}</span>
        </div>
      </div>

      <Button className="w-full" variant="outline">
        <Eye className="mr-2 h-4 w-4" />
        View Media Kit
      </Button>
    </Card>
  );
};