import { DashboardLayout } from "../layout/DashboardLayout";
import { DashboardHeader } from "../layout/DashboardHeader";
import { DashboardContent } from "../layout/DashboardContent";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const ProfessionalBrandDashboard = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <DashboardHeader
        title="Professional Brand Dashboard"
        description="Access all premium brand features"
      />
      <DashboardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Advanced Discovery</h3>
            <p className="text-muted-foreground mb-4">Advanced influencer search and filtering</p>
            <Button onClick={() => navigate("/brand-dashboard/find")}>
              Find Influencers
            </Button>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Campaign Hub</h3>
            <p className="text-muted-foreground mb-4">Comprehensive campaign management</p>
            <Button onClick={() => navigate("/brand-dashboard/campaigns")}>
              Manage Campaigns
            </Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Advanced Analytics</h3>
            <p className="text-muted-foreground mb-4">In-depth performance metrics</p>
            <Button onClick={() => navigate("/brand-dashboard/analytics")}>
              View Analytics
            </Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Team Management</h3>
            <p className="text-muted-foreground mb-4">Manage team access and roles</p>
            <Button onClick={() => navigate("/brand-dashboard/team")}>
              Manage Team
            </Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">ROI Tracking</h3>
            <p className="text-muted-foreground mb-4">Track campaign ROI and metrics</p>
            <Button onClick={() => navigate("/brand-dashboard/roi")}>
              View ROI
            </Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Content Library</h3>
            <p className="text-muted-foreground mb-4">Manage campaign content and assets</p>
            <Button onClick={() => navigate("/brand-dashboard/content")}>
              View Library
            </Button>
          </Card>
        </div>
      </DashboardContent>
    </DashboardLayout>
  );
};