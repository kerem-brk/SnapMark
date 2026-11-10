import React from "react";
import Link from "next/link";

interface LogoMarkProps {
  size?: number | string;
  className?: string;
  withGlow?: boolean;
}

/**
 * SnapMark Özel Vektörel Amblem (Logo Mark)
 * Metafor: 4 Köşeli Kamera Vizörü / Kırpma İşareti (Snap) + İç İçe Kod Köşeli Ayraçları & Lens Diyaframı (Mark)
 */
export const LogoMark: React.FC<LogoMarkProps> = ({
  size = 32,
  className = "",
  withGlow = false,
}) => {
  const numSize = typeof size === "number" ? size : parseInt(size, 10) || 32;

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: numSize, height: numSize }}
    >
      {withGlow && (
        <div
          className="absolute inset-0 rounded-xl bg-[#FF4F00]/20 blur-md pointer-events-none"
          aria-hidden="true"
        />
      )}
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 transition-transform duration-200"
      >
        <defs>
          {/* Arka plan gradyanı: Sıcak antrasit grafit */}
          <linearGradient id="sm-bg-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#27272A" />
            <stop offset="100%" stopColor="#18181B" />
          </linearGradient>

          {/* Alev turuncusu parıltı gradyanı */}
          <linearGradient id="sm-orange-grad" x1="8" y1="8" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF4F00" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>

          {/* Odak kesiği gradyanı */}
          <linearGradient id="sm-slash-grad" x1="17" y1="10" x2="15" y2="22" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FB923C" />
            <stop offset="100%" stopColor="#FF4F00" />
          </linearGradient>

          {/* Dış çerçeve gradyanı */}
          <linearGradient id="sm-border-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3F3F46" />
            <stop offset="50%" stopColor="#FF4F00" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#27272A" />
          </linearGradient>
        </defs>

        {/* 1. Dış Taşıyıcı Kutu (Squircle / Yuvarlatılmış Kart) */}
        <rect
          x="1"
          y="1"
          width="30"
          height="30"
          rx="8.5"
          fill="url(#sm-bg-grad)"
          stroke="url(#sm-border-grad)"
          strokeWidth="1.2"
        />

        {/* 2. Lens Diyaframı Kılavuz Halkası (Sessiz kamera çemberi) */}
        <circle
          cx="16"
          cy="16"
          r="8"
          stroke="#FF4F00"
          strokeOpacity="0.2"
          strokeWidth="1"
          strokeDasharray="2.5 2.5"
        />

        {/* 3. SNAP METAFORU: Kamera Vizörü / Kırpma Köşe İşaretleri (Viewfinder Corners) */}
        {/* Sol-Üst */}
        <path
          d="M 6.5 11.5 V 8 A 1.5 1.5 0 0 1 8 6.5 H 11.5"
          stroke="#FF4F00"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Sağ-Üst */}
        <path
          d="M 20.5 6.5 H 24 A 1.5 1.5 0 0 1 25.5 8 V 11.5"
          stroke="#FF4F00"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Sol-Alt */}
        <path
          d="M 6.5 20.5 V 24 A 1.5 1.5 0 0 0 8 25.5 H 11.5"
          stroke="#FF4F00"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Sağ-Alt */}
        <path
          d="M 20.5 25.5 H 24 A 1.5 1.5 0 0 0 25.5 24 V 20.5"
          stroke="#FF4F00"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 4. MARK METAFORU: Hassas Kod Ayraçları < / > */}
        {/* Sol Ayracı: < */}
        <path
          d="M 13.5 11.5 L 9.5 16 L 13.5 20.5"
          stroke="url(#sm-orange-grad)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Sağ Ayracı: > */}
        <path
          d="M 18.5 11.5 L 22.5 16 L 18.5 20.5"
          stroke="url(#sm-orange-grad)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Merkez Kod Kesiği (Slash / Flaş): / */}
        <path
          d="M 17.5 11.5 L 14.5 20.5"
          stroke="url(#sm-slash-grad)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Merkez Işıma Noktası (Kamera Odak & Sentaks Çekirdeği) */}
        <circle cx="16" cy="16" r="1.2" fill="#FFA500" />
      </svg>
    </div>
  );
};

interface LogoProps {
  size?: number | string;
  showBadge?: boolean;
  badgeText?: string;
  showSubtitle?: boolean;
  subtitleText?: string;
  href?: string;
  className?: string;
}

/**
 * SnapMark Tam Logo Kilidi (Lockup: Amblem + Tipografi + Opsiyonel Rozet)
 */
export const Logo: React.FC<LogoProps> = ({
  size = 32,
  showBadge = true,
  badgeText = "PRO 4K",
  showSubtitle = false,
  subtitleText = "Code Image Studio",
  href,
  className = "",
}) => {
  const content = (
    <div className={`flex items-center gap-2.5 group select-none ${className}`}>
      <LogoMark
        size={size}
        className="group-hover:scale-105 transition-transform duration-200"
      />
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5">
          <div className="flex items-baseline tracking-tight font-mono text-base font-bold">
            <span className="text-[#18181B] group-hover:text-black transition-colors">Snap</span>
            <span className="text-[#FF4F00] group-hover:text-[#EA580C] transition-colors">Mark</span>
          </div>

          {showBadge && (
            <span className="text-[10px] tracking-wider uppercase font-mono font-semibold px-1.5 py-0.5 rounded bg-[#FF4F00]/10 text-[#FF4F00] border border-[#FF4F00]/25 group-hover:border-[#FF4F00]/40 transition-colors">
              {badgeText}
            </span>
          )}
        </div>

        {showSubtitle && (
          <span className="text-[10px] text-slate-400 font-mono -mt-0.5 tracking-tight">
            {subtitleText}
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex cursor-pointer hover:opacity-95 transition-opacity">
        {content}
      </Link>
    );
  }

  return content;
};
