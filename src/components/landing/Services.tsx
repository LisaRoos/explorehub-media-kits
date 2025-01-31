import { Button } from "@/components/ui/button";
import { Users, Code, Star, Globe, Rocket } from "lucide-react";
import { ServiceCard } from "./services/ServiceCard";

const services = [
  {
    category: "Web Development",
    icon: Globe,
    description: "Professional web solutions tailored to your brand",
    features: [
      "Custom Website Design",
      "E-commerce Solutions",
      "Responsive Development",
      "SEO Optimization"
    ]
  },
  {
    category: "Influencer Platform",
    icon: Star,
    description: "Connect with top influencers to amplify your brand",
    features: [
      "Influencer Matching",
      "Campaign Management",
      "Performance Analytics",
      "Content Creation"
    ]
  },
  {
    category: "Digital Marketing",
    icon: Rocket,
    description: "Comprehensive digital marketing solutions",
    features: [
      "Social Media Strategy",
      "Content Marketing",
      "Brand Development",
      "Analytics & Reporting"
    ]
  },
  {
    category: "Social Media Management",
    icon: Users,
    description: "Expert social media solutions to grow your presence",
    features: [
      "Community Management",
      "Content Strategy",
      "Engagement Growth",
      "Platform Optimization"
    ]
  }
];

export const Services = () => {
  const handleContactClick = () => {
    const whatsappUrl = "https://wa.me/27792160601";
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="services" className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Web Development & <span className="gradient-text">Influencer Marketing</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional web solutions combined with powerful influencer marketing to help your business thrive
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-white px-8"
            onClick={handleContactClick}
          >
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
};