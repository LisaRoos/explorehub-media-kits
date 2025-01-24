import { DashboardSidebar } from "./Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardHeader } from "./layout/DashboardHeader";
import { AnalyticsCards } from "./analytics/AnalyticsCards";
import { AnalyticsChart } from "./analytics/AnalyticsCharts";

const Analytics = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <main className="flex-1">
          <DashboardHeader 
            title="Analytics" 
            description="Track your performance and growth"
          />
          <div className="p-8 space-y-8">
            <AnalyticsCards />
            <AnalyticsChart 
              title="Engagement Over Time"
              isPaidUser={true}
              onUpgradeClick={() => {}}
            />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Analytics;