import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  className?: string;
}

export const MetricCard = ({ icon: Icon, value, label, className = "" }: MetricCardProps) => {
  return (
    <div className={`text-center p-3 rounded-lg bg-primary/10 ${className}`}>
      <Icon className="w-4 h-4 mx-auto mb-1 text-primary" />
      <p className="text-xs font-medium">{value}</p>
      <p className="text-[10px] text-gray-400">{label}</p>
    </div>
  );
};