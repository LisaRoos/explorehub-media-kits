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
  title?: string;
  description?: string;
}

export const DashboardHeader = ({ title, description }: DashboardHeaderProps) => {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Media Kit", path: "/dashboard" },
    { label: "Messages", path: "/dashboard/messages" },
    { label: "Analytics", path: "/dashboard/analytics" },
    { label: "Packages", path: "/dashboard/packages" },
    { label: "Settings", path: "/dashboard/settings" },
  ];

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4">
        <div>
          <h1 className="text-sm md:text-base font-semibold">{title}</h1>
          {description && (
            <p className="text-xs md:text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 bg-background">
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
    </div>
  );
};