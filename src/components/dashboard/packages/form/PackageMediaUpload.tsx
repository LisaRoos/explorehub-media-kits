import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Image, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PackageMediaUploadProps {
  media: string[];
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove?: (index: number) => void;
}

export const PackageMediaUpload = ({ 
  media, 
  onImageUpload,
  onImageRemove 
}: PackageMediaUploadProps) => {
  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <div className="space-y-2">
          <Label htmlFor="media">Package Images</Label>
          <Input
            id="media"
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            className="cursor-pointer"
          />
        </div>
        
        {media.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {media.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  alt={`Package image ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                {onImageRemove && (
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => onImageRemove(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Image className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">Upload package images</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};