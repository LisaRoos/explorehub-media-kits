import { TrendingUp, Users, BarChart2 } from "lucide-react";

export const EngagementMetrics = () => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="text-center p-4 rounded-lg bg-primary/10">
        <TrendingUp className="w-6 h-6 mx-auto mb-2 text-primary" />
        <p className="text-sm font-medium">4.8%</p>
        <p className="text-xs text-gray-400">Eng. Rate</p>
      </div>
      <div className="text-center p-4 rounded-lg bg-primary/10">
        <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
        <p className="text-sm font-medium">1.2M</p>
        <p className="text-xs text-gray-400">Total Reach</p>
      </div>
      <div className="text-center p-4 rounded-lg bg-primary/10">
        <BarChart2 className="w-6 h-6 mx-auto mb-2 text-primary" />
        <p className="text-sm font-medium">89%</p>
        <p className="text-xs text-gray-400">Brand Fit</p>
      </div>
    </div>
  );
};