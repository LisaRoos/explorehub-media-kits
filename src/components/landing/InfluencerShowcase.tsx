import { Card, CardContent } from "@/components/ui/card";
import { Instagram, TrendingUp, Share2, BarChart2 } from "lucide-react";

export const InfluencerShowcase = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Showcase Your <span className="gradient-text">Content</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Import and display your best performing content directly in your media kit
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <Card className="glass-card overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-video">
                  <img 
                    src="https://images.unsplash.com/photo-1611162617474-5b21e879e113"
                    alt="Content Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Instagram className="h-6 w-6 text-pink-500" />
                    <span className="text-sm text-gray-400">Connect your social media</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Automatic Content Import</h3>
                  <p className="text-gray-400">
                    Connect your TikTok or Instagram account to automatically import and showcase your best performing content
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="order-1 md:order-2 space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Top Performing Content</h3>
                <p className="text-gray-400">Showcase your best content that resonates with your audience</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-secondary/10 rounded-lg">
                <Share2 className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Easy Sharing</h3>
                <p className="text-gray-400">Share your curated content directly with interested brands</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <BarChart2 className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Performance Metrics</h3>
                <p className="text-gray-400">Display engagement rates and reach for each piece of content</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};