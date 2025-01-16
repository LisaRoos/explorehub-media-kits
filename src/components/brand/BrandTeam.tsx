import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    role: "Brand Manager",
    email: "john@example.com",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Marketing Lead",
    email: "jane@example.com",
    avatar: "/placeholder.svg",
  },
];

export const BrandTeam = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Team Management</h2>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <Card key={member.id} className="p-6">
            <div className="flex items-center space-x-4">
              <img
                src={member.avatar}
                alt={member.name}
                className="h-12 w-12 rounded-full"
              />
              <div>
                <h3 className="font-medium">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.email}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};