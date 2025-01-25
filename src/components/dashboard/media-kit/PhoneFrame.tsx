import { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
}

export const PhoneFrame = ({ children }: PhoneFrameProps) => {
  return (
    <div className="mx-auto w-[320px] h-[640px] bg-black rounded-[3rem] p-4 shadow-2xl relative overflow-hidden">
      {/* Phone notch */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-10"></div>
      {/* Phone screen */}
      <div className="w-full h-full bg-gray-50 dark:bg-gray-900 rounded-[2.5rem] overflow-y-auto">
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};