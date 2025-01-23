import { DashboardLayout } from "../layout/DashboardLayout";
import { DashboardHeader } from "../layout/DashboardHeader";
import { DashboardContent } from "../layout/DashboardContent";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const BasicBrandDashboard = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <DashboardHeader
        title="Basic Brand Dashboard"
        description="Manage your brand collaborations"
      />
      <DashboardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Influencer Discovery</h3>
            <p className="text-muted-foreground mb-4">Find and connect with influencers</p>
            <Button onClick={() => navigate("/brand-dashboard/find")}>
              Find Influencers
            </Button>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Campaign Management</h3>
            <p className="text-muted-foreground mb-4">Track your ongoing campaigns</p>
            <Button onClick={() => navigate("/brand-dashboard/campaigns")}>
              View Campaigns
            </Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Basic Analytics</h3>
            <p className="text-muted-foreground mb-4">View campaign performance</p>
            <Button onClick={() => navigate("/brand-dashboard/analytics")}>
              View Analytics
            </Button>
          </Card>

          <Card className="p-6 bg-primary/5 border-primary">
            <h3 className="text-lg font-semibold mb-2">Upgrade to Professional</h3>
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