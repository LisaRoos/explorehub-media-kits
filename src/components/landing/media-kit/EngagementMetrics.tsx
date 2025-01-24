import { Users, Eye, TrendingUp } from "lucide-react";
import { MetricCard } from "./MetricCard";

export const EngagementMetrics = () => {
  return (
    <div className="grid grid-cols-3 gap-2 mb-4">
      <MetricCard
        icon={Users}
        value="85K"
        label="Total Followers"
      />
      <MetricCard
        icon={Eye}
        value="12.5K"
        label="Profile Views"
      />
      <MetricCard
        icon={TrendingUp}
        value="4.8%"
        label="Eng. Rate"
      />
    </div>
  );
};