import {
  CardConfig,
  ThemeConfig,
  PatternConfig,
  CodeThemeConfig,
  FontFamilyId,
  ExportScale,
  CodeTab,
  SavedPreset,
  LanguageId,
  SocialPresetConfig,
  SocialPresetId,
} from "@/types";

export const THEMES: ThemeConfig[] = [
  {
    id: "candy",
    name: "Cotton Candy",
    gradient: "from-pink-500 via-purple-500 to-indigo-500",
    cssGradient: "linear-gradient(135deg, #ec4899 0%, #a855f7 50%, #6366f1 100%)",
    cardBg: "bg-[#0d111a]", // Katı, yüksek kontrastlı arka plan (html-to-image dostu)
    borderColor: "border-white/15",
  },
  {
    id: "sunset",
    name: "Warm Sunset",
    gradient: "from-amber-500 via-orange-600 to-rose-600",
    cssGradient: "linear-gradient(135deg, #f59e0b 0%, #ea580c 50%, #e11d48 100%)",
    cardBg: "bg-[#140e12]",
    borderColor: "border-amber-500/30",
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk Neon",
    gradient: "from-cyan-400 via-fuchsia-500 to-yellow-400",
    cssGradient: "linear-gradient(135deg, #22d3ee 0%, #d946ef 50%, #facc15 100%)",
    cardBg: "bg-[#070b14]",
    borderColor: "border-cyan-400/30",
  },
  {
    id: "emerald",
    name: "Emerald Forest",
    gradient: "from-emerald-400 via-teal-600 to-cyan-800",
    cssGradient: "linear-gradient(135deg, #34d399 0%, #0d9488 50%, #155e75 100%)",
    cardBg: "bg-[#071311]",
    borderColor: "border-emerald-500/30",
  },
  {
    id: "ocean",
    name: "Deep Ocean",
    gradient: "from-blue-600 via-indigo-700 to-slate-900",
    cssGradient: "linear-gradient(135deg, #2563eb 0%, #4338ca 50%, #0f172a 100%)",
    cardBg: "bg-[#080e1e]",
    borderColor: "border-blue-500/30",
  },
  {
    id: "aurora",
    name: "Aurora Borealis",
    gradient: "from-green-400 via-cyan-500 to-purple-600",
    cssGradient: "linear-gradient(135deg, #4ade80 0%, #06b6d4 50%, #9333ea 100%)",
    cardBg: "bg-[#07121c]",
    borderColor: "border-cyan-400/30",
  },
  {
    id: "tokyo",
    name: "Tokyo Night",
    gradient: "from-purple-600 via-pink-600 to-blue-600",
    cssGradient: "linear-gradient(135deg, #9333ea 0%, #db2777 50%, #2563eb 100%)",
    cardBg: "bg-[#100b1a]",
    borderColor: "border-purple-400/30",
  },
  {
    id: "fireice",
    name: "Fire & Ice",
    gradient: "from-red-500 via-purple-600 to-blue-500",
    cssGradient: "linear-gradient(135deg, #ef4444 0%, #9333ea 50%, #3b82f6 100%)",
    cardBg: "bg-[#0c0d18]",
    borderColor: "border-purple-400/30",
  },
  {
    id: "hyper",
    name: "Hyper Violet",
    gradient: "from-violet-600 via-indigo-600 to-fuchsia-700",
    cssGradient: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #c026d3 100%)",
    cardBg: "bg-[#0d0a18]",
    borderColor: "border-violet-500/30",
  },
  {
    id: "nordic",
    name: "Nordic Frost",
    gradient: "from-slate-400 via-sky-300 to-zinc-500",
    cssGradient: "linear-gradient(135deg, #94a3b8 0%, #7dd3fc 50%, #71717a 100%)",
    cardBg: "bg-[#0f141f]",
    borderColor: "border-slate-700/60",
  },
  {
    id: "midnight",
    name: "Midnight Aura",
    gradient: "from-purple-950 via-slate-900 to-black",
    cssGradient: "linear-gradient(135deg, #3b0764 0%, #0f172a 50%, #000000 100%)",
    cardBg: "bg-[#05070c]",
    borderColor: "border-purple-500/30",
  },
  {
    id: "monochrome",
    name: "Monochrome Dark",
    gradient: "from-zinc-700 via-zinc-800 to-zinc-950",
    cssGradient: "linear-gradient(135deg, #3f3f46 0%, #27272a 50%, #09090b 100%)",
    cardBg: "bg-[#09090b]",
    borderColor: "border-zinc-700/60",
  },
];

export const PATTERNS: PatternConfig[] = [
  {
    id: "grid",
    name: "Kareli Izgara (Grid)",
    className: "bg-[#0b0f19]",
    style: {
      backgroundColor: "#0b0f19",
      backgroundImage:
        "linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)",
      backgroundSize: "28px 28px",
      backgroundPosition: "0 0",
      backgroundRepeat: "repeat",
    },
  },
  {
    id: "dots",
    name: "Noktalı Matris (Dots)",
    className: "bg-[#0a0e1a]",
    style: {
      backgroundColor: "#0a0e1a",
      backgroundImage:
        "radial-gradient(circle, rgba(255, 255, 255, 0.16) 1.5px, transparent 1.5px)",
      backgroundSize: "22px 22px",
      backgroundPosition: "0 0",
      backgroundRepeat: "repeat",
    },
  },
  {
    id: "blueprint",
    name: "Mühendislik Blueprint",
    className: "bg-[#081830]",
    style: {
      backgroundColor: "#081830",
      backgroundImage:
        "linear-gradient(rgba(0, 180, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 180, 255, 0.15) 1px, transparent 1px)",
      backgroundSize: "32px 32px",
      backgroundPosition: "0 0",
      backgroundRepeat: "repeat",
    },
  },
  {
    id: "stars",
    name: "Kozmik Yıldızlar",
    className: "bg-[#04060e]",
    style: {
      backgroundColor: "#04060e",
      backgroundImage:
        "radial-gradient(1.5px 1.5px at 20px 30px, #ffffff, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 70px 90px, #a5b4fc, rgba(0,0,0,0)), radial-gradient(1px 1px at 130px 40px, #ffffff, rgba(0,0,0,0)), radial-gradient(2px 2px at 170px 140px, #f472b6, rgba(0,0,0,0))",
      backgroundSize: "200px 200px",
      backgroundPosition: "0 0",
      backgroundRepeat: "repeat",
    },
  },
  {
    id: "carbon",
    name: "Karbon Fiber",
    className: "bg-[#111317]",
    style: {
      backgroundColor: "#111317",
      backgroundImage:
        "radial-gradient(black 15%, transparent 16%), radial-gradient(black 15%, transparent 16%)",
      backgroundSize: "16px 16px",
      backgroundPosition: "0 0, 8px 8px",
      backgroundRepeat: "repeat",
    },
  },
  {
    id: "waves",
    name: "Topografik Dalgalar",
    className: "bg-[#0a0d18]",
    style: {
      backgroundColor: "#0a0d18",
      backgroundImage:
        "radial-gradient(circle at 30% 30%, rgba(99, 102, 241, 0.28) 0%, transparent 60%), radial-gradient(circle at 75% 70%, rgba(236, 72, 153, 0.25) 0%, transparent 60%)",
      backgroundSize: "100% 100%",
      backgroundPosition: "center center",
      backgroundRepeat: "no-repeat",
    },
  },
];

export const LANGUAGES = [
  { id: "typescript", label: "TypeScript" },
  { id: "javascript", label: "JavaScript" },
  { id: "python", label: "Python" },
  { id: "csharp", label: "C# (.NET)" },
  { id: "rust", label: "Rust" },
  { id: "cpp", label: "C++" },
  { id: "c", label: "C" },
  { id: "html", label: "HTML" },
  { id: "css", label: "CSS" },
  { id: "json", label: "JSON" },
  { id: "sql", label: "SQL" },
  { id: "markdown", label: "Markdown" },
  { id: "bash", label: "Bash / Shell" },
] as const;

export const LANG_TO_DEFAULT_EXT: Record<LanguageId, string> = {
  typescript: ".ts",
  javascript: ".js",
  python: ".py",
  csharp: ".cs",
  rust: ".rs",
  cpp: ".cpp",
  c: ".c",
  html: ".html",
  css: ".css",
  json: ".json",
  sql: ".sql",
  markdown: ".md",
  bash: ".sh",
};

export const EXTENSION_TO_LANG: Record<string, LanguageId> = {
  ts: "typescript",
  tsx: "typescript",
  js: "javascript",
  jsx: "javascript",
  mjs: "javascript",
  cjs: "javascript",
  py: "python",
  pyw: "python",
  cs: "csharp",
  rs: "rust",
  cpp: "cpp",
  cc: "cpp",
  cxx: "cpp",
  hpp: "cpp",
  c: "c",
  h: "c",
  html: "html",
  htm: "html",
  css: "css",
  scss: "css",
  json: "json",
  sql: "sql",
  md: "markdown",
  markdown: "markdown",
  sh: "bash",
  bash: "bash",
  zsh: "bash",
};

export function updateFilenameExtension(filename: string, newLang: LanguageId): string {
  const targetExt = LANG_TO_DEFAULT_EXT[newLang] || ".ts";
  const trimmed = (filename || "").trim();
  if (!trimmed) return `snippet${targetExt}`;

  const lastDotIndex = trimmed.lastIndexOf(".");
  if (lastDotIndex <= 0) {
    return `${trimmed}${targetExt}`;
  }
  const baseName = trimmed.substring(0, lastDotIndex);
  return `${baseName}${targetExt}`;
}

export function detectLanguageFromFilename(filename: string): LanguageId | null {
  const parts = (filename || "").trim().toLowerCase().split(".");
  if (parts.length < 2) return null;
  const ext = parts.pop();
  if (ext && EXTENSION_TO_LANG[ext]) {
    return EXTENSION_TO_LANG[ext];
  }
  return null;
}

export const CODE_THEMES: CodeThemeConfig[] = [
  {
    id: "onedark",
    name: "One Dark Pro",
    cardBg: "bg-[#0d111a]",
    borderColor: "border-slate-800",
    dotColor: "#61afef",
  },
  {
    id: "dracula",
    name: "Dracula Official",
    cardBg: "bg-[#1e1f29]",
    borderColor: "border-[#44475a]",
    dotColor: "#bd93f9",
  },
  {
    id: "monokai",
    name: "Monokai Pro",
    cardBg: "bg-[#1e1f1c]",
    borderColor: "border-[#3e3d32]",
    dotColor: "#a6e22e",
  },
  {
    id: "githubDark",
    name: "GitHub Dark",
    cardBg: "bg-[#0d1117]",
    borderColor: "border-[#30363d]",
    dotColor: "#58a6ff",
  },
  {
    id: "nord",
    name: "Nord Frost",
    cardBg: "bg-[#242933]",
    borderColor: "border-[#434c5e]",
    dotColor: "#88c0d0",
  },
  {
    id: "tokyonight",
    name: "Tokyo Night",
    cardBg: "bg-[#16161e]",
    borderColor: "border-[#24283b]",
    dotColor: "#7aa2f7",
  },
  {
    id: "synthwave",
    name: "Synthwave '84",
    cardBg: "bg-[#1a1626]",
    borderColor: "border-[#34294f]",
    dotColor: "#fe4450",
  },
  {
    id: "solarized",
    name: "Solarized Dark",
    cardBg: "bg-[#00212b]",
    borderColor: "border-[#073642]",
    dotColor: "#268bd2",
  },
];

export interface FontFamilyConfig {
  id: FontFamilyId;
  name: string;
  fontClass: string;
  fontFamily: string;
}

export const FONT_FAMILIES: FontFamilyConfig[] = [
  {
    id: "jetbrains",
    name: "JetBrains Mono",
    fontClass: "font-jetbrains",
    fontFamily: "'JetBrains Mono', monospace",
  },
  {
    id: "fira",
    name: "Fira Code",
    fontClass: "font-fira",
    fontFamily: "'Fira Code', monospace",
  },
  {
    id: "geist",
    name: "Geist Mono",
    fontClass: "font-geist",
    fontFamily: "'Geist Mono', monospace",
  },
  {
    id: "sourcecode",
    name: "Source Code Pro",
    fontClass: "font-source",
    fontFamily: "'Source Code Pro', monospace",
  },
  {
    id: "cascadia",
    name: "Cascadia Code",
    fontClass: "font-cascadia",
    fontFamily: "'Cascadia Code', monospace",
  },
  {
    id: "inconsolata",
    name: "Inconsolata",
    fontClass: "font-inconsolata",
    fontFamily: "'Inconsolata', monospace",
  },
  {
    id: "ubuntu",
    name: "Ubuntu Mono",
    fontClass: "font-ubuntu",
    fontFamily: "'Ubuntu Mono', monospace",
  },
  {
    id: "spacemono",
    name: "Space Mono",
    fontClass: "font-space",
    fontFamily: "'Space Mono', monospace",
  },
  {
    id: "robotomono",
    name: "Roboto Mono",
    fontClass: "font-roboto",
    fontFamily: "'Roboto Mono', monospace",
  },
  {
    id: "victormono",
    name: "Victor Mono",
    fontClass: "font-victor",
    fontFamily: "'Victor Mono', monospace",
  },
  {
    id: "mono",
    name: "System Monospace",
    fontClass: "font-mono",
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
];

export const NEON_GLOW_PRESETS = [
  { id: "indigo", name: "Electric Indigo", color: "#6366f1" },
  { id: "fuchsia", name: "Cyber Fuchsia", color: "#ec4899" },
  { id: "cyan", name: "Neon Cyan", color: "#06b6d4" },
  { id: "lime", name: "Acid Lime", color: "#84cc16" },
  { id: "amber", name: "Sunset Amber", color: "#f59e0b" },
  { id: "purple", name: "Tokyo Purple", color: "#a855f7" },
  { id: "emerald", name: "Matrix Emerald", color: "#10b981" },
  { id: "rose", name: "Hot Rose", color: "#f43f5e" },
  { id: "blue", name: "Deep Sky", color: "#3b82f6" },
  { id: "white", name: "Pure White", color: "#ffffff" },
] as const;

export const CURATED_PRESETS: {
  id: string;
  name: string;
  description: string;
  badge: string;
  config: Partial<CardConfig>;
}[] = [
  {
    id: "cyber-neon",
    name: "Cyberpunk Neon",
    description: "Parlak fuşya ve camgöbeği degrade, Synthwave teması",
    badge: "Popüler",
    config: {
      theme: "cyberpunk",
      bgType: "gradient",
      useCustomGradient: false,
      codeTheme: "synthwave",
      fontFamily: "fira",
      fontLigatures: true,
      shadow: "hard",
      padding: 48,
    },
  },
  {
    id: "minimal-dark",
    name: "Monokrom Minimal",
    description: "Sade mat koyu zemin, GitHub Dark teması",
    badge: "Klasik",
    config: {
      theme: "monochrome",
      bgType: "gradient",
      useCustomGradient: false,
      codeTheme: "githubDark",
      fontFamily: "jetbrains",
      fontLigatures: true,
      shadow: "soft",
      padding: 32,
    },
  },
  {
    id: "emerald-matrix",
    name: "Emerald Matrix",
    description: "Zümrüt doku, Noktalı desen ve Nord renkleri",
    badge: "Hacker",
    config: {
      theme: "emerald",
      bgType: "pattern",
      pattern: "dots",
      patternOpacity: 0.7,
      patternSpotlight: true,
      codeTheme: "nord",
      fontFamily: "jetbrains",
      fontLigatures: true,
      shadow: "hard",
      padding: 48,
    },
  },
  {
    id: "tokyo-sunset",
    name: "Tokyo Sunset",
    description: "Sıcak gün batımı degrade, Dracula koyu editör",
    badge: "Estetik",
    config: {
      theme: "sunset",
      bgType: "gradient",
      useCustomGradient: false,
      codeTheme: "dracula",
      fontFamily: "geist",
      fontLigatures: true,
      shadow: "hard",
      padding: 48,
    },
  },
  {
    id: "aurora-glow",
    name: "Aurora Borealis",
    description: "Kuzey ışıkları yeşil-mavi atmosfer, One Dark Pro",
    badge: "Canlı",
    config: {
      theme: "aurora",
      bgType: "gradient",
      useCustomGradient: false,
      codeTheme: "onedark",
      fontFamily: "jetbrains",
      fontLigatures: true,
      shadow: "hard",
      padding: 48,
    },
  },
];

const INITIAL_CODE_TAB1 = `// SnapMark: Kodunu 10/10 bir görsele dönüştür
import { createSnap } from "snapmark";

interface DeveloperCard {
  username: string;
  theme: "cyberpunk" | "sunset" | "candy";
  exportQuality: "4K" | "Retina";
}

export function generateShowcase(): DeveloperCard {
  return {
    username: "@keremdev",
    theme: "cyberpunk",
    exportQuality: "4K",
  };
}

console.log("Hazır! Tek tıkla PNG veya panoya kopyala 🚀");`;

const INITIAL_CODE_TAB2 = `/* SnapMark Modern Glassmorphism Stilleri */
.code-card-wrapper {
  background: rgba(13, 17, 26, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 1.25rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.75);
}

.code-titlebar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
}`;

const INITIAL_CODE_TAB3 = `// Gelişmiş Kart Yapılandırma Tipleri
export interface CardPreset {
  id: string;
  name: string;
  author: string;
  tags: string[];
}

export type ExportFormat = "png" | "svg" | "webp";
export type ResolutionScale = 1 | 2 | 4;`;

export const DEFAULT_CONFIG: CardConfig = {
  title: "snapmark-demo.ts",
  language: "typescript",
  code: INITIAL_CODE_TAB1,
  bgType: "gradient",
  theme: "candy",
  pattern: "grid",
  patternOpacity: 0.85,
  patternSpotlight: false,
  codeTheme: "onedark",
  customBgUrl: "",
  useCustomGradient: false,
  gradientType: "linear",
  gradientStops: [
    { color: "#ec4899", position: 0 },
    { color: "#8b5cf6", position: 50 },
    { color: "#3b82f6", position: 100 },
  ],
  gradientColors: ["#ec4899", "#8b5cf6", "#3b82f6"],
  gradientAngle: 135,
  padding: 48,
  showLineNumbers: true,
  windowStyle: "mac",
  aspectRatio: "auto",
  customWidth: 1200,
  customHeight: 630,
  fontSize: 14,
  shadow: "hard",
  cardWidth: "normal" as const,
  highlightedLines: "",
  showWatermark: false,
  watermarkText: "@keremdev",
  mode: "code",
  authorName: "Kerem Birçek",
  authorHandle: "@keremdev",
  // Faz 2 Gelişmiş Özellikler
  fontFamily: "jetbrains",
  fontLigatures: true,
  exportScale: 2,
  tabs: [
    {
      id: "tab-1",
      name: "snapmark-demo.ts",
      language: "typescript",
      code: INITIAL_CODE_TAB1,
    },
    {
      id: "tab-2",
      name: "styles.css",
      language: "css",
      code: INITIAL_CODE_TAB2,
    },
    {
      id: "tab-3",
      name: "types.ts",
      language: "typescript",
      code: INITIAL_CODE_TAB3,
    },
  ],
  activeTabId: "tab-1",
  // Faz 3 Çok Modlu İçerik Özellikleri
  tweetAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  tweetName: "Kerem Yılmaz",
  tweetHandle: "keremdev",
  tweetVerified: "blue",
  tweetContent: "Gereksiz karmaşık sistemler yerine, tek bir işi mükemmel yapan minimalist araçlar üretmek en büyük süper güçtür. 🚀\n\n#Nextjs #TypeScript #BuildInPublic",
  tweetDate: "21:42 · 10 Eyl 2026",
  tweetClient: "Twitter for Mac",
  tweetShowMetrics: true,
  tweetLikes: "1.4K",
  tweetRetweets: "382",
  tweetViews: "54.8K",
  tweetBookmarks: "215",
  quoteContent: "Yazılım geliştirmede sadelik, karmaşıklığı çözmenin en sofistike yoludur.",
  quoteAuthor: "Steve Jobs",
  quoteTitle: "Apple Kurucusu & Vizyoner",
  quoteStyle: "minimal",
  showQuoteMarks: false,
  // Faz 4 Zirve Stüdyo Özellikleri
  tilt3d: false,
  tiltPreset: "flat",
  tiltRotateX: 12,
  tiltRotateY: -16,
  tiltRotateZ: 4,
  tiltGlow: true,
  tiltGlowColor: "#6366f1",
  safariUrl: "https://snapmark.dev/demo",
  terminalPrompt: "kerem@snapmark:~/workspace$",
  showLanguageBadge: true,
  showTabIcons: true,
  showQrCode: false,
  qrText: "https://github.com",
  qrPosition: "bottom-right",
  typewriterActive: false,
  typewriterSpeed: 30,
  // Faz 5 İçerik Üretici & Animasyon Süper Güçleri
  slides: [
    {
      id: "slide-1",
      name: "Slayt 1",
      title: "01. Temiz Mimari Nedir?",
      language: "typescript",
      mode: "code",
      code: `// 💡 İpucu: Fonksiyonlarınızı tek bir iş yapacak şekilde bölün.\nfunction calculateInvoice(items: Item[]): InvoiceResult {\n  const subtotal = items.reduce((acc, item) => acc + item.price, 0);\n  const tax = subtotal * 0.20;\n  return { subtotal, tax, total: subtotal + tax };\n}`,
    },
    {
      id: "slide-2",
      name: "Slayt 2",
      title: "02. Hata Yönetimi",
      language: "typescript",
      mode: "diff",
      diffBeforeCode: `// ❌ Kötü Pratik: Sessiz hata yutma\ntry {\n  await fetchData();\n} catch (e) {}\n`,
      diffAfterCode: `// ✅ Temiz Pratik: Güvenli ve bildirimli hata yönetimi\ntry {\n  await fetchData();\n} catch (err) {\n  logger.error("Veri çekilemedi", { err });\n  throw new AppError("DATA_FETCH_FAILED");\n}`,
      code: ``,
    },
    {
      id: "slide-3",
      name: "Slayt 3",
      title: "03. Özet & Notlar",
      language: "typescript",
      mode: "quote",
      quoteContent: "En iyi kod, yazılmaya ihtiyaç duyulmayan ve silinmesi en kolay olan koddur.",
      quoteAuthor: "Martin Fowler",
      quoteTitle: "Refactoring & Architecture",
      code: ``,
    },
  ],
  activeSlideId: "slide-1",
  showSlideCounter: true,
  showSwipeIndicator: true,
  diffBeforeLabel: "Önce (Kötü Pratik)",
  diffAfterLabel: "Sonra (Temiz Kod)",
  diffBeforeCode: `// ❌ Kötü Pratik: Spagetti kod & karmaşık if-else\nfunction getDiscount(user: any) {\n  if (user.isVip) {\n    if (user.points > 100) return 0.3;\n    else return 0.2;\n  } else {\n    return 0.05;\n  }\n}`,
  diffAfterCode: `// ✅ Temiz Kod: Guard clauses & erken dönüş\nfunction getDiscount(user: User): number {\n  if (!user.isVip) return 0.05;\n  return user.points > 100 ? 0.3 : 0.2;\n}`,
  typewriterPlaying: false,
  typewriterSpeedMode: "normal",
  // Faz 6 Pro Studio Güç Paketi
  useGradientBorder: false,
  gradientBorderPreset: "rainbow",
  gradientBorderWidth: 2,
  gradientBorderColors: ["#6366f1", "#ec4899", "#06b6d4"],
  gradientBorderAngle: 135,
  useGrainTexture: false,
  grainOpacity: 0.18,
  // Faz 7 Pro Studio & Genişletmeler
  socialPreset: "free",
  windowHeaderBg: "",
  windowHeaderCustom: false,
  logoUrl: "",
  logoPosition: "bottom-right",
  logoOpacity: 80,
  logoSize: 42,
  terminalCommand: "npm install @snapmark/core",
  terminalOutput: "✔ Package @snapmark/core installed successfully\n✔ 42 packages audited in 0.8s\n✔ Found 0 vulnerabilities\n🚀 Ready for production!",
  terminalUser: "developer@snapmark:~",
};

export const SOCIAL_PRESETS: SocialPresetConfig[] = [
  {
    id: "free",
    name: "Serbest (Otomatik)",
    description: "İçeriğe göre dinamik tuval boyutu",
    width: 0,
    height: 0,
    icon: "📐",
    aspectRatio: "auto",
  },
  {
    id: "twitter",
    name: "Twitter / X Post",
    description: "1200 × 675 (16:9)",
    width: 1200,
    height: 675,
    icon: "🐦",
    aspectRatio: "16/9",
  },
  {
    id: "instagram-story",
    name: "Instagram Story",
    description: "1080 × 1920 (9:16)",
    width: 1080,
    height: 1920,
    icon: "📱",
    aspectRatio: "9/16",
  },
  {
    id: "instagram-square",
    name: "Instagram Kare Post",
    description: "1080 × 1080 (1:1)",
    width: 1080,
    height: 1080,
    icon: "📸",
    aspectRatio: "1/1",
  },
  {
    id: "linkedin-banner",
    name: "LinkedIn Banner",
    description: "1584 × 396 (4:1)",
    width: 1584,
    height: 396,
    icon: "💼",
    aspectRatio: "4/1",
  },
  {
    id: "youtube-thumb",
    name: "YouTube Thumbnail",
    description: "1280 × 720 (16:9)",
    width: 1280,
    height: 720,
    icon: "🎬",
    aspectRatio: "16/9",
  },
];

export const WINDOW_HEADER_PRESETS = [
  { id: "auto", name: "Varsayılan", color: "" },
  { id: "dark-glass", name: "Koyu Cam", color: "rgba(10, 15, 26, 0.75)" },
  { id: "solid-black", name: "Mat Siyah", color: "#000000" },
  { id: "indigo", name: "İndigo", color: "#1e1b4b" },
  { id: "purple", name: "Tokyo Mor", color: "#2e1065" },
  { id: "emerald", name: "Zümrüt Yeşil", color: "#064e3b" },
] as const;

export const GRADIENT_BORDER_PRESETS = [
  {
    id: "rainbow",
    name: "Gökkuşağı Neon",
    gradient: "linear-gradient(135deg, #f43f5e, #ec4899, #8b5cf6, #3b82f6, #10b981, #f59e0b)",
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    gradient: "linear-gradient(135deg, #ff007f, #7928ca, #00dfd8)",
  },
  {
    id: "sunset",
    name: "Sunset Glow",
    gradient: "linear-gradient(135deg, #f97316, #ec4899, #6366f1)",
  },
  {
    id: "electric",
    name: "Electric Cyan",
    gradient: "linear-gradient(135deg, #06b6d4, #3b82f6, #9333ea)",
  },
  {
    id: "emerald",
    name: "Matrix Emerald",
    gradient: "linear-gradient(135deg, #10b981, #06b6d4, #84cc16)",
  },
] as const;

export const TYPEWRITER_SPEEDS = [
  { id: "slow", name: "Yavaş (60ms)", ms: 60 },
  { id: "normal", name: "Normal (30ms)", ms: 30 },
  { id: "fast", name: "Hızlı (15ms)", ms: 15 },
  { id: "turbo", name: "Turbo (5ms)", ms: 5 },
] as const;

export const TILT_PRESETS = [
  { id: "flat", name: "Düz 2D", rotateX: 0, rotateY: 0, rotateZ: 0 },
  { id: "isometric", name: "İzometrik 3D", rotateX: 12, rotateY: -16, rotateZ: 4 },
  { id: "tiltRight", name: "Sağ Eğim", rotateX: 8, rotateY: 15, rotateZ: -2 },
  { id: "tiltLeft", name: "Sol Eğim", rotateX: 8, rotateY: -15, rotateZ: 2 },
  { id: "floating", name: "Havada Süzülen", rotateX: 18, rotateY: -8, rotateZ: 2 },
] as const;

export const PRESET_AVATARS = [
  {
    id: "memoji-dev",
    name: "Geliştirici",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    gradient: "from-indigo-500 to-purple-600",
    emoji: "👨‍💻",
  },
  {
    id: "memoji-tech",
    name: "Yazılımcı",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    gradient: "from-blue-500 to-cyan-500",
    emoji: "🧑‍💻",
  },
  {
    id: "memoji-designer",
    name: "Tasarımcı",
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    gradient: "from-pink-500 to-rose-500",
    emoji: "👩‍🎨",
  },
  {
    id: "memoji-founder",
    name: "Girişimci",
    url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    gradient: "from-amber-500 to-orange-500",
    emoji: "🚀",
  },
  {
    id: "memoji-ai",
    name: "AI & Sistem",
    url: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
    gradient: "from-emerald-500 to-teal-600",
    emoji: "🤖",
  },
  {
    id: "memoji-zen",
    name: "Minimalist",
    url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    gradient: "from-violet-500 to-indigo-700",
    emoji: "⚡",
  },
];
