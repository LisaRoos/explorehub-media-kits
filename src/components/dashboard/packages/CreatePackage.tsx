import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { CreatePackageForm } from "./CreatePackageForm";
import { DashboardHeader } from "../layout/DashboardHeader";

const CreatePackage = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <main className="flex-1">
          <DashboardHeader 
            title="Create Package" 
            description="Create a new service package"
          />
          <div className="p-8 max-w-5xl mx-auto">
            <CreatePackageForm />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default CreatePackage;