import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const gradients = [
  "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)",
  "linear-gradient(to right, #ee9ca7, #ffdde1)",
  "linear-gradient(to top, #accbee 0%, #e7f0fd 100%)",
  "linear-gradient(to top, #d299c2 0%, #fef9d7 100%)",
  "linear-gradient(90deg, hsla(277, 75%, 84%, 1) 0%, hsla(297, 50%, 51%, 1) 100%)",
  "linear-gradient(to right, #8B5CF6, #D946EF)",
  "linear-gradient(to right, #0EA5E9, #33C3F0)",
  "linear-gradient(to right, #F97316, #FEC6A1)",
];

const solidColors = [
  "#F2FCE2", // Soft Green
  "#FEF7CD", // Soft Yellow
  "#FEC6A1", // Soft Orange
  "#E5DEFF", // Soft Purple
  "#FFDEE2", // Soft Pink
  "#D3E4FD", // Soft Blue
  "#9b87f5", // Primary Purple
  "#8B5CF6", // Vivid Purple
];

export const BackgroundCustomizer = ({
  onBackgroundChange,
}: {
  onBackgroundChange: (background: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customUrl, setCustomUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCustomBackground = () => {
    if (!customUrl) {
      toast.error("Please enter a valid URL");
      return;
    }

    // Test if the URL is valid
    const img = new Image();
    img.onload = () => {
      onBackgroundChange(`url(${customUrl})`);
      toast.success("Custom background applied!");
      setCustomUrl("");
    };
    img.onerror = () => {
      toast.error("Invalid image URL. Please try another.");
    };
    img.src = customUrl;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('backgrounds')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('backgrounds')
        .getPublicUrl(filePath);

      onBackgroundChange(`url(${publicUrl})`);
      toast.success('Background image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload image. Please try again.');
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

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

          <h3 className="font-medium mb-2">Custom Background</h3>
          <div className="space-y-2">
            <Input
              type="url"
              placeholder="Enter image URL"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              className="w-full"
            />
            <Button 
              onClick={handleCustomBackground}
              className="w-full"
              variant="outline"
            >
              Apply Custom URL
            </Button>

            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                ref={fileInputRef}
                className="hidden"
                id="background-upload"
              />
              <Button 
                onClick={() => document.getElementById('background-upload')?.click()}
                className="w-full"
                variant="outline"
              >
                Upload Image
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};