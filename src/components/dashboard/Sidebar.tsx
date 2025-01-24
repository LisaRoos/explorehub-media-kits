import { Sidebar } from "@/components/ui/sidebar";
import { DashboardSidebarHeader } from "./sidebar/SidebarHeader";
import { DashboardSidebarContent } from "./sidebar/SidebarContent";
import { DashboardSidebarFooter } from "./sidebar/SidebarFooter";

export const DashboardSidebar = () => {
  return (
    <Sidebar>
      <DashboardSidebarHeader />
      <DashboardSidebarContent />
      <DashboardSidebarFooter />
    </Sidebar>
  );
};