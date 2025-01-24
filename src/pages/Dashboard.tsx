import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { BackgroundCustomizer } from "@/components/dashboard/BackgroundCustomizer";
import { Overview } from "@/components/dashboard/Overview";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { DashboardHeader } from "@/components/dashboard/layout/DashboardHeader";

const Dashboard = () => {
  const [background, setBackground] = useState("linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)");

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile');
        throw error;
      }

      return profile;
    },
  });

  const { data: subscription } = useQuery({
    queryKey: ['subscription'],
    queryFn: async () => {
      const { data: subscription, error } = await supabase
        .from('subscriptions')
        .select('status')
        .eq('profile_id', profile?.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching subscription:', error);
        toast.error('Failed to load subscription status');
        throw error;
      }

      return subscription;
    },
    enabled: !!profile?.id,
  });

  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Skeleton className="h-32 w-32" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div 
        className="min-h-screen flex flex-col w-full transition-all duration-300"
        style={{ background }}
      >
        <DashboardHeader 
          title="Dashboard" 
          description="Welcome to your dashboard"
        />
        <div className="flex flex-1">
          <DashboardSidebar />
          <main className="flex-1 p-4 md:p-8 overflow-auto">
            <Overview />
          </main>
          <BackgroundCustomizer onBackgroundChange={setBackground} />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;