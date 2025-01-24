import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MessageSquare } from "lucide-react";
import { StatsGrid } from "./analytics/StatsGrid";
import { AnalyticsChart } from "./analytics/AnalyticsCharts";

const Analytics = () => {
  const navigate = useNavigate();
  
  const { data: subscription } = useQuery({
    queryKey: ['subscription'],
    queryFn: async () => {
      const { data: subscription } = await supabase
        .from('subscriptions')
        .select('status')
        .maybeSingle();
      return subscription;
    },
  });

  const isPaidUser = subscription?.status === 'pro';

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Analytics Overview</h1>
              {!isPaidUser && (
                <Button 
                  onClick={() => navigate("/pricing")}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                >
                  Upgrade to Pro
                </Button>
              )}
            </div>

            <StatsGrid />

            <div className="grid gap-6 md:grid-cols-2">
              <AnalyticsChart 
                title="Account Growth"
                isPaidUser={isPaidUser}
                onUpgradeClick={() => navigate("/pricing")}
              />
              <AnalyticsChart 
                title="Engagement Metrics"
                isPaidUser={isPaidUser}
                onUpgradeClick={() => navigate("/pricing")}
              />
            </div>

            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => navigate("/dashboard/messages")}
                className="gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Chat Now
              </Button>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Analytics;