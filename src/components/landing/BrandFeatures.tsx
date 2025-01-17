import { Card, CardContent } from "@/components/ui/card";
import { Filter, Users, Map, TrendingUp, Search, PlayCircle } from "lucide-react";

export const BrandFeatures = () => {
  const features = [
    {
      icon: <Filter className="h-12 w-12 text-primary" />,
      title: "Advanced Filtering",
      description: "Filter influencers by demographics, niche, and engagement rates"
    },
    {
      icon: <Users className="h-12 w-12 text-secondary" />,
      title: "Audience Insights",
      description: "Access detailed audience demographics and behavior patterns"
    },
    {
      icon: <Map className="h-12 w-12 text-accent" />,
      title: "Location Targeting",
      description: "Find influencers in specific geographic regions"
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-primary" />,
      title: "Performance Metrics",
      description: "View comprehensive performance analytics and ROI predictions"
    },
    {
      icon: <Search className="h-12 w-12 text-secondary" />,
      title: "Smart Search",
      description: "Use AI-powered search to find the perfect influencer match"
    },
    {
      icon: <PlayCircle className="h-12 w-12 text-accent" />,
      title: "Content Preview",
      description: "Browse influencers' best performing content directly in their media kits"
    }
  ];

  return (
    <section id="brands" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Powerful Tools for <span className="gradient-text">Brands</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Find and connect with the perfect influencers for your campaigns
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="glass-card hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};