import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PricingCard } from "./pricing/PricingCard";
import { PricingFAQ } from "./pricing/PricingFAQ";
import { CurrencySelector } from "./pricing/CurrencySelector";

const CONVERSION_RATES = {
  USD: { rate: 1, symbol: "$" },
  EUR: { rate: 0.91, symbol: "€" },
  GBP: { rate: 0.79, symbol: "£" },
  AUD: { rate: 1.52, symbol: "A$" },
  ZAR: { rate: 18.95, symbol: "R" },
} as const;

type Currency = keyof typeof CONVERSION_RATES;

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
    price: "10",
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
    price: "59",
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
    name: "Professional",
    price: "129",
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
    }
  ]
};

export const Pricing = () => {
  const [userType, setUserType] = useState<"influencer" | "brand">("influencer");
  const [currency, setCurrency] = useState<Currency>("USD");

  const plans = userType === "influencer" ? influencerPlans : brandPlans;

  const formatPrice = (price: string | number, selectedCurrency: Currency) => {
    if (typeof price === "string" && price === "Free") return "Free";
    
    const numericPrice = Number(price);
    const convertedPrice = (numericPrice * CONVERSION_RATES[selectedCurrency].rate).toFixed(2);
    return `${CONVERSION_RATES[selectedCurrency].symbol}${convertedPrice}`;
  };

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
            <CurrencySelector 
              currency={currency} 
              onCurrencyChange={(value: Currency) => setCurrency(value)} 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8">
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              name={plan.name}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              isPopular={
                (userType === "influencer" && plan.name === "Pro") ||
                (userType === "brand" && plan.name === "Professional")
              }
              formattedPrice={formatPrice(plan.price, currency)}
              isComingSoon={userType === "brand"}
            />
          ))}
        </div>

        <PricingFAQ items={faqItems[userType]} />
      </div>
    </section>
  );
};