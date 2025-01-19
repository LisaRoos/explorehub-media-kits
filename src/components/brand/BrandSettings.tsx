import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export const BrandSettings = () => {
  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  const handleUnsubscribe = () => {
    toast.success("Unsubscribed successfully");
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Brand Settings</h2>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Brand Information</h3>
        <div className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="brandName">Brand Name</Label>
            <Input type="text" id="brandName" placeholder="Your Brand Name" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Contact Email</Label>
            <Input type="email" id="email" placeholder="contact@brand.com" />
          </div>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Legal Documents</h3>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Link 
              to="/terms-of-service" 
              target="_blank"
              className="text-primary hover:underline flex items-center gap-2"
            >
              Terms of Service
            </Link>
            <Link 
              to="/privacy-policy" 
              target="_blank"
              className="text-primary hover:underline flex items-center gap-2"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-destructive">
        <h3 className="text-lg font-medium mb-4 text-destructive">Danger Zone</h3>
        <Button variant="destructive" onClick={handleUnsubscribe}>
          Unsubscribe
        </Button>
      </Card>
    </div>
  );
};