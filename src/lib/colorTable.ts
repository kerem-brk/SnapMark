import { GradientColorStop, GradientType } from "@/types";

// Açık kaynaklı Tailwind CSS Renk Tablosu (22 Renk Ailesi, 200+ Renk Değeri)
export interface ColorFamily {
  name: string;
  category: "neutral" | "warm" | "cool" | "vibrant";
  shades: {
    level: string;
    hex: string;
  }[];
}

export const OPEN_SOURCE_COLOR_TABLE: ColorFamily[] = [
  {
    name: "Slate",
    category: "neutral",
    shades: [
      { level: "50", hex: "#f8fafc" },
      { level: "100", hex: "#f1f5f9" },
      { level: "200", hex: "#e2e8f0" },
      { level: "300", hex: "#cbd5e1" },
      { level: "400", hex: "#94a3b8" },
      { level: "500", hex: "#64748b" },
      { level: "600", hex: "#475569" },
      { level: "700", hex: "#334155" },
      { level: "800", hex: "#1e293b" },
      { level: "900", hex: "#0f172a" },
      { level: "950", hex: "#020617" },
    ],
  },
  {
    name: "Zinc",
    category: "neutral",
    shades: [
      { level: "50", hex: "#fafafa" },
      { level: "100", hex: "#f4f4f5" },
      { level: "200", hex: "#e4e4e7" },
      { level: "300", hex: "#d4d4d8" },
      { level: "400", hex: "#a1a1aa" },
      { level: "500", hex: "#71717a" },
      { level: "600", hex: "#52525b" },
      { level: "700", hex: "#3f3f46" },
      { level: "800", hex: "#27272a" },
      { level: "900", hex: "#18181b" },
      { level: "950", hex: "#09090b" },
    ],
  },
  {
    name: "Red",
    category: "warm",
    shades: [
      { level: "50", hex: "#fef2f2" },
      { level: "100", hex: "#fee2e2" },
      { level: "200", hex: "#fecaca" },
      { level: "300", hex: "#fca5a5" },
      { level: "400", hex: "#f87171" },
      { level: "500", hex: "#ef4444" },
      { level: "600", hex: "#dc2626" },
      { level: "700", hex: "#b91c1c" },
      { level: "800", hex: "#991b1b" },
      { level: "900", hex: "#7f1d1d" },
      { level: "950", hex: "#450a0a" },
    ],
  },
  {
    name: "Orange",
    category: "warm",
    shades: [
      { level: "50", hex: "#fff7ed" },
      { level: "100", hex: "#ffedd5" },
      { level: "200", hex: "#fed7aa" },
      { level: "300", hex: "#fdba74" },
      { level: "400", hex: "#fb923c" },
      { level: "500", hex: "#f97316" },
      { level: "600", hex: "#ea580c" },
      { level: "700", hex: "#c2410c" },
      { level: "800", hex: "#9a3412" },
      { level: "900", hex: "#7c2d12" },
      { level: "950", hex: "#431407" },
    ],
  },
  {
    name: "Amber",
    category: "warm",
    shades: [
      { level: "50", hex: "#fffbeb" },
      { level: "100", hex: "#fef3c7" },
      { level: "200", hex: "#fde68a" },
      { level: "300", hex: "#fcd34d" },
      { level: "400", hex: "#fbbf24" },
      { level: "500", hex: "#f59e0b" },
      { level: "600", hex: "#d97706" },
      { level: "700", hex: "#b45309" },
      { level: "800", hex: "#92400e" },
      { level: "900", hex: "#78350f" },
      { level: "950", hex: "#451a03" },
    ],
  },
  {
    name: "Yellow",
    category: "warm",
    shades: [
      { level: "50", hex: "#fefce8" },
      { level: "100", hex: "#fef9c3" },
      { level: "200", hex: "#fef08a" },
      { level: "300", hex: "#fde047" },
      { level: "400", hex: "#facc15" },
      { level: "500", hex: "#eab308" },
      { level: "600", hex: "#ca8a04" },
      { level: "700", hex: "#a16207" },
      { level: "800", hex: "#854d0e" },
      { level: "900", hex: "#713f12" },
      { level: "950", hex: "#422006" },
    ],
  },
  {
    name: "Lime",
    category: "vibrant",
    shades: [
      { level: "50", hex: "#f7fee7" },
      { level: "100", hex: "#ecfccb" },
      { level: "200", hex: "#d9f99d" },
      { level: "300", hex: "#bef264" },
      { level: "400", hex: "#a3e635" },
      { level: "500", hex: "#84cc16" },
      { level: "600", hex: "#65a30d" },
      { level: "700", hex: "#4d7c0f" },
      { level: "800", hex: "#3f6212" },
      { level: "900", hex: "#365314" },
      { level: "950", hex: "#1a2e05" },
    ],
  },
  {
    name: "Green",
    category: "cool",
    shades: [
      { level: "50", hex: "#f0fdf4" },
      { level: "100", hex: "#dcfce7" },
      { level: "200", hex: "#bbf7d0" },
      { level: "300", hex: "#86efac" },
      { level: "400", hex: "#4ade80" },
      { level: "500", hex: "#22c55e" },
      { level: "600", hex: "#16a34a" },
      { level: "700", hex: "#15803d" },
      { level: "800", hex: "#166534" },
      { level: "900", hex: "#14532d" },
      { level: "950", hex: "#052e16" },
    ],
  },
  {
    name: "Emerald",
    category: "cool",
    shades: [
      { level: "50", hex: "#ecfdf5" },
      { level: "100", hex: "#d1fae5" },
      { level: "200", hex: "#a7f3d0" },
      { level: "300", hex: "#6ee7b7" },
      { level: "400", hex: "#34d399" },
      { level: "500", hex: "#10b981" },
      { level: "600", hex: "#059669" },
      { level: "700", hex: "#047857" },
      { level: "800", hex: "#065f46" },
      { level: "900", hex: "#064e3b" },
      { level: "950", hex: "#022c22" },
    ],
  },
  {
    name: "Teal",
    category: "cool",
    shades: [
      { level: "50", hex: "#f0fdfa" },
      { level: "100", hex: "#ccfbf1" },
      { level: "200", hex: "#99f6e4" },
      { level: "300", hex: "#5eead4" },
      { level: "400", hex: "#2dd4bf" },
      { level: "500", hex: "#14b8a6" },
      { level: "600", hex: "#0d9488" },
      { level: "700", hex: "#0f766e" },
      { level: "800", hex: "#115e59" },
      { level: "900", hex: "#134e4a" },
      { level: "950", hex: "#042f2e" },
    ],
  },
  {
    name: "Cyan",
    category: "cool",
    shades: [
      { level: "50", hex: "#ecfeff" },
      { level: "100", hex: "#cffafe" },
      { level: "200", hex: "#a5f3fc" },
      { level: "300", hex: "#67e8f9" },
      { level: "400", hex: "#22d3ee" },
      { level: "500", hex: "#06b6d4" },
      { level: "600", hex: "#0891b2" },
      { level: "700", hex: "#0e7490" },
      { level: "800", hex: "#155e75" },
      { level: "900", hex: "#164e63" },
      { level: "950", hex: "#083344" },
    ],
  },
  {
    name: "Sky",
    category: "cool",
    shades: [
      { level: "50", hex: "#f0f9ff" },
      { level: "100", hex: "#e0f2fe" },
      { level: "200", hex: "#bae6fd" },
      { level: "300", hex: "#7dd3fc" },
      { level: "400", hex: "#38bdf8" },
      { level: "500", hex: "#0ea5e9" },
      { level: "600", hex: "#0284c7" },
      { level: "700", hex: "#0369a1" },
      { level: "800", hex: "#075985" },
      { level: "900", hex: "#0c4a6e" },
      { level: "950", hex: "#082f49" },
    ],
  },
  {
    name: "Blue",
    category: "cool",
    shades: [
      { level: "50", hex: "#eff6ff" },
      { level: "100", hex: "#dbeafe" },
      { level: "200", hex: "#bfdbfe" },
      { level: "300", hex: "#93c5fd" },
      { level: "400", hex: "#60a5fa" },
      { level: "500", hex: "#3b82f6" },
      { level: "600", hex: "#2563eb" },
      { level: "700", hex: "#1d4ed8" },
      { level: "800", hex: "#1e40af" },
      { level: "900", hex: "#1e3a8a" },
      { level: "950", hex: "#172554" },
    ],
  },
  {
    name: "Indigo",
    category: "vibrant",
    shades: [
      { level: "50", hex: "#eef2ff" },
      { level: "100", hex: "#e0e7ff" },
      { level: "200", hex: "#c7d2fe" },
      { level: "300", hex: "#a5b4fc" },
      { level: "400", hex: "#818cf8" },
      { level: "500", hex: "#6366f1" },
      { level: "600", hex: "#4f46e5" },
      { level: "700", hex: "#4338ca" },
      { level: "800", hex: "#3730a3" },
      { level: "900", hex: "#312e81" },
      { level: "950", hex: "#1e1b4b" },
    ],
  },
  {
    name: "Violet",
    category: "vibrant",
    shades: [
      { level: "50", hex: "#f5f3ff" },
      { level: "100", hex: "#ede9fe" },
      { level: "200", hex: "#ddd6fe" },
      { level: "300", hex: "#c4b5fd" },
      { level: "400", hex: "#a78bfa" },
      { level: "500", hex: "#8b5cf6" },
      { level: "600", hex: "#7c3aed" },
      { level: "700", hex: "#6d28d9" },
      { level: "800", hex: "#5b21b6" },
      { level: "900", hex: "#4c1d95" },
      { level: "950", hex: "#2e1065" },
    ],
  },
  {
    name: "Purple",
    category: "vibrant",
    shades: [
      { level: "50", hex: "#faf5ff" },
      { level: "100", hex: "#f3e8ff" },
      { level: "200", hex: "#e9d5ff" },
      { level: "300", hex: "#d8b4fe" },
      { level: "400", hex: "#c084fc" },
      { level: "500", hex: "#a855f7" },
      { level: "600", hex: "#9333ea" },
      { level: "700", hex: "#7e22ce" },
      { level: "800", hex: "#6b21a8" },
      { level: "900", hex: "#581c87" },
      { level: "950", hex: "#3b0764" },
    ],
  },
  {
    name: "Fuchsia",
    category: "vibrant",
    shades: [
      { level: "50", hex: "#fdf4ff" },
      { level: "100", hex: "#fae8ff" },
      { level: "200", hex: "#f5d0fe" },
      { level: "300", hex: "#f0abfc" },
      { level: "400", hex: "#e879f9" },
      { level: "500", hex: "#d946ef" },
      { level: "600", hex: "#c026d3" },
      { level: "700", hex: "#a21caf" },
      { level: "800", hex: "#86198f" },
      { level: "900", hex: "#701a75" },
      { level: "950", hex: "#4a044e" },
    ],
  },
  {
    name: "Pink",
    category: "vibrant",
    shades: [
      { level: "50", hex: "#fdf2f8" },
      { level: "100", hex: "#fce7f3" },
      { level: "200", hex: "#fbcfe8" },
      { level: "300", hex: "#f472b6" },
      { level: "400", hex: "#f472b6" },
      { level: "500", hex: "#ec4899" },
      { level: "600", hex: "#db2777" },
      { level: "700", hex: "#be185d" },
      { level: "800", hex: "#9d174d" },
      { level: "900", hex: "#831843" },
      { level: "950", hex: "#500724" },
    ],
  },
  {
    name: "Rose",
    category: "warm",
    shades: [
      { level: "50", hex: "#fff1f2" },
      { level: "100", hex: "#ffe4e6" },
      { level: "200", hex: "#fecdd3" },
      { level: "300", hex: "#fda4af" },
      { level: "400", hex: "#fb7185" },
      { level: "500", hex: "#f43f5e" },
      { level: "600", hex: "#e11d48" },
      { level: "700", hex: "#be123c" },
      { level: "800", hex: "#9f1239" },
      { level: "900", hex: "#881337" },
      { level: "950", hex: "#4c0519" },
    ],
  },
];

// Açık kaynaklı ve popüler küratörlü degrade koleksiyonu (WebGradients, UI Gradients, Hypercolor)
export interface CuratedGradient {
  name: string;
  type: GradientType;
  angle?: number;
  stops: GradientColorStop[];
}

export const CURATED_OPEN_SOURCE_GRADIENTS: CuratedGradient[] = [
  {
    name: "Cyberpunk 2077",
    type: "linear",
    angle: 135,
    stops: [
      { color: "#22d3ee", position: 0 },
      { color: "#d946ef", position: 50 },
      { color: "#facc15", position: 100 },
    ],
  },
  {
    name: "Tokyo Nightlife",
    type: "linear",
    angle: 135,
    stops: [
      { color: "#9333ea", position: 0 },
      { color: "#db2777", position: 50 },
      { color: "#2563eb", position: 100 },
    ],
  },
  {
    name: "Cotton Candy",
    type: "linear",
    angle: 135,
    stops: [
      { color: "#ec4899", position: 0 },
      { color: "#a855f7", position: 50 },
      { color: "#6366f1", position: 100 },
    ],
  },
  {
    name: "Emerald Matrix",
    type: "linear",
    angle: 135,
    stops: [
      { color: "#34d399", position: 0 },
      { color: "#0d9488", position: 50 },
      { color: "#155e75", position: 100 },
    ],
  },
  {
    name: "Warm Sunset",
    type: "linear",
    angle: 135,
    stops: [
      { color: "#f59e0b", position: 0 },
      { color: "#ea580c", position: 50 },
      { color: "#e11d48", position: 100 },
    ],
  },
  {
    name: "Deep Ocean Aura",
    type: "linear",
    angle: 135,
    stops: [
      { color: "#2563eb", position: 0 },
      { color: "#4338ca", position: 50 },
      { color: "#0f172a", position: 100 },
    ],
  },
  {
    name: "Aurora Borealis",
    type: "linear",
    angle: 135,
    stops: [
      { color: "#4ade80", position: 0 },
      { color: "#06b6d4", position: 50 },
      { color: "#9333ea", position: 100 },
    ],
  },
  {
    name: "Fire & Ice",
    type: "linear",
    angle: 135,
    stops: [
      { color: "#ef4444", position: 0 },
      { color: "#9333ea", position: 50 },
      { color: "#3b82f6", position: 100 },
    ],
  },
  {
    name: "Hyper Violet",
    type: "linear",
    angle: 135,
    stops: [
      { color: "#7c3aed", position: 0 },
      { color: "#4f46e5", position: 50 },
      { color: "#c026d3", position: 100 },
    ],
  },
  {
    name: "Nordic Frost",
    type: "linear",
    angle: 135,
    stops: [
      { color: "#94a3b8", position: 0 },
      { color: "#7dd3fc", position: 50 },
      { color: "#71717a", position: 100 },
    ],
  },
  {
    name: "4-Renk Neon Kozmoz",
    type: "linear",
    angle: 120,
    stops: [
      { color: "#f43f5e", position: 0 },
      { color: "#a855f7", position: 33 },
      { color: "#3b82f6", position: 66 },
      { color: "#10b981", position: 100 },
    ],
  },
  {
    name: "Dairesel Nebula (Radial)",
    type: "radial",
    stops: [
      { color: "#ec4899", position: 0 },
      { color: "#8b5cf6", position: 45 },
      { color: "#0f172a", position: 100 },
    ],
  },
  {
    name: "Konik Spektrum (Conic)",
    type: "conic",
    angle: 90,
    stops: [
      { color: "#06b6d4", position: 0 },
      { color: "#a855f7", position: 33 },
      { color: "#f43f5e", position: 66 },
      { color: "#06b6d4", position: 100 },
    ],
  },
  {
    name: "Altın Güneş",
    type: "linear",
    angle: 90,
    stops: [
      { color: "#fef08a", position: 0 },
      { color: "#f59e0b", position: 50 },
      { color: "#b45309", position: 100 },
    ],
  },
  {
    name: "Karanlık Zarafet",
    type: "linear",
    angle: 135,
    stops: [
      { color: "#27272a", position: 0 },
      { color: "#18181b", position: 50 },
      { color: "#09090b", position: 100 },
    ],
  },
  {
    name: "Yaz Meyveleri",
    type: "linear",
    angle: 45,
    stops: [
      { color: "#fb7185", position: 0 },
      { color: "#f43f5e", position: 50 },
      { color: "#fda4af", position: 100 },
    ],
  },
];

// CSS Degrade Dizesi Oluşturucu
export function generateCssGradient(
  type: GradientType,
  stops: GradientColorStop[],
  angle: number = 135
): string {
  if (!stops || stops.length === 0) {
    return "linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #3b82f6 100%)";
  }

  // Durakları pozisyonlarına göre sıralayalım
  const sortedStops = [...stops].sort((a, b) => a.position - b.position);
  const stopString = sortedStops
    .map((s) => `${s.color} ${s.position}%`)
    .join(", ");

  if (type === "radial") {
    return `radial-gradient(circle at center, ${stopString})`;
  }

  if (type === "conic") {
    return `conic-gradient(from ${angle}deg at center, ${stopString})`;
  }

  // Varsayılan linear
  return `linear-gradient(${angle}deg, ${stopString})`;
}
