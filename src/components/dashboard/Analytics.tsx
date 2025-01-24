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
import { MessageSquare, Users, Activity, Share2 } from "lucide-react";

const mockData = [
  { name: "Jan", followers: 4000, engagement: 2400, reached: 8000, profileViews: 1200 },
  { name: "Feb", followers: 3000, engagement: 1398, reached: 7500, profileViews: 1100 },
  { name: "Mar", followers: 2000, engagement: 9800, reached: 9000, profileViews: 1500 },
  { name: "Apr", followers: 2780, engagement: 3908, reached: 8200, profileViews: 1300 },
  { name: "May", followers: 1890, engagement: 4800, reached: 7800, profileViews: 1250 },
  { name: "Jun", followers: 2390, engagement: 3800, reached: 8500, profileViews: 1400 },
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

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="p-6">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <h3 className="text-sm font-medium">Accounts Reached</h3>
                </div>
                <p className="text-2xl font-bold mt-2">8.5K</p>
                <p className="text-xs text-muted-foreground mt-1">+12.3% from last month</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-muted-foreground" />
                  <h3 className="text-sm font-medium">Accounts Engaged</h3>
                </div>
                <p className="text-2xl font-bold mt-2">4.2K</p>
                <p className="text-xs text-muted-foreground mt-1">+8.1% from last month</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-muted-foreground" />
                  <h3 className="text-sm font-medium">Profile Activity</h3>
                </div>
                <p className="text-2xl font-bold mt-2">1.8K</p>
                <p className="text-xs text-muted-foreground mt-1">+15.4% from last month</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-muted-foreground" />
                  <h3 className="text-sm font-medium">Engagement Rate</h3>
                </div>
                <p className="text-2xl font-bold mt-2">4.8%</p>
                <p className="text-xs text-muted-foreground mt-1">+2.1% from last month</p>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Account Growth</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="reached" 
                        stroke="#8884d8" 
                        strokeWidth={2}
                        name="Accounts Reached"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="profileViews" 
                        stroke="#82ca9d" 
                        strokeWidth={2}
                        name="Profile Views"
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
                <h3 className="text-lg font-semibold mb-4">Engagement Metrics</h3>
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

            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => navigate("/dashboard/messages")}
                className="gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Chat Now
              </Button>
            </div>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Profile Activity Overview</h3>
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
                  <div>Profile Activity Content</div>
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