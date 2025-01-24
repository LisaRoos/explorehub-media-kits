import { Input } from "@/components/ui/input";
import { Image } from "lucide-react";

interface PackageMediaUploadProps {
  media: string[];
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PackageMediaUpload = ({ media, onImageUpload }: PackageMediaUploadProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Package Images</label>
        <Input
          type="file"
          accept="image/*"
          onChange={onImageUpload}
          className="mb-4"
        />
      </div>
      {media.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {media.map((url, index) => (
            <div key={index} className="relative group">
              <img
                src={url}
                alt={`Package image ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      )}
      {media.length === 0 && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Image className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">Upload package images</p>
        </div>
      )}
    </div>
  );
};