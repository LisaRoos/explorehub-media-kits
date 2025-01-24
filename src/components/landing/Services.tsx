import { Button } from "@/components/ui/button";
import { Users, Code, Star } from "lucide-react";
import { ServiceCard } from "./services/ServiceCard";

const services = [
  {
    category: "Social Media Management",
    icon: Users,
    description: "Comprehensive social media solutions to grow your brand",
    features: [
      "Community Management",
      "Content Strategy",
      "Social Analytics"
    ]
  },
  {
    category: "Web Development",
    icon: Code,
    description: "Custom web solutions tailored to your needs",
    features: [
      "Responsive Design",
      "Custom Development",
      "Maintenance & Support"
    ]
  },
  {
    category: "Influencer Services",
    icon: Star,
    description: "Connect with top influencers to amplify your brand",
    features: [
      "Influencer Matching",
      "Campaign Management",
      "Content Creation"
    ]
  }
];

export const Services = () => {
  const handleContactClick = () => {
    const whatsappUrl = "https://wa.me/27792160601";
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="services" className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-3">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Comprehensive solutions to help your business thrive in the digital world
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90"
            onClick={handleContactClick}
          >
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
};