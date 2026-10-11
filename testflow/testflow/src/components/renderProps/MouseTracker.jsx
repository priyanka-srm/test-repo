import { useState } from "react";

function MouseTracker({ render, children }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();

    setPosition({
      x: Math.round(event.clientX - rect.left),
      y: Math.round(event.clientY - rect.top),
    });
  }

  let content = null;

  if (typeof render === "function") {
    content = render(position);
  } else if (typeof children === "function") {
    content = children(position);
  }

  return (
    <div
      data-testid="mouse-tracker"
      onMouseMove={handleMouseMove}
      style={{
        border: "1px solid #aaa",
        borderRadius: "8px",
        minHeight: "150px",
        padding: "16px",
      }}
    >
      <p>
        Mouse position: {position.x}, {position.y}
      </p>
      {content}
    </div>
  );
}

export default MouseTracker;
