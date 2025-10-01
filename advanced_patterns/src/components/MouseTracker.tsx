import { useState, useEffect, type ReactNode } from "react";

interface MouseTrackerProps {
  render?: (position: { x: number; y: number }) => ReactNode;
  children?: (position: { x: number; y: number }) => ReactNode;
}

function MouseTracker({ render, children }: MouseTrackerProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (render || children)?.(position);
}

export const MouseTrackerExample = () => {
  return (
    <div>
      <h1>Mouser Tracker - Render Prop</h1>
      <MouseTracker
        render={({ x, y }) => (
          <p>
            Mouse position: {x}, {y}
          </p>
        )}
      />

      <h1>Mouser Tracker - Children</h1>
      <MouseTracker>
        {({ x, y }) => (
          <p>
            Mouse position: {x}, {y}
          </p>
        )}
      </MouseTracker>
    </div>
  );
};
