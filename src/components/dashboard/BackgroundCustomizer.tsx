import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const gradients = [
  "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)",
  "linear-gradient(to right, #ee9ca7, #ffdde1)",
  "linear-gradient(to top, #accbee 0%, #e7f0fd 100%)",
  "linear-gradient(to top, #d299c2 0%, #fef9d7 100%)",
  "linear-gradient(90deg, hsla(277, 75%, 84%, 1) 0%, hsla(297, 50%, 51%, 1) 100%)",
];

const solidColors = [
  "#F2FCE2",
  "#FEF7CD",
  "#FEC6A1",
  "#E5DEFF",
  "#FFDEE2",
];

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
        <Card className="p-4 w-64 animate-fade-in">
          <h3 className="font-medium mb-2">Gradients</h3>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {gradients.map((gradient, index) => (
              <button
                key={index}
                className="w-full h-12 rounded-md cursor-pointer hover:scale-105 transition-transform"
                style={{ background: gradient }}
                onClick={() => {
                  onBackgroundChange(gradient);
                  toast.success("Background updated!");
                }}
              />
            ))}
          </div>
          
          <h3 className="font-medium mb-2">Solid Colors</h3>
          <div className="grid grid-cols-3 gap-2">
            {solidColors.map((color, index) => (
              <button
                key={index}
                className="w-full h-12 rounded-md cursor-pointer hover:scale-105 transition-transform"
                style={{ backgroundColor: color }}
                onClick={() => {
                  onBackgroundChange(color);
                  toast.success("Background updated!");
                }}
              />
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};