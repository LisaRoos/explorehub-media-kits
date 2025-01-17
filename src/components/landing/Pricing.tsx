import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Currency conversion rates (fixed for simplicity)
const CONVERSION_RATES = {
  USD: 1,
  EUR: 0.91,
  GBP: 0.79,
  AUD: 1.52,
  ZAR: 18.95,
} as const;

type Currency = keyof typeof CONVERSION_RATES;

const formatPrice = (price: string | number, currency: Currency) => {
  if (price === "Free") return "Free";
  const numericPrice = typeof price === "string" ? parseInt(price.replace("$", "")) : price;
  const convertedPrice = Math.round(numericPrice * CONVERSION_RATES[currency]);
  const currencySymbols: Record<Currency, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    AUD: "A$",
    ZAR: "R",
  };
  return `${currencySymbols[currency]}${convertedPrice}`;
};

  const influencerPlans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for beginners",
      features: [
        "Basic media kit template",
        "Social media integration",
        "Basic analytics",
        "Share with 3 brands",
        "Limited messaging (5/month)"
      ]
    },
    {
      name: "Pro",
      price: "$19",
      description: "Most popular choice",
      features: [
        "Premium media kit templates",
        "Advanced analytics",
        "Unlimited sharing",
        "Custom branding",
        "Priority support",
        "Real-time updates",
        "Unlimited messaging"
      ]
    },
    {
      name: "Enterprise",
      price: "$49",
      description: "For professional creators",
      features: [
        "All Pro features",
        "API access",
        "Multiple media kits",
        "Team collaboration",
        "Custom domain",
        "Dedicated support",
        "Analytics API",
        "Priority messaging"
      ]
    }
  ];

  const brandPlans = [
    {
      name: "Basic",
      price: "$99",
      description: "For small brands",
      features: [
        "Access to influencer directory",
        "Basic filtering options",
        "Contact up to 10 influencers/month",
        "View basic analytics",
        "Basic messaging"
      ]
    },
    {
      name: "Business",
      price: "$199",
      description: "For growing brands",
      features: [
        "Advanced search filters",
        "Unlimited influencer contacts",
        "Detailed analytics",
        "Campaign tracking",
        "Priority support",
        "Team collaboration",
        "Unlimited messaging"
      ]
    },
    {
      name: "Enterprise",
      price: "$499",
      description: "For large brands",
      features: [
        "All Business features",
        "API access",
        "Custom reporting",
        "Dedicated account manager",
        "White-label solution",
        "Advanced campaign analytics",
        "Multi-team access",
        "Priority messaging"
      ]
    }
  ];

export const Pricing = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<"influencer" | "brand">("influencer");
  const [currency, setCurrency] = useState<Currency>("USD");

  const plans = userType === "influencer" ? influencerPlans : brandPlans;

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Choose Your <span className="gradient-text">Plan</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Select the perfect plan for your journey to success
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
            <div className="flex justify-center gap-4">
              <Button
                variant={userType === "influencer" ? "default" : "outline"}
                onClick={() => setUserType("influencer")}
              >
                For Influencers
              </Button>
              <Button
                variant={userType === "brand" ? "default" : "outline"}
                onClick={() => setUserType("brand")}
              >
                For Brands
              </Button>
            </div>
            <Select value={currency} onValueChange={(value: Currency) => setCurrency(value)}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="EUR">EUR (€)</SelectItem>
                <SelectItem value="GBP">GBP (£)</SelectItem>
                <SelectItem value="AUD">AUD (A$)</SelectItem>
                <SelectItem value="ZAR">ZAR (R)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card key={index} className="glass-card relative overflow-hidden">
              {((userType === "influencer" && plan.name === "Pro") ||
                (userType === "brand" && plan.name === "Business")) && (
                <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-lg text-sm">
                  Popular
                </div>
              )}
              <CardHeader className="text-center p-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold mb-2">
                  {formatPrice(plan.price, currency)}
                  {plan.price !== "Free" && <span className="text-sm text-gray-400">/month</span>}
                </div>
                <p className="text-gray-400">{plan.description}</p>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full mt-6"
                  variant={
                    (userType === "influencer" && plan.name === "Pro") ||
                    (userType === "brand" && plan.name === "Business")
                      ? "default"
                      : "outline"
                  }
                  onClick={() => navigate("/signup")}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
