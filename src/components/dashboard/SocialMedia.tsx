import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Instagram, Twitter, Youtube, TwitchIcon } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const socialAccounts = [
  {
    platform: "Instagram",
    username: "@lifestyle_creator",
    followers: "24.5K",
    engagement: "5.2%",
    icon: Instagram,
    connected: true,
  },
  {
    platform: "Twitter",
    username: "@lifestyle_tweets",
    followers: "12.3K",
    engagement: "3.8%",
    icon: Twitter,
    connected: true,
  },
  {
    platform: "YouTube",
    username: "Lifestyle & Fashion",
    followers: "45.2K",
    engagement: "4.7%",
    icon: Youtube,
    connected: false,
  },
  {
    platform: "Twitch",
    username: "lifestyle_live",
    followers: "8.9K",
    engagement: "6.1%",
    icon: TwitchIcon,
    connected: false,
  },
];

export const SocialMedia = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Social Media Accounts</h2>
          <p className="text-gray-500">Connect and manage your social media presence</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {socialAccounts.map((account) => (
          <Card key={account.platform} className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>
                  <account.icon className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold">{account.platform}</h3>
                <p className="text-sm text-gray-500">{account.username}</p>
              </div>
              <Button variant={account.connected ? "outline" : "default"}>
                {account.connected ? "Connected" : "Connect"}
              </Button>
            </div>
            {account.connected && (
              <div className="mt-4 grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-gray-500">Followers</p>
                  <p className="font-semibold">{account.followers}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Engagement</p>
                  <p className="font-semibold">{account.engagement}</p>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};