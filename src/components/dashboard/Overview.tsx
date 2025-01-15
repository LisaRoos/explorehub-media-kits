import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useState } from "react";

const data = [
  { name: "Jan", value: 2400 },
  { name: "Feb", value: 1398 },
  { name: "Mar", value: 9800 },
  { name: "Apr", value: 3908 },
  { name: "May", value: 4800 },
  { name: "Jun", value: 3800 },
];

const colorSchemes = {
  blue: { primary: "#4F46E5", secondary: "#00BFFF", accent: "#FF1493" },
  green: { primary: "#10B981", secondary: "#34D399", accent: "#6EE7B7" },
  purple: { primary: "#8B5CF6", secondary: "#A78BFA", accent: "#C4B5FD" },
  orange: { primary: "#F97316", secondary: "#FB923C", accent: "#FDBA74" },
};

export const Overview = () => {
  const [selectedScheme, setSelectedScheme] = useState<keyof typeof colorSchemes>("blue");

  const handleColorSchemeChange = (scheme: keyof typeof colorSchemes) => {
    setSelectedScheme(scheme);
    document.documentElement.style.setProperty('--primary', colorSchemes[scheme].primary);
    document.documentElement.style.setProperty('--secondary', colorSchemes[scheme].secondary);
    document.documentElement.style.setProperty('--accent', colorSchemes[scheme].accent);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Dashboard Overview</h2>
        <div className="flex gap-2">
          {Object.keys(colorSchemes).map((scheme) => (
            <Button
              key={scheme}
              variant={selectedScheme === scheme ? "default" : "outline"}
              size="sm"
              onClick={() => handleColorSchemeChange(scheme as keyof typeof colorSchemes)}
              className="capitalize"
            >
              {scheme}
            </Button>
          ))}
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6 glass-card">
          <h3 className="text-sm font-medium text-gray-600">Total Followers</h3>
          <p className="text-2xl font-bold mt-2">24.5K</p>
          <span className="text-green-600 text-sm">+12% from last month</span>
        </Card>
        <Card className="p-6 glass-card">
          <h3 className="text-sm font-medium text-gray-600">Engagement Rate</h3>
          <p className="text-2xl font-bold mt-2">5.2%</p>
          <span className="text-green-600 text-sm">+3% from last month</span>
        </Card>
        <Card className="p-6 glass-card">
          <h3 className="text-sm font-medium text-gray-600">Brand Deals</h3>
          <p className="text-2xl font-bold mt-2">12</p>
          <span className="text-green-600 text-sm">+2 new this month</span>
        </Card>
      </div>
      <Card className="p-6 glass-card">
        <h3 className="text-lg font-medium mb-4 text-gray-800">Engagement Overview</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="name" stroke="#888888" />
              <YAxis stroke="#888888" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke={colorSchemes[selectedScheme].primary}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};