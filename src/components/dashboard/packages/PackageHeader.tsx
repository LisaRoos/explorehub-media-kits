import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PackageHeaderProps } from "./types";

export const PackageHeader = ({ onCreateClick }: PackageHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">My Packages</h2>
      <Button onClick={onCreateClick} className="gap-2">
        <Plus className="w-4 h-4" />
        Create Package
      </Button>
    </div>
  );
};