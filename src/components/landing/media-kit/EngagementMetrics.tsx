import { TrendingUp, Users, Eye } from "lucide-react";

export const EngagementMetrics = () => {
  return (
    <div className="grid grid-cols-3 gap-2 mb-4">
      <div className="text-center p-3 rounded-lg bg-primary/10">
        <Users className="w-4 h-4 mx-auto mb-1 text-primary" />
        <p className="text-xs font-medium">85K</p>
        <p className="text-[10px] text-gray-400">Followers</p>
      </div>
      <div className="text-center p-3 rounded-lg bg-primary/10">
        <Eye className="w-4 h-4 mx-auto mb-1 text-primary" />
        <p className="text-xs font-medium">12.5K</p>
        <p className="text-[10px] text-gray-400">Views</p>
      </div>
      <div className="text-center p-3 rounded-lg bg-primary/10">
        <TrendingUp className="w-4 h-4 mx-auto mb-1 text-primary" />
        <p className="text-xs font-medium">4.8%</p>
        <p className="text-[10px] text-gray-400">Eng. Rate</p>
      </div>
    </div>
  );
};