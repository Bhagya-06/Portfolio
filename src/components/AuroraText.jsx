import React, { memo } from "react";

export const AuroraText = memo(
  ({
    children,
    className = "",
    colors = ["#ff6f3c", "#ff8a63", "#ff521c", "#ff9d7d", "#ff6f3c"], // Warm coral-orange gradient sequence matching the 3-color theme
    speed = 1,
  }) => {
    const gradientStyle = {
      backgroundImage: `linear-gradient(135deg, ${colors.join(", ")}, ${colors[0]})`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      animationDuration: `${10 / speed}s`,
    };

    return (
      <>
        <style>{`
          @keyframes aurora {
            0%   { background-position: 0% 50%; }
            50%  { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-aurora {
            animation-name: aurora;
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-aurora { animation: none; }
          }
        `}</style>

        <span className={`relative inline-block ${className}`}>
          <span className="sr-only">{children}</span>
          <span
            className="relative animate-aurora bg-[length:200%_auto] bg-clip-text text-transparent"
            style={gradientStyle}
            aria-hidden="true"
          >
            {children}
          </span>
        </span>
      </>
    );
  }
);

AuroraText.displayName = "AuroraText";

export default AuroraText;
