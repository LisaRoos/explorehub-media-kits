interface CaptchaLoaderProps {
  children: React.ReactNode;
  isLoading: boolean;
}

export const CaptchaLoader = ({ children, isLoading }: CaptchaLoaderProps) => {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  );
};