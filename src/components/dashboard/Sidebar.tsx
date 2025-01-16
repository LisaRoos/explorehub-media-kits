import {
  LayoutDashboard,
  BarChart3,
  Users,
  Settings,
  Menu,
  Share2,
  Palette,
  FileEdit,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";

export const DashboardSidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: MessageSquare, label: "Messages", path: "/dashboard/messages" },
    { icon: Share2, label: "Social Media", path: "/dashboard/social-media" },
    { icon: FileEdit, label: "Media Kit", path: "/dashboard/media-kit" },
    { icon: BarChart3, label: "Analytics", path: "/dashboard/analytics" },
    { icon: Users, label: "Audience", path: "/dashboard/audience" },
    { icon: Palette, label: "Appearance", path: "/dashboard/appearance" },
    { icon: Settings, label: "Settings", path: "/dashboard/settings" },
  ];

  return (
    <Sidebar>
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
      <SidebarContent className="p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className="w-full justify-start gap-2"
              onClick={() => navigate(item.path)}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Button>
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