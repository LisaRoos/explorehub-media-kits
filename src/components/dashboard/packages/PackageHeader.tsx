import { Button } from "@/components/ui/button";

interface PackageHeaderProps {
  isPaidUser: boolean;
  onUpgrade: () => void;
}

export const PackageHeader = ({ isPaidUser, onUpgrade }: PackageHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">My Packages</h1>
        <p className="text-muted-foreground mt-1">
          Manage your service packages and offerings
        </p>
      </div>
      <Button 
        onClick={onUpgrade}
        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
      >
        Create Package
      </Button>
    </div>
  );
};