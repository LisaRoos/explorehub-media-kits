import { 
  LayoutDashboard, 
  BarChart3, 
  Settings, 
  Palette, 
  MessageSquare, 
  Package 
} from "lucide-react";

export const menuItems = [
  { 
    icon: LayoutDashboard, 
    label: "Media Kit", 
    path: "/dashboard",
    isPremium: false 
  },
  { 
    icon: BarChart3, 
    label: "Analytics", 
    path: "/dashboard/analytics",
    isPremium: false 
  },
  { 
    icon: MessageSquare, 
    label: "Messages", 
    path: "/dashboard/messages",
    isPremium: true,
    upgradeMessage: "Upgrade to access messaging features"
  },
  { 
    icon: Package, 
    label: "My Packages", 
    path: "/dashboard/packages",
    isPremium: false 
  },
  { 
    icon: Palette, 
    label: "Templates", 
    path: "/dashboard/appearance",
    isPremium: false 
  },
  { 
    icon: Settings, 
    label: "Settings", 
    path: "/dashboard/settings",
    isPremium: false 
  },
];