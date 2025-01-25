import { 
  LayoutDashboard, 
  BarChart3, 
  Settings, 
  Palette, 
  Package 
} from "lucide-react";

export const menuItems = [
  { 
    icon: LayoutDashboard, 
    label: "Media Kit", 
    path: "/dashboard",
    isPremium: false,
    upgradeMessage: "" 
  },
  { 
    icon: BarChart3, 
    label: "Analytics", 
    path: "/dashboard/analytics",
    isPremium: false,
    upgradeMessage: "" 
  },
  { 
    icon: Package, 
    label: "My Packages", 
    path: "/dashboard/packages",
    isPremium: false,
    upgradeMessage: "" 
  },
  { 
    icon: Palette, 
    label: "Templates", 
    path: "/dashboard/appearance",
    isPremium: false,
    upgradeMessage: "" 
  },
  { 
    icon: Settings, 
    label: "Settings", 
    path: "/dashboard/settings",
    isPremium: false,
    upgradeMessage: "" 
  },
];