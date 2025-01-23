import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const mockData = [
  { name: "Jan", followers: 4000, engagement: 2400 },
  { name: "Feb", followers: 3000, engagement: 1398 },
  { name: "Mar", followers: 2000, engagement: 9800 },
  { name: "Apr", followers: 2780, engagement: 3908 },
  { name: "May", followers: 1890, engagement: 4800 },
  { name: "Jun", followers: 2390, engagement: 3800 },
];

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

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Follower Growth</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="followers" 
                        stroke="#8884d8" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                {!isPaidUser && (
                  <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      This is a preview. Upgrade to Pro to see your actual analytics.
                    </p>
                  </div>
                )}
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Engagement Rate</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="engagement" 
                        stroke="#82ca9d" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                {!isPaidUser && (
                  <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      This is a preview. Upgrade to Pro to see your actual analytics.
                    </p>
                  </div>
                )}
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Audience Demographics</h3>
              <div className="h-[400px] flex items-center justify-center bg-muted/10 rounded-lg">
                {!isPaidUser ? (
                  <div className="text-center p-8">
                    <h4 className="text-xl font-semibold mb-4">
                      Unlock Detailed Analytics
                    </h4>
                    <p className="text-muted-foreground mb-6">
                      Get access to detailed audience demographics, engagement metrics,
                      and more with our Pro plan.
                    </p>
                    <Button 
                      onClick={() => navigate("/pricing")}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    >
                      Upgrade to Pro
                    </Button>
                  </div>
                ) : (
                  <div>Audience Demographics Content</div>
                )}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Analytics;