interface DashboardContentProps {
  children: React.ReactNode;
}

export const DashboardContent = ({ children }: DashboardContentProps) => {
  return (
    <div className="space-y-4 md:space-y-6">
      {children}
    </div>
  );
};