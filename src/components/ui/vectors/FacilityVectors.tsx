import React from "react";

// Clean ultra-thin SVG line icons for facilities (NO emojis)

export function AirConditioningIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="9" rx="2" />
      <line x1="6" y1="9" x2="6.01" y2="9" strokeWidth="2.5" />
      <line x1="10" y1="9" x2="10.01" y2="9" strokeWidth="2.5" />
      <line x1="14" y1="9" x2="14.01" y2="9" strokeWidth="2.5" />
      <path d="M4 17c1.5-1 2.5-1 4 0s2.5 1 4 0 2.5-1 4 0 2.5 1 4 0" />
      <path d="M4 20c1.5-1 2.5-1 4 0s2.5 1 4 0 2.5-1 4 0 2.5 1 4 0" />
    </svg>
  );
}

export function PowerBackupIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M7 6V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2" />
      <path d="M12 9v4l-2 2" />
      <circle cx="12" cy="13" r="1" />
      <path d="m11 10 3 3" />
      <line x1="7" y1="14" x2="7.01" y2="14" strokeWidth="2" />
      <line x1="17" y1="14" x2="17.01" y2="14" strokeWidth="2" />
    </svg>
  );
}

export function ParkingIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
    </svg>
  );
}

export function DeluxeRoomIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 19h20" />
      <path d="M4 19v-7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v7" />
      <path d="M4 14h16" />
      <path d="M7 9V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
      <circle cx="8" cy="11.5" r="1.5" />
      <circle cx="16" cy="11.5" r="1.5" />
    </svg>
  );
}

export function KitchenIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2v20" />
      <path d="M18 7c1.5 0 3-1 3-3V2h-3v5Z" />
      <path d="M3 2v7c0 1.5 1.5 2.5 3 2.5V22" />
      <path d="M9 2v7c0 1.5-1.5 2.5-3 2.5" />
      <path d="M6 2v6" />
    </svg>
  );
}

export function AudioVisualIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <path d="m9 9 6 3-6 3V9Z" fill="currentColor" fillOpacity="0.2" />
    </svg>
  );
}

export function WifiVectorIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <circle cx="12" cy="20" r="1" fill="currentColor" />
    </svg>
  );
}

export function PillarlessIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18" />
      <path d="M3 5h18" />
      <path d="M5 5v16" />
      <path d="M19 5v16" />
      <path d="M9 13h6" strokeDasharray="2 2" />
      <path d="M12 9v8" strokeDasharray="2 2" />
      <circle cx="12" cy="13" r="2" />
    </svg>
  );
}

export function FacilityVectorBadge({
  icon,
  label,
  subtext,
  variant = "teal"
}: {
  icon: React.ReactNode;
  label: string;
  subtext?: string;
  variant?: "teal" | "sapphire" | "pearl";
}) {
  const styles = {
    teal: "bg-amber-500/10 text-amber-700 border-amber-500/25",
    sapphire: "bg-blue-600/10 text-blue-300 border-blue-500/25",
    pearl: "bg-slate-100 text-slate-800 border-slate-200"
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium backdrop-blur-sm ${styles[variant]}`}>
      <span className="shrink-0">{icon}</span>
      <div className="flex flex-col leading-tight">
        <span className="font-semibold text-[11px] sm:text-xs">{label}</span>
        {subtext && <span className="text-[9px] opacity-75">{subtext}</span>}
      </div>
    </div>
  );
}
