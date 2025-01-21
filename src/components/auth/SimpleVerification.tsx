import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface SimpleVerificationProps {
  setIsVerified: (verified: boolean) => void;
}

export const SimpleVerification = ({ setIsVerified }: SimpleVerificationProps) => {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [numbers, setNumbers] = useState({ a: 0, b: 0 });

  useEffect(() => {
    // Generate two random numbers between 1 and 10
    setNumbers({
      a: Math.floor(Math.random() * 10) + 1,
      b: Math.floor(Math.random() * 10) + 1
    });
  }, []);

  const handleVerification = (inputValue: string) => {
    const correctAnswer = numbers.a + numbers.b;
    const userAnswer = parseInt(inputValue);

    if (!isNaN(userAnswer) && userAnswer === correctAnswer) {
      setIsVerified(true);
      setError(null);
    } else {
      setIsVerified(false);
      if (inputValue !== "") {
        setError("That's not quite right. Try again!");
      } else {
        setError(null);
      }
    }
  };

  return (
    <div className="space-y-3">
      <div className="text-sm text-muted-foreground text-center">
        We know you're human! This is just a quick check to keep our community safe. 😊
      </div>
      <div className="space-y-2">
        <Label htmlFor="verification">What is {numbers.a} + {numbers.b}?</Label>
        <Input
          id="verification"
          type="text"
          value={answer}
          onChange={(e) => {
            const value = e.target.value;
            setAnswer(value);
            handleVerification(value);
          }}
          placeholder="Enter your answer"
          className="w-full"
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
};