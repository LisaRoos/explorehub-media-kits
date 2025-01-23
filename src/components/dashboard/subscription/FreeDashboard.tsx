import { DashboardLayout } from "../layout/DashboardLayout";
import { DashboardHeader } from "../layout/DashboardHeader";
import { DashboardContent } from "../layout/DashboardContent";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const FreeDashboard = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <DashboardHeader
        title="Free Dashboard"
        description="Get started with your influencer journey"
      />
      <DashboardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Basic Analytics</h3>
            <p className="text-muted-foreground mb-4">View your basic engagement metrics</p>
            <Button onClick={() => navigate("/dashboard/analytics")}>
              View Analytics
            </Button>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Profile Management</h3>
            <p className="text-muted-foreground mb-4">Update your profile information</p>
            <Button onClick={() => navigate("/dashboard/settings")}>
              Manage Profile
            </Button>
          </Card>

          <Card className="p-6 bg-primary/5 border-primary">
            <h3 className="text-lg font-semibold mb-2">Upgrade to Pro</h3>
            <p className="text-muted-foreground mb-4">Get access to advanced features</p>
            <Button variant="default" onClick={() => navigate("/pricing")}>
              Upgrade Now
            </Button>
          </Card>
        </div>
      </DashboardContent>
    </DashboardLayout>
  );
};