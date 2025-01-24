import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { CreatePackageForm } from "./CreatePackageForm";

const CreatePackage = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-8">Create New Package</h1>
            <CreatePackageForm />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default CreatePackage;