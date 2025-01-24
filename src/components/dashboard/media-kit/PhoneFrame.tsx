import { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
}

export const PhoneFrame = ({ children }: PhoneFrameProps) => {
  return (
    <div className="mx-auto w-[280px] h-[560px] bg-black rounded-[3rem] p-4 shadow-2xl relative overflow-hidden">
      {/* Phone notch */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-black rounded-b-2xl z-10"></div>
      {/* Phone screen */}
      <div className="w-full h-full bg-gradient-to-b from-background to-gray-50 dark:from-gray-950 dark:to-gray-900 rounded-[2.5rem] overflow-y-auto">
        {children}
      </div>
    </div>
  );
};