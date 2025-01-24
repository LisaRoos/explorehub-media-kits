import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarHeader, SidebarTrigger } from "@/components/ui/sidebar";

export const DashboardSidebarHeader = () => {
  return (
    <SidebarHeader className="border-b border-border/50 p-4">
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold gradient-text">ExploreHub</span>
        <SidebarTrigger>
          <Button variant="ghost" size="icon" className="ml-auto">
            <Menu className="h-4 w-4" />
          </Button>
        </SidebarTrigger>
      </div>
    </SidebarHeader>
  );
};