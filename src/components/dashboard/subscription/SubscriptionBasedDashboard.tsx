import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FreeDashboard } from "./FreeDashboard";
import { ProDashboard } from "./ProDashboard";
import { BasicBrandDashboard } from "./BasicBrandDashboard";
import { ProfessionalBrandDashboard } from "./ProfessionalBrandDashboard";
import { Skeleton } from "@/components/ui/skeleton";

export const SubscriptionBasedDashboard = () => {
  const { data: subscription, isLoading } = useQuery({
    queryKey: ['subscription'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data: subscription } = await supabase
        .from('subscriptions')
        .select('status')
        .eq('profile_id', user.id)
        .single();
      
      return subscription;
    },
  });

  if (isLoading) {
    return <Skeleton className="w-full h-[500px]" />;
  }

  switch (subscription?.status) {
    case 'pro':
      return <ProDashboard />;
    case 'basic_brand':
      return <BasicBrandDashboard />;
    case 'professional_brand':
      return <ProfessionalBrandDashboard />;
    default:
      return <FreeDashboard />;
  }
};