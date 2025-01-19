import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Eye, LineChart } from "lucide-react";

interface ProfileToggleProps {
  view: "analytics" | "public";
  onViewChange: (view: "analytics" | "public") => void;
}

export const ProfileToggle = ({ view, onViewChange }: ProfileToggleProps) => {
  return (
    <div className="flex justify-center mb-6">
      <ToggleGroup type="single" value={view} onValueChange={(value) => onViewChange(value as "analytics" | "public")}>
        <ToggleGroupItem value="analytics" aria-label="Toggle analytics view">
          <LineChart className="h-4 w-4 mr-2" />
          Analytics View
        </ToggleGroupItem>
        <ToggleGroupItem value="public" aria-label="Toggle public view">
          <Eye className="h-4 w-4 mr-2" />
          Public View
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};