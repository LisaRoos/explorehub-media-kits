import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Instagram, Twitter, Youtube, Link2, Settings } from "lucide-react";

const socialLinks = [
  {
    platform: "Instagram",
    icon: Instagram,
    color: "bg-pink-500",
    url: "#",
  },
  {
    platform: "Twitter",
    icon: Twitter,
    color: "bg-blue-400",
    url: "#",
  },
  {
    platform: "YouTube",
    icon: Youtube,
    color: "bg-red-500",
    url: "#",
  },
];

export const Overview = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <Avatar className="w-32 h-32 mx-auto">
          <AvatarImage src="/placeholder.svg" alt="Profile" />
          <AvatarFallback>IN</AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-bold">@username</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Digital creator & lifestyle influencer sharing daily inspiration and creative content
        </p>
      </div>

      <div className="grid gap-4">
        {socialLinks.map((link) => (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Card className="p-4 hover:scale-105 transition-transform glass-card">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-full ${link.color}`}>
                  <link.icon className="w-6 h-6 text-white" />
                </div>
                <span className="font-medium">{link.platform}</span>
                <Link2 className="w-4 h-4 ml-auto" />
              </div>
            </Card>
          </a>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6 glass-card">
          <h3 className="text-sm font-medium text-gray-600">Total Followers</h3>
          <p className="text-2xl font-bold mt-2">24.5K</p>
          <span className="text-green-600 text-sm">+12% from last month</span>
        </Card>
        <Card className="p-6 glass-card">
          <h3 className="text-sm font-medium text-gray-600">Engagement Rate</h3>
          <p className="text-2xl font-bold mt-2">5.2%</p>
          <span className="text-green-600 text-sm">+3% from last month</span>
        </Card>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => window.location.href = "/dashboard/settings"}
      >
        <Settings className="w-4 h-4 mr-2" />
        Edit Profile
      </Button>
    </div>
  );
};