import { Badge } from "@/components/ui/badge";
import { Instagram, Youtube } from "lucide-react";
import { TikTokIcon } from "./TikTokIcon";

export const ProfileHeader = () => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <img
        src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb"
        alt="Creator Profile"
        className="w-16 h-16 rounded-full object-cover"
      />
      <div>
        <h3 className="text-lg font-semibold">Sarah Johnson</h3>
        <p className="text-sm text-gray-400">Travel & Adventure Creator</p>
      </div>
    </div>
  );
};

export const SocialStats = () => {
  return (
    <div className="flex gap-2 mb-6">
      <Badge className="bg-pink-500">
        <Instagram className="w-4 h-4 mr-1" />
        156K
      </Badge>
      <Badge className="bg-black">
        <TikTokIcon className="w-4 h-4 mr-1" />
        892K
      </Badge>
      <Badge className="bg-red-500">
        <Youtube className="w-4 h-4 mr-1" />
        245K
      </Badge>
    </div>
  );
};