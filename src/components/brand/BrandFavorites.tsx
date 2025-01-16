import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const favorites = [
  {
    id: 1,
    name: "Sarah Johnson",
    type: "Lifestyle & Fashion",
    followers: "245K",
    engagement: "5.2%",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Mike Chen",
    type: "Food & Travel",
    followers: "500K",
    engagement: "4.8%",
    avatar: "/placeholder.svg",
  },
];

export const BrandFavorites = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Favorite Influencers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((influencer) => (
          <Card key={influencer.id} className="p-6">
            <div className="flex items-center space-x-4">
              <img
                src={influencer.avatar}
                alt={influencer.name}
                className="h-12 w-12 rounded-full"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{influencer.name}</h3>
                  <Button variant="ghost" size="icon">
                    <Heart className="h-4 w-4 fill-current text-red-500" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">{influencer.type}</p>
                <div className="mt-2 flex gap-4 text-sm text-muted-foreground">
                  <span>{influencer.followers} followers</span>
                  <span>{influencer.engagement} engagement</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};