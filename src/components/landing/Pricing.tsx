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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
      "Limited content per platform",
      "Basic customization options"
    ]
  },
  {
    name: "Pro",
    price: "$10",
    description: "Most popular choice",
    features: [
      "Premium media kit templates",
      "Unlimited content showcase",
      "Advanced customization options",
      "Custom branding",
      "Priority support",
      "Multiple media kits",
      "Advanced analytics dashboard",
      "Detailed engagement metrics",
      "Performance tracking",
      "Growth insights"
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

const faqItems = {
  influencer: [
    {
      question: "How do I create a media kit?",
      answer: "Navigate to the Media Kit section in your dashboard. You can customize your media kit with your brand assets, statistics, and portfolio."
    },
    {
      question: "How is my engagement rate calculated?",
      answer: "Engagement rate is calculated by dividing total engagements (likes + comments) by your follower count, then multiplying by 100."
    },
    {
      question: "Can I connect multiple social media accounts?",
      answer: "Yes! You can connect accounts from different platforms to showcase your cross-platform presence."
    }
  ],
  brand: [
    {
      question: "Why should my business invest in influencer marketing?",
      answer: "Influencer marketing builds authentic connections with your target audience, increases brand awareness, and drives higher engagement rates compared to traditional advertising. It's particularly effective for reaching younger demographics and building social proof."
    },
    {
      question: "What ROI can I expect from influencer marketing?",
      answer: "On average, businesses earn $5.78 for every $1 spent on influencer marketing. However, ROI varies based on your industry, campaign goals, and influencer selection. Our platform helps you track and optimize these metrics."
    },
    {
      question: "How do I find the right influencers?",
      answer: "Use our advanced filtering system to search by niche, location, follower count, and engagement rates."
    },
    {
      question: "What metrics are available for campaign tracking?",
      answer: "Track impressions, engagement rates, click-through rates, and ROI through our analytics dashboard."
    },
    {
      question: "How do I initiate a collaboration?",
      answer: "Once you find a suitable influencer, you can message them directly through our platform to discuss collaboration details."
    },
    {
      question: "What makes a successful influencer campaign?",
      answer: "Successful campaigns typically involve clear objectives, authentic partnerships, creative freedom for influencers, and consistent tracking of key metrics. Our platform guides you through each step of this process."
    },
    {
      question: "How long does it take to see results?",
      answer: "While some metrics like engagement and reach are immediate, building brand awareness and driving conversions typically takes 3-6 months of consistent influencer partnerships. Our analytics help you track progress throughout."
    }
  ]
};

export const Pricing = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<"influencer" | "brand">("influencer");
  const [currency, setCurrency] = useState<Currency>("USD");

  const plans = userType === "influencer" ? influencerPlans : brandPlans;

  return (
    <section id="pricing" className="py-20 px-4">
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

        <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8">
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

        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h3>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqItems[userType].map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};
