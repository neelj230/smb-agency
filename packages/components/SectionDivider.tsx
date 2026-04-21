interface SectionDividerProps {
  variant?: "wave" | "diagonal" | "curve" | "zigzag" | "arrow";
  color?: string;
  flip?: boolean;
  className?: string;
  height?: number;
}

export function SectionDivider({
  variant = "wave",
  color = "var(--brand-bg)",
  flip = false,
  className = "",
  height = 80,
}: SectionDividerProps) {
  const transform = flip ? "rotate(180deg)" : undefined;

  const paths: Record<string, string> = {
    wave: "M0,32 C320,96 640,0 960,64 C1280,128 1440,32 1440,32 L1440,0 L0,0 Z",
    diagonal: "M0,0 L1440,64 L1440,0 L0,0 Z",
    curve: "M0,64 Q720,128 1440,64 L1440,0 L0,0 Z",
    zigzag:
      "M0,32 L180,64 L360,32 L540,64 L720,32 L900,64 L1080,32 L1260,64 L1440,32 L1440,0 L0,0 Z",
    arrow: "M0,0 L720,64 L1440,0 L1440,0 L0,0 Z",
  };

  return (
    <div
      className={`w-full leading-none ${className}`}
      style={{ transform, marginTop: "-1px", marginBottom: "-1px" }}
    >
      <svg
        viewBox="0 0 1440 128"
        preserveAspectRatio="none"
        className="w-full block"
        style={{ height }}
      >
        <path d={paths[variant]} fill={color} />
      </svg>
    </div>
  );
}
