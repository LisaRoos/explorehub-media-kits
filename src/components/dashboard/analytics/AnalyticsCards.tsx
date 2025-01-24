import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Users, Eye, Heart, MessageCircle } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, change, icon }: StatCardProps) => (
  <Card className="p-4 md:p-6 glass-card hover:scale-105 transition-transform">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <h3 className="text-lg md:text-2xl font-bold mt-2">{value}</h3>
      </div>
      <div className={`p-2 rounded-full ${change >= 0 ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
        {icon}
      </div>
    </div>
    <div className="mt-4 flex items-center">
      <span className={`text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'} flex items-center`}>
        {change >= 0 ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
        {Math.abs(change)}%
      </span>
      <span className="text-sm text-muted-foreground ml-2">from last month</span>
    </div>
  </Card>
);

export const AnalyticsCards = () => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Followers"
        value="24.5K"
        change={12}
        icon={<Users className="w-4 h-4 text-primary" />}
      />
      <StatCard
        title="Profile Views"
        value="8.9K"
        change={5.2}
        icon={<Eye className="w-4 h-4 text-primary" />}
      />
      <StatCard
        title="Engagement Rate"
        value="5.2%"
        change={3}
        icon={<Heart className="w-4 h-4 text-primary" />}
      />
      <StatCard
        title="Comments"
        value="1.2K"
        change={-2.1}
        icon={<MessageCircle className="w-4 h-4 text-primary" />}
      />
    </div>
  );
};