import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Eye, FileImage } from "lucide-react";

export const BrandAssets = () => {
  return (
    <section className="space-y-3">
      <h2 className="text-base md:text-lg font-semibold">Brand Assets</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <Card className="p-4 hover:shadow-md transition-shadow">
          <h3 className="text-sm font-medium mb-2">Logo Package</h3>
          <p className="text-xs text-muted-foreground mb-3">
            Download our logo in various formats and sizes
          </p>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
            <Download className="w-3 h-3 mr-1" />
            Download ZIP
          </Button>
        </Card>
        <Card className="p-4 hover:shadow-md transition-shadow">
          <h3 className="text-sm font-medium mb-2">Brand Guidelines</h3>
          <p className="text-xs text-muted-foreground mb-3">
            Our complete brand style guide
          </p>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
            <Eye className="w-3 h-3 mr-1" />
            View PDF
          </Button>
        </Card>
        <Card className="p-4 hover:shadow-md transition-shadow">
          <h3 className="text-sm font-medium mb-2">Media Photos</h3>
          <p className="text-xs text-muted-foreground mb-3">
            High-resolution product and team photos
          </p>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
            <FileImage className="w-3 h-3 mr-1" />
            Browse Gallery
          </Button>
        </Card>
      </div>
    </section>
  );
};