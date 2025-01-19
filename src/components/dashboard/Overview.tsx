import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Instagram, 
  Twitter, 
  Youtube, 
  Facebook, 
  Twitch, 
  Play,  // Using Play icon instead of TiktokIcon
  MessageCircle,
  Link2 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  {
    platform: "Facebook",
    icon: Facebook,
    color: "bg-blue-600",
    url: "#",
  },
  {
    platform: "Twitch",
    icon: Twitch,
    color: "bg-purple-500",
    url: "#",
  },
  {
    platform: "TikTok",
    icon: Play,  // Using Play icon instead of TiktokIcon
    color: "bg-black",
    url: "#",
  },
];

const highlightedContent = [
  {
    type: "video",
    platform: "YouTube",
    thumbnail: "/placeholder.svg",
    title: "Latest Video",
    url: "#"
  },
  {
    type: "post",
    platform: "Instagram",
    thumbnail: "/placeholder.svg",
    title: "Featured Post",
    url: "#"
  }
];

export const Overview = () => {
  const navigate = useNavigate();

  const handleChatClick = () => {
    navigate("/dashboard/messages");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-6">
        <Avatar className="w-32 h-32 mx-auto hover:scale-105 transition-transform">
          <AvatarImage src="/placeholder.svg" alt="Profile" className="object-cover" />
          <AvatarFallback>IN</AvatarFallback>
        </Avatar>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">@username</h1>
          <div className="flex items-center justify-center gap-2">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-sm font-medium">
              Lifestyle Influencer
            </span>
          </div>
        </div>

        <p className="text-muted-foreground max-w-md mx-auto">
          Digital creator sharing daily inspiration and creative content
        </p>
      </div>

      {/* Social Links */}
      <div className="grid grid-cols-3 gap-4 px-4">
        {socialLinks.map((link) => (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <Card className="p-4 hover:scale-105 transition-transform glass-card flex items-center justify-center">
              <div className={`p-2 rounded-full ${link.color} group-hover:scale-110 transition-transform`}>
                <link.icon className="w-6 h-6 text-white" />
              </div>
            </Card>
          </a>
        ))}
      </div>

      {/* Chat Button */}
      <div className="px-4">
        <Button 
          onClick={handleChatClick}
          className="w-full glass-card group hover:scale-105 transition-transform"
          variant="outline"
        >
          <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
          Chat Now
        </Button>
      </div>

      {/* Highlighted Content */}
      <div className="space-y-4 px-4">
        <h2 className="text-xl font-semibold text-center">Featured Content</h2>
        <div className="grid gap-4">
          {highlightedContent.map((content, index) => (
            <a
              key={index}
              href={content.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Card className="overflow-hidden hover:scale-105 transition-transform glass-card">
                <img 
                  src={content.thumbnail} 
                  alt={content.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{content.title}</h3>
                    <span className="text-sm text-muted-foreground">{content.platform}</span>
                  </div>
                </div>
              </Card>
            </a>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 px-4">
        <Card className="p-6 glass-card hover:scale-105 transition-transform">
          <h3 className="text-sm font-medium text-muted-foreground">Total Followers</h3>
          <p className="text-2xl font-bold mt-2">24.5K</p>
          <span className="text-green-600 text-sm">+12% from last month</span>
        </Card>
        <Card className="p-6 glass-card hover:scale-105 transition-transform">
          <h3 className="text-sm font-medium text-muted-foreground">Engagement Rate</h3>
          <p className="text-2xl font-bold mt-2">5.2%</p>
          <span className="text-green-600 text-sm">+3% from last month</span>
        </Card>
      </div>
    </div>
  );
};