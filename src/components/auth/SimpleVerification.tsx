import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface SimpleVerificationProps {
  setIsVerified: (verified: boolean) => void;
}

export const SimpleVerification = ({ setIsVerified }: SimpleVerificationProps) => {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState<string | null>(null);

  const correctAnswer = "blue"; // Simple verification question
  
  const handleVerification = () => {
    if (answer.toLowerCase().trim() === correctAnswer) {
      setIsVerified(true);
      setError(null);
    } else {
      setIsVerified(false);
      setError("Incorrect answer. Please try again.");
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="verification">What color is the sky on a clear day?</Label>
      <Input
        id="verification"
        type="text"
        value={answer}
        onChange={(e) => {
          setAnswer(e.target.value);
          handleVerification();
        }}
        placeholder="Enter your answer"
        className="w-full"
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};