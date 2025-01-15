import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", value: 2400 },
  { name: "Feb", value: 1398 },
  { name: "Mar", value: 9800 },
  { name: "Apr", value: 3908 },
  { name: "May", value: 4800 },
  { name: "Jun", value: 3800 },
];

export const Overview = () => {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6 glass-card">
          <h3 className="text-sm font-medium text-gray-400">Total Followers</h3>
          <p className="text-2xl font-bold mt-2">24.5K</p>
          <span className="text-green-400 text-sm">+12% from last month</span>
        </Card>
        <Card className="p-6 glass-card">
          <h3 className="text-sm font-medium text-gray-400">Engagement Rate</h3>
          <p className="text-2xl font-bold mt-2">5.2%</p>
          <span className="text-green-400 text-sm">+3% from last month</span>
        </Card>
        <Card className="p-6 glass-card">
          <h3 className="text-sm font-medium text-gray-400">Brand Deals</h3>
          <p className="text-2xl font-bold mt-2">12</p>
          <span className="text-green-400 text-sm">+2 new this month</span>
        </Card>
      </div>
      <Card className="p-6 glass-card">
        <h3 className="text-lg font-medium mb-4">Engagement Overview</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="name" stroke="#888888" />
              <YAxis stroke="#888888" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#4F46E5"
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