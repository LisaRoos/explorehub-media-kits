import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PackageCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  media: {
    images?: string[];
    videos?: string[];
  };
  features: string[];
}

export const PackageCard = ({ title, description, price, media, features }: PackageCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden">
      {media?.images?.[0] && (
        <img 
          src={media.images[0]} 
          alt={title} 
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
        
        {media?.videos?.[0] && (
          <div className="aspect-video">
            <iframe
              src={media.videos[0]}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        )}

        <div className="space-y-2">
          <h4 className="font-medium">Features:</h4>
          <ul className="list-disc list-inside space-y-1">
            {features.map((feature, index) => (
              <li key={index} className="text-muted-foreground">{feature}</li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold">${price}</span>
          <Button 
            onClick={() => navigate("/dashboard/messages")}
            className="gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            Enquire Now
          </Button>
        </div>
      </div>
    </Card>
  );
};