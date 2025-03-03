import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { InfluencerCard } from "./InfluencerCard";

const mockInfluencers = [
  {
    id: 1,
    name: "Sarah Johnson",
    type: "Lifestyle & Fashion",
    location: "New York, USA",
    followers: "245K",
    engagement: "5.2%",
    demographics: "18-24 (65%)",
    profileImage: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Mike Chen",
    type: "Food & Travel",
    location: "Los Angeles, USA",
    followers: "500K",
    engagement: "4.8%",
    demographics: "25-34 (45%)",
    profileImage: "/placeholder.svg",
  },
];

const BrandOverview = () => {
  const [filters, setFilters] = useState<{
    type: string;
    location: string;
    minFollowers: string;
  }>({
    type: "",
    location: "",
    minFollowers: "",
  });

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h2 className="text-lg md:text-2xl font-bold mb-4">Find Influencers</h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4 mb-6 md:mb-8">
          <Select
            onValueChange={(value) => setFilters((prev) => ({ ...prev, type: value }))}
          >
            <SelectTrigger className="text-sm md:text-base">
              <SelectValue placeholder="Influencer Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lifestyle">Lifestyle & Fashion</SelectItem>
              <SelectItem value="food">Food & Travel</SelectItem>
              <SelectItem value="tech">Tech & Gaming</SelectItem>
              <SelectItem value="fitness">Fitness & Health</SelectItem>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => setFilters((prev) => ({ ...prev, location: value }))}
          >
            <SelectTrigger className="text-sm md:text-base">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usa">United States</SelectItem>
              <SelectItem value="europe">Europe</SelectItem>
              <SelectItem value="asia">Asia</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="number"
            placeholder="Minimum Followers"
            className="text-sm md:text-base"
            onChange={(e) => setFilters((prev) => ({ ...prev, minFollowers: e.target.value }))}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {mockInfluencers.map((influencer) => (
          <InfluencerCard key={influencer.id} influencer={influencer} />
        ))}
      </div>
    </div>
  );
};

export default BrandOverview;