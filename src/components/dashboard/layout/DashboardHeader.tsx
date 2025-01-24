import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
  title: string;
  description?: string;
}

export const DashboardHeader = ({ title, description }: DashboardHeaderProps) => {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Overview", path: "/dashboard" },
    { label: "Messages", path: "/dashboard/messages" },
    { label: "Analytics", path: "/dashboard/analytics" },
    { label: "Media Kit", path: "/dashboard/media-kit" },
    { label: "Packages", path: "/dashboard/packages" },
    { label: "Settings", path: "/dashboard/settings" },
  ];

  return (
    <div className="flex items-center justify-between mb-4 p-2 md:p-4 border-b">
      <div>
        <h1 className="text-lg md:text-2xl font-bold">{title}</h1>
        {description && (
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            {description}
          </p>
        )}
      </div>
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Menu className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            {menuItems.map((item) => (
              <DropdownMenuItem
                key={item.path}
                className="text-xs py-1.5"
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};