import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share2, Edit } from "lucide-react";

export const MediaKit = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Media Kit</h2>
          <p className="text-gray-500">Your professional portfolio for brands</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">About Me</h3>
          <p className="text-gray-600">
            Lifestyle and fashion content creator with 5+ years of experience. Specializing in sustainable fashion and mindful living content.
          </p>
          <div className="mt-4 pt-4 border-t">
            <h4 className="font-medium mb-2">Expertise</h4>
            <div className="flex flex-wrap gap-2">
              {["Fashion", "Lifestyle", "Sustainability", "Travel", "Beauty"].map((tag) => (
                <span key={tag} className="px-3 py-1 bg-primary/10 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Audience Demographics</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Age Range</p>
              <p className="font-medium">18-34 years (75%)</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Top Locations</p>
              <p className="font-medium">US (45%), UK (25%), Canada (15%)</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Gender</p>
              <p className="font-medium">Female (65%), Male (35%)</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Past Collaborations</h3>
          <div className="space-y-4">
            {["Fashion Brand Co", "Eco Beauty", "Travel Plus", "Lifestyle Magazine"].map((brand) => (
              <div key={brand} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>{brand}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Content Packages</h3>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Basic Package</h4>
              <p className="text-sm text-gray-500">1 Post + 2 Stories</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Standard Package</h4>
              <p className="text-sm text-gray-500">3 Posts + 5 Stories + 1 Reel</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Premium Package</h4>
              <p className="text-sm text-gray-500">5 Posts + 10 Stories + 2 Reels</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};