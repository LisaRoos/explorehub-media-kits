import { Users, Activity, Share2 } from "lucide-react";
import { StatCard } from "./StatCard";

export const StatsGrid = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Accounts Reached"
        value="8.5K"
        change={12.3}
        icon={<Users className="w-4 h-4 text-muted-foreground" />}
      />
      <StatCard
        title="Accounts Engaged"
        value="4.2K"
        change={8.1}
        icon={<Activity className="w-4 h-4 text-muted-foreground" />}
      />
      <StatCard
        title="Profile Activity"
        value="1.8K"
        change={15.4}
        icon={<Share2 className="w-4 h-4 text-muted-foreground" />}
      />
      <StatCard
        title="Engagement Rate"
        value="4.8%"
        change={2.1}
        icon={<Activity className="w-4 h-4 text-muted-foreground" />}
      />
    </div>
  );
};