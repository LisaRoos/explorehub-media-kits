import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PricingCardProps {
  name: string;
  price: string | number;
  description: string;
  features: string[];
  isPopular?: boolean;
  formattedPrice: string;
  isComingSoon?: boolean;
}

export const PricingCard = ({
  name,
  price,
  description,
  features,
  isPopular,
  formattedPrice,
  isComingSoon
}: PricingCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className={`glass-card relative overflow-hidden ${isComingSoon ? 'blur-sm' : ''}`}>
      {isPopular && (
        <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-lg text-sm">
          Popular
        </div>
      )}
      {isComingSoon && (
        <div className="absolute inset-0 flex items-center justify-center z-10 backdrop-blur-none pointer-events-none">
          <span className="text-2xl font-bold text-primary bg-background/80 px-6 py-3 rounded-lg">
            Coming Soon
          </span>
        </div>
      )}
      <CardHeader className="text-center p-6">
        <h3 className="text-2xl font-bold mb-2">{name}</h3>
        <div className="text-4xl font-bold mb-2">
          {formattedPrice}
          {price !== "Free" && <span className="text-sm text-gray-400">/month</span>}
        </div>
        <p className="text-gray-400">{description}</p>
      </CardHeader>
      <CardContent className="p-6">
        <ul className="space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Button 
          className="w-full mt-6"
          variant={isPopular ? "default" : "outline"}
          onClick={() => navigate("/signup")}
          disabled={isComingSoon}
        >
          {isComingSoon ? "Coming Soon" : "Get Started"}
        </Button>
      </CardContent>
    </Card>
  );
};