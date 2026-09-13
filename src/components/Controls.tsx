"use client";

import React, { useRef, useState, useMemo, useEffect } from "react";
import { THEMES, PATTERNS, LANGUAGES, CODE_THEMES, FONT_FAMILIES, CURATED_PRESETS, PRESET_AVATARS, TILT_PRESETS, TYPEWRITER_SPEEDS, NEON_GLOW_PRESETS, GRADIENT_BORDER_PRESETS, SOCIAL_PRESETS, WINDOW_HEADER_PRESETS } from "@/lib/constants";
import {
  CardConfig,
  CardMode,
  VerifiedType,
  QuoteStyle,
  TiltPreset,
  TypewriterSpeed,
  ThemeId,
  PatternId,
  BackgroundType,
  LanguageId,
  WindowStyle,
  AspectRatioId,
  ShadowStyle,
  CardWidth,
  GradientColorStop,
  GradientType,
  CodeThemeId,
  FontFamilyId,
  SavedPreset,
  SocialPresetId,
} from "@/types";
import {
  Search,
  Palette,
  Sliders,
  Type,
  Layout,
  ShieldCheck,
  Image as ImageIcon,
  Grid,
  Layers,
  Upload,
  Plus,
  Trash2,
  Sparkles,
  RotateCw,
  Compass,
  ArrowRight,
  Code2,
  Eye,
  Sun,
  Copy,
  Check,
  ChevronDown,
  Bookmark,
  Save,
  FolderHeart,
  Quote,
  MessageSquareQuote,
  Box,
  QrCode,
  Terminal,
  Globe,
  Flame,
  GitCompare,
  Play,
  Pause,
  RotateCcw,
  Waves,
} from "lucide-react";
import { HexColorPicker } from "react-colorful";
import { generateCssGradient } from "@/lib/colorTable";
import { getT } from "@/lib/i18n";

interface ControlsProps {
  config: CardConfig;
  onChange: (updates: Partial<CardConfig>) => void;
}

interface AccordionSectionProps {
  title: string;
  icon: React.ReactNode;
  badge?: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({
  title,
  icon,
  badge,
  isOpen,
  onToggle,
  children,
}) => {
  return (
    <div
      className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
        isOpen
          ? "border-slate-700/90 bg-[#101726]/90 shadow-lg shadow-black/30"
          : "border-slate-800/80 bg-[#0c121e]/70 hover:border-slate-700/70 hover:bg-[#0f1625]/60"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-4 py-3 flex items-center justify-between text-left transition-colors cursor-pointer select-none group"
      >
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div
            className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
              isOpen
                ? "bg-indigo-600/20 border-indigo-500/40 text-indigo-400"
                : "bg-slate-800/80 border-slate-700/60 text-slate-400 group-hover:text-white"
            }`}
          >
            {icon}
          </div>
          <span className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors truncate">
            {title}
          </span>
          {badge && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-indigo-300 font-medium shrink-0 ml-auto mr-1 truncate max-w-[130px]">
              {badge}
            </span>
          )}
        </div>

        <div className="flex items-center shrink-0 ml-2">
          <div
            className={`w-6 h-6 rounded-md flex items-center justify-center text-slate-400 group-hover:text-white transition-transform duration-200 ${
              isOpen ? "rotate-180 text-indigo-400 bg-indigo-500/10" : ""
            }`}
          >
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="px-4 pb-4 pt-1 space-y-4 border-t border-slate-800/80 animate-in fade-in-50 duration-200">
          {children}
        </div>
      )}
    </div>
  );
};

export const Controls: React.FC<ControlsProps> = ({ config, onChange }) => {
  const t = getT(config.uiLanguage);
  const isEn = config.uiLanguage === "en";
  const fileInputRef = useRef<HTMLInputElement>(null);
  const tweetAvatarInputRef = useRef<HTMLInputElement>(null);
  const logoFileInputRef = useRef<HTMLInputElement>(null);
  const [copiedHex, setCopiedHex] = useState(false);
  const [activeStopIndex, setActiveStopIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  // Açılır / Kapanır Bölümlerin Durumu (Accordion)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    carousel: false,   // Faz 5: Carousel & Çoklu Slayt Stüdyosu
    mode: true,        // Faz 3: İçerik Modu (Kod / Tweet / Alıntı / Diff / CLI)
    diff: false,       // Faz 5: Diff / Karşılaştırma Editörü
    typewriter: false, // Faz 5: Canlı Daktilo Animasyonu
    tilt: false,       // Faz 4: 3D Perspektif & Eğim Stüdyosu
    background: false, // Arka plan
    code: true,        // Kod & Metin ayarları
    format: false,     // Tuval formatı & Sosyal Medya
    card: false,       // Kart çerçevesi & Pencere Başlığı Rengi
    logo: false,       // Faz 7B: Özel Marka Logosu & Filigran
    qr: false,         // Faz 4: Dinamik QR Kod Rozeti
    watermark: false,  // Filigran
    presets: false,    // Faz 2: Tasarım Şablonları & Presetler
  });

  const [presetNameInput, setPresetNameInput] = useState("");
  const [savedPresets, setSavedPresets] = useState<SavedPreset[]>([]);
  const [presetFeedback, setPresetFeedback] = useState<string | null>(null);

  // LocalStorage'dan şablonları yükle
  useEffect(() => {
    try {
      const stored = localStorage.getItem("snapmark_saved_presets");
      if (stored) {
        setSavedPresets(JSON.parse(stored));
      }
    } catch {
      // sessiz fallback
    }
  }, []);

  const handleSaveCurrentPreset = () => {
    if (!presetNameInput.trim()) return;
    const newPreset: SavedPreset = {
      id: `preset-${Date.now()}`,
      name: presetNameInput.trim(),
      createdAt: Date.now(),
      config: {
        theme: config.theme,
        bgType: config.bgType,
        pattern: config.pattern,
        patternOpacity: config.patternOpacity,
        patternSpotlight: config.patternSpotlight,
        codeTheme: config.codeTheme,
        fontFamily: config.fontFamily,
        fontLigatures: config.fontLigatures,
        padding: config.padding,
        shadow: config.shadow,
        windowStyle: config.windowStyle,
        aspectRatio: config.aspectRatio,
        useCustomGradient: config.useCustomGradient,
        gradientType: config.gradientType,
        gradientStops: config.gradientStops,
        gradientAngle: config.gradientAngle,
      },
    };

    const updated = [newPreset, ...savedPresets];
    setSavedPresets(updated);
    try {
      localStorage.setItem("snapmark_saved_presets", JSON.stringify(updated));
    } catch {
      //
    }
    setPresetNameInput("");
    setPresetFeedback("Şablon kaydedildi!");
    setTimeout(() => setPresetFeedback(null), 2500);
  };

  const handleLoadPreset = (presetConfig: Partial<CardConfig>) => {
    onChange(presetConfig);
    setPresetFeedback("Şablon uygulandı!");
    setTimeout(() => setPresetFeedback(null), 2000);
  };

  const handleDeletePreset = (id: string) => {
    const filtered = savedPresets.filter((p) => p.id !== id);
    setSavedPresets(filtered);
    try {
      localStorage.setItem("snapmark_saved_presets", JSON.stringify(filtered));
    } catch {
      //
    }
  };

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) return;
    const q = query.toLowerCase().trim();
    const newOpen: Record<string, boolean> = { ...openSections };
    if (q.includes("font") || q.includes("kod") || q.includes("dil") || q.includes("satır") || q.includes("boyut")) newOpen.code = true;
    if (q.includes("degrade") || q.includes("renk") || q.includes("arka") || q.includes("desen") || q.includes("spot")) newOpen.background = true;
    if (q.includes("boyut") || q.includes("format") || q.includes("oran") || q.includes("twitter") || q.includes("instagram") || q.includes("sosyal") || q.includes("story")) newOpen.format = true;
    if (q.includes("pencere") || q.includes("başlık") || q.includes("kenar") || q.includes("gölge") || q.includes("grain")) newOpen.card = true;
    if (q.includes("3d") || q.includes("eğim") || q.includes("tilt") || q.includes("glow")) newOpen.tilt = true;
    if (q.includes("daktilo") || q.includes("hız") || q.includes("animasyon")) newOpen.typewriter = true;
    if (q.includes("diff") || q.includes("karşılaştır")) newOpen.diff = true;
    if (q.includes("terminal") || q.includes("cli") || q.includes("komut")) newOpen.mode = true;
    if (q.includes("logo") || q.includes("filigran") || q.includes("marka")) newOpen.logo = true;
    if (q.includes("qr") || q.includes("karekod")) newOpen.qr = true;
    if (q.includes("şablon") || q.includes("preset")) newOpen.presets = true;
    if (q.includes("slayt") || q.includes("carousel")) newOpen.carousel = true;
    setOpenSections(newOpen);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        onChange({
          logoUrl: event.target.result,
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const expandAll = () => {
    setOpenSections({
      carousel: true,
      mode: true,
      diff: true,
      typewriter: true,
      tilt: true,
      background: true,
      code: true,
      format: true,
      card: true,
      logo: true,
      qr: true,
      watermark: true,
      presets: true,
    });
  };

  const collapseAll = () => {
    setOpenSections({
      carousel: false,
      mode: false,
      diff: false,
      typewriter: false,
      tilt: false,
      background: false,
      code: false,
      format: false,
      card: false,
      logo: false,
      qr: false,
      watermark: false,
      presets: false,
    });
  };

  // Mevcut durakların güvenli listesi
  const currentStops: GradientColorStop[] = useMemo(() => {
    if (config.gradientStops && config.gradientStops.length >= 2) {
      return config.gradientStops;
    }
    const colors = config.gradientColors || ["#ec4899", "#8b5cf6", "#3b82f6"];
    return [
      { color: colors[0] || "#ec4899", position: 0 },
      { color: colors[1] || "#8b5cf6", position: 50 },
      { color: colors[2] || "#3b82f6", position: 100 },
    ];
  }, [config.gradientStops, config.gradientColors]);

  const safeActiveIndex = Math.min(
    Math.max(0, activeStopIndex),
    Math.max(0, currentStops.length - 1)
  );
  const activeStop = currentStops[safeActiveIndex] || {
    color: "#ec4899",
    position: 0,
  };

  // CSS gradient string'i
  const currentGradientCss = useMemo(() => {
    return generateCssGradient(
      config.gradientType || "linear",
      currentStops,
      config.gradientAngle ?? 135
    );
  }, [config.gradientType, currentStops, config.gradientAngle]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        onChange({
          bgType: "custom",
          customBgUrl: event.target.result,
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        onChange({
          tweetAvatar: event.target.result,
        });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full h-full bg-[#0d131f] border-r border-slate-800/80 p-4 space-y-3.5 overflow-y-auto">
      {/* Üst Çubuk: Başlık & Tümünü Aç/Kapat */}
      <div className="flex items-center justify-between px-1 pb-1">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          {isEn ? "Settings & Menus" : "Ayarlar & Menüler"}
        </span>
        <div className="flex items-center gap-1.5 text-[10px]">
          <button
            type="button"
            onClick={expandAll}
            className="text-slate-400 hover:text-indigo-400 transition-colors px-1.5 py-0.5 rounded hover:bg-slate-800 cursor-pointer"
          >
            {isEn ? "Expand All" : "Tümünü Aç"}
          </button>
          <span className="text-slate-600">•</span>
          <button
            type="button"
            onClick={collapseAll}
            className="text-slate-400 hover:text-indigo-400 transition-colors px-1.5 py-0.5 rounded hover:bg-slate-800 cursor-pointer"
          >
            {isEn ? "Collapse All" : "Kapat"}
          </button>
        </div>
      </div>

      {/* Arama Çubuğu (Settings Search Bar - Faz 7A) */}
      <div className="relative">
        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          placeholder={isEn ? "Search settings... (font, color, 3D, logo)" : "Ayarlarda ara... (font, renk, 3D, logo)"}
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full bg-[#131b2a] border border-slate-700/80 focus:border-indigo-500 rounded-xl pl-8 pr-8 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition-colors shadow-inner"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => handleSearch("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs px-1"
          >
            ✕
          </button>
        )}
      </div>

      {/* 0. CAROUSEL & SLAYT STÜDYOSU (Faz 5) */}
      <AccordionSection
        title={t.carouselStudio}
        icon={<Layers className="w-3.5 h-3.5 text-indigo-400" />}
        badge={`${config.slides?.length || 1} ${config.uiLanguage === "en" ? "Slides" : "Slayt"}`}
        isOpen={openSections.carousel}
        onToggle={() => toggleSection("carousel")}
      >
        <div className="space-y-3 pt-1">
          <p className="text-[11px] text-slate-400 leading-relaxed">
            {config.uiLanguage === "en"
              ? "Create multi-slide carousels for LinkedIn and Instagram. Reorder slides, duplicate, or export all as a ZIP archive."
              : "LinkedIn ve Instagram için çoklu slayt gönderileri hazırlayın. Slaytlar arasında geçiş yapabilir, çoğaltabilir veya tek tıkla toplu ZIP indirebilirsiniz."}
          </p>

          <div className="space-y-2 pt-1 border-t border-slate-800">
            <div className="flex items-center justify-between p-2 rounded-xl bg-[#131b2a] border border-slate-800">
              <span className="text-xs font-medium text-slate-300">
                {config.uiLanguage === "en" ? "Show Slide Counter" : "Slayt Sayacını Göster"}
              </span>
              <button
                type="button"
                onClick={() => onChange({ showSlideCounter: !config.showSlideCounter })}
                className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                  config.showSlideCounter ? "bg-indigo-600" : "bg-slate-700"
                }`}
              >
                <span
                  className={`block w-3.5 h-3.5 rounded-full bg-white transition-transform absolute top-0.5 left-0.5 ${
                    config.showSlideCounter ? "translate-x-4" : ""
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-[#131b2a] border border-slate-800">
              <span className="text-xs font-medium text-slate-300">
                {config.uiLanguage === "en" ? "Show Swipe Cue (➔)" : "Kaydırma İpucunu Göster (➔)"}
              </span>
              <button
                type="button"
                onClick={() => onChange({ showSwipeIndicator: !config.showSwipeIndicator })}
                className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                  config.showSwipeIndicator ? "bg-indigo-600" : "bg-slate-700"
                }`}
              >
                <span
                  className={`block w-3.5 h-3.5 rounded-full bg-white transition-transform absolute top-0.5 left-0.5 ${
                    config.showSwipeIndicator ? "translate-x-4" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </AccordionSection>

      {/* 1. İÇERİK TÜRÜ & KART MODU (Faz 3 & Faz 5 Çok Modlu Stüdyo) */}
      <AccordionSection
        title={t.contentMode}
        icon={<Layers className="w-3.5 h-3.5 text-indigo-400" />}
        badge={
          config.mode === "code"
            ? "💻 Kod Modu"
            : config.mode === "diff"
            ? "🔄 Diff Modu"
            : config.mode === "terminal"
            ? "🖥️ Terminal Modu"
            : config.mode === "tweet"
            ? "𝕏 Tweet Modu"
            : "📝 Alıntı Modu"
        }
        isOpen={openSections.mode}
        onToggle={() => toggleSection("mode")}
      >
        <div className="space-y-3.5">
          {/* 5'li Mod Geçişi */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Kart Türü</span>
              <span className="text-[10px] text-indigo-400 font-medium">
                {config.mode === "code"
                  ? "Yazılım Kod Kartı"
                  : config.mode === "diff"
                  ? "Diff / Karşılaştırma"
                  : config.mode === "terminal"
                  ? "Terminal & Konsol Komutu"
                  : config.mode === "tweet"
                  ? "Sosyal Medya Paylaşımı"
                  : "İlham & Alıntı Kartı"}
              </span>
            </label>
            <div className="grid grid-cols-3 gap-1.5 bg-[#131b2a] p-1.5 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => onChange({ mode: "code" })}
                className={`py-2 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  config.mode === "code"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Kod</span>
              </button>
              <button
                type="button"
                onClick={() => onChange({ mode: "diff" })}
                className={`py-2 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  config.mode === "diff"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <GitCompare className="w-3.5 h-3.5" />
                <span>Diff</span>
              </button>
              <button
                type="button"
                onClick={() => onChange({ mode: "terminal" })}
                className={`py-2 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  config.mode === "terminal"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>Terminal</span>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-1.5 bg-[#131b2a] p-1.5 rounded-xl border border-slate-800 mt-1.5">
              <button
                type="button"
                onClick={() => onChange({ mode: "tweet" })}
                className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  config.mode === "tweet"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <span className="text-xs font-bold leading-none">𝕏</span>
                <span>Tweet (X)</span>
              </button>
              <button
                type="button"
                onClick={() => onChange({ mode: "quote" })}
                className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  config.mode === "quote"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <Quote className="w-3.5 h-3.5" />
                <span>Alıntı & Not</span>
              </button>
            </div>
          </div>

          {/* TERMINAL / CLI MODU AYARLARI (Faz 7B) */}
          {config.mode === "terminal" && (
            <div className="space-y-3 pt-2 border-t border-slate-800 animate-in fade-in-50 duration-200">
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-slate-400">Terminal Kullanıcısı / Prompt</label>
                <input
                  type="text"
                  value={config.terminalUser || "developer@snapmark:~"}
                  onChange={(e) => onChange({ terminalUser: e.target.value })}
                  placeholder="developer@snapmark:~"
                  className="w-full bg-[#131b2a] border border-slate-700/80 rounded-xl px-2.5 py-1.5 text-xs text-emerald-400 font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-slate-400">Çalıştırılan Komut</label>
                <input
                  type="text"
                  value={config.terminalCommand || "npm install @snapmark/core"}
                  onChange={(e) => onChange({ terminalCommand: e.target.value })}
                  placeholder="npm install @snapmark/core"
                  className="w-full bg-[#131b2a] border border-slate-700/80 rounded-xl px-2.5 py-1.5 text-xs text-white font-mono font-semibold focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-semibold text-slate-400">Konsol Çıktısı (Output)</label>
                  <span className="text-[9px] text-slate-500">Satır başı ✔, ⚠, ✖ renklendirilir</span>
                </div>
                <textarea
                  rows={4}
                  value={config.terminalOutput || ""}
                  onChange={(e) => onChange({ terminalOutput: e.target.value })}
                  placeholder="✔ Package @snapmark/core installed successfully&#10;✔ 42 packages audited in 0.8s&#10;✔ Found 0 vulnerabilities&#10;🚀 Ready for production!"
                  className="w-full bg-[#131b2a] border border-slate-700/80 rounded-xl p-2.5 text-xs text-slate-300 font-mono focus:outline-none focus:border-indigo-500 custom-scrollbar resize-y"
                />
              </div>

              {/* Hızlı CLI Şablonları */}
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500">Hazır CLI Şablonları:</span>
                <div className="flex flex-wrap gap-1">
                  {[
                    { label: "npm install", cmd: "npm install @snapmark/core", out: "✔ Package @snapmark/core installed successfully\n✔ 42 packages audited in 0.8s\n✔ Found 0 vulnerabilities\n🚀 Ready for production!" },
                    { label: "git commit", cmd: "git commit -m 'feat: add terminal CLI mode'", out: "[main d4a91c2] feat: add terminal CLI mode\n 3 files changed, 84 insertions(+), 2 deletions(-)\n create mode 100644 src/components/Terminal.tsx" },
                    { label: "cargo run", cmd: "cargo run --release", out: "   Compiling snapmark v2.4.0 (/workspace/core)\n    Finished release [optimized] target(s) in 2.41s\n     Running `target/release/snapmark`\n⚡ Server listening on http://127.0.0.1:3000" },
                    { label: "docker up", cmd: "docker compose up -d", out: "[+] Running 3/3\n ✔ Network snapmark_default  Created\n ✔ Container snapmark-db-1   Started\n ✔ Container snapmark-app-1  Started" },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => onChange({ terminalCommand: preset.cmd, terminalOutput: preset.out })}
                      className="px-2 py-0.5 rounded bg-[#182235] hover:bg-[#202d44] border border-slate-700 text-[10px] font-mono text-slate-300 transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TWEET MODU AYARLARI */}
          {config.mode === "tweet" && (
            <div className="space-y-3 pt-2 border-t border-slate-800 animate-in fade-in-50 duration-200">
              {/* Profil Resmi / Avatar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Profil Fotoğrafı
                  </span>
                  <input
                    ref={tweetAvatarInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => tweetAvatarInputRef.current?.click()}
                    className="text-[10px] text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <Upload className="w-3 h-3" />
                    <span>Özel Fotoğraf Yükle</span>
                  </button>
                </div>

                {/* Avatar Seçim Şeridi (Mevcut + Hazırlar) */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5">
                  {/* Aktif Avatar Önizleme */}
                  <div className="relative shrink-0">
                    <img
                      src={config.tweetAvatar || PRESET_AVATARS[0].url}
                      alt="Aktif Avatar"
                      crossOrigin="anonymous"
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500 ring-offset-2 ring-offset-[#0f1523]"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-indigo-600 flex items-center justify-center text-[9px] text-white">
                      ✓
                    </div>
                  </div>

                  <div className="h-6 w-[1px] bg-slate-800 shrink-0 mx-0.5" />

                  {/* 6 Hazır Avatar */}
                  {PRESET_AVATARS.map((avatar) => {
                    const isSelected = config.tweetAvatar === avatar.url;
                    return (
                      <button
                        key={avatar.id}
                        type="button"
                        onClick={() => onChange({ tweetAvatar: avatar.url })}
                        className={`relative rounded-full shrink-0 transition-transform ${
                          isSelected
                            ? "scale-105 ring-2 ring-indigo-400 ring-offset-1 ring-offset-[#0f1523]"
                            : "opacity-70 hover:opacity-100 hover:scale-105"
                        }`}
                        title={avatar.name}
                      >
                        <img
                          src={avatar.url}
                          alt={avatar.name}
                          crossOrigin="anonymous"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* İsim & Kullanıcı Adı */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-slate-400">İsim / Başlık</label>
                  <input
                    type="text"
                    value={config.tweetName ?? ""}
                    onChange={(e) => onChange({ tweetName: e.target.value })}
                    placeholder="Kerem Yılmaz"
                    className="w-full bg-[#131b2a] border border-slate-700/70 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-slate-400">Kullanıcı Adı (@)</label>
                  <input
                    type="text"
                    value={config.tweetHandle ?? ""}
                    onChange={(e) => onChange({ tweetHandle: e.target.value.replace(/^@/, '') })}
                    placeholder="keremdev"
                    className="w-full bg-[#131b2a] border border-slate-700/70 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Onay Rozeti (Verified Badge) */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold text-slate-400">Doğrulama Rozeti</label>
                <div className="grid grid-cols-3 gap-1 bg-[#131b2a] p-1 rounded-xl border border-slate-800 text-[11px]">
                  {[
                    { id: "none", label: "Yok" },
                    { id: "blue", label: "🔷 Mavi Tik" },
                    { id: "gold", label: "🏆 Altın Rozet" },
                  ].map((badge) => (
                    <button
                      key={badge.id}
                      type="button"
                      onClick={() => onChange({ tweetVerified: badge.id as VerifiedType })}
                      className={`py-1.5 rounded-lg font-medium transition-all ${
                        (config.tweetVerified || "blue") === badge.id
                          ? "bg-indigo-600 text-white font-semibold shadow-sm"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {badge.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tweet Metni */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-semibold text-slate-400">Tweet İçeriği</label>
                  <span className="text-[9px] text-slate-500">
                    💡 #etiket ve @bahset otomatik renklendirilir
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={config.tweetContent ?? ""}
                  onChange={(e) => onChange({ tweetContent: e.target.value })}
                  placeholder="Tweet metnini buraya yazın..."
                  className="w-full bg-[#131b2a] border border-slate-700/70 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-y leading-relaxed"
                />
              </div>

              {/* Tarih ve Cihaz Bilgisi */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-slate-400">Tarih & Saat</label>
                  <input
                    type="text"
                    value={config.tweetDate ?? ""}
                    onChange={(e) => onChange({ tweetDate: e.target.value })}
                    placeholder="21:42 · 10 Eyl 2026"
                    className="w-full bg-[#131b2a] border border-slate-700/70 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-slate-400">Cihaz / İstemci</label>
                  <input
                    type="text"
                    value={config.tweetClient ?? ""}
                    onChange={(e) => onChange({ tweetClient: e.target.value })}
                    placeholder="Twitter for Mac"
                    className="w-full bg-[#131b2a] border border-slate-700/70 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Etkileşim Metrikleri Switch & Girişler */}
              <div className="space-y-2 pt-1 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-300">Etkileşim Metrikleri</span>
                  <button
                    type="button"
                    onClick={() =>
                      onChange({ tweetShowMetrics: config.tweetShowMetrics !== false ? false : true })
                    }
                    className={`w-9 h-5 rounded-full transition-all relative ${
                      config.tweetShowMetrics !== false ? "bg-indigo-600" : "bg-slate-800"
                    }`}
                  >
                    <div
                      className={`w-3.5 h-3.5 rounded-full bg-white transition-all absolute top-0.5 ${
                        config.tweetShowMetrics !== false ? "right-0.5" : "left-0.5"
                      }`}
                    />
                  </button>
                </div>

                {config.tweetShowMetrics !== false && (
                  <div className="grid grid-cols-4 gap-1.5 pt-1">
                    <div className="space-y-1">
                      <label className="text-[9px] text-slate-500 block">Beğeni</label>
                      <input
                        type="text"
                        value={config.tweetLikes ?? "1.4K"}
                        onChange={(e) => onChange({ tweetLikes: e.target.value })}
                        className="w-full bg-[#131b2a] border border-slate-700/70 rounded-lg px-2 py-1 text-[11px] text-slate-200 text-center font-mono focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] text-slate-500 block">Retweet</label>
                      <input
                        type="text"
                        value={config.tweetRetweets ?? "382"}
                        onChange={(e) => onChange({ tweetRetweets: e.target.value })}
                        className="w-full bg-[#131b2a] border border-slate-700/70 rounded-lg px-2 py-1 text-[11px] text-slate-200 text-center font-mono focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] text-slate-500 block">Görüntüleme</label>
                      <input
                        type="text"
                        value={config.tweetViews ?? "54.8K"}
                        onChange={(e) => onChange({ tweetViews: e.target.value })}
                        className="w-full bg-[#131b2a] border border-slate-700/70 rounded-lg px-2 py-1 text-[11px] text-slate-200 text-center font-mono focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] text-slate-500 block">Yer İmi</label>
                      <input
                        type="text"
                        value={config.tweetBookmarks ?? "215"}
                        onChange={(e) => onChange({ tweetBookmarks: e.target.value })}
                        className="w-full bg-[#131b2a] border border-slate-700/70 rounded-lg px-2 py-1 text-[11px] text-slate-200 text-center font-mono focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ALINTI MODU AYARLARI */}
          {config.mode === "quote" && (
            <div className="space-y-3 pt-2 border-t border-slate-800 animate-in fade-in-50 duration-200">
              {/* Alıntı Stili (Minimal, Card, Accent) */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold text-slate-400">Kart / Alıntı Stili</label>
                <div className="grid grid-cols-3 gap-1 bg-[#131b2a] p-1 rounded-xl border border-slate-800 text-[11px]">
                  {[
                    { id: "minimal", label: "Minimalist" },
                    { id: "card", label: "Çerçeveli" },
                    { id: "accent", label: "Vurgulu Çizgi" },
                  ].map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => onChange({ quoteStyle: st.id as QuoteStyle })}
                      className={`py-1.5 rounded-lg font-medium transition-all ${
                        (config.quoteStyle || "minimal") === st.id
                          ? "bg-indigo-600 text-white font-semibold shadow-sm"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tırnak İşaretleri Aç/Kapa */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-[#131b2a] border border-slate-800">
                <div className="flex flex-col">
                  <span className="text-[11px] font-semibold text-slate-300">Tırnak İşaretleri (“ ”)</span>
                  <span className="text-[9px] text-slate-500">
                    Sözün başına ve sonuna tırnak ekler
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onChange({ showQuoteMarks: !config.showQuoteMarks })}
                  className={`w-9 h-5 rounded-full transition-all relative ${
                    config.showQuoteMarks ? "bg-indigo-600" : "bg-slate-800"
                  }`}
                >
                  <div
                    className={`w-3.5 h-3.5 rounded-full bg-white transition-all absolute top-0.5 ${
                      config.showQuoteMarks ? "right-0.5" : "left-0.5"
                    }`}
                  />
                </button>
              </div>

              {/* Alıntı Metni */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-semibold text-slate-400">Alıntı / Söz</label>
                  <span className="text-[9px] text-slate-500">Enter ile alt satıra geçebilirsiniz</span>
                </div>
                <textarea
                  rows={4}
                  value={config.quoteContent ?? ""}
                  onChange={(e) => onChange({ quoteContent: e.target.value })}
                  placeholder="İlham verici sözü veya alıntıyı buraya yazın..."
                  className="w-full bg-[#131b2a] border border-slate-700/70 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-y leading-relaxed font-serif italic"
                />
              </div>

              {/* Yazar Adı ve Ünvan */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-slate-400">Yazar / Konuşmacı</label>
                  <input
                    type="text"
                    value={config.quoteAuthor ?? ""}
                    onChange={(e) => onChange({ quoteAuthor: e.target.value })}
                    placeholder="Steve Jobs"
                    className="w-full bg-[#131b2a] border border-slate-700/70 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-slate-400">Ünvan / Açıklama</label>
                  <input
                    type="text"
                    value={config.quoteTitle ?? ""}
                    onChange={(e) => onChange({ quoteTitle: e.target.value })}
                    placeholder="Apple Kurucusu"
                    className="w-full bg-[#131b2a] border border-slate-700/70 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* DIFF MODU AYARLARI (Faz 5) */}
          {config.mode === "diff" && (
            <div className="space-y-3 pt-2 border-t border-slate-800 animate-in fade-in-50 duration-200">
              <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-[11px] text-amber-300 flex items-center gap-2">
                <GitCompare className="w-4 h-4 shrink-0 text-amber-400" />
                <span>Önce ve Sonra kod bloklarını düzenleyin; kırmızı ve yeşil vurgularla refactoring paylaşımı oluşturun.</span>
              </div>

              {/* Önce Başlığı & Kodu */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold text-rose-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>Önce (Hatalı / Kötü Pratik) Başlığı</span>
                </label>
                <input
                  type="text"
                  value={config.diffBeforeLabel ?? "Önce (Kötü Pratik)"}
                  onChange={(e) => onChange({ diffBeforeLabel: e.target.value })}
                  placeholder="Önce (Kötü Pratik)"
                  className="w-full bg-[#131b2a] border border-slate-700/70 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500"
                />
                <label className="text-[9px] text-slate-400 block pt-0.5">Önce Kodu:</label>
                <textarea
                  rows={4}
                  value={config.diffBeforeCode ?? ""}
                  onChange={(e) => onChange({ diffBeforeCode: e.target.value })}
                  placeholder="// Eski / refactor öncesi kod..."
                  className="w-full bg-[#131b2a] border border-rose-500/30 rounded-xl p-2.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-rose-500 resize-y"
                />
              </div>

              {/* Sonra Başlığı & Kodu */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                <label className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Sonra (Temiz Kod / İdeal Pratik) Başlığı</span>
                </label>
                <input
                  type="text"
                  value={config.diffAfterLabel ?? "Sonra (Temiz Kod)"}
                  onChange={(e) => onChange({ diffAfterLabel: e.target.value })}
                  placeholder="Sonra (Temiz Kod)"
                  className="w-full bg-[#131b2a] border border-slate-700/70 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <label className="text-[9px] text-slate-400 block pt-0.5">Sonra Kodu:</label>
                <textarea
                  rows={4}
                  value={config.diffAfterCode ?? ""}
                  onChange={(e) => onChange({ diffAfterCode: e.target.value })}
                  placeholder="// Temizlenmiş ve refactor edilmiş kod..."
                  className="w-full bg-[#131b2a] border border-emerald-500/30 rounded-xl p-2.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-emerald-500 resize-y"
                />
              </div>
            </div>
          )}

          {/* KOD MODU BİLGİSİ */}
          {config.mode === "code" && (
            <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-[11px] text-indigo-300 flex items-center gap-2">
              <Code2 className="w-4 h-4 shrink-0 text-indigo-400" />
              <span>Kod düzenleme, sekmeler ve sözdizimi için aşağıdaki "Kod & Metin Ayarları" bölümünü kullanabilirsiniz.</span>
            </div>
          )}
        </div>
      </AccordionSection>

      {/* CANLI DAKTİLO (TYPEWRITER) & VİDEO ANİMASYONU (Faz 5) */}
      <AccordionSection
        title={t.typewriter}
        icon={<Play className="w-3.5 h-3.5 text-indigo-400" />}
        badge={
          config.typewriterPlaying
            ? config.uiLanguage === "en" ? "▶ Playing" : "▶ Oynatılıyor"
            : config.uiLanguage === "en" ? "Stopped" : "Durduruldu"
        }
        isOpen={openSections.typewriter}
        onToggle={() => toggleSection("typewriter")}
      >
        <div className="space-y-3.5 pt-1">
          <p className="text-[11px] text-slate-400 leading-relaxed">
            {config.uiLanguage === "en"
              ? "Preview live typewriter animation of your code or text in real time."
              : "Kodunuzu gerçek zamanlı daktilo efektiyle yazdırarak canlı önizleyin."}
          </p>

          {/* Oynat / Duraklat & Başa Sar */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onChange({ typewriterPlaying: !config.typewriterPlaying })}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all border shadow-sm cursor-pointer ${
                config.typewriterPlaying
                  ? "bg-amber-600 hover:bg-amber-500 text-white border-amber-500"
                  : "bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-500"
              }`}
            >
              {config.typewriterPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>{config.uiLanguage === "en" ? "Pause" : "Durdur"}</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>{config.uiLanguage === "en" ? "Play Typewriter" : "Daktiloyu Oynat"}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                onChange({ typewriterPlaying: false });
                setTimeout(() => onChange({ typewriterPlaying: true }), 40);
              }}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 hover:border-slate-600 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              title={config.uiLanguage === "en" ? "Restart" : "Baştan Başlat"}
            >
              <RotateCcw className="w-3.5 h-3.5 text-indigo-400" />
              <span>{config.uiLanguage === "en" ? "Reset" : "Başa Sar"}</span>
            </button>
          </div>

          {/* Hız Seçimi */}
          <div className="space-y-1.5 pt-1 border-t border-slate-800">
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              {config.uiLanguage === "en" ? "Typing Speed" : "Yazma Hızı"}
            </label>
            <div className="grid grid-cols-4 gap-1 bg-[#131b2a] p-1 rounded-xl border border-slate-800">
              {TYPEWRITER_SPEEDS.map((sp) => {
                const isSel = (config.typewriterSpeedMode || "normal") === sp.id;
                return (
                  <button
                    key={sp.id}
                    type="button"
                    onClick={() => onChange({ typewriterSpeedMode: sp.id })}
                    className={`py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      isSel
                        ? "bg-indigo-600 text-white font-semibold shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {sp.id === "slow"
                      ? config.uiLanguage === "en" ? "Slow" : "Yavaş"
                      : sp.id === "normal"
                      ? config.uiLanguage === "en" ? "Normal" : "Normal"
                      : sp.id === "fast"
                      ? config.uiLanguage === "en" ? "Fast" : "Hızlı"
                      : config.uiLanguage === "en" ? "Turbo" : "Turbo"}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </AccordionSection>

      {/* 2. 3D PERSPEKTİF & EĞİM STÜDYOSU (Faz 4) */}
      <AccordionSection
        title={t.tiltStudio}
        icon={<Box className="w-3.5 h-3.5 text-pink-400" />}
        badge={
          config.tilt3d
            ? TILT_PRESETS.find((p) => p.id === config.tiltPreset)?.name || "3D Aktif"
            : "Düz 2D"
        }
        isOpen={openSections.tilt}
        onToggle={() => toggleSection("tilt")}
      >
        <div className="space-y-3.5">
          {/* 3D Eğim Aç/Kapat Switch */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-slate-300">3D Perspektif Modu</span>
              <span className="text-[9px] text-slate-500">
                Kartı üç boyutlu uzayda döndürüp derinlik kazandırır
              </span>
            </div>
            <button
              type="button"
              onClick={() => onChange({ tilt3d: !config.tilt3d })}
              className={`w-9 h-5 rounded-full transition-all relative ${
                config.tilt3d ? "bg-indigo-600" : "bg-slate-800"
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full bg-white transition-all absolute top-0.5 ${
                  config.tilt3d ? "right-0.5" : "left-0.5"
                }`}
              />
            </button>
          </div>

          {config.tilt3d && (
            <div className="space-y-3 pt-2 border-t border-slate-800 animate-in fade-in-50 duration-200">
              {/* Hazır 5 Açı Şablonu */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  Hazır 3D Açı Şablonları
                </label>
                <div className="grid grid-cols-3 gap-1 bg-[#131b2a] p-1 rounded-xl border border-slate-800 text-[11px]">
                  {TILT_PRESETS.map((preset) => {
                    const isSelected = (config.tiltPreset || "flat") === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() =>
                          onChange({
                            tiltPreset: preset.id as TiltPreset,
                            tiltRotateX: preset.rotateX,
                            tiltRotateY: preset.rotateY,
                            tiltRotateZ: preset.rotateZ,
                          })
                        }
                        className={`py-1.5 px-2 rounded-lg font-medium transition-all text-center ${
                          isSelected
                            ? "bg-indigo-600 text-white font-semibold shadow-sm"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        {preset.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* X Rotasyonu Slider */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>Dikey Eğim (Rotate X)</span>
                  <span className="font-mono text-indigo-400">{config.tiltRotateX ?? 12}°</span>
                </div>
                <input
                  type="range"
                  min={-30}
                  max={30}
                  step={1}
                  value={config.tiltRotateX ?? 12}
                  onChange={(e) =>
                    onChange({ tiltRotateX: Number(e.target.value), tiltPreset: undefined })
                  }
                  className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>

              {/* Y Rotasyonu Slider */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>Yatay Açı (Rotate Y)</span>
                  <span className="font-mono text-indigo-400">{config.tiltRotateY ?? -16}°</span>
                </div>
                <input
                  type="range"
                  min={-35}
                  max={35}
                  step={1}
                  value={config.tiltRotateY ?? -16}
                  onChange={(e) =>
                    onChange({ tiltRotateY: Number(e.target.value), tiltPreset: undefined })
                  }
                  className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>

              {/* Z Rotasyonu Slider */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>Hafif Döndürme (Rotate Z)</span>
                  <span className="font-mono text-indigo-400">{config.tiltRotateZ ?? 4}°</span>
                </div>
                <input
                  type="range"
                  min={-20}
                  max={20}
                  step={1}
                  value={config.tiltRotateZ ?? 4}
                  onChange={(e) =>
                    onChange({ tiltRotateZ: Number(e.target.value), tiltPreset: undefined })
                  }
                  className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>

              {/* Ambient Glow (Neon Ortam Işıması) */}
              <div className="space-y-2 pt-1 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-300">
                    Ambient Glow (Neon Işıma)
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      onChange({ tiltGlow: config.tiltGlow !== false ? false : true })
                    }
                    className={`w-9 h-5 rounded-full transition-all relative ${
                      config.tiltGlow !== false ? "bg-indigo-600" : "bg-slate-800"
                    }`}
                  >
                    <div
                      className={`w-3.5 h-3.5 rounded-full bg-white transition-all absolute top-0.5 ${
                        config.tiltGlow !== false ? "right-0.5" : "left-0.5"
                      }`}
                    />
                  </button>
                </div>

                {config.tiltGlow !== false && (
                  <div className="space-y-2.5 pt-1.5 animate-in fade-in-50 duration-200">
                    {/* Serbest HEX Renk Girişi & Renk Seçici */}
                    <div className="flex items-center gap-2">
                      <div className="relative flex items-center">
                        <input
                          type="color"
                          value={config.tiltGlowColor || "#6366f1"}
                          onChange={(e) => onChange({ tiltGlowColor: e.target.value })}
                          className="w-8 h-8 rounded-xl cursor-pointer border border-slate-700 bg-transparent p-0.5 shrink-0"
                          title="Renk Paletini Aç"
                        />
                      </div>
                      <input
                        type="text"
                        value={config.tiltGlowColor || "#6366f1"}
                        onChange={(e) => onChange({ tiltGlowColor: e.target.value })}
                        placeholder="#6366f1"
                        className="flex-1 bg-[#131b2a] border border-slate-700/80 rounded-xl px-2.5 py-1.5 text-xs text-white font-mono uppercase focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    {/* 10 Zengin Neon Preset Rozetleri */}
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 font-medium">Popüler Neon Tonları:</span>
                      <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                        {NEON_GLOW_PRESETS.map((preset) => {
                          const isSel = (config.tiltGlowColor || "#6366f1").toLowerCase() === preset.color.toLowerCase();
                          return (
                            <button
                              key={preset.id}
                              type="button"
                              onClick={() => onChange({ tiltGlowColor: preset.color })}
                              title={preset.name}
                              className={`w-5 h-5 rounded-full transition-transform cursor-pointer ${
                                isSel ? "scale-125 ring-2 ring-white shadow-md" : "opacity-75 hover:opacity-100 hover:scale-110"
                              }`}
                              style={{ backgroundColor: preset.color }}
                            />
                          );
                        })}
                      </div>
                    </div>

                    {/* Işıma Yarıçapı / Yayılma Gücü Slider */}
                    <div className="space-y-1 pt-1 border-t border-slate-800/80">
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span>Işıma Yayılma Gücü</span>
                        <span className="font-mono text-indigo-400">{config.tiltGlowRadius ?? 45}px</span>
                      </div>
                      <input
                        type="range"
                        min={15}
                        max={90}
                        step={5}
                        value={config.tiltGlowRadius ?? 45}
                        onChange={(e) => onChange({ tiltGlowRadius: Number(e.target.value) })}
                        className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </AccordionSection>

      {/* 3. ARKA PLAN TÜRÜ & RENKLER (Açılır / Kapanır Menü) */}
      <AccordionSection
        title={t.background}
        icon={<Palette className="w-3.5 h-3.5 text-cyan-400" />}
        badge={
          config.bgType === "gradient"
            ? config.useCustomGradient
              ? "Çoklu Renk Stüdyosu"
              : THEMES.find((t) => t.id === config.theme)?.name || "Degrade"
            : config.bgType === "pattern"
            ? PATTERNS.find((p) => p.id === config.pattern)?.name || "Desen"
            : config.bgType === "custom"
            ? "Özel Resim"
            : "Şeffaf Arka Plan"
        }
        isOpen={openSections.background}
        onToggle={() => toggleSection("background")}
      >
        <div className="space-y-3">
          {/* Arka Plan Türü 4'lü Butonları */}
          <div className="grid grid-cols-4 gap-1 bg-[#131b2a] p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => onChange({ bgType: "gradient" })}
              className={`py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                config.bgType === "gradient"
                  ? "bg-indigo-600 text-white font-semibold shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Degrade
            </button>
            <button
              onClick={() => onChange({ bgType: "pattern" })}
              className={`py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                config.bgType === "pattern"
                  ? "bg-indigo-600 text-white font-semibold shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Desen
            </button>
            <button
              onClick={() => onChange({ bgType: "custom" })}
              className={`py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                config.bgType === "custom"
                  ? "bg-indigo-600 text-white font-semibold shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Resim
            </button>
            <button
              onClick={() => onChange({ bgType: "transparent" })}
              className={`py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                config.bgType === "transparent"
                  ? "bg-indigo-600 text-white font-semibold shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Şeffaf
            </button>
          </div>

          {/* DEGRADE SEÇENEKLERİ (Hazır 12 Tema VEYA Çoklu Renk Stüdyosu) */}
          {config.bgType === "gradient" && (
            <div className="space-y-3">
              {/* Degrade Alt Sekmesi: Hazır vs Özel */}
              <div className="flex rounded-lg bg-[#131b2a] p-0.5 border border-slate-800 text-[10px]">
                <button
                  onClick={() => onChange({ useCustomGradient: false })}
                  className={`flex-1 py-1 rounded-md transition-all ${
                    !config.useCustomGradient
                      ? "bg-indigo-600 text-white font-semibold shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Hazır Paletler (12)
                </button>
                <button
                  onClick={() => onChange({ useCustomGradient: true })}
                  className={`flex-1 py-1 rounded-md transition-all ${
                    config.useCustomGradient
                      ? "bg-indigo-600 text-white font-semibold shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  ✨ Çoklu Renk Stüdyosu
                </button>
              </div>

              {/* 1. Hazır 12 Tema */}
              {!config.useCustomGradient && (
                <div className="space-y-1.5">
                  <span className="text-[10px] text-slate-400 block font-medium">
                    Aktif Tema:{" "}
                    <span className="text-white font-semibold">
                      {THEMES.find((t) => t.id === config.theme)?.name}
                    </span>
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {THEMES.map((theme) => {
                      const isSelected = config.theme === theme.id;
                      return (
                        <button
                          key={theme.id}
                          onClick={() =>
                            onChange({ theme: theme.id as ThemeId, useCustomGradient: false })
                          }
                          style={{ background: theme.cssGradient }}
                          className={`h-11 rounded-xl transition-all relative flex items-center justify-center shadow-sm ${
                            isSelected
                              ? "ring-2 ring-white ring-offset-2 ring-offset-[#0d131f] scale-105 shadow-lg z-10"
                              : "opacity-85 hover:opacity-100 hover:scale-105"
                          }`}
                          title={theme.name}
                        >
                          {isSelected && (
                            <div className="w-2.5 h-2.5 rounded-full bg-white shadow-md"></div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 2. Gelişmiş Çoklu Renk & Hassas Renk Seçici Stüdyosu */}
              {config.useCustomGradient && (
                <div className="p-3 bg-[#131b2a] rounded-xl border border-slate-700/80 space-y-3">
                  {/* Canlı Degrade Önizleme Şeridi */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span className="font-semibold text-slate-300">Canlı Degrade Şeridi</span>
                      <span className="font-mono text-indigo-400 uppercase text-[9px] px-1.5 py-0.5 bg-indigo-500/10 rounded border border-indigo-500/20">
                        {config.gradientType || "linear"} • {config.gradientAngle ?? 135}°
                      </span>
                    </div>
                    <div
                      className="w-full h-7 rounded-lg shadow-inner border border-white/20 transition-all duration-200"
                      style={{ background: currentGradientCss }}
                    />
                  </div>

                  {/* Degrade Türü (Doğrusal, Dairesel, Konik) */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 block font-medium">
                      Degrade Türü
                    </span>
                    <div className="grid grid-cols-3 gap-1 bg-[#0b101b] p-1 rounded-lg border border-slate-800 text-[10px]">
                      {[
                        { id: "linear", label: "Doğrusal" },
                        { id: "radial", label: "Dairesel" },
                        { id: "conic", label: "Konik" },
                      ].map((type) => (
                        <button
                          key={type.id}
                          onClick={() =>
                            onChange({
                              gradientType: type.id as GradientType,
                              useCustomGradient: true,
                            })
                          }
                          className={`py-1 rounded-md font-medium transition-all ${
                            (config.gradientType || "linear") === type.id
                              ? "bg-indigo-600 text-white font-semibold"
                              : "text-slate-400 hover:text-white"
                          }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Açı ve Yön Kontrolleri (Linear ve Conic için) */}
                  {(config.gradientType === "linear" ||
                    !config.gradientType ||
                    config.gradientType === "conic") && (
                    <div className="space-y-1.5 pt-1 border-t border-slate-800">
                      <div className="flex justify-between items-center text-[10px] text-slate-400">
                        <span className="flex items-center gap-1 font-medium">
                          <Compass className="w-3 h-3 text-indigo-400" />
                          <span>Açı & Akış Yönü</span>
                        </span>
                        <span className="font-mono font-semibold text-white bg-slate-800 px-1.5 py-0.5 rounded">
                          {config.gradientAngle ?? 135}°
                        </span>
                      </div>

                      <input
                        type="range"
                        min={0}
                        max={360}
                        step={5}
                        value={config.gradientAngle ?? 135}
                        onChange={(e) =>
                          onChange({
                            gradientAngle: Number(e.target.value),
                            useCustomGradient: true,
                          })
                        }
                        className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                      />

                      {/* Hızlı 8 Yön Butonu */}
                      <div className="flex items-center justify-between gap-1 pt-0.5">
                        {[
                          { label: "↗", angle: 45 },
                          { label: "➡", angle: 90 },
                          { label: "↘", angle: 135 },
                          { label: "⬇", angle: 180 },
                          { label: "↙", angle: 225 },
                          { label: "⬅", angle: 270 },
                          { label: "↖", angle: 315 },
                          { label: "⬆", angle: 0 },
                        ].map((dir) => (
                          <button
                            key={dir.angle}
                            onClick={() =>
                              onChange({
                                gradientAngle: dir.angle,
                                useCustomGradient: true,
                              })
                            }
                            className={`w-6 h-6 rounded-md text-[11px] font-bold transition-all flex items-center justify-center ${
                              (config.gradientAngle ?? 135) === dir.angle
                                ? "bg-indigo-600 text-white shadow-sm"
                                : "bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700"
                            }`}
                            title={`${dir.angle}°`}
                          >
                            {dir.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Renk Durakları Listesi */}
                  <div className="space-y-2 pt-1 border-t border-slate-800">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-slate-300">
                        Renk Durakları ({currentStops.length}/6)
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            const step = 100 / (currentStops.length - 1);
                            const distributed = currentStops.map((s, i) => ({
                              ...s,
                              position: Math.round(i * step),
                            }));
                            onChange({ gradientStops: distributed, useCustomGradient: true });
                          }}
                          className="text-[9px] text-slate-400 hover:text-indigo-300 bg-slate-800 px-1.5 py-0.5 rounded transition-colors"
                          title="Tüm durakları 0% ile 100% arasına eşit aralıklarla yay"
                        >
                          Eşit Dağıt
                        </button>
                        <button
                          onClick={() => {
                            const reversed = [...currentStops].reverse().map((s, i) => ({
                              ...s,
                              position: Math.round((i / (currentStops.length - 1)) * 100),
                            }));
                            onChange({ gradientStops: reversed, useCustomGradient: true });
                          }}
                          className="text-[9px] text-slate-400 hover:text-indigo-300 bg-slate-800 px-1.5 py-0.5 rounded transition-colors"
                          title="Renk sıralamasını tersine çevir"
                        >
                          Ters Çevir
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 max-h-48 overflow-y-auto pr-0.5">
                      {currentStops.map((stop, idx) => {
                        const isSelected = safeActiveIndex === idx;
                        return (
                          <div
                            key={idx}
                            className={`p-2 rounded-xl border transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#161f33] border-indigo-500 shadow-sm ring-1 ring-indigo-500/50"
                                : "bg-[#0f1523] border-slate-800 hover:border-slate-700"
                            }`}
                            onClick={() => setActiveStopIndex(idx)}
                          >
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              {/* Durak Etiketi & Renk Karesi */}
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-6 h-6 rounded-lg border shrink-0 shadow-sm transition-all ${
                                    isSelected
                                      ? "border-white scale-105 ring-2 ring-indigo-400/60"
                                      : "border-white/20"
                                  }`}
                                  style={{ backgroundColor: stop.color }}
                                />
                                <div className="flex flex-col">
                                  <span className="text-[10px] font-semibold text-slate-200">
                                    Durak #{idx + 1}
                                  </span>
                                  <span className="text-[9px] font-mono text-slate-400 uppercase">
                                    {stop.color}
                                  </span>
                                </div>
                              </div>

                              {/* Durum & Sil Butonu */}
                              <div className="flex items-center gap-1.5">
                                {isSelected ? (
                                  <span className="text-[9px] font-medium text-indigo-300 bg-indigo-500/20 border border-indigo-500/40 px-1.5 py-0.5 rounded">
                                    Seçili
                                  </span>
                                ) : (
                                  <span className="text-[9px] text-slate-500 hover:text-slate-300">
                                    Seç
                                  </span>
                                )}
                                {currentStops.length > 2 && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const newStops = currentStops.filter((_, i) => i !== idx);
                                      onChange({ gradientStops: newStops, useCustomGradient: true });
                                      if (safeActiveIndex >= newStops.length) {
                                        setActiveStopIndex(newStops.length - 1);
                                      }
                                    }}
                                    className="p-1 text-slate-400 hover:text-rose-400 rounded-md hover:bg-rose-500/10 transition-colors ml-0.5"
                                    title="Bu durağı kaldır"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                )}
                              </div>
                            </div>

                            {/* Konum / Yüzde Slider'ı */}
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] text-slate-500 w-10">Konum:</span>
                              <input
                                type="range"
                                min={0}
                                max={100}
                                value={stop.position}
                                onChange={(e) => {
                                  const newStops = [...currentStops];
                                  newStops[idx] = {
                                    ...newStops[idx],
                                    position: Number(e.target.value),
                                  };
                                  onChange({ gradientStops: newStops, useCustomGradient: true });
                                }}
                                className="flex-1 accent-indigo-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
                              />
                              <span className="text-[9px] font-mono text-slate-400 w-8 text-right">
                                %{stop.position}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Yeni Durak Ekleme Butonu */}
                    {currentStops.length < 6 && (
                      <button
                        onClick={() => {
                          const last = currentStops[currentStops.length - 1];
                          const newPos = Math.min(100, last.position + 15);
                          const newStops = [
                            ...currentStops,
                            { color: "#38bdf8", position: newPos },
                          ];
                          onChange({ gradientStops: newStops, useCustomGradient: true });
                          setActiveStopIndex(newStops.length - 1);
                        }}
                        className="w-full py-1.5 rounded-lg border border-dashed border-slate-700 hover:border-indigo-500 bg-[#0f1523] hover:bg-[#151c2e] text-slate-300 text-[10px] font-medium flex items-center justify-center gap-1.5 transition-all"
                      >
                        <Plus className="w-3 h-3 text-indigo-400" />
                        <span>+ Yeni Renk Durağı Ekle ({currentStops.length}/6)</span>
                      </button>
                    )}
                  </div>

                  {/* HASSAS RENK SEÇİCİ (REACT-COLORFUL) */}
                  <div className="p-3 bg-[#0d1320] rounded-xl border border-indigo-500/30 space-y-2.5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                        <span className="text-[11px] font-semibold text-white">
                          Hassas Renk Seçici
                        </span>
                      </div>
                      <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full font-medium">
                        Durak #{safeActiveIndex + 1}
                      </span>
                    </div>

                    {/* react-colorful HexColorPicker */}
                    <div className="w-full flex justify-center py-1">
                      <HexColorPicker
                        color={activeStop.color}
                        onChange={(newHex) => {
                          const newStops = [...currentStops];
                          if (newStops[safeActiveIndex]) {
                            newStops[safeActiveIndex] = {
                              ...newStops[safeActiveIndex],
                              color: newHex,
                            };
                            onChange({
                              gradientStops: newStops,
                              useCustomGradient: true,
                              gradientColors: [
                                newStops[0]?.color || "#ec4899",
                                newStops[1]?.color || "#8b5cf6",
                                newStops[2]?.color || "#3b82f6",
                              ],
                            });
                          }
                        }}
                        className="!w-full !h-[160px]"
                      />
                    </div>

                    {/* HEX Kod Girişi, Canlı Renk ve Kopyalama */}
                    <div className="flex items-center gap-2 bg-[#080c14] px-2.5 py-1.5 rounded-lg border border-slate-800">
                      <div
                        className="w-5 h-5 rounded-md border border-white/20 shrink-0 shadow-sm"
                        style={{ backgroundColor: activeStop.color }}
                      />
                      <span className="text-[10px] text-slate-400 font-medium">HEX:</span>
                      <input
                        type="text"
                        value={activeStop.color}
                        onChange={(e) => {
                          const val = e.target.value;
                          const newStops = [...currentStops];
                          if (newStops[safeActiveIndex]) {
                            newStops[safeActiveIndex] = {
                              ...newStops[safeActiveIndex],
                              color: val,
                            };
                            onChange({
                              gradientStops: newStops,
                              useCustomGradient: true,
                              gradientColors: [
                                newStops[0]?.color || "#ec4899",
                                newStops[1]?.color || "#8b5cf6",
                                newStops[2]?.color || "#3b82f6",
                              ],
                            });
                          }
                        }}
                        className="flex-1 bg-transparent text-xs font-mono font-semibold text-white uppercase focus:outline-none"
                        maxLength={7}
                        placeholder="#RRGGBB"
                      />
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(activeStop.color);
                          setCopiedHex(true);
                          setTimeout(() => setCopiedHex(false), 1500);
                        }}
                        className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
                        title="HEX Kodu Kopyala"
                      >
                        {copiedHex ? (
                          <Check className="w-3.5 h-3.5 text-green-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    {/* Hızlı Renk Noktaları */}
                    <div className="space-y-1 pt-0.5">
                      <span className="text-[9px] text-slate-400 block font-medium">
                        Hızlı Renk Noktaları:
                      </span>
                      <div className="flex items-center justify-between gap-1">
                        {[
                          "#ec4899",
                          "#f43f5e",
                          "#f97316",
                          "#f59e0b",
                          "#10b981",
                          "#06b6d4",
                          "#3b82f6",
                          "#6366f1",
                          "#8b5cf6",
                          "#a855f7",
                          "#ffffff",
                          "#0f172a",
                        ].map((hex) => (
                          <button
                            key={hex}
                            onClick={() => {
                              const newStops = [...currentStops];
                              if (newStops[safeActiveIndex]) {
                                newStops[safeActiveIndex] = {
                                  ...newStops[safeActiveIndex],
                                  color: hex,
                                };
                                onChange({
                                  gradientStops: newStops,
                                  useCustomGradient: true,
                                  gradientColors: [
                                    newStops[0]?.color || "#ec4899",
                                    newStops[1]?.color || "#8b5cf6",
                                    newStops[2]?.color || "#3b82f6",
                                  ],
                                });
                              }
                            }}
                            style={{ backgroundColor: hex }}
                            className={`w-5 h-5 rounded-full border border-white/20 transition-transform hover:scale-125 ${
                              activeStop.color.toLowerCase() === hex.toLowerCase()
                                ? "ring-2 ring-indigo-400 scale-110 shadow-sm"
                                : ""
                            }`}
                            title={hex}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* DESEN SEÇENEKLERİ (Patterns) */}
          {config.bgType === "pattern" && (
            <div className="space-y-3 p-3 bg-[#131b2a] rounded-xl border border-slate-700/80">
              <div className="flex items-center justify-between text-[11px] text-slate-300 font-semibold">
                <span>Desen Seçimi</span>
                <span className="text-indigo-400 text-[10px]">
                  {PATTERNS.find((p) => p.id === config.pattern)?.name}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {PATTERNS.map((pat) => (
                  <button
                    key={pat.id}
                    onClick={() => onChange({ pattern: pat.id as PatternId })}
                    className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                      config.pattern === pat.id
                        ? "bg-indigo-600/20 text-indigo-300 border-indigo-500 font-semibold shadow-sm"
                        : "bg-[#0f1523] text-slate-300 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    {pat.name}
                  </button>
                ))}
              </div>

              {/* Desen Belirginliği (Opaklık) */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span className="flex items-center gap-1 font-medium">
                    <Sun className="w-3 h-3 text-amber-400" />
                    <span>Desen Belirginliği (Opaklık)</span>
                  </span>
                  <span className="font-mono font-semibold text-white">
                    %{Math.round((config.patternOpacity ?? 0.85) * 100)}
                  </span>
                </div>
                <input
                  type="range"
                  min={15}
                  max={100}
                  step={5}
                  value={Math.round((config.patternOpacity ?? 0.85) * 100)}
                  onChange={(e) =>
                    onChange({ patternOpacity: Number(e.target.value) / 100 })
                  }
                  className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Merkezi Spot Işığı / Kod Odaklama Anahtarı */}
              <div className="flex items-center justify-between pt-1 border-t border-slate-800">
                <div className="flex flex-col">
                  <span className="text-[11px] text-slate-300 font-semibold flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Merkezi Spot Işığı (Kod Odaklama)</span>
                  </span>
                  <span className="text-[9px] text-slate-500">
                    Kenarları hafif karartıp kodu ön plana çıkarır
                  </span>
                </div>
                <button
                  onClick={() =>
                    onChange({
                      patternSpotlight: config.patternSpotlight === false ? true : false,
                    })
                  }
                  className={`w-9 h-5 rounded-full transition-all relative ${
                    config.patternSpotlight !== false ? "bg-indigo-600" : "bg-slate-800"
                  }`}
                >
                  <div
                    className={`w-3.5 h-3.5 rounded-full bg-white transition-all absolute top-0.5 ${
                      config.patternSpotlight !== false ? "right-0.5" : "left-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {/* ÖZEL RESİM YÜKLEME */}
          {config.bgType === "custom" && (
            <div className="space-y-2.5">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3 rounded-xl border-2 border-dashed border-slate-700 hover:border-indigo-500 bg-[#131b2a]/60 hover:bg-[#131b2a] text-slate-300 text-xs font-medium flex flex-col items-center justify-center gap-1.5 transition-all"
              >
                <Upload className="w-5 h-5 text-indigo-400" />
                <span>Bilgisayarından Duvar Kağıdı Seç</span>
                <span className="text-[10px] text-slate-500">PNG, JPG, WebP</span>
              </button>
              {config.customBgUrl && (
                <div className="text-[11px] text-emerald-400 flex items-center justify-between bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
                  <span>✓ Özel resim yüklendi</span>
                  <button
                    onClick={() => onChange({ customBgUrl: "" })}
                    className="text-slate-400 hover:text-white"
                  >
                    Kaldır
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ŞEFFAF BİLGİSİ */}
          {config.bgType === "transparent" && (
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-[11px] text-slate-400">
              Arka plan tamamen şeffaftır. İndirdiğin PNG dosyasında sadece kod kartı yer alır.
            </div>
          )}

          {/* FİLM GRAİN / KUMLANMA DOKUSU (Faz 6) */}
          <div className="pt-2.5 border-t border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Film Grain / Kumlanma Dokusu</span>
                </span>
                <span className="text-[9px] text-slate-500">
                  Arka plana sinematik ve organik bir doku ekler
                </span>
              </div>
              <button
                type="button"
                onClick={() => onChange({ useGrainTexture: !config.useGrainTexture })}
                className={`w-9 h-5 rounded-full transition-all relative ${
                  config.useGrainTexture ? "bg-indigo-600" : "bg-slate-800"
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full bg-white transition-all absolute top-0.5 ${
                    config.useGrainTexture ? "right-0.5" : "left-0.5"
                  }`}
                />
              </button>
            </div>

            {config.useGrainTexture && (
              <div className="space-y-1 pt-1 animate-in fade-in-50 duration-150">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>Doku Yoğunluğu</span>
                  <span className="font-mono text-indigo-400">
                    %{Math.round((config.grainOpacity ?? 0.18) * 100)}
                  </span>
                </div>
                <input
                  type="range"
                  min={0.05}
                  max={0.5}
                  step={0.01}
                  value={config.grainOpacity ?? 0.18}
                  onChange={(e) => onChange({ grainOpacity: Number(e.target.value) })}
                  className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Faz 8: Hareketli Arka Plan Dalgaları (Animated Mesh & Waves) */}
          <div className="pt-2 border-t border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <Waves className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-[11px] font-semibold text-slate-200">
                    {config.uiLanguage === "en" ? "Animated Waves & Mesh" : "Hareketli Arka Plan Dalgaları"}
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-medium">
                    GPU
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 block">
                  {config.uiLanguage === "en"
                    ? "Ambient cinematic gradient wave mesh behind card"
                    : "Kart arkasında akıcı sinematik degrade dalga animasyonu"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => onChange({ animatedBackground: !config.animatedBackground })}
                className={`w-9 h-5 rounded-full transition-all relative cursor-pointer ${
                  config.animatedBackground ? "bg-cyan-600" : "bg-slate-800"
                }`}
                title={config.animatedBackground ? "Kapat" : "Aç"}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full bg-white transition-all absolute top-0.5 ${
                    config.animatedBackground ? "right-0.5" : "left-0.5"
                  }`}
                />
              </button>
            </div>

            {config.animatedBackground && (
              <div className="space-y-1.5 pt-1 animate-in fade-in-50 duration-150">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>{config.uiLanguage === "en" ? "Animation Speed" : "Animasyon Hızı"}</span>
                  <span className="font-mono text-cyan-400 uppercase text-[10px]">
                    {config.animatedBackgroundSpeed || "normal"}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1 bg-[#131b2a] p-1 rounded-xl border border-slate-800">
                  {(["slow", "normal", "fast"] as const).map((speed) => (
                    <button
                      key={speed}
                      type="button"
                      onClick={() => onChange({ animatedBackgroundSpeed: speed })}
                      className={`py-1 rounded-lg text-[10px] font-medium transition-all cursor-pointer ${
                        (config.animatedBackgroundSpeed || "normal") === speed
                          ? "bg-cyan-600 text-white font-semibold shadow-sm"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {speed === "slow"
                        ? config.uiLanguage === "en" ? "Slow" : "Yavaş"
                        : speed === "normal"
                        ? config.uiLanguage === "en" ? "Normal" : "Dengeli"
                        : config.uiLanguage === "en" ? "Fast" : "Hızlı"}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </AccordionSection>

      {/* 2. KOD & METİN AYARLARI (Açılır / Kapanır Menü) */}
      <AccordionSection
        title={t.codeText}
        icon={<Type className="w-3.5 h-3.5 text-pink-400" />}
        badge={
          config.title
            ? config.title
            : config.mode === "code"
            ? LANGUAGES.find((l) => l.id === config.language)?.label
            : "Metin Kartı"
        }
        isOpen={openSections.code}
        onToggle={() => toggleSection("code")}
      >
        <div className="space-y-3">
          {/* Başlık ve İsim */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>Başlık & Dosya Adı</span>
            </label>
            <input
              type="text"
              value={config.title}
              onChange={(e) => onChange({ title: e.target.value })}
              placeholder="Örn: index.ts, snippet.py"
              className="w-full bg-[#131b2a] border border-slate-700/70 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          {/* Dil Seçimi */}
          {config.mode === "code" && (
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>Yazılım Dili</span>
              </label>
              <select
                value={config.language}
                onChange={(e) => onChange({ language: e.target.value as LanguageId })}
                className="w-full bg-[#131b2a] border border-slate-700/70 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition-all cursor-pointer"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.id} value={lang.id}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Kod Sözdizimi Teması */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Kod Teması (Syntax)</span>
              </label>
              <span className="text-[10px] text-indigo-400 font-medium">
                {CODE_THEMES.find((ct) => ct.id === (config.codeTheme || "onedark"))?.name}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {CODE_THEMES.map((theme) => {
                const isSelected = (config.codeTheme || "onedark") === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => onChange({ codeTheme: theme.id as CodeThemeId })}
                    className={`p-2 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-indigo-600/20 text-indigo-300 border-indigo-500 font-semibold shadow-sm"
                        : "bg-[#131b2a] text-slate-300 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <span className="truncate text-[11px]">{theme.name}</span>
                    <span
                      className="w-3 h-3 rounded-full border border-white/20 shrink-0 ml-1"
                      style={{ backgroundColor: theme.dotColor }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* FONT AİLESİ & LİGATÜRLER (Faz 2) */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Type className="w-3.5 h-3.5 text-indigo-400" />
                <span>Font Ailesi</span>
              </label>
              <span className="text-[10px] text-indigo-400 font-mono font-medium">
                {FONT_FAMILIES.find((f) => f.id === (config.fontFamily || "jetbrains"))?.name}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {FONT_FAMILIES.map((font) => {
                const isSelected = (config.fontFamily || "jetbrains") === font.id;
                return (
                  <button
                    key={font.id}
                    type="button"
                    onClick={() => onChange({ fontFamily: font.id as FontFamilyId })}
                    className={`p-2 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      isSelected
                        ? "bg-indigo-600/25 text-indigo-300 border-indigo-500 font-semibold shadow-sm"
                        : "bg-[#131b2a] text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white"
                    }`}
                    style={{ fontFamily: font.fontFamily }}
                  >
                    <span className="truncate text-[11px] block">{font.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Font Ligatürleri (Aç/Kapa) */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex flex-col">
                <span className="text-[11px] text-slate-300 font-semibold">
                  Font Ligatürleri
                </span>
                <span className="text-[9px] text-slate-500 font-mono">
                  {'Sembolleri birleştir (=>, ===, !=)'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => onChange({ fontLigatures: !config.fontLigatures })}
                className={`w-9 h-5 rounded-full transition-all relative ${
                  config.fontLigatures ? "bg-indigo-600" : "bg-slate-800"
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full bg-white transition-all absolute top-0.5 ${
                    config.fontLigatures ? "right-0.5" : "left-0.5"
                  }`}
                />
              </button>
            </div>

            {/* DİL LOGOLARI & ROZETLERİ (Kullanıcı Talebi - Faz 4) */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[11px] text-slate-300 font-semibold">
                    Sekmelerde Dil Logosu
                  </span>
                  <span className="text-[9px] text-slate-500">
                    Sekme başlığı yanında resmi SVG logo
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onChange({ showTabIcons: config.showTabIcons === false ? true : false })}
                  className={`w-9 h-5 rounded-full transition-all relative ${
                    config.showTabIcons !== false ? "bg-indigo-600" : "bg-slate-800"
                  }`}
                >
                  <div
                    className={`w-3.5 h-3.5 rounded-full bg-white transition-all absolute top-0.5 ${
                      config.showTabIcons !== false ? "right-0.5" : "left-0.5"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex flex-col">
                  <span className="text-[11px] text-slate-300 font-semibold">
                    Köşede Dil Rozeti
                  </span>
                  <span className="text-[9px] text-slate-500">
                    Kartın sağ üstünde şık marka rozeti
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onChange({ showLanguageBadge: config.showLanguageBadge === false ? true : false })}
                  className={`w-9 h-5 rounded-full transition-all relative ${
                    config.showLanguageBadge !== false ? "bg-indigo-600" : "bg-slate-800"
                  }`}
                >
                  <div
                    className={`w-3.5 h-3.5 rounded-full bg-white transition-all absolute top-0.5 ${
                      config.showLanguageBadge !== false ? "right-0.5" : "left-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Yazı Boyutu (Font Size) */}
          <div className="space-y-2 pt-1 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Yazı Boyutu (Font Size)
              </span>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min={10}
                  max={36}
                  value={config.fontSize}
                  onChange={(e) =>
                    onChange({
                      fontSize: Math.max(10, Math.min(36, Number(e.target.value) || 14)),
                    })
                  }
                  className="w-14 bg-[#131b2a] border border-slate-700/80 rounded-lg px-2 py-0.5 text-xs text-center font-mono text-indigo-300 font-bold focus:outline-none focus:border-indigo-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="text-[11px] text-slate-500 font-mono">px</span>
              </div>
            </div>

            <input
              type="range"
              min={10}
              max={32}
              step={1}
              value={config.fontSize}
              onChange={(e) => onChange({ fontSize: Number(e.target.value) })}
              className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />

            <div className="flex items-center justify-between gap-1 pt-0.5">
              {[12, 14, 16, 18, 22, 26].map((sz) => (
                <button
                  key={sz}
                  onClick={() => onChange({ fontSize: sz })}
                  className={`flex-1 py-1 rounded text-[11px] font-mono transition-all border ${
                    config.fontSize === sz
                      ? "bg-indigo-600 text-white border-indigo-500 font-bold shadow-sm"
                      : "bg-slate-900/70 text-slate-400 border-slate-800 hover:text-white"
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Satır Numaraları Switch */}
          {config.mode === "code" && (
            <div className="flex items-center justify-between pt-1 border-t border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Satır Numaraları
              </span>
              <button
                onClick={() => onChange({ showLineNumbers: !config.showLineNumbers })}
                className={`w-10 h-5 rounded-full transition-all relative ${
                  config.showLineNumbers ? "bg-indigo-600" : "bg-slate-800"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-all absolute top-0.5 ${
                    config.showLineNumbers ? "right-0.5" : "left-0.5"
                  }`}
                />
              </button>
            </div>
          )}

          {/* Satır Vurgulama (Line Highlight) */}
          {config.mode === "code" && (
            <div className="space-y-1.5 pt-1 border-t border-slate-800">
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <span>Satır Vurgula</span>
                <span className="text-[10px] text-indigo-400 font-normal">Örn: 4 veya 3-6</span>
              </div>
              <input
                type="text"
                value={config.highlightedLines}
                onChange={(e) => onChange({ highlightedLines: e.target.value })}
                placeholder="Örn: 4 veya 3-6"
                className="w-full bg-[#131b2a] border border-slate-700/70 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono transition-all"
              />
              <p className="text-[10px] text-slate-500">
                💡 İpucu: Tuvaldeki satır numarasına doğrudan tıklayarak da açıp kapatabilirsin.
              </p>
            </div>
          )}
        </div>
      </AccordionSection>

      {/* 4. TUVAL FORMATI & SOSYAL MEDYA (Açılır / Kapanır Menü) */}
      <AccordionSection
        title={t.canvasFormat}
        icon={<Layout className="w-3.5 h-3.5 text-amber-400" />}
        badge={
          config.aspectRatio === "auto"
            ? "Otomatik Sığdır"
            : config.aspectRatio === "16:9"
            ? "Twitter / X (16:9)"
            : config.aspectRatio === "1:1"
            ? "Kare / IG (1:1)"
            : config.aspectRatio === "4:5"
            ? "LinkedIn (4:5)"
            : `${config.customWidth || 1200}×${config.customHeight || 630} px`
        }
        isOpen={openSections.format}
        onToggle={() => toggleSection("format")}
      >
        <div className="space-y-3">
          {/* Sosyal Medya Hazır Formatları (Faz 7A) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <span>📐 Sosyal Medya Boyutları</span>
              <span className="text-[10px] text-indigo-400 font-normal">Otomatik oran</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {SOCIAL_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => onChange({ socialPreset: preset.id })}
                  className={`p-2 rounded-xl text-left border transition-all ${
                    (config.socialPreset || "free") === preset.id
                      ? "bg-indigo-600/20 border-indigo-500/60 text-white shadow-sm"
                      : "bg-[#131b2a] border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-[#182338]"
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-medium text-xs text-slate-200">
                    <span>{preset.icon}</span>
                    <span className="truncate">{preset.name}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5 truncate">
                    {preset.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5 pt-1 border-t border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Geleneksel En-Boy Oranı
            </span>
            <div className="grid grid-cols-2 gap-1.5">
            {[
              { id: "auto", label: "Otomatik Sığdır" },
              { id: "16:9", label: "Twitter / X (16:9)" },
              { id: "1:1", label: "Kare / IG (1:1)" },
              { id: "4:5", label: "LinkedIn (4:5)" },
              { id: "custom", label: "⚙️ Özel Format" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => onChange({ aspectRatio: item.id as AspectRatioId, socialPreset: "free" })}
                className={`px-2.5 py-2 rounded-lg text-xs font-medium text-center transition-all border ${
                  item.id === "custom" ? "col-span-2" : ""
                } ${
                  config.aspectRatio === item.id && (config.socialPreset === "free" || !config.socialPreset)
                    ? "bg-indigo-600 text-white border-indigo-500 font-semibold shadow-sm"
                    : "bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200"
                }`}
              >
                {item.label}
              </button>
            ))}
            </div>
          </div>

          {/* Özel Format Ölçü Girişi */}
          {config.aspectRatio === "custom" && (
            <div className="p-3 bg-[#131b2a] rounded-xl border border-slate-700/80 space-y-2.5">
              <span className="text-[11px] text-indigo-300 font-semibold block">
                Özel Piksel Boyutları (W × H)
              </span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Genişlik (W)</label>
                  <input
                    type="number"
                    min={300}
                    max={3840}
                    value={config.customWidth || 1200}
                    onChange={(e) => onChange({ customWidth: Number(e.target.value) || 1200 })}
                    className="w-full bg-[#0a0e1a] border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-indigo-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Yükseklik (H)</label>
                  <input
                    type="number"
                    min={300}
                    max={3840}
                    value={config.customHeight || 630}
                    onChange={(e) => onChange({ customHeight: Number(e.target.value) || 630 })}
                    className="w-full bg-[#0a0e1a] border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-indigo-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>

              {/* Hızlı Hazır Boyutlar */}
              <div className="pt-1 flex flex-wrap gap-1 text-[10px]">
                <button
                  onClick={() => onChange({ customWidth: 1080, customHeight: 1920 })}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  Story (1080×1920)
                </button>
                <button
                  onClick={() => onChange({ customWidth: 1200, customHeight: 630 })}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  Banner (1200×630)
                </button>
                <button
                  onClick={() => onChange({ customWidth: 1200, customHeight: 675 })}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  X Post (1200×675)
                </button>
              </div>
            </div>
          )}
        </div>
      </AccordionSection>

      {/* 4. KART ÇERÇEVESİ & BOŞLUKLAR (Açılır / Kapanır Menü) */}
      <AccordionSection
        title={t.cardFrame}
        icon={<Sliders className="w-3.5 h-3.5 text-indigo-400" />}
        badge={`${config.padding}px • ${
          config.windowStyle === "mac"
            ? "macOS"
            : config.windowStyle === "windows"
            ? "Windows"
            : "Çerçevesiz"
        }`}
        isOpen={openSections.card}
        onToggle={() => toggleSection("card")}
      >
        <div className="space-y-3">
          {/* Kart Genişliği */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Kart Genişliği
            </label>
            <div className="grid grid-cols-4 gap-1">
              {[
                { id: "compact", label: "Kompakt" },
                { id: "normal", label: "Standart" },
                { id: "wide", label: "Geniş" },
                { id: "full", label: "Tam" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => onChange({ cardWidth: item.id as CardWidth })}
                  className={`py-1.5 rounded-lg text-xs font-medium text-center transition-all border ${
                    config.cardWidth === item.id
                      ? "bg-indigo-600 text-white border-indigo-500 font-semibold shadow-sm"
                      : "bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Pencere Buton Stili (macOS / Windows / Terminal / Safari / Yok) */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Pencere Stili
            </label>
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              {[
                { id: "mac", label: "macOS" },
                { id: "windows", label: "Windows" },
                { id: "terminal", label: "Terminal" },
                { id: "safari", label: "Safari" },
                { id: "none", label: "Çerçevesiz" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => onChange({ windowStyle: item.id as WindowStyle })}
                  className={`py-1.5 rounded-lg font-medium text-center transition-all border ${
                    config.windowStyle === item.id
                      ? "bg-indigo-600/20 text-indigo-300 border-indigo-500/50 font-semibold"
                      : "bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Terminal Prompt Girişi */}
            {config.windowStyle === "terminal" && (
              <div className="space-y-1 pt-1 animate-in fade-in-50">
                <label className="text-[10px] font-semibold text-slate-400">Terminal Başlık / Prompt</label>
                <input
                  type="text"
                  value={config.terminalPrompt ?? "kerem@snapmark:~/workspace$"}
                  onChange={(e) => onChange({ terminalPrompt: e.target.value })}
                  placeholder="kerem@snapmark:~/workspace$"
                  className="w-full bg-[#131b2a] border border-slate-700/70 rounded-xl px-2.5 py-1.5 text-xs text-emerald-400 font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>
            )}

            {/* Safari URL Girişi */}
            {config.windowStyle === "safari" && (
              <div className="space-y-1 pt-1 animate-in fade-in-50">
                <label className="text-[10px] font-semibold text-slate-400">Safari URL Adres Çubuğu</label>
                <input
                  type="text"
                  value={config.safariUrl ?? "https://snapmark.dev/demo"}
                  onChange={(e) => onChange({ safariUrl: e.target.value })}
                  placeholder="https://snapmark.dev/demo"
                  className="w-full bg-[#131b2a] border border-slate-700/70 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>
            )}

            {/* Özel Pencere Başlık Çubuğu Rengi (Faz 7A) */}
            {config.windowStyle !== "none" && (
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-semibold text-slate-300">
                      🎭 Özel Başlık Çubuğu Rengi
                    </span>
                    <span className="text-[9px] text-slate-500">
                      Pencere başlık şeridinin arka planı
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      onChange({
                        windowHeaderCustom: !config.windowHeaderCustom,
                        windowHeaderBg: !config.windowHeaderCustom ? "rgba(10, 15, 26, 0.75)" : "",
                      })
                    }
                    className={`w-9 h-5 rounded-full transition-all relative ${
                      config.windowHeaderCustom ? "bg-indigo-600" : "bg-slate-800"
                    }`}
                  >
                    <div
                      className={`w-3.5 h-3.5 rounded-full bg-white transition-all absolute top-0.5 ${
                        config.windowHeaderCustom ? "right-0.5" : "left-0.5"
                      }`}
                    />
                  </button>
                </div>

                {config.windowHeaderCustom && (
                  <div className="space-y-2 pt-1 animate-in fade-in-50">
                    <div className="grid grid-cols-3 gap-1">
                      {WINDOW_HEADER_PRESETS.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => onChange({ windowHeaderBg: item.color })}
                          className={`px-2 py-1 rounded-lg text-[10px] font-medium border transition-all truncate ${
                            config.windowHeaderBg === item.color
                              ? "bg-indigo-600/30 text-indigo-300 border-indigo-500"
                              : "bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white"
                          }`}
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={config.windowHeaderBg?.startsWith("#") ? config.windowHeaderBg : "#0d131f"}
                        onChange={(e) => onChange({ windowHeaderBg: e.target.value })}
                        className="w-7 h-7 rounded-lg border border-slate-700 bg-transparent cursor-pointer"
                      />
                      <input
                        type="text"
                        value={config.windowHeaderBg || ""}
                        onChange={(e) => onChange({ windowHeaderBg: e.target.value })}
                        placeholder="#HEX veya rgba(...)"
                        className="flex-1 bg-[#131b2a] border border-slate-700/80 rounded-lg px-2.5 py-1 text-xs text-slate-200 font-mono focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Dış Boşluk (Padding) Ayarı */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <span>Dış Boşluk (Padding)</span>
              <span className="text-slate-300 font-mono">{config.padding}px</span>
            </div>
            <div className="flex items-center gap-1.5">
              {[16, 32, 48, 64, 96].map((p) => (
                <button
                  key={p}
                  onClick={() => onChange({ padding: p })}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                    config.padding === p
                      ? "bg-indigo-600 text-white border-indigo-500 font-bold"
                      : "bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Kart Gölgesi */}
          <div className="flex items-center justify-between pt-1 border-t border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Kart Gölgesi
            </span>
            <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-lg border border-slate-800">
              {(["none", "soft", "hard"] as ShadowStyle[]).map((sh) => (
                <button
                  key={sh}
                  onClick={() => onChange({ shadow: sh })}
                  className={`px-2 py-0.5 rounded text-[11px] uppercase transition-all ${
                    config.shadow === sh
                      ? "bg-indigo-600 text-white font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {sh}
                </button>
              ))}
            </div>
          </div>

          {/* DEGRADE KENARLIK (Gradient Border - Faz 6) */}
          <div className="pt-2 border-t border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-pink-400" />
                  <span>Degrade Kenarlık (Gradient Border)</span>
                </span>
                <span className="text-[9px] text-slate-500">
                  Kartın çevresine neon degrade çerçeve çeker
                </span>
              </div>
              <button
                type="button"
                onClick={() => onChange({ useGradientBorder: !config.useGradientBorder })}
                className={`w-9 h-5 rounded-full transition-all relative ${
                  config.useGradientBorder ? "bg-indigo-600" : "bg-slate-800"
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full bg-white transition-all absolute top-0.5 ${
                    config.useGradientBorder ? "right-0.5" : "left-0.5"
                  }`}
                />
              </button>
            </div>

            {config.useGradientBorder && (
              <div className="space-y-2.5 pt-1 animate-in fade-in-50 duration-150">
                {/* Şablon Seçici (Hazırlar + Özel) */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>Renk Şablonu</span>
                    <span className="text-indigo-400 font-medium">
                      {config.gradientBorderPreset === "custom"
                        ? "Özel Renkler"
                        : GRADIENT_BORDER_PRESETS.find((p) => p.id === config.gradientBorderPreset)?.name}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 bg-[#131b2a] p-1 rounded-xl border border-slate-800 text-[10px]">
                    {GRADIENT_BORDER_PRESETS.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => onChange({ gradientBorderPreset: p.id })}
                        className={`py-1.5 px-1.5 rounded-lg font-medium transition-all text-center truncate ${
                          (config.gradientBorderPreset || "rainbow") === p.id
                            ? "bg-indigo-600 text-white font-semibold shadow-sm"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        {p.name}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => onChange({ gradientBorderPreset: "custom" })}
                      className={`py-1.5 px-1.5 rounded-lg font-medium transition-all text-center truncate ${
                        config.gradientBorderPreset === "custom"
                          ? "bg-indigo-600 text-white font-semibold shadow-sm"
                          : "text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 border border-indigo-500/20"
                      }`}
                    >
                      🎨 Özel Renkler
                    </button>
                  </div>
                </div>

                {/* ÖZEL RENK AYARLARI */}
                {config.gradientBorderPreset === "custom" && (
                  <div className="p-3 bg-[#0d131f] rounded-xl border border-slate-700/80 space-y-3 animate-in fade-in-50">
                    {/* Canlı Mini Önizleme */}
                    <div
                      className="w-full h-3 rounded-full border border-white/20 shadow-inner"
                      style={{
                        background: `linear-gradient(${config.gradientBorderAngle ?? 135}deg, ${(
                          config.gradientBorderColors || ["#6366f1", "#ec4899", "#06b6d4"]
                        ).join(", ")})`,
                      }}
                    />

                    {/* Renk Seçiciler (Başlangıç ve Bitiş) */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                        Kenarlık Renkleri
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        {/* Renk 1 */}
                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-400 flex items-center justify-between">
                            <span>Başlangıç</span>
                            <span className="font-mono text-[9px] text-slate-500">
                              {(config.gradientBorderColors?.[0] || "#6366f1").toUpperCase()}
                            </span>
                          </label>
                          <div className="flex items-center gap-1.5 bg-[#131b2a] p-1.5 rounded-lg border border-slate-800">
                            <input
                              type="color"
                              value={config.gradientBorderColors?.[0] || "#6366f1"}
                              onChange={(e) => {
                                const newColors = [
                                  e.target.value,
                                  config.gradientBorderColors?.[1] || "#ec4899",
                                  config.gradientBorderColors?.[2] || "#06b6d4",
                                ];
                                onChange({ gradientBorderColors: newColors });
                              }}
                              className="w-6 h-6 rounded border border-white/20 cursor-pointer bg-transparent"
                            />
                            <input
                              type="text"
                              maxLength={7}
                              value={config.gradientBorderColors?.[0] || "#6366f1"}
                              onChange={(e) => {
                                const newColors = [
                                  e.target.value,
                                  config.gradientBorderColors?.[1] || "#ec4899",
                                  config.gradientBorderColors?.[2] || "#06b6d4",
                                ];
                                onChange({ gradientBorderColors: newColors });
                              }}
                              className="w-full bg-transparent text-[11px] font-mono text-white uppercase outline-none"
                            />
                          </div>
                        </div>

                        {/* Renk 2 */}
                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-400 flex items-center justify-between">
                            <span>Bitiş</span>
                            <span className="font-mono text-[9px] text-slate-500">
                              {(config.gradientBorderColors?.[1] || "#ec4899").toUpperCase()}
                            </span>
                          </label>
                          <div className="flex items-center gap-1.5 bg-[#131b2a] p-1.5 rounded-lg border border-slate-800">
                            <input
                              type="color"
                              value={config.gradientBorderColors?.[1] || "#ec4899"}
                              onChange={(e) => {
                                const newColors = [
                                  config.gradientBorderColors?.[0] || "#6366f1",
                                  e.target.value,
                                  config.gradientBorderColors?.[2] || "#06b6d4",
                                ];
                                onChange({ gradientBorderColors: newColors });
                              }}
                              className="w-6 h-6 rounded border border-white/20 cursor-pointer bg-transparent"
                            />
                            <input
                              type="text"
                              maxLength={7}
                              value={config.gradientBorderColors?.[1] || "#ec4899"}
                              onChange={(e) => {
                                const newColors = [
                                  config.gradientBorderColors?.[0] || "#6366f1",
                                  e.target.value,
                                  config.gradientBorderColors?.[2] || "#06b6d4",
                                ];
                                onChange({ gradientBorderColors: newColors });
                              }}
                              className="w-full bg-transparent text-[11px] font-mono text-white uppercase outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Hızlı Renk Paleti Noktaları */}
                      <div className="pt-1">
                        <span className="text-[9px] text-slate-500 block mb-1">
                          Hızlı Seçim (1. Renge uygular):
                        </span>
                        <div className="flex items-center justify-between gap-1">
                          {[
                            "#f43f5e",
                            "#ec4899",
                            "#8b5cf6",
                            "#6366f1",
                            "#3b82f6",
                            "#06b6d4",
                            "#10b981",
                            "#eab308",
                            "#f97316",
                            "#ffffff",
                          ].map((hex) => (
                            <button
                              key={hex}
                              type="button"
                              onClick={() => {
                                const newColors = [
                                  hex,
                                  config.gradientBorderColors?.[1] || "#ec4899",
                                  config.gradientBorderColors?.[2] || "#06b6d4",
                                ];
                                onChange({ gradientBorderColors: newColors });
                              }}
                              style={{ backgroundColor: hex }}
                              className="w-4 h-4 rounded-full border border-white/20 hover:scale-125 transition-transform cursor-pointer"
                              title={hex}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Akış Açısı (Gradient Angle) */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-800">
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span>Akış Açısı</span>
                        <span className="font-mono text-indigo-400 font-semibold">
                          {config.gradientBorderAngle ?? 135}°
                        </span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={360}
                        step={5}
                        value={config.gradientBorderAngle ?? 135}
                        onChange={(e) => onChange({ gradientBorderAngle: Number(e.target.value) })}
                        className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                      />
                      <div className="flex items-center justify-between gap-1 pt-0.5">
                        {[
                          { label: "45°", val: 45 },
                          { label: "90°", val: 90 },
                          { label: "135°", val: 135 },
                          { label: "180°", val: 180 },
                          { label: "270°", val: 270 },
                        ].map((d) => (
                          <button
                            key={d.val}
                            type="button"
                            onClick={() => onChange({ gradientBorderAngle: d.val })}
                            className={`flex-1 py-0.5 rounded text-[9px] font-mono transition-all ${
                              (config.gradientBorderAngle ?? 135) === d.val
                                ? "bg-indigo-600 text-white font-bold"
                                : "bg-slate-800 text-slate-400 hover:text-white"
                            }`}
                          >
                            {d.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Kalınlık Seçici */}
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                  <span>Kenarlık Kalınlığı</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4].map((w) => (
                      <button
                        key={w}
                        type="button"
                        onClick={() => onChange({ gradientBorderWidth: w })}
                        className={`w-6 h-6 rounded-md font-mono text-center transition-all ${
                          (config.gradientBorderWidth || 2) === w
                            ? "bg-indigo-600 text-white font-bold"
                            : "bg-slate-800 text-slate-400 hover:text-white"
                        }`}
                      >
                        {w}p
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </AccordionSection>

      {/* 5. FİLİGRAN & ALT BİLGİ (Açılır / Kapanır Menü) */}
      <AccordionSection
        title={t.watermarkText}
        icon={<ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />}
        badge={config.showWatermark ? "Açık" : "Kapalı"}
        isOpen={openSections.watermark}
        onToggle={() => toggleSection("watermark")}
      >
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Kart Altı Filigran / İsim
            </span>
            <button
              onClick={() => onChange({ showWatermark: !config.showWatermark })}
              className={`w-10 h-5 rounded-full transition-all relative ${
                config.showWatermark ? "bg-indigo-600" : "bg-slate-800"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-all absolute top-0.5 ${
                  config.showWatermark ? "right-0.5" : "left-0.5"
                }`}
              />
            </button>
          </div>
          {config.showWatermark && (
            <input
              type="text"
              value={config.watermarkText}
              onChange={(e) => onChange({ watermarkText: e.target.value })}
              placeholder="Kullanıcı adı veya marka (Örn: @keremdev)"
              className="w-full bg-[#131b2a] border border-slate-700/70 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          )}

          {/* Alıntı Modu Ekstra Alanları */}
          {config.mode === "quote" && (
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Yazar Bilgisi
              </label>
              <input
                type="text"
                value={config.authorName}
                onChange={(e) => onChange({ authorName: e.target.value })}
                placeholder="İsim (Örn: Kerem Yılmaz)"
                className="w-full bg-[#131b2a] border border-slate-700/70 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
              <input
                type="text"
                value={config.authorHandle}
                onChange={(e) => onChange({ authorHandle: e.target.value })}
                placeholder="Kullanıcı adı (Örn: @keremdev)"
                className="w-full bg-[#131b2a] border border-slate-700/70 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
          )}
        </div>
      </AccordionSection>

      {/* 5B. ÖZEL MARKA LOGOSU & FİLİGRAN (Faz 7B) */}
      <AccordionSection
        title={t.brandLogo}
        icon={<ImageIcon className="w-3.5 h-3.5 text-pink-400" />}
        badge={config.logoUrl ? "Yüklü" : "Yok"}
        isOpen={openSections.logo}
        onToggle={() => toggleSection("logo")}
      >
        <div className="space-y-3">
          <p className="text-[11px] text-slate-400">
            Kartın köşesine kendi PNG/SVG şeffaf logonuzu veya filigranınızı yerleştirin.
          </p>

          <input
            ref={logoFileInputRef}
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="hidden"
          />

          {config.logoUrl ? (
            <div className="p-3 bg-[#131b2a] rounded-xl border border-slate-700/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-black/50 border border-white/10 p-1 flex items-center justify-center overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={config.logoUrl} alt="Logo Önizleme" className="max-w-full max-h-full object-contain" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">Logo Aktif</span>
                    <button
                      type="button"
                      onClick={() => logoFileInputRef.current?.click()}
                      className="text-[10px] text-indigo-400 hover:underline cursor-pointer"
                    >
                      Değiştir
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onChange({ logoUrl: "" })}
                  className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 text-xs flex items-center gap-1 transition-colors"
                  title="Logoyu Kaldır"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Kaldır</span>
                </button>
              </div>

              {/* Logo Konumu */}
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-slate-400">Logo Konumu</label>
                <div className="grid grid-cols-2 gap-1 bg-[#0d131f] p-1 rounded-xl border border-slate-800 text-[11px]">
                  {[
                    { id: "bottom-right", label: "Sağ Alt" },
                    { id: "bottom-left", label: "Sol Alt" },
                    { id: "top-right", label: "Sağ Üst" },
                    { id: "top-left", label: "Sol Üst" },
                  ].map((pos) => (
                    <button
                      key={pos.id}
                      type="button"
                      onClick={() => onChange({ logoPosition: pos.id as any })}
                      className={`py-1 rounded-lg transition-all text-center ${
                        (config.logoPosition || "bottom-right") === pos.id
                          ? "bg-indigo-600 text-white font-bold"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {pos.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Logo Opaklık */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>Opaklık</span>
                  <span className="font-mono">{config.logoOpacity ?? 80}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={config.logoOpacity ?? 80}
                  onChange={(e) => onChange({ logoOpacity: Number(e.target.value) })}
                  className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>

              {/* Logo Boyutu */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>Maks. Boyut</span>
                  <span className="font-mono">{config.logoSize ?? 42}px</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={80}
                  value={config.logoSize ?? 42}
                  onChange={(e) => onChange({ logoSize: Number(e.target.value) })}
                  className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => logoFileInputRef.current?.click()}
              className="w-full py-3 px-4 border border-dashed border-slate-700 hover:border-indigo-500 rounded-xl bg-[#131b2a]/60 hover:bg-[#131b2a] flex items-center justify-center gap-2 text-xs text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <Upload className="w-4 h-4 text-indigo-400" />
              <span>Özel Logo Yükle (PNG / SVG)</span>
            </button>
          )}
        </div>
      </AccordionSection>

      {/* 6. DİNAMİK QR KOD ROZETİ (Faz 4) */}
      <AccordionSection
        title={t.qrBadge}
        icon={<QrCode className="w-3.5 h-3.5 text-emerald-400" />}
        badge={
          config.showQrCode
            ? config.uiLanguage === "en" ? "On" : "Açık"
            : config.uiLanguage === "en" ? "Off" : "Kapalı"
        }
        isOpen={openSections.qr}
        onToggle={() => toggleSection("qr")}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-slate-300">
                {config.uiLanguage === "en" ? "QR Code Badge" : "QR Kod Rozeti"}
              </span>
              <span className="text-[9px] text-slate-500">
                {config.uiLanguage === "en"
                  ? "Renders live scannable QR code on the card"
                  : "Kartın köşesine canlı taranabilir QR kod yerleştirir"}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onChange({ showQrCode: !config.showQrCode })}
              className={`w-9 h-5 rounded-full transition-all relative cursor-pointer ${
                config.showQrCode ? "bg-indigo-600" : "bg-slate-800"
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full bg-white transition-all absolute top-0.5 ${
                  config.showQrCode ? "right-0.5" : "left-0.5"
                }`}
              />
            </button>
          </div>

          {config.showQrCode && (
            <div className="space-y-2.5 pt-1 border-t border-slate-800 animate-in fade-in-50">
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-slate-400">
                  {config.uiLanguage === "en" ? "Target URL / Link" : "Hedef URL / Bağlantı"}
                </label>
                <input
                  type="text"
                  value={config.qrText ?? "https://github.com"}
                  onChange={(e) => onChange({ qrText: e.target.value })}
                  placeholder="https://github.com/kullanici/repo"
                  className="w-full bg-[#131b2a] border border-slate-700/70 rounded-xl px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-slate-400">
                  {config.uiLanguage === "en" ? "Badge Position" : "Rozet Konumu"}
                </label>
                <div className="grid grid-cols-3 gap-1 bg-[#131b2a] p-1 rounded-xl border border-slate-800 text-[11px]">
                  {[
                    { id: "bottom-right", label: config.uiLanguage === "en" ? "Bottom Right" : "Sağ Alt" },
                    { id: "bottom-left", label: config.uiLanguage === "en" ? "Bottom Left" : "Sol Alt" },
                    { id: "top-right", label: config.uiLanguage === "en" ? "Top Right" : "Sağ Üst" },
                  ].map((pos) => (
                    <button
                      key={pos.id}
                      type="button"
                      onClick={() => onChange({ qrPosition: pos.id as any })}
                      className={`py-1 rounded-lg transition-all text-center cursor-pointer ${
                        (config.qrPosition || "bottom-right") === pos.id
                          ? "bg-indigo-600 text-white font-semibold shadow-sm"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {pos.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </AccordionSection>

      {/* 7. TASARIM ŞABLONLARI & PRESETLER (LocalStorage & Hazır Stiller) */}
      <AccordionSection
        title={t.presets}
        icon={<Bookmark className="w-3.5 h-3.5 text-amber-400" />}
        badge={`${savedPresets.length} ${config.uiLanguage === "en" ? "Saved" : "Kayıtlı"}`}
        isOpen={openSections.presets}
        onToggle={() => toggleSection("presets")}
      >
        <div className="space-y-4">
          {/* Bildirim / Feedback */}
          {presetFeedback && (
            <div className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 animate-in fade-in">
              <Check className="w-3.5 h-3.5" />
              <span>{presetFeedback}</span>
            </div>
          )}

          {/* Mevcut Tasarımı Şablon Olarak Kaydet */}
          <div className="space-y-2 p-3 bg-[#131b2a] rounded-xl border border-slate-700/80">
            <span className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
              <Save className="w-3.5 h-3.5 text-indigo-400" />
              <span>Mevcut Tasarımı Kaydet</span>
            </span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={presetNameInput}
                onChange={(e) => setPresetNameInput(e.target.value)}
                placeholder="Şablon adı (Örn: Twitter Stili)"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveCurrentPreset();
                }}
                className="flex-1 bg-[#0f1523] border border-slate-700/70 rounded-xl px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={handleSaveCurrentPreset}
                disabled={!presetNameInput.trim()}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1 transition-all shadow-sm shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Kaydet</span>
              </button>
            </div>
          </div>

          {/* Kullanıcının Kaydettiği Şablonlar */}
          {savedPresets.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <FolderHeart className="w-3.5 h-3.5 text-pink-400" />
                <span>Kayıtlı Şablonlarım</span>
              </span>
              <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                {savedPresets.map((preset) => (
                  <div
                    key={preset.id}
                    className="p-2.5 rounded-xl bg-[#131b2a] border border-slate-800 hover:border-slate-700 flex items-center justify-between transition-all group"
                  >
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-semibold text-slate-200 truncate">
                        {preset.name}
                      </span>
                      <span className="text-[9px] text-slate-500">
                        {new Date(preset.createdAt).toLocaleDateString("tr-TR")}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleLoadPreset(preset.config)}
                        className="px-2.5 py-1 rounded-lg bg-indigo-600/30 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/40 text-[10px] font-semibold transition-all"
                      >
                        Yükle
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeletePreset(preset.id)}
                        className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                        title="Şablonu Sil"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hazır Popüler Tasarım Stilleri (Curated Presets) */}
          <div className="space-y-2 pt-1 border-t border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Popüler Hazır Stiller</span>
            </span>

            <div className="space-y-1.5">
              {CURATED_PRESETS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleLoadPreset(p.config)}
                  className="w-full p-2.5 rounded-xl bg-[#131b2a] hover:bg-[#182236] border border-slate-800 hover:border-indigo-500/50 text-left transition-all flex items-center justify-between group"
                >
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors">
                        {p.name}
                      </span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-medium">
                        {p.badge}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 truncate">
                      {p.description}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </AccordionSection>

      {/* Alt Güvenlik Notu */}
      <div className="pt-2 text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        <span>%100 Tarayıcıda çalışır, veri saklanmaz.</span>
      </div>
    </div>
  );
};

