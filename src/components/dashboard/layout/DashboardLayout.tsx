interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen w-full py-4 md:py-8 space-y-6">
      {children}
    </div>
  );
};