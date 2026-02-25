import { useEffect, useState } from "react";

interface CompassProps {
  rotation?: number;
  visible?: boolean;
  pulsing?: boolean;
}

const Compass = ({ rotation = 0, visible = true, pulsing = true }: CompassProps) => {
  const [currentRotation, setCurrentRotation] = useState(rotation);

  useEffect(() => {
    setCurrentRotation(rotation);
  }, [rotation]);

  if (!visible) return null;

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ animation: pulsing ? "compass-pulse 3s ease-in-out infinite" : "none" }}
    >
      {/* Outer ring glow */}
      <div className="absolute w-48 h-48 rounded-full border-2 border-compass-gold/30" />
      <div
        className="absolute w-52 h-52 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(42, 80%, 55%, 0.1) 0%, transparent 70%)",
          animation: "ripple 3s ease-out infinite",
        }}
      />

      {/* Compass body */}
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        className="compass-glow"
      >
        {/* Outer circle */}
        <circle cx="100" cy="100" r="90" fill="none" stroke="hsl(42, 80%, 55%)" strokeWidth="1.5" opacity="0.6" />
        <circle cx="100" cy="100" r="85" fill="none" stroke="hsl(42, 80%, 55%)" strokeWidth="0.5" opacity="0.3" />

        {/* Cardinal direction marks */}
        {[0, 90, 180, 270].map((angle) => (
          <line
            key={angle}
            x1="100"
            y1="15"
            x2="100"
            y2="25"
            stroke="hsl(42, 80%, 55%)"
            strokeWidth="2"
            transform={`rotate(${angle} 100 100)`}
            opacity="0.8"
          />
        ))}

        {/* Minor marks */}
        {Array.from({ length: 36 }).map((_, i) => (
          <line
            key={i}
            x1="100"
            y1="17"
            x2="100"
            y2="22"
            stroke="hsl(42, 80%, 55%)"
            strokeWidth="0.5"
            transform={`rotate(${i * 10} 100 100)`}
            opacity="0.4"
          />
        ))}

        {/* Cardinal letters */}
        <text x="100" y="40" textAnchor="middle" fill="hsl(42, 80%, 55%)" fontSize="12" fontFamily="Cinzel" opacity="0.9">N</text>
        <text x="100" y="168" textAnchor="middle" fill="hsl(42, 80%, 55%)" fontSize="12" fontFamily="Cinzel" opacity="0.9">S</text>
        <text x="168" y="104" textAnchor="middle" fill="hsl(42, 80%, 55%)" fontSize="12" fontFamily="Cinzel" opacity="0.9">E</text>
        <text x="32" y="104" textAnchor="middle" fill="hsl(42, 80%, 55%)" fontSize="12" fontFamily="Cinzel" opacity="0.9">W</text>

        {/* Needle group - rotates */}
        <g
          transform={`rotate(${currentRotation} 100 100)`}
          style={{ transition: "transform 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
        >
          {/* North needle (gold) */}
          <polygon
            points="100,25 95,100 105,100"
            fill="hsl(42, 80%, 55%)"
            opacity="0.9"
          />
          {/* South needle (teal) */}
          <polygon
            points="100,175 95,100 105,100"
            fill="hsl(195, 55%, 25%)"
            opacity="0.7"
          />
          {/* Center dot */}
          <circle cx="100" cy="100" r="5" fill="hsl(42, 80%, 55%)" />
          <circle cx="100" cy="100" r="3" fill="hsl(42, 90%, 65%)" />
        </g>
      </svg>
    </div>
  );
};

export default Compass;
