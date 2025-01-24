import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface PackageBasicInfoProps {
  title: string;
  setTitle: (value: string) => void;
  price: string;
  setPrice: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
}

export const PackageBasicInfo = ({
  title,
  setTitle,
  price,
  setPrice,
  description,
  setDescription,
}: PackageBasicInfoProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Package Title</label>
        <Input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter package title"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Price</label>
        <Input
          required
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price"
          min="0"
          step="0.01"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <Textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter package description"
          rows={4}
        />
      </div>
    </div>
  );
};