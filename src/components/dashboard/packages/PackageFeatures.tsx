import { PackageFeature } from "./types";

interface PackageFeaturesProps {
  features: PackageFeature[] | null;
}

export const PackageFeatures = ({ features }: PackageFeaturesProps) => {
  if (!features?.length) return null;

  return (
    <div className="space-y-2">
      <h4 className="font-medium">Features:</h4>
      <ul className="list-disc list-inside space-y-1">
        {features.map((feature, index) => (
          <li key={index} className="text-muted-foreground">
            {feature.title}
            {feature.description && (
              <span className="text-sm text-muted-foreground"> - {feature.description}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};