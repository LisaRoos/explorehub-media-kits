import { TrendingUp, Users, BarChart2 } from "lucide-react";

export const FeatureHighlights = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <TrendingUp className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1">Real-Time Analytics</h3>
          <p className="text-gray-400">Showcase your growth and engagement metrics with live data</p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <div className="p-3 bg-secondary/10 rounded-lg">
          <Users className="h-6 w-6 text-secondary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1">Audience Insights</h3>
          <p className="text-gray-400">Share detailed demographics and audience behavior data</p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <div className="p-3 bg-accent/10 rounded-lg">
          <BarChart2 className="h-6 w-6 text-accent" />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1">Campaign Performance</h3>
          <p className="text-gray-400">Display your successful brand collaborations and results</p>
        </div>
      </div>
    </div>
  );
};