import { DashboardLayout } from "./layout/DashboardLayout";
import { DashboardHeader } from "./layout/DashboardHeader";
import { AnalyticsCards } from "./analytics/AnalyticsCards";
import { AnalyticsChart } from "./analytics/AnalyticsCharts";
import { useNavigate } from "react-router-dom";

const Analytics = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex w-full">
      <DashboardSidebar />
      <main className="flex-1">
        <DashboardHeader 
          title="Analytics" 
          description="Track your performance metrics"
        />
        <div className="p-3 md:p-6 space-y-4 md:space-y-6">
          <AnalyticsCards />
          <div className="grid gap-4 md:grid-cols-2">
            <AnalyticsChart 
              title="Account Growth"
              isPaidUser={true}
              onUpgradeClick={() => navigate("/pricing")}
            />
            <AnalyticsChart 
              title="Engagement Metrics"
              isPaidUser={true}
              onUpgradeClick={() => navigate("/pricing")}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;