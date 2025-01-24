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
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {media?.images?.[0] && (
        <div className="relative h-48">
          <img 
            src={media.images[0]} 
            alt={title} 
            className="w-full h-full object-cover"
          />
          {media.images[1] && (
            <div className="absolute top-2 right-2">
              <img 
                src={media.images[1]} 
                alt={`${title} secondary`} 
                className="w-16 h-16 object-cover rounded-md border-2 border-white shadow-md"
              />
            </div>
          )}
        </div>
      )}
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
        
        {media?.videos?.[0] && (
          <div className="aspect-video rounded-lg overflow-hidden">
            <iframe
              src={media.videos[0]}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        )}

        <PackageFeatures features={features} />

        <div className="flex justify-between items-center pt-4 border-t">
          <div className="space-y-1">
            <span className="text-sm text-muted-foreground">Starting from</span>
            <p className="text-2xl font-bold">${price}</p>
          </div>
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