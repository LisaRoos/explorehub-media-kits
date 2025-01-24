import { PackageMedia as PackageMediaType } from "./types";

interface PackageMediaProps {
  media: PackageMediaType | null;
  title: string;
}

export const PackageMedia = ({ media, title }: PackageMediaProps) => {
  if (!media?.images?.length) return null;

  return (
    <div className="relative h-48">
      <img 
        src={media.images[0]} 
        alt={title} 
        className="w-full h-full object-cover"
      />
      {media.images[1] && (
        <div className="absolute top-2 right-2">
          <img 
            src={media.images[1]} 
            alt={`${title} secondary`} 
            className="w-16 h-16 object-cover rounded-md border-2 border-white shadow-md"
          />
        </div>
      )}
    </div>
  );
};