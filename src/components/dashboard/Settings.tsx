import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export const Settings = () => {
  const handleUnsubscribe = () => {
    // Here you would typically make an API call to handle the unsubscribe action
    toast.success("You have been unsubscribed successfully");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-4">Settings</h1>
          <div className="grid gap-6 max-w-2xl">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Display Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                <Button>Save Changes</Button>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Notifications</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <Button variant="outline">Configure</Button>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <Button variant="outline">Configure</Button>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Legal</h2>
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <Link to="/privacy-policy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                  <Link to="/terms-of-service" className="text-primary hover:underline">
                    Terms of Service
                  </Link>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold text-destructive">Danger Zone</h2>
              <Separator className="my-4" />
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <h3 className="font-medium">Unsubscribe from Service</h3>
                  <p className="text-sm text-muted-foreground">
                    This action will cancel your subscription and remove your access to premium features.
                  </p>
                  <Button 
                    variant="destructive" 
                    onClick={handleUnsubscribe}
                  >
                    Unsubscribe
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};