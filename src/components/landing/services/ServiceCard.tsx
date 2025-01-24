import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  icon: LucideIcon;
  category: string;
  description: string;
  features: string[];
}

export const ServiceCard = ({ icon: Icon, category, description, features }: ServiceCardProps) => {
  return (
    <Card className="glass-card hover:scale-105 transition-transform duration-300">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">{category}</h3>
          <p className="text-gray-400 text-sm mb-4">{description}</p>
          <ul className="space-y-2 text-sm">
            {features.map((feature, featureIndex) => (
              <li key={featureIndex} className="flex items-center justify-center">
                <span className="text-primary mr-2">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};