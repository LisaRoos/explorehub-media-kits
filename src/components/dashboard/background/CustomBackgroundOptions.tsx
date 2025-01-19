import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface CustomBackgroundOptionsProps {
  onBackgroundChange: (background: string) => void;
}

export const CustomBackgroundOptions = ({ onBackgroundChange }: CustomBackgroundOptionsProps) => {
  const [customUrl, setCustomUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCustomBackground = () => {
    if (!customUrl) {
      toast.error("Please enter a valid URL");
      return;
    }

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

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
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

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
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
  );
};