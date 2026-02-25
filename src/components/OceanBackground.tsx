import { useMemo } from "react";

interface OceanBackgroundProps {
  intensity?: "calm" | "moderate" | "stormy";
}

const OceanBackground = ({ intensity = "calm" }: OceanBackgroundProps) => {
  const waveConfig = useMemo(() => {
    switch (intensity) {
      case "stormy":
        return { layers: 6, opacity: [0.4, 0.35, 0.3, 0.25, 0.2, 0.15], speed: ["3s", "2.5s", "2s", "3.5s", "2.8s", "2.2s"] };
      case "moderate":
        return { layers: 5, opacity: [0.3, 0.25, 0.2, 0.15, 0.1], speed: ["5s", "4s", "3.5s", "4.5s", "3.8s"] };
      default:
        return { layers: 4, opacity: [0.2, 0.15, 0.1, 0.08], speed: ["8s", "6s", "7s", "9s"] };
    }
  }, [intensity]);

  return (
    <div className="fixed inset-0 overflow-hidden ocean-gradient">
      {/* Particle dots */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute rounded-full bg-ocean-glow"
          style={{
            width: Math.random() * 3 + 1 + "px",
            height: Math.random() * 3 + 1 + "px",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
            opacity: Math.random() * 0.3 + 0.05,
            animation: `float ${Math.random() * 4 + 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      {/* Wave layers */}
      {Array.from({ length: waveConfig.layers }).map((_, i) => (
        <div
          key={`wave-${i}`}
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: `${30 + i * 12}%`,
            opacity: waveConfig.opacity[i],
            animation: `wave-slow ${waveConfig.speed[i]} ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
          }}
        >
          <svg
            viewBox="0 0 1440 320"
            className="absolute bottom-0 w-[200%]"
            preserveAspectRatio="none"
            style={{ height: "100%" }}
          >
            <path
              fill="hsl(195, 55%, 25%)"
              d={`M0,${160 + i * 20}L48,${170 + i * 15}C96,${180 + i * 10},192,${140 + i * 20},288,${150 + i * 15}C384,${160 + i * 10},480,${130 + i * 20},576,${140 + i * 15}C672,${150 + i * 10},768,${180 + i * 5},864,${170 + i * 10}C960,${160 + i * 15},1056,${130 + i * 10},1152,${140 + i * 15}C1248,${150 + i * 10},1344,${170 + i * 5},1392,${175 + i * 5}L1440,${180 + i * 5}L1440,320L0,320Z`}
            />
          </svg>
        </div>
      ))}

      {/* Vignette overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, hsl(220, 50%, 8%) 100%)",
        }}
      />
    </div>
  );
};

export default OceanBackground;
