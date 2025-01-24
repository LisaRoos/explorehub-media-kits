import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { DashboardLayout } from "./layout/DashboardLayout";
import { AnalyticsCards } from "./analytics/AnalyticsCards";
import { AnalyticsChart } from "./analytics/AnalyticsCharts";
import { useNavigate } from "react-router-dom";

const Analytics = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: "My Media Kit", path: "/dashboard" },
    { label: "Messages", path: "/dashboard/messages" },
    { label: "Analytics", path: "/dashboard/analytics" },
    { label: "My Packages", path: "/dashboard/packages" },
    { label: "Templates", path: "/dashboard/appearance" },
    { label: "Settings", path: "/dashboard/settings" },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-6 px-4 md:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold">Analytics</h1>
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-background">
                {menuItems.map((item) => (
                  <DropdownMenuItem
                    key={item.path}
                    className="cursor-pointer"
                    onClick={() => navigate(item.path)}
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid gap-6">
          <AnalyticsCards />
          <div className="grid gap-6 md:grid-cols-2">
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
      </div>
    </DashboardLayout>
  );
};

export default Analytics;