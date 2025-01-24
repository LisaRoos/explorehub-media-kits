import { Card } from "@/components/ui/card";
import { PackageBasicInfo } from "./form/PackageBasicInfo";
import { PackageMediaUpload } from "./form/PackageMediaUpload";
import { PackageFormActions } from "./form/PackageFormActions";
import { usePackageForm } from "@/hooks/usePackageForm";

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
    handleSubmit,
    handleShare,
  } = usePackageForm();

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6 col-span-2 md:col-span-1">
          <PackageBasicInfo
            title={title}
            setTitle={setTitle}
            price={price}
            setPrice={setPrice}
            description={description}
            setDescription={setDescription}
          />
        </Card>

        <Card className="p-6 col-span-2 md:col-span-1">
          <PackageMediaUpload
            media={media}
            onImageUpload={handleImageUpload}
          />
        </Card>
      </div>

      <PackageFormActions
        onSubmit={handleSubmit}
        onShare={handleShare}
      />
    </form>
  );
};