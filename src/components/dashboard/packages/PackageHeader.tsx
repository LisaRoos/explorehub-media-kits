import { Button } from "@/components/ui/button";

interface PackageHeaderProps {
  isPaidUser: boolean;
  onUpgrade: () => void;
}

export const PackageHeader = ({ isPaidUser, onUpgrade }: PackageHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">My Packages</h1>
      <Button 
        onClick={onUpgrade}
        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
      >
        Create Package
      </Button>
    </div>
  );
};