import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader,
  SidebarTrigger 
} from "@/components/ui/sidebar";
import { menuItems } from "./MenuItems";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Menu } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const DashboardSidebar = () => {
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
    <Sidebar>
      <SidebarHeader className="border-b border-border/50 p-4">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold gradient-text">ExploreHub</span>
          <SidebarTrigger>
            <Button variant="ghost" size="icon" className="ml-auto lg:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </SidebarTrigger>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-4">
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <div key={item.label}>
              <Button
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
              {index < menuItems.length - 1 && (
                <Separator className="my-2 opacity-50" />
              )}
            </div>
          ))}
        </div>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-border/50 p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2"
          onClick={() => navigate("/")}
        >
          Sign Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};