import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 700 },
];

export const BrandAnalytics = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Analytics Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <h3 className="text-sm font-medium">Total Campaigns</h3>
          <p className="text-2xl font-bold">24</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium">Active Influencers</h3>
          <p className="text-2xl font-bold">156</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium">Engagement Rate</h3>
          <p className="text-2xl font-bold">4.8%</p>
        </Card>
      </div>
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Campaign Performance</h3>
        <LineChart width={800} height={400} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </Card>
    </div>
  );
};