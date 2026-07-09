interface DividerProps {
  topColor: string;
  bottomColor: string;
  className?: string;
}

export function CloudDivider({ topColor, bottomColor, className = '' }: DividerProps) {
  return (
    <div className={`relative w-full overflow-hidden leading-none z-10 ${className}`} style={{ backgroundColor: topColor }}>
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block w-full"
        style={{ height: '40px', color: bottomColor }}
      >
        <path
          d="M0,0 C150,90 350,90 500,60 C650,30 850,30 1000,60 C1100,75 1170,45 1200,0 L1200,120 L0,120 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

export function WaveDivider({ topColor, bottomColor, className = '' }: DividerProps) {
  return (
    <div className={`relative w-full overflow-hidden leading-none z-10 ${className}`} style={{ backgroundColor: topColor }}>
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block w-full"
        style={{ height: '40px', color: bottomColor }}
      >
        <path
          d="M0,60 C150,100 350,20 500,60 C650,100 850,20 1000,60 C1100,75 1170,45 1200,60 L1200,120 L0,120 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

export function CurveDivider({ topColor, bottomColor, className = '' }: DividerProps) {
  return (
    <div className={`relative w-full overflow-hidden leading-none z-10 ${className}`} style={{ backgroundColor: topColor }}>
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block w-full"
        style={{ height: '50px', color: bottomColor }}
      >
        <path
          d="M0,0 Q600,120 1200,0 L1200,120 L0,120 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
