import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Package } from "./types";
import { PackageFeatures } from "./PackageFeatures";

type PackageCardProps = Package;

export const PackageCard = ({ 
  title, 
  description, 
  price, 
  media, 
  features 
}: PackageCardProps) => {
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

        <PackageFeatures features={features} />

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