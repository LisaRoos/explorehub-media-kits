import { PackageBasicInfo } from "./form/PackageBasicInfo";
import { PackageMediaUpload } from "./form/PackageMediaUpload";
import { PackageFormActions } from "./form/PackageFormActions";
import { usePackageForm } from "@/hooks/usePackageForm";
import { toast } from "sonner";

export const CreatePackageForm = () => {
  const {
    title,
    setTitle,
    description,
    setDescription,
    price,
    setPrice,
    media,
    handleImageUpload,
    handleImageRemove,
    handleSubmit,
    handleShare,
    isSubmitting,
  } = usePackageForm();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleSubmit(e);
    } catch (error) {
      toast.error("Failed to create package");
      console.error("Error creating package:", error);
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-4xl mx-auto space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <PackageBasicInfo
          title={title}
          setTitle={setTitle}
          price={price}
          setPrice={setPrice}
          description={description}
          setDescription={setDescription}
        />
        <PackageMediaUpload
          media={media}
          onImageUpload={handleImageUpload}
          onImageRemove={handleImageRemove}
        />
      </div>

      <PackageFormActions
        onSubmit={onSubmit}
        onShare={handleShare}
        isSubmitting={isSubmitting}
      />
    </form>
  );
};