import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Share, MessageCircle, Package, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

export const MediaKitContent = () => {
  return (
    <div className="space-y-6">
      {/* Profile Section */}
      <Card className="p-6 bg-white dark:bg-gray-900 shadow-lg rounded-3xl">
        <div className="space-y-6">
          {/* Header with Share button */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb"
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold">Sarah Johnson</h2>
                <p className="text-gray-500">Travel & Adventure Creator</p>
              </div>
            </div>
            <Badge variant="secondary" className="flex items-center gap-2">
              <Share className="w-4 h-4" />
              Shareable
            </Badge>
          </div>

          {/* Social Media Stats */}
          <div className="flex gap-2">
            <Badge className="bg-pink-500 text-white">
              <Instagram className="w-4 h-4 mr-1" />
              156K
            </Badge>
            <Badge className="bg-black text-white">
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
              892K
            </Badge>
            <Badge className="bg-red-500 text-white">
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z" />
              </svg>
              245K
            </Badge>
          </div>

          {/* Engagement Metrics */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-primary/5 rounded-2xl p-4 text-center">
              <p className="text-xl font-bold">85K</p>
              <p className="text-sm text-gray-500">Total Followers</p>
            </div>
            <div className="bg-primary/5 rounded-2xl p-4 text-center">
              <p className="text-xl font-bold">12.5K</p>
              <p className="text-sm text-gray-500">Profile Views</p>
            </div>
            <div className="bg-primary/5 rounded-2xl p-4 text-center">
              <p className="text-xl font-bold">4.8%</p>
              <p className="text-sm text-gray-500">Eng. Rate</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button variant="outline" className="w-full flex items-center justify-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Chat Now
            </Button>
            <Button variant="outline" className="w-full flex items-center justify-center gap-2">
              <Package className="w-4 h-4" />
              My Packages
            </Button>
          </div>

          {/* Instagram Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Instagram className="w-5 h-5" />
              <h3 className="font-semibold">Instagram</h3>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <img
                src="https://images.unsplash.com/photo-1469474968028-56623f02e42e"
                alt="Gallery 1"
                className="w-full h-24 object-cover rounded-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb"
                alt="Gallery 2"
                className="w-full h-24 object-cover rounded-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1518495973542-4542c06a5843"
                alt="Gallery 3"
                className="w-full h-24 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};