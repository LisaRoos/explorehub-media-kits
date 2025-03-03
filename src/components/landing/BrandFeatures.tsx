import { Card, CardContent } from "@/components/ui/card";
import { Filter, Users, Map, TrendingUp, Search, PlayCircle } from "lucide-react";
import { memo } from "react";

const features = [
  {
    icon: <Filter className="h-8 w-8 text-primary" />,
    title: "Advanced Filtering",
    description: "Filter influencers by demographics, niche, and engagement rates"
  },
  {
    icon: <Users className="h-8 w-8 text-secondary" />,
    title: "Audience Insights",
    description: "Access detailed audience demographics and behavior patterns"
  },
  {
    icon: <Map className="h-8 w-8 text-accent" />,
    title: "Location Targeting",
    description: "Find influencers in specific geographic regions"
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    title: "Performance Metrics",
    description: "View comprehensive performance analytics and ROI predictions"
  },
  {
    icon: <Search className="h-8 w-8 text-secondary" />,
    title: "Smart Search",
    description: "Use AI-powered search to find the perfect influencer match"
  },
  {
    icon: <PlayCircle className="h-8 w-8 text-accent" />,
    title: "Content Preview",
    description: "Browse influencers' best performing content directly in their media kits"
  }
] as const;

const FeatureCard = memo(({ feature, index }: { feature: typeof features[number], index: number }) => (
  <Card 
    className="glass-card hover:scale-105 transition-transform duration-300"
    style={{ 
      animationDelay: `${index * 100}ms`,
      opacity: 0,
      animation: 'fade-in 0.5s ease-out forwards'
    }}
  >
    <CardContent className="p-4 text-center">
      <div className="mb-2 flex justify-center">{feature.icon}</div>
      <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
      <p className="text-gray-400 text-sm">{feature.description}</p>
    </CardContent>
  </Card>
));

FeatureCard.displayName = "FeatureCard";

export const BrandFeatures = memo(() => {
  return (
    <section id="brands" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Powerful Tools for <span className="gradient-text">Brands</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Find and connect with the perfect influencers for your campaigns
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
});

BrandFeatures.displayName = "BrandFeatures";