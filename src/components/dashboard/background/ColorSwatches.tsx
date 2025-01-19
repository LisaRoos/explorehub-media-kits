import { gradients, solidColors } from "./BackgroundOptions";
import { toast } from "sonner";

interface ColorSwatchesProps {
  onBackgroundChange: (background: string) => void;
}

export const ColorSwatches = ({ onBackgroundChange }: ColorSwatchesProps) => {
  return (
    <>
      <h3 className="font-medium mb-2">Gradients</h3>
      <div className="grid grid-cols-4 gap-2 mb-4">
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
      <div className="grid grid-cols-4 gap-2 mb-4">
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
    </>
  );
};