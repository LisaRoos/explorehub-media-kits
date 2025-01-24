import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SidebarFooter } from "@/components/ui/sidebar";

export const DashboardSidebarFooter = () => {
  const navigate = useNavigate();

  return (
    <SidebarFooter className="border-t border-border/50 p-4">
      <Button
        variant="ghost"
        className="w-full justify-start gap-2"
        onClick={() => navigate("/")}
      >
        Sign Out
      </Button>
    </SidebarFooter>
  );
};