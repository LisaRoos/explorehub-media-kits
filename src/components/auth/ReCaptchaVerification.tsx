import ReCAPTCHA from "react-google-recaptcha";
import { useToast } from "@/hooks/use-toast";

interface ReCaptchaVerificationProps {
  setIsVerified: (verified: boolean) => void;
}

export const ReCaptchaVerification = ({ setIsVerified }: ReCaptchaVerificationProps) => {
  const { toast } = useToast();

  const handleVerification = (token: string | null) => {
    if (token) {
      setIsVerified(true);
      toast({
        title: "Verification successful",
        description: "You've been verified successfully!",
      });
    } else {
      setIsVerified(false);
      toast({
        title: "Verification failed",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex justify-center my-4">
      <ReCAPTCHA
        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
        onChange={handleVerification}
      />
    </div>
  );
};