import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CurrencySelectorProps {
  currency: string;
  onCurrencyChange: (value: string) => void;
}

export const CurrencySelector = ({ currency, onCurrencyChange }: CurrencySelectorProps) => {
  return (
    <Select value={currency} onValueChange={onCurrencyChange}>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Currency" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="USD">USD ($)</SelectItem>
        <SelectItem value="EUR">EUR (€)</SelectItem>
        <SelectItem value="GBP">GBP (£)</SelectItem>
        <SelectItem value="AUD">AUD (A$)</SelectItem>
        <SelectItem value="ZAR">ZAR (R)</SelectItem>
      </SelectContent>
    </Select>
  );
};