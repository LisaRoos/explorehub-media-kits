interface DashboardContentProps {
  children: React.ReactNode;
}

export const DashboardContent = ({ children }: DashboardContentProps) => {
  return (
    <div className="space-y-8">
      {children}
    </div>
  );
};