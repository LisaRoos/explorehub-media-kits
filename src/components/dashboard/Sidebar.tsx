import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SidebarContent } from "@/components/ui/sidebar";
import { menuItems } from "./MenuItems";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const DashboardSidebarContent = () => {
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

  const isPaidUser = subscription?.status === 'pro' || 
                    subscription?.status === 'basic_brand' || 
                    subscription?.status === 'professional_brand';

  const handleUpgradeClick = () => {
    navigate('/pricing');
  };

  return (
    <SidebarContent className="p-4">
      <div className="space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.label}
            variant={location.pathname === item.path ? "secondary" : "ghost"}
            className={`w-full justify-start gap-2 ${
              item.isPremium && !isPaidUser ? "opacity-50" : ""
            }`}
            onClick={() => {
              if (item.isPremium && !isPaidUser) {
                toast.info(item.upgradeMessage || "Upgrade to access this feature");
                handleUpgradeClick();
              } else {
                navigate(item.path);
              }
            }}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
            {item.isPremium && !isPaidUser && (
              <span className="ml-auto text-xs text-muted-foreground">PRO</span>
            )}
          </Button>
        ))}
      </div>
    </SidebarContent>
  );
};

export const DashboardSidebar = () => {
  return <DashboardSidebarContent />;
};