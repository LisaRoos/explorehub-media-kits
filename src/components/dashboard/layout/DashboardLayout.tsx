import { DashboardHeader } from "./DashboardHeader";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen w-full">
      <DashboardHeader />
      <div className="py-4 md:py-6 px-4 md:px-6 space-y-6">
        {children}
      </div>
    </div>
  );
};