import React from "react";

export function RoyalConventionBlueprint({ className = "w-full h-48" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 600 360" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background Architectural Grid */}
      <rect width="600" height="360" rx="16" fill="#0B132B" stroke="#1E293B" strokeWidth="1.5" />
      <pattern id="conv-grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="1 3" />
      </pattern>
      <rect width="600" height="360" rx="16" fill="url(#conv-grid)" opacity="0.6" />

      {/* Hall Outer Boundary (Soaring 28ft Pillarless span) */}
      <rect x="40" y="30" width="520" height="300" rx="8" stroke="#0D9488" strokeWidth="2" strokeDasharray="4 2" />
      
      {/* Dimension Indicators */}
      <text x="50" y="24" fill="#0D9488" fontSize="10" fontFamily="sans-serif" fontWeight="600" letterSpacing="0.05em">
        ROYAL CONVENTION • 28FT CLEAR HEIGHT PILLARLESS SPAN (3,000 CAPACITY)
      </text>

      {/* Grand Stage / Mandap Platform */}
      <rect x="180" y="50" width="240" height="55" rx="4" fill="#0D9488" fillOpacity="0.15" stroke="#14B8A6" strokeWidth="1.5" />
      <text x="300" y="82" fill="#5EEAD4" fontSize="11" fontWeight="700" textAnchor="middle" letterSpacing="0.05em">
        ELEVATED MANDAP & CEREMONIAL STAGE (60 FT WIDE)
      </text>

      {/* Green Rooms Wings */}
      <rect x="45" y="50" width="115" height="55" rx="4" fill="#1E293B" stroke="#334155" strokeWidth="1" />
      <text x="102" y="82" fill="#94A3B8" fontSize="9" fontWeight="600" textAnchor="middle">
        BRIDE SUITE (AC)
      </text>

      <rect x="440" y="50" width="115" height="55" rx="4" fill="#1E293B" stroke="#334155" strokeWidth="1" />
      <text x="497" y="82" fill="#94A3B8" fontSize="9" fontWeight="600" textAnchor="middle">
        GROOM SUITE (AC)
      </text>

      {/* Central Carpet Aisle */}
      <rect x="275" y="125" width="50" height="185" fill="#0D9488" fillOpacity="0.08" stroke="#0D9488" strokeWidth="1" strokeDasharray="3 3" />
      <text x="300" y="225" fill="#0D9488" fontSize="9" fontWeight="600" textAnchor="middle" transform="rotate(-90 300 225)">
        ROYAL AISLE
      </text>

      {/* Guest Seating Grid (Left & Right Wings) */}
      {/* Left Wing Seating Rows */}
      {[135, 160, 185, 210, 235, 260, 285].map((y, rowIdx) => (
        <g key={`left-${rowIdx}`}>
          <line x1="70" y1={y} x2="250" y2={y} stroke="#38BDF8" strokeWidth="1" strokeDasharray="2 4" opacity="0.7" />
          <circle cx="85" cy={y} r="2.5" fill="#38BDF8" opacity="0.8" />
          <circle cx="120" cy={y} r="2.5" fill="#38BDF8" opacity="0.8" />
          <circle cx="155" cy={y} r="2.5" fill="#38BDF8" opacity="0.8" />
          <circle cx="190" cy={y} r="2.5" fill="#38BDF8" opacity="0.8" />
          <circle cx="225" cy={y} r="2.5" fill="#38BDF8" opacity="0.8" />
        </g>
      ))}

      {/* Right Wing Seating Rows */}
      {[135, 160, 185, 210, 235, 260, 285].map((y, rowIdx) => (
        <g key={`right-${rowIdx}`}>
          <line x1="350" y1={y} x2="530" y2={y} stroke="#38BDF8" strokeWidth="1" strokeDasharray="2 4" opacity="0.7" />
          <circle cx="375" cy={y} r="2.5" fill="#38BDF8" opacity="0.8" />
          <circle cx="410" cy={y} r="2.5" fill="#38BDF8" opacity="0.8" />
          <circle cx="445" cy={y} r="2.5" fill="#38BDF8" opacity="0.8" />
          <circle cx="480" cy={y} r="2.5" fill="#38BDF8" opacity="0.8" />
          <circle cx="515" cy={y} r="2.5" fill="#38BDF8" opacity="0.8" />
        </g>
      ))}

      {/* Grand Foyer & Twin Glass Entrance Doors */}
      <rect x="230" y="315" width="140" height="15" rx="3" fill="#1E3A8A" stroke="#3B82F6" strokeWidth="1" />
      <text x="300" y="326" fill="#93C5FD" fontSize="8" fontWeight="700" textAnchor="middle">
        GRAND DOUBLE-DOOR ENTRANCE
      </text>
    </svg>
  );
}

export function RoyalBanquetBlueprint({ className = "w-full h-48" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 600 360" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="360" rx="16" fill="#0B132B" stroke="#1E293B" strokeWidth="1.5" />
      <pattern id="banq-grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="1 3" />
      </pattern>
      <rect width="600" height="360" rx="16" fill="url(#banq-grid)" opacity="0.6" />

      {/* Boundary */}
      <rect x="35" y="30" width="530" height="300" rx="8" stroke="#0D9488" strokeWidth="2" strokeDasharray="4 2" />
      <text x="45" y="24" fill="#0D9488" fontSize="10" fontFamily="sans-serif" fontWeight="600" letterSpacing="0.05em">
        ROYAL BANQUET • ATTACHED 8 DELUXE LODGING ROOMS + DINING EXPANSE
      </text>

      {/* 8 Attached Deluxe Lodging Rooms along the top edge */}
      <g>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((roomIdx) => {
          const x = 45 + roomIdx * 64;
          return (
            <g key={`room-${roomIdx}`}>
              <rect x={x} y="45" width="58" height="50" rx="4" fill="#0F172A" stroke="#0D9488" strokeWidth="1" />
              <text x={x + 29} y="68" fill="#5EEAD4" fontSize="8" fontWeight="700" textAnchor="middle">
                R-{roomIdx + 1}
              </text>
              <text x={x + 29} y="82" fill="#94A3B8" fontSize="7" textAnchor="middle">
                DELUXE
              </text>
            </g>
          );
        })}
      </g>

      {/* Banquet Reception & Stage */}
      <rect x="50" y="115" width="160" height="45" rx="4" fill="#0D9488" fillOpacity="0.15" stroke="#14B8A6" strokeWidth="1.2" />
      <text x="130" y="142" fill="#5EEAD4" fontSize="10" fontWeight="700" textAnchor="middle">
        BANQUET STAGE / DAIS
      </text>

      {/* Banquet Round Table Seating (Circles) */}
      {[
        { cx: 100, cy: 200 },
        { cx: 180, cy: 200 },
        { cx: 100, cy: 265 },
        { cx: 180, cy: 265 },
      ].map((table, tIdx) => (
        <g key={`table-${tIdx}`}>
          <circle cx={table.cx} cy={table.cy} r="18" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.2" />
          <circle cx={table.cx} cy={table.cy - 24} r="3" fill="#38BDF8" opacity="0.8" />
          <circle cx={table.cx} cy={table.cy + 24} r="3" fill="#38BDF8" opacity="0.8" />
          <circle cx={table.cx - 24} cy={table.cy} r="3" fill="#38BDF8" opacity="0.8" />
          <circle cx={table.cx + 24} cy={table.cy} r="3" fill="#38BDF8" opacity="0.8" />
          <text x={table.cx} y={table.cy + 3} fill="#E2E8F0" fontSize="8" fontWeight="600" textAnchor="middle">
            T-{tIdx + 1}
          </text>
        </g>
      ))}

      {/* Live Buffet & Catering Counter Section (Right Half) */}
      <rect x="270" y="115" width="280" height="195" rx="6" fill="#1E293B" fillOpacity="0.4" stroke="#475569" strokeWidth="1" />
      <text x="410" y="135" fill="#38BDF8" fontSize="10" fontWeight="700" textAnchor="middle">
        MEGA LIVE BUFFET & DINING WING (650 SEATS)
      </text>

      {/* Buffet Long Islands */}
      <rect x="290" y="155" width="240" height="25" rx="4" fill="#0D9488" fillOpacity="0.2" stroke="#0D9488" strokeWidth="1" />
      <text x="410" y="171" fill="#A7F3D0" fontSize="9" fontWeight="600" textAnchor="middle">
        HOT BUFFET COUNTER (SOUTH & NORTH INDIAN)
      </text>

      <rect x="290" y="195" width="240" height="25" rx="4" fill="#0D9488" fillOpacity="0.2" stroke="#0D9488" strokeWidth="1" />
      <text x="410" y="211" fill="#A7F3D0" fontSize="9" fontWeight="600" textAnchor="middle">
        LIVE SWEET & DESSERT COUNTER
      </text>

      <rect x="290" y="235" width="240" height="25" rx="4" fill="#0D9488" fillOpacity="0.2" stroke="#0D9488" strokeWidth="1" />
      <text x="410" y="251" fill="#A7F3D0" fontSize="9" fontWeight="600" textAnchor="middle">
        LIVE ROAST DOSA & APPETIZERS
      </text>
    </svg>
  );
}

export function RoyalHallBlueprint({ className = "w-full h-48" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 600 360" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="360" rx="16" fill="#0B132B" stroke="#1E293B" strokeWidth="1.5" />
      <pattern id="hall-grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="1 3" />
      </pattern>
      <rect width="600" height="360" rx="16" fill="url(#hall-grid)" opacity="0.6" />

      {/* Boundary */}
      <rect x="40" y="30" width="520" height="300" rx="8" stroke="#0D9488" strokeWidth="2" strokeDasharray="4 2" />
      <text x="50" y="24" fill="#0D9488" fontSize="10" fontFamily="sans-serif" fontWeight="600" letterSpacing="0.05em">
        ROYAL CONVENTION HALL • INTIMATE ENGAGEMENTS & TRADITIONAL CEREMONIES (600 CAPACITY)
      </text>

      {/* Traditional Ceremonial Dais */}
      <rect x="200" y="55" width="200" height="50" rx="4" fill="#0D9488" fillOpacity="0.15" stroke="#14B8A6" strokeWidth="1.5" />
      <text x="300" y="85" fill="#5EEAD4" fontSize="11" fontWeight="700" textAnchor="middle">
        ENGAGEMENT & VRATHAM DAIS
      </text>

      {/* Green Rooms */}
      <rect x="55" y="55" width="110" height="48" rx="4" fill="#1E293B" stroke="#334155" strokeWidth="1" />
      <text x="110" y="84" fill="#94A3B8" fontSize="9" fontWeight="600" textAnchor="middle">
        GREEN ROOM (AC)
      </text>

      <rect x="435" y="55" width="110" height="48" rx="4" fill="#1E293B" stroke="#334155" strokeWidth="1" />
      <text x="490" y="84" fill="#94A3B8" fontSize="9" fontWeight="600" textAnchor="middle">
        FAMILY SUITE
      </text>

      {/* Central Seating Layout */}
      {[130, 160, 190, 220, 250, 280].map((y, rowIdx) => (
        <g key={`hall-row-${rowIdx}`}>
          <line x1="90" y1={y} x2="510" y2={y} stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 4" opacity="0.6" />
          <circle cx="120" cy={y} r="2.5" fill="#38BDF8" opacity="0.8" />
          <circle cx="180" cy={y} r="2.5" fill="#38BDF8" opacity="0.8" />
          <circle cx="240" cy={y} r="2.5" fill="#38BDF8" opacity="0.8" />
          <circle cx="360" cy={y} r="2.5" fill="#38BDF8" opacity="0.8" />
          <circle cx="420" cy={y} r="2.5" fill="#38BDF8" opacity="0.8" />
          <circle cx="480" cy={y} r="2.5" fill="#38BDF8" opacity="0.8" />
        </g>
      ))}

      {/* Central Aisle */}
      <line x1="300" y1="115" x2="300" y2="300" stroke="#0D9488" strokeWidth="1.5" strokeDasharray="4 4" />
      <text x="300" y="210" fill="#0D9488" fontSize="9" fontWeight="600" textAnchor="middle" transform="rotate(-90 300 210)">
        CENTRAL AISLE
      </text>
    </svg>
  );
}

export function VenueBlueprintModal({
  venueSlug,
  isOpen,
  onClose
}: {
  venueSlug: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white backdrop-blur-md animate-in fade-in">
      <div className="bg-[#F8F9FA] border border-slate-300/80 rounded-3xl max-w-2xl w-full p-6 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
          aria-label="Close Blueprint"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="mb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700 bg-amber-50/50 px-3 py-1 rounded-full border border-amber-500/20">
            Architectural Seating Plan
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 mt-2">
            Campus Blueprint & Space Allocation
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Minimalist 2D layout indicating stage, mandap sightlines, dining avenues, and guest circulation.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-2">
          {venueSlug === "royal-convention" && <RoyalConventionBlueprint className="w-full h-64 sm:h-72" />}
          {venueSlug === "royal-banquets" && <RoyalBanquetBlueprint className="w-full h-64 sm:h-72" />}
          {venueSlug === "vaishnavi-vaidehi" && <RoyalHallBlueprint className="w-full h-64 sm:h-72" />}
        </div>
      </div>
    </div>
  );
}
