import { DashboardLayout } from "../layout/DashboardLayout";
import { DashboardHeader } from "../layout/DashboardHeader";
import { DashboardContent } from "../layout/DashboardContent";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const ProDashboard = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <DashboardHeader
        title="Pro Dashboard"
        description="Access all premium influencer features"
      />
      <DashboardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Advanced Analytics</h3>
            <p className="text-muted-foreground mb-4">Deep dive into your performance metrics</p>
            <Button onClick={() => navigate("/dashboard/analytics")}>
              View Analytics
            </Button>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Brand Collaborations</h3>
            <p className="text-muted-foreground mb-4">Manage your brand partnerships</p>
            <Button onClick={() => navigate("/dashboard/collaborations")}>
              View Collaborations
            </Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Media Kit</h3>
            <p className="text-muted-foreground mb-4">Create and manage your professional media kit</p>
            <Button onClick={() => navigate("/dashboard/media-kit")}>
              Edit Media Kit
            </Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Campaign Manager</h3>
            <p className="text-muted-foreground mb-4">Track and manage your campaigns</p>
            <Button onClick={() => navigate("/dashboard/campaigns")}>
              Manage Campaigns
            </Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Content Calendar</h3>
            <p className="text-muted-foreground mb-4">Plan and schedule your content</p>
            <Button onClick={() => navigate("/dashboard/calendar")}>
              View Calendar
            </Button>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Performance Reports</h3>
            <p className="text-muted-foreground mb-4">Generate detailed performance reports</p>
            <Button onClick={() => navigate("/dashboard/reports")}>
              Generate Reports
            </Button>
          </Card>
        </div>
      </DashboardContent>
    </DashboardLayout>
  );
};