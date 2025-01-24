import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Instagram, TikTok, Youtube, TrendingUp, Users, BarChart2 } from "lucide-react";

export const MediaKitMockup = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Professional <span className="gradient-text">Media Kits</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Showcase your influence with beautiful, data-driven media kits
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <Card className="p-6 glass-card">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                  alt="Creator Profile"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold">Sarah Johnson</h3>
                  <p className="text-sm text-gray-400">Lifestyle & Tech Creator</p>
                </div>
              </div>
              
              <div className="flex gap-2 mb-6">
                <Badge className="bg-pink-500">
                  <Instagram className="w-4 h-4 mr-1" />
                  156K
                </Badge>
                <Badge className="bg-black">
                  <TikTok className="w-4 h-4 mr-1" />
                  892K
                </Badge>
                <Badge className="bg-red-500">
                  <Youtube className="w-4 h-4 mr-1" />
                  245K
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 rounded-lg bg-primary/10">
                  <TrendingUp className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">4.8%</p>
                  <p className="text-xs text-gray-400">Eng. Rate</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-primary/10">
                  <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">1.2M</p>
                  <p className="text-xs text-gray-400">Total Reach</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-primary/10">
                  <BarChart2 className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">89%</p>
                  <p className="text-xs text-gray-400">Brand Fit</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Recent Collaborations</h4>
                <div className="flex gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
                    alt="Collaboration 1"
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
                    alt="Collaboration 2"
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
                    alt="Collaboration 3"
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Real-Time Analytics</h3>
                <p className="text-gray-400">Showcase your growth and engagement metrics with live data</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-secondary/10 rounded-lg">
                <Users className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Audience Insights</h3>
                <p className="text-gray-400">Share detailed demographics and audience behavior data</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <BarChart2 className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Campaign Performance</h3>
                <p className="text-gray-400">Display your successful brand collaborations and results</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};