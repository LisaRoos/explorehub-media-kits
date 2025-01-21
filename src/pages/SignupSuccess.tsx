import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const SignupSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-accent">
      <div className="w-full max-w-md space-y-6 bg-white/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-xl border border-white/10 text-center">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Success! 🎉</h1>
          <p className="text-gray-600">
            Thank you for signing up! We've sent a verification email to your inbox.
            Please check your email and click the verification link to complete your registration.
          </p>
          <div className="pt-4">
            <Button
              onClick={() => navigate("/login")}
              className="bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              Go to Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupSuccess;