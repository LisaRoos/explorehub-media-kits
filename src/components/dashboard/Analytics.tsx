import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Calendar } from "lucide-react";

const engagementData = [
  { name: "Mon", value: 4.5 },
  { name: "Tue", value: 5.2 },
  { name: "Wed", value: 3.8 },
  { name: "Thu", value: 6.1 },
  { name: "Fri", value: 5.9 },
  { name: "Sat", value: 7.2 },
  { name: "Sun", value: 6.5 },
];

const reachData = [
  { name: "Mon", value: 2400 },
  { name: "Tue", value: 3200 },
  { name: "Wed", value: 2900 },
  { name: "Thu", value: 3800 },
  { name: "Fri", value: 3500 },
  { name: "Sat", value: 4200 },
  { name: "Sun", value: 3900 },
];

export const Analytics = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Analytics Overview</h2>
          <p className="text-gray-500">Track your performance and growth</p>
        </div>
        <Button variant="outline" size="sm">
          <Calendar className="h-4 w-4 mr-2" />
          Last 7 Days
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Reach</h3>
          <p className="text-2xl font-bold mt-2">24.5K</p>
          <span className="text-green-600 text-sm">+12% from last week</span>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Engagement Rate</h3>
          <p className="text-2xl font-bold mt-2">5.2%</p>
          <span className="text-green-600 text-sm">+3% from last week</span>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Profile Views</h3>
          <p className="text-2xl font-bold mt-2">1.2K</p>
          <span className="text-red-600 text-sm">-2% from last week</span>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Engagement Rate</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={engagementData}>
                <XAxis dataKey="name" stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Weekly Reach</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reachData}>
                <XAxis dataKey="name" stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};