import { MousePointer2 } from "lucide-react";
import { useEffect, useState } from "react";

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener("mousemove", updateCursorPosition, { passive: true });

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
    };
  }, []);

  return (
    <div
      className="custom-cursor"
      style={{
        transform: `translate3d(${position.x - 16}px, ${position.y - 16}px, 0)`,
      }}
    >
      <MousePointer2 />
    </div>
  );
};