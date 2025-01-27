import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

interface ContentHeaderProps {
  platform: string;
  icon: React.ReactNode;
  isEditable: boolean;
  isEditing: boolean;
  onEdit: () => void;
}

export const ContentHeader = ({ 
  platform, 
  icon, 
  isEditable, 
  isEditing, 
  onEdit 
}: ContentHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="font-semibold text-gray-900">{platform}</h3>
      </div>
      {isEditable && !isEditing && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onEdit}
          className="h-8 w-8"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};