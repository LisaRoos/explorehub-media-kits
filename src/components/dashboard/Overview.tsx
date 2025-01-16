import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Settings, Instagram, TikTok } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const data = [
  { name: "Jan", value: 2400 },
  { name: "Feb", value: 1398 },
  { name: "Mar", value: 9800 },
  { name: "Apr", value: 3908 },
  { name: "May", value: 4800 },
  { name: "Jun", value: 3800 },
];

const colorSchemes = {
  blue: { primary: "#4F46E5", secondary: "#00BFFF", accent: "#FF1493" },
  green: { primary: "#10B981", secondary: "#34D399", accent: "#6EE7B7" },
  purple: { primary: "#8B5CF6", secondary: "#A78BFA", accent: "#C4B5FD" },
  orange: { primary: "#F97316", secondary: "#FB923C", accent: "#FDBA74" },
};

const mockFeedData = [
  {
    id: 1,
    platform: "instagram",
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113",
    likes: "12.5K",
    comments: "1.2K",
    engagement: "5.2%",
  },
  {
    id: 2,
    platform: "tiktok",
    thumbnail: "https://images.unsplash.com/photo-1611162616305-c69b3037c7bb",
    likes: "45.2K",
    comments: "3.4K",
    engagement: "8.7%",
  },
  {
    id: 3,
    platform: "instagram",
    thumbnail: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb",
    likes: "8.9K",
    comments: "892",
    engagement: "4.1%",
  },
];

export const Overview = () => {
  const [selectedScheme, setSelectedScheme] = useState<keyof typeof colorSchemes>("blue");
  const [contentFilter, setContentFilter] = useState<"popular" | "recent">("popular");
  const [selectedPlatform, setSelectedPlatform] = useState<"instagram" | "tiktok">("instagram");
  const influencerType = "Lifestyle & Fashion";

  const handleColorSchemeChange = (scheme: keyof typeof colorSchemes) => {
    setSelectedScheme(scheme);
    document.documentElement.style.setProperty('--primary', colorSchemes[scheme].primary);
    document.documentElement.style.setProperty('--secondary', colorSchemes[scheme].secondary);
    document.documentElement.style.setProperty('--accent', colorSchemes[scheme].accent);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="w-16 h-16">
              <AvatarImage src="/placeholder.svg" alt="Profile" />
              <AvatarFallback>IN</AvatarFallback>
            </Avatar>
            <span className="absolute -bottom-2 -right-2 px-2 py-1 bg-primary text-white text-xs rounded-full">
              {influencerType}
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Dashboard Overview</h2>
            <p className="text-gray-500 dark:text-gray-400">Welcome back!</p>
          </div>
        </div>
        <div className="flex gap-2">
          {Object.keys(colorSchemes).map((scheme) => (
            <Button
              key={scheme}
              variant={selectedScheme === scheme ? "default" : "outline"}
              size="sm"
              onClick={() => handleColorSchemeChange(scheme as keyof typeof colorSchemes)}
              className="capitalize"
            >
              {scheme}
            </Button>
          ))}
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
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
        <Card className="p-6 glass-card">
          <h3 className="text-sm font-medium text-gray-600">Brand Deals</h3>
          <p className="text-2xl font-bold mt-2">12</p>
          <span className="text-green-600 text-sm">+2 new this month</span>
        </Card>
      </div>

      <div className="flex gap-4 mb-6">
        <Button
          variant={contentFilter === "popular" ? "default" : "outline"}
          onClick={() => setContentFilter("popular")}
        >
          Most Popular
        </Button>
        <Button
          variant={contentFilter === "recent" ? "default" : "outline"}
          onClick={() => setContentFilter("recent")}
        >
          Most Recent
        </Button>
      </div>

      <Card className="p-6 glass-card">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="name" stroke="#888888" />
              <YAxis stroke="#888888" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke={colorSchemes[selectedScheme].primary}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">Content Feed</h3>
          <div className="flex gap-2">
            <Button
              variant={selectedPlatform === "instagram" ? "default" : "outline"}
              onClick={() => setSelectedPlatform("instagram")}
              className="flex items-center gap-2"
            >
              <Instagram className="h-4 w-4" />
              Instagram
            </Button>
            <Button
              variant={selectedPlatform === "tiktok" ? "default" : "outline"}
              onClick={() => setSelectedPlatform("tiktok")}
              className="flex items-center gap-2"
            >
              <TikTok className="h-4 w-4" />
              TikTok
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockFeedData.map((post) => (
            <Card key={post.id} className="glass-card overflow-hidden">
              <div className="relative aspect-square">
                <img
                  src={post.thumbnail}
                  alt={`Post ${post.id}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="flex items-center justify-between text-sm">
                    <span>{post.likes} likes</span>
                    <span>{post.comments} comments</span>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm font-semibold">
                      Engagement: {post.engagement}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};