import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Users, TrendingUp, Share2 } from "lucide-react";

export const Benefits = () => {
  const benefits = [
    {
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
      title: "Analytics Dashboard",
      description: "Showcase your growth and engagement metrics with interactive charts and real-time data visualization."
    },
    {
      icon: <Users className="h-8 w-8 text-secondary" />,
      title: "Audience Insights",
      description: "Display detailed demographics and audience behavior patterns to attract the right brand partnerships."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-accent" />,
      title: "Performance Metrics",
      description: "Highlight your best-performing content and engagement rates to demonstrate your influence."
    },
    {
      icon: <Share2 className="h-8 w-8 text-primary" />,
      title: "Easy Sharing",
      description: "Share your professional media kit with brands instantly through a custom link."
    }
  ];

  return (
    <section id="influencers" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Transform Your <span className="gradient-text">Influence</span> Into Success
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Our professional media kits help you showcase your true value to brands
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((benefit, index) => (
            <Card key={index} className="glass-card hover:scale-105 transition-transform duration-300">
              <CardContent className="p-4 text-center">
                <div className="mb-2 flex justify-center">{benefit.icon}</div>
                <h3 className="text-lg font-semibold mb-1">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 p-6 glass-card rounded-2xl">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-3">Your Professional Media Kit</h3>
              <p className="text-gray-400 mb-4 text-sm">
                Stand out from the crowd with a beautifully designed media kit that showcases your true influence. Our platform automatically generates professional media kits that highlight your best metrics and content.
              </p>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  Real-time analytics and engagement rates
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-secondary"></div>
                  Audience demographics and insights
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent"></div>
                  Best performing content showcase
                </li>
              </ul>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                alt="Media Kit Preview" 
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};