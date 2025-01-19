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
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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

const featuredContent = {
  instagram: [
    {
      thumbnail: "/placeholder.svg",
      title: "Latest Instagram Post",
      url: "#"
    },
    {
      thumbnail: "/placeholder.svg",
      title: "Featured Reel",
      url: "#"
    },
    {
      thumbnail: "/placeholder.svg",
      title: "Popular Post",
      url: "#"
    }
  ],
  tiktok: [
    {
      thumbnail: "/placeholder.svg",
      title: "Viral TikTok",
      url: "#"
    },
    {
      thumbnail: "/placeholder.svg",
      title: "Latest Dance",
      url: "#"
    },
    {
      thumbnail: "/placeholder.svg",
      title: "Tutorial Video",
      url: "#"
    }
  ],
  youtube: [
    {
      thumbnail: "/placeholder.svg",
      title: "Latest Video",
      url: "#"
    },
    {
      thumbnail: "/placeholder.svg",
      title: "Popular Tutorial",
      url: "#"
    },
    {
      thumbnail: "/placeholder.svg",
      title: "Channel Highlight",
      url: "#"
    }
  ]
};

export const Overview = () => {
  const navigate = useNavigate();

  const handleChatClick = () => {
    navigate("/dashboard/messages");
  };

  const ContentCarousel = ({ platform, content }: { platform: string, content: typeof featuredContent.instagram }) => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{platform}</h3>
      <Carousel className="w-full">
        <CarouselContent>
          {content.map((item, index) => (
            <CarouselItem key={index}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="overflow-hidden hover:scale-105 transition-transform glass-card">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-medium">{item.title}</h3>
                  </div>
                </Card>
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );

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
      <div className="grid grid-cols-6 gap-4 px-4">
        {socialLinks.map((link) => (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center"
          >
            <div className={`p-2 rounded-full ${link.color} group-hover:scale-110 transition-transform`}>
              <link.icon className="w-4 h-4 text-white" />
            </div>
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

      {/* Featured Content Carousels */}
      <div className="space-y-8 px-4">
        <h2 className="text-xl font-semibold text-center">Featured Content</h2>
        <ContentCarousel platform="Instagram" content={featuredContent.instagram} />
        <ContentCarousel platform="TikTok" content={featuredContent.tiktok} />
        <ContentCarousel platform="YouTube" content={featuredContent.youtube} />
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