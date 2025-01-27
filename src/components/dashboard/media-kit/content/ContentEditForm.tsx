import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ContentEditFormProps {
  url: string;
  platform: string;
  onUrlChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const ContentEditForm = ({
  url,
  platform,
  onUrlChange,
  onSave,
  onCancel
}: ContentEditFormProps) => {
  return (
    <div className="space-y-2">
      <Input
        value={url}
        onChange={(e) => onUrlChange(e.target.value)}
        placeholder={`Enter your ${platform} content URL`}
        className="bg-white border-gray-200 focus:border-primary"
      />
      <p className="text-sm text-gray-500">
        Please enter the URL of the content you want to display (e.g., a post or video URL)
      </p>
      <div className="flex gap-2">
        <Button 
          size="sm" 
          onClick={onSave} 
          className="bg-primary hover:bg-primary/90"
        >
          Save
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={onCancel}
          className="bg-white hover:bg-gray-50"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};