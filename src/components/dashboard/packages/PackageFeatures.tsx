import { PackageFeature } from "./types";
import { Check } from "lucide-react";

interface PackageFeaturesProps {
  features: PackageFeature[] | null;
}

export const PackageFeatures = ({ features }: PackageFeaturesProps) => {
  if (!features?.length) return null;

  return (
    <div className="space-y-2">
      <h4 className="font-medium">What's included:</h4>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-medium">{feature.title}</span>
              {feature.description && (
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};