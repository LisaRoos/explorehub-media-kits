import { Button } from "@/components/ui/button";
import { MessageCircle, Package } from "lucide-react";

export const ActionButtons = () => {
  return (
    <div className="space-y-2 mb-4">
      <Button 
        variant="outline" 
        className="w-full glass-card group hover:scale-105 transition-transform text-xs"
      >
        <MessageCircle className="w-3 h-3 mr-1 group-hover:scale-110 transition-transform" />
        Chat Now
      </Button>
      <Button 
        variant="outline" 
        className="w-full glass-card group hover:scale-105 transition-transform text-xs"
      >
        <Package className="w-3 h-3 mr-1 group-hover:scale-110 transition-transform" />
        My Packages
      </Button>
    </div>
  );
};