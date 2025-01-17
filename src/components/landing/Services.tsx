import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Users, Code, Server, Smartphone, Network, Star, Megaphone, Camera } from "lucide-react";

export const Services = () => {
  const services = [
    {
      category: "Social Media Management",
      description: "Comprehensive social media solutions to grow your brand",
      features: [
        {
          icon: <Users className="h-6 w-6 text-primary" />,
          title: "Community Management",
          description: "Engage with your audience and build meaningful relationships"
        },
        {
          icon: <Network className="h-6 w-6 text-primary" />,
          title: "Content Strategy",
          description: "Develop compelling content that resonates with your target audience"
        },
        {
          icon: <Smartphone className="h-6 w-6 text-primary" />,
          title: "Social Analytics",
          description: "Track performance and optimize your social media presence"
        }
      ]
    },
    {
      category: "Web Development",
      description: "Custom web solutions tailored to your needs",
      features: [
        {
          icon: <Globe className="h-6 w-6 text-secondary" />,
          title: "Responsive Design",
          description: "Beautiful websites that work perfectly on all devices"
        },
        {
          icon: <Code className="h-6 w-6 text-secondary" />,
          title: "Custom Development",
          description: "Tailored solutions built with modern technologies"
        },
        {
          icon: <Server className="h-6 w-6 text-secondary" />,
          title: "Maintenance & Support",
          description: "Ongoing support to keep your website running smoothly"
        }
      ]
    },
    {
      category: "Influencer Services",
      description: "Connect with top influencers to amplify your brand",
      features: [
        {
          icon: <Star className="h-6 w-6 text-accent" />,
          title: "Influencer Matching",
          description: "Find the perfect influencers that align with your brand values"
        },
        {
          icon: <Megaphone className="h-6 w-6 text-accent" />,
          title: "Campaign Management",
          description: "End-to-end management of influencer marketing campaigns"
        },
        {
          icon: <Camera className="h-6 w-6 text-accent" />,
          title: "Content Creation",
          description: "Professional content creation and storytelling strategies"
        }
      ]
    }
  ];

  return (
    <section id="services" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Comprehensive solutions to help your business thrive in the digital world
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">{service.category}</h3>
                <p className="text-gray-400">{service.description}</p>
              </div>
              
              <div className="grid gap-4">
                {service.features.map((feature, featureIndex) => (
                  <Card key={featureIndex} className="glass-card hover:scale-105 transition-transform duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="mt-1">{feature.icon}</div>
                        <div>
                          <h4 className="text-lg font-semibold mb-1">{feature.title}</h4>
                          <p className="text-gray-400">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
};