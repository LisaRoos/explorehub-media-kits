import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ColorSwatches } from "./background/ColorSwatches";
import { CustomBackgroundOptions } from "./background/CustomBackgroundOptions";

export const BackgroundCustomizer = ({
  onBackgroundChange,
}: {
  onBackgroundChange: (background: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="mb-2"
      >
        Customize Background
      </Button>
      
      {isOpen && (
        <Card className="p-4 w-80 animate-fade-in">
          <ColorSwatches onBackgroundChange={onBackgroundChange} />
          
          <h3 className="font-medium mb-2">Custom Background</h3>
          <CustomBackgroundOptions onBackgroundChange={onBackgroundChange} />
        </Card>
      )}
    </div>
  );
};