import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Code, Star } from "lucide-react";

export const Services = () => {
  const services = [
    {
      category: "Social Media Management",
      icon: <Users className="h-6 w-6 text-primary" />,
      description: "Comprehensive social media solutions to grow your brand",
      features: [
        "Community Management",
        "Content Strategy",
        "Social Analytics"
      ]
    },
    {
      category: "Web Development",
      icon: <Code className="h-6 w-6 text-secondary" />,
      description: "Custom web solutions tailored to your needs",
      features: [
        "Responsive Design",
        "Custom Development",
        "Maintenance & Support"
      ]
    },
    {
      category: "Influencer Services",
      icon: <Star className="h-6 w-6 text-accent" />,
      description: "Connect with top influencers to amplify your brand",
      features: [
        "Influencer Matching",
        "Campaign Management",
        "Content Creation"
      ]
    }
  ];

  const handleContactClick = () => {
    const whatsappUrl = "https://wa.me/27792160601";
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="services" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Comprehensive solutions to help your business thrive in the digital world
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="glass-card hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{service.category}</h3>
                  <p className="text-gray-400 text-sm mb-4">{service.description}</p>
                  <ul className="space-y-2 text-sm">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center justify-center">
                        <span className="text-primary mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
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