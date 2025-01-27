interface ContentPreviewProps {
  url: string;
  platform: string;
  isEditable: boolean;
  onEdit: () => void;
}

export const ContentPreview = ({
  url,
  platform,
  isEditable,
  onEdit
}: ContentPreviewProps) => {
  return (
    <div 
      className={`aspect-video rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors ${isEditable ? 'cursor-pointer' : ''}`}
      onClick={() => isEditable && onEdit()}
    >
      {url ? (
        <iframe
          src={url}
          className="w-full h-full rounded-lg"
          allowFullScreen
        />
      ) : (
        <div className="text-center p-4">
          <p className="text-gray-500">
            {isEditable ? (
              <>
                Click to add {platform} content
                <br />
                <span className="text-sm">
                  (You'll need to provide a content URL)
                </span>
              </>
            ) : (
              'No content available'
            )}
          </p>
        </div>
      )}
    </div>
  );
};