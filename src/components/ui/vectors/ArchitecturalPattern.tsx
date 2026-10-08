import React from "react";

export function ArchitecturalPattern({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none opacity-20 select-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full text-slate-700/60"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 1000"
        fill="none"
      >
        <defs>
          <pattern
            id="arch-grid"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
              strokeDasharray="2 6"
            />
            <circle cx="0" cy="0" r="1.5" fill="currentColor" opacity="0.4" />
          </pattern>
        </defs>

        <rect width="1000" height="1000" fill="url(#arch-grid)" />

        {/* Minimalist Grand Architectural Arcs */}
        <path
          d="M 100 900 C 100 450, 450 100, 900 100"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="4 8"
          opacity="0.3"
        />
        <path
          d="M 150 900 C 150 500, 500 150, 900 150"
          stroke="currentColor"
          strokeWidth="0.8"
          opacity="0.2"
        />
        <circle cx="500" cy="500" r="280" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 7" opacity="0.15" />
        <circle cx="500" cy="500" r="420" stroke="currentColor" strokeWidth="0.6" opacity="0.1" />

        {/* Blueprint Dimension Lines & Crosshairs */}
        <line x1="80" y1="200" x2="80" y2="800" stroke="#0D9488" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
        <line x1="920" y1="200" x2="920" y2="800" stroke="#0D9488" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
        <line x1="200" y1="920" x2="800" y2="920" stroke="#1E3A8A" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
      </svg>
    </div>
  );
}
