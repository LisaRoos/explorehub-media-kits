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
    isPremium: false 
  },
  { 
    icon: BarChart3, 
    label: "Analytics", 
    path: "/dashboard/analytics",
    isPremium: false 
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