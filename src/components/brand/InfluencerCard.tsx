import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleViewMediaKit = () => {
    navigate(`/dashboard/media-kit/${influencer.id}`);
  };

  return (
    <Card className="p-3 md:p-6 glass-card">
      <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
        <img
          src={influencer.profileImage}
          alt={influencer.name}
          className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-sm md:text-base font-bold">{influencer.name}</h3>
          <p className="text-xs md:text-sm text-gray-500">{influencer.type}</p>
        </div>
      </div>
      
      <div className="space-y-2 mb-3 md:mb-4">
        <div className="flex justify-between">
          <span className="text-xs md:text-sm text-gray-500">Location:</span>
          <span className="text-xs md:text-sm">{influencer.location}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-xs md:text-sm text-gray-500">Followers:</span>
          <span className="text-xs md:text-sm">{influencer.followers}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-xs md:text-sm text-gray-500">Engagement:</span>
          <span className="text-xs md:text-sm">{influencer.engagement}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-xs md:text-sm text-gray-500">Demographics:</span>
          <span className="text-xs md:text-sm">{influencer.demographics}</span>
        </div>
      </div>

      <Button 
        className="w-full text-xs md:text-sm py-1.5 md:py-2" 
        variant="outline"
        onClick={handleViewMediaKit}
      >
        <Eye className="mr-2 h-3 w-3 md:h-4 md:w-4" />
        View Media Kit
      </Button>
    </Card>
  );
};