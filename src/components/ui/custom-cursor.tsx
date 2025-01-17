import { MousePointer2 } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const updateCursorPosition = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e;
    requestAnimationFrame(() => {
      setPosition({ x: clientX, y: clientY });
    });
  }, []);

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button, a, [role="button"]')) {
      setIsHovering(true);
    }
  }, []);

  const handleMouseOut = useCallback(() => {
    setIsHovering(false);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", updateCursorPosition, { passive: true });
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [updateCursorPosition, handleMouseOver, handleMouseOut]);

  if (typeof window === 'undefined') return null;

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