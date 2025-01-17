import { MousePointer2 } from "lucide-react";
import { useState, useEffect } from "react";

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, [role="button"]')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener("mousemove", updateCursorPosition, { passive: true });
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <div
      className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
      style={{
        transform: `translate3d(${position.x - 16}px, ${position.y - 16}px, 0)`,
      }}
    >
      <MousePointer2 />
    </div>
  );
};