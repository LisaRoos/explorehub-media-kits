interface AuthFormContainerProps {
  children: React.ReactNode;
}

export const AuthFormContainer = ({ children }: AuthFormContainerProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6 bg-white/5 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-xl border border-white/10">
        {children}
      </div>
    </div>
  );
};