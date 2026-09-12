"use client";

import React, { useMemo, useEffect, useState } from "react";
import { CardConfig } from "@/types";
import { THEMES, PATTERNS, CODE_THEMES, FONT_FAMILIES, GRADIENT_BORDER_PRESETS, SOCIAL_PRESETS } from "@/lib/constants";
import { generateCssGradient } from "@/lib/colorTable";
import { getLanguageBadge } from "@/lib/languageIcons";
import { generateQrSvg } from "@/lib/qrGenerator";
import Prism from "prismjs";
import { Plus, MessageCircle, Repeat2, Heart, BarChart2, Bookmark, Share2, Quote as QuoteIcon, Lock, GitCompare, Check } from "lucide-react";

// Doğrulanmış Hesap Rozetleri
const BlueCheckBadge = () => (
  <svg viewBox="0 0 22 22" className="w-4 h-4 fill-sky-400 inline-block shrink-0" aria-label="Doğrulanmış Hesap">
    <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.136 2.136 5.48-5.48 1.292 1.302-6.772 6.772z"/>
  </svg>
);

const GoldCheckBadge = () => (
  <svg viewBox="0 0 22 22" className="w-4 h-4 fill-amber-400 inline-block shrink-0" aria-label="Doğrulanmış Kuruluş">
    <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.136 2.136 5.48-5.48 1.292 1.302-6.772 6.772z"/>
  </svg>
);

const XLogo = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-slate-400 opacity-70 shrink-0" aria-label="X">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Prism dilleri
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-json";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-css";

interface PreviewCardProps {
  config: CardConfig;
  cardRef?: React.RefObject<HTMLDivElement | null>;
  onToggleLineHighlight?: (lineNum: number) => void;
  onSelectTab?: (tabId: string) => void;
  onAddTab?: () => void;
  onCloseTab?: (tabId: string) => void;
}

export const PreviewCard: React.FC<PreviewCardProps> = ({
  config,
  cardRef,
  onToggleLineHighlight,
  onSelectTab,
  onAddTab,
  onCloseTab,
}) => {
  const [mounted, setMounted] = useState(false);
  const [qrSvg, setQrSvg] = useState<string>("");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Dinamik QR Kod Oluşturucu (Faz 4)
  useEffect(() => {
    if (config.showQrCode && config.qrText) {
      generateQrSvg(config.qrText).then((svg) => {
        setQrSvg(svg);
      });
    } else {
      setQrSvg("");
    }
  }, [config.showQrCode, config.qrText]);

  // Tweet metnindeki etiket ve linkleri renklendiren formatlayıcı (Faz 3)
  const renderFormattedTweet = (text: string) => {
    if (!text) return null;
    const parts = text.split(/((?:#|@)[\w\u00C0-\u017F_]+|https?:\/\/[^\s]+)/g);
    return parts.map((part, index) => {
      if (part.startsWith("#") || part.startsWith("@")) {
        return (
          <span key={index} className="text-sky-400 font-medium">
            {part}
          </span>
        );
      } else if (part.startsWith("http://") || part.startsWith("https://")) {
        return (
          <span key={index} className="text-sky-400 underline underline-offset-2">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const currentTheme = useMemo(() => {
    return THEMES.find((t) => t.id === config.theme) || THEMES[0];
  }, [config.theme]);

  const currentCodeTheme = useMemo(() => {
    return CODE_THEMES.find((ct) => ct.id === config.codeTheme) || CODE_THEMES[0];
  }, [config.codeTheme]);

  const currentPattern = useMemo(() => {
    return PATTERNS.find((p) => p.id === config.pattern) || PATTERNS[0];
  }, [config.pattern]);

  const currentFontFamily = useMemo(() => {
    const font = FONT_FAMILIES.find((f) => f.id === config.fontFamily);
    return font ? font.fontFamily : 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
  }, [config.fontFamily]);

  // Typewriter (Daktilo) Animasyon İlerlemesi (Faz 5)
  const [typewriterProgress, setTypewriterProgress] = useState<number>(0);

  useEffect(() => {
    if (!config.typewriterPlaying) {
      setTypewriterProgress(config.code?.length || 0);
      return;
    }
    setTypewriterProgress(0);
    const speedMs =
      config.typewriterSpeedMode === "slow"
        ? 60
        : config.typewriterSpeedMode === "fast"
        ? 15
        : config.typewriterSpeedMode === "turbo"
        ? 5
        : 30;

    let current = 0;
    const maxLen = config.code?.length || 0;
    const interval = setInterval(() => {
      current += 1;
      setTypewriterProgress(current);
      if (current >= maxLen) {
        clearInterval(interval);
      }
    }, speedMs);

    return () => clearInterval(interval);
  }, [config.typewriterPlaying, config.typewriterSpeedMode, config.code]);

  const activeDisplayCode = useMemo(() => {
    if (config.typewriterPlaying) {
      return (config.code || "").slice(0, typewriterProgress);
    }
    return config.code || "";
  }, [config.code, config.typewriterPlaying, typewriterProgress]);

  // Syntax Highlighting çıktısını oluştur (SSR ve İstemcide güvenli ve senkron)
  const highlightedCode = useMemo(() => {
    try {
      const grammar = Prism.languages[config.language] || Prism.languages.javascript;
      if (grammar) {
        return Prism.highlight(activeDisplayCode, grammar, config.language);
      }
    } catch {
      // sessiz fallback
    }
    // HTML etiketlerinin yanlış parse edilmesini önleyen güvenli kaçış
    return activeDisplayCode
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }, [activeDisplayCode, config.language]);

  const lines = useMemo(() => {
    return activeDisplayCode.split("\n");
  }, [activeDisplayCode]);

  // Diff modu için syntax highlighting (Faz 5)
  const highlightedBeforeCode = useMemo(() => {
    const raw = config.diffBeforeCode || "";
    try {
      const grammar = Prism.languages[config.language] || Prism.languages.javascript;
      if (grammar) {
        return Prism.highlight(raw, grammar, config.language);
      }
    } catch {}
    return raw
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }, [config.diffBeforeCode, config.language]);

  const highlightedAfterCode = useMemo(() => {
    const raw = config.diffAfterCode || "";
    try {
      const grammar = Prism.languages[config.language] || Prism.languages.javascript;
      if (grammar) {
        return Prism.highlight(raw, grammar, config.language);
      }
    } catch {}
    return raw
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }, [config.diffAfterCode, config.language]);

  const linesBefore = useMemo(() => (config.diffBeforeCode || "").split("\n"), [config.diffBeforeCode]);
  const linesAfter = useMemo(() => (config.diffAfterCode || "").split("\n"), [config.diffAfterCode]);

  // 3D Perspektif için güvenli nefes payı sağlayan efektif padding
  const effectivePadding = useMemo(() => {
    if (config.tilt3d) {
      return Math.max(36, config.padding);
    }
    return config.padding;
  }, [config.tilt3d, config.padding]);

  // Vurgulanacak satır kümesini ayrıştır (Örn: "3, 5-7")
  const highlightedSet = useMemo(() => {
    const set = new Set<number>();
    if (!config.highlightedLines) return set;
    const parts = config.highlightedLines.split(",");
    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed.includes("-")) {
        const [startStr, endStr] = trimmed.split("-");
        const start = parseInt(startStr?.trim() || "", 10);
        const end = parseInt(endStr?.trim() || "", 10);
        if (!isNaN(start) && !isNaN(end)) {
          for (let i = Math.min(start, end); i <= Math.max(start, end); i++) {
            set.add(i);
          }
        }
      } else {
        const num = parseInt(trimmed, 10);
        if (!isNaN(num)) set.add(num);
      }
    }
    return set;
  }, [config.highlightedLines]);

  // Satır yüksekliği (piksel olarak kesin eşitlik sağlar)
  const lineHeightPx = useMemo(() => {
    return Math.max(22, Math.round(config.fontSize * 1.65));
  }, [config.fontSize]);

  // Kart genişliği sınıfı
  const cardWidthClass = useMemo(() => {
    switch (config.cardWidth) {
      case "compact":
        return "max-w-lg";
      case "wide":
        return "max-w-3xl";
      case "full":
        return "max-w-full";
      case "normal":
      default:
        return "max-w-2xl";
    }
  }, [config.cardWidth]);

  // Gölge stili
  const shadowClass = useMemo(() => {
    if (config.shadow === "none") return "";
    if (config.shadow === "soft") return "shadow-xl shadow-black/60";
    return "shadow-2xl shadow-black/95";
  }, [config.shadow]);

  // Degrade kenarlık CSS'i (Faz 6)
  const gradientBorderCss = useMemo(() => {
    if (!config.useGradientBorder) return "";
    if (config.gradientBorderPreset === "custom") {
      const colors =
        config.gradientBorderColors && config.gradientBorderColors.length > 0
          ? config.gradientBorderColors
          : ["#6366f1", "#ec4899", "#06b6d4"];
      const angle = config.gradientBorderAngle ?? 135;
      return `linear-gradient(${angle}deg, ${colors.join(", ")})`;
    }
    const found = GRADIENT_BORDER_PRESETS.find((p) => p.id === config.gradientBorderPreset);
    return found ? found.gradient : GRADIENT_BORDER_PRESETS[0].gradient;
  }, [
    config.useGradientBorder,
    config.gradientBorderPreset,
    config.gradientBorderColors,
    config.gradientBorderAngle,
  ]);

  // Sosyal Medya Preset ve Aspect Ratio hesaplaması (Faz 7)
  const socialPresetConfig = useMemo(() => {
    if (!config.socialPreset || config.socialPreset === "free") return null;
    return SOCIAL_PRESETS.find((p) => p.id === config.socialPreset) || null;
  }, [config.socialPreset]);

  const aspectRatioClass = useMemo(() => {
    if (socialPresetConfig) return "";
    if (config.aspectRatio === "16:9") return "aspect-video";
    if (config.aspectRatio === "1:1") return "aspect-square";
    if (config.aspectRatio === "4:5") return "aspect-[4/5]";
    return "";
  }, [config.aspectRatio, socialPresetConfig]);

  const customAspectRatioStyle = useMemo((): React.CSSProperties => {
    if (socialPresetConfig) {
      const isVertical = socialPresetConfig.id === "instagram-story";
      const isBanner = socialPresetConfig.id === "linkedin-banner";
      return {
        aspectRatio: socialPresetConfig.aspectRatio,
        maxWidth: isVertical ? "420px" : isBanner ? "100%" : "880px",
        minHeight: isVertical ? "640px" : undefined,
        width: "100%",
      };
    }
    if (config.aspectRatio === "custom" && config.customWidth && config.customHeight) {
      const isVertical = config.customWidth < config.customHeight;
      return {
        aspectRatio: `${config.customWidth} / ${config.customHeight}`,
        maxWidth: isVertical ? "480px" : "100%",
        width: "100%",
      };
    }
    return {};
  }, [config.aspectRatio, config.customWidth, config.customHeight, socialPresetConfig]);

  // Özel çok renkli degrade stili
  const customGradientStyle = useMemo(() => {
    if (config.bgType === "gradient" && config.useCustomGradient) {
      if (config.gradientStops && config.gradientStops.length > 0) {
        return {
          background: generateCssGradient(
            config.gradientType || "linear",
            config.gradientStops,
            config.gradientAngle ?? 135
          ),
        };
      }
      const colors = config.gradientColors || ["#ec4899", "#8b5cf6", "#3b82f6"];
      const angle = config.gradientAngle ?? 135;
      return {
        background: `linear-gradient(${angle}deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`,
      };
    }
    return {};
  }, [
    config.bgType,
    config.useCustomGradient,
    config.gradientStops,
    config.gradientType,
    config.gradientColors,
    config.gradientAngle,
  ]);

  // Arka plan temel özellikleri
  const backgroundProps = useMemo(() => {
    if (config.bgType === "transparent") {
      return {
        className: "bg-transparent border-2 border-dashed border-slate-700/60",
        style: {},
      };
    }
    if (config.bgType === "pattern") {
      return {
        className: "bg-[#0b0f19]",
        style: {},
      };
    }
    if (config.bgType === "custom" && config.customBgUrl) {
      return {
        className: "bg-cover bg-center",
        style: { backgroundImage: `url(${config.customBgUrl})` },
      };
    }
    // Varsayılan: Gradient
    if (config.useCustomGradient) {
      return {
        className: "",
        style: customGradientStyle,
      };
    }
    // Hazır Tema: Doğrudan cssGradient ile kesin renk garantisi
    if (currentTheme?.cssGradient) {
      return {
        className: "",
        style: { background: currentTheme.cssGradient },
      };
    }
    return {
      className: `bg-gradient-to-tr ${currentTheme.gradient}`,
      style: {},
    };
  }, [config.bgType, config.customBgUrl, config.useCustomGradient, currentTheme, customGradientStyle]);

  return (
    <div className="w-full flex items-center justify-center p-2 sm:p-4 overflow-x-auto">
      {/* İndirilecek ve Panoya Kopyalanacak Ana Sahne */}
      <div
        ref={cardRef}
        className={`relative max-w-4xl w-full flex items-center justify-center rounded-3xl overflow-hidden transition-all duration-300 ${backgroundProps.className} ${aspectRatioClass}`}
        style={{
          padding: `${effectivePadding}px`,
          boxSizing: "border-box",
          ...customAspectRatioStyle,
          ...backgroundProps.style,
        }}
      >
        {/* Organik Film Grain / Kumlanma Katmanı (Faz 6) */}
        {config.useGrainTexture && (
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              opacity: config.grainOpacity ?? 0.18,
              mixBlendMode: "overlay",
            }}
          />
        )}

        {/* Dinamik QR Kod Köşe Rozeti (Faz 4) */}
        {config.showQrCode && qrSvg && mounted && (
          <div
            className={`absolute z-30 p-2 rounded-2xl bg-black/80 backdrop-blur-md border border-white/20 shadow-2xl flex items-center gap-2 transition-all ${
              config.qrPosition === "bottom-left"
                ? "bottom-4 left-4"
                : config.qrPosition === "top-right"
                ? "top-4 right-4"
                : "bottom-4 right-4"
            }`}
          >
            <div
              className="w-12 h-12 rounded-lg bg-white p-0.5 flex items-center justify-center overflow-hidden [&_svg]:w-full [&_svg]:h-full shrink-0"
              dangerouslySetInnerHTML={{ __html: qrSvg }}
            />
            <div className="flex flex-col pr-1 select-none">
              <span className="text-[10px] font-bold text-white tracking-wide">SnapMark</span>
              <span className="text-[9px] text-slate-400">Tara & İncele</span>
            </div>
          </div>
        )}

        {/* Slayt Sayacı Rozeti (Faz 5 Carousel Stüdyosu) */}
        {config.showSlideCounter && (
          <div className="absolute top-4 right-4 z-30 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[11px] font-mono font-semibold text-white shadow-xl flex items-center gap-1.5 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span>
              {(() => {
                const slides = config.slides || [];
                const idx = slides.findIndex((s) => s.id === config.activeSlideId);
                const current = idx !== -1 ? idx + 1 : 1;
                const total = Math.max(slides.length, 1);
                return `${current} / ${total}`;
              })()}
            </span>
          </div>
        )}

        {/* Kaydırma İpucu Rozeti (Faz 5 Carousel Stüdyosu) */}
        {config.showSwipeIndicator && (config.slides?.length || 0) > 1 && (
          <div className="absolute bottom-4 left-4 z-30 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[11px] font-medium text-slate-200 shadow-xl flex items-center gap-1.5 select-none">
            <span>Kaydır</span>
            <span className="font-bold text-indigo-400 animate-bounce">➔</span>
          </div>
        )}

        {/* Özel Marka Logosu Filigranı (Faz 7B) */}
        {config.logoUrl && (
          <div
            className={`absolute z-30 pointer-events-none transition-all ${
              config.logoPosition === "bottom-left"
                ? "bottom-4 left-4"
                : config.logoPosition === "top-left"
                ? "top-4 left-4"
                : config.logoPosition === "top-right"
                ? "top-4 right-4"
                : "bottom-4 right-4"
            }`}
            style={{
              opacity: (config.logoOpacity ?? 80) / 100,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={config.logoUrl}
              alt="Marka Logosu"
              crossOrigin="anonymous"
              style={{
                maxHeight: `${config.logoSize ?? 42}px`,
                maxWidth: `${(config.logoSize ?? 42) * 3}px`,
                objectFit: "contain",
              }}
            />
          </div>
        )}

        {/* İzole Desen Katmanı - Desenler arası karışmayı sıfırlar */}
        {config.bgType === "pattern" && (
          <>
            <div
              key={`pattern-${currentPattern.id}`}
              className="absolute inset-0 pointer-events-none transition-all duration-200"
              style={{
                ...currentPattern.style,
                opacity: config.patternOpacity ?? 0.85,
              }}
            />
            {/* Merkezi Spot Işığı / Odaklama Katmanı (Kodu arka plandan ayırıp parlatan efekt) */}
            {config.patternSpotlight !== false && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(15, 23, 42, 0.4) 0%, rgba(5, 8, 16, 0.88) 100%)",
                }}
              />
            )}
          </>
        )}

        {/* Hareketli Arka Plan Dalgaları Katmanı (Faz 8) */}
        {config.animatedBackground && (
          <div
            className={`absolute -inset-[30%] pointer-events-none opacity-65 filter blur-[65px] ${
              config.animatedBackgroundSpeed === "slow"
                ? "animate-mesh-slow"
                : config.animatedBackgroundSpeed === "fast"
                ? "animate-mesh-fast"
                : "animate-mesh-normal"
            }`}
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(99, 102, 241, 0.75), transparent 60%), radial-gradient(circle at 70% 70%, rgba(236, 72, 153, 0.7), transparent 60%), radial-gradient(circle at 75% 25%, rgba(6, 182, 212, 0.65), transparent 50%), radial-gradient(circle at 25% 75%, rgba(168, 85, 247, 0.65), transparent 55%)",
            }}
          />
        )}

        {/* 3D Perspektif Sahnesi (Bozulma ve Kırpılmayı Önleyen Güvenli Katman) */}
        <div
          className="w-full flex items-center justify-center relative z-10"
          style={{
            perspective: config.tilt3d ? "1400px" : undefined,
            perspectiveOrigin: "center center",
          }}
        >
          {/* İç Kod / Kart Kutusu Dış Çerçevesi (Degrade Kenarlık Destekli) */}
          <div
            className={`w-full ${cardWidthClass} min-w-0 max-w-full rounded-2xl ${shadowClass} transition-all duration-300 relative flex flex-col`}
            style={{
              transform: config.tilt3d
                ? `rotateX(${config.tiltRotateX ?? 12}deg) rotateY(${config.tiltRotateY ?? -16}deg) rotateZ(${config.tiltRotateZ ?? 4}deg) scale(0.90)`
                : undefined,
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              transformOrigin: "center center",
              background: config.useGradientBorder ? gradientBorderCss : undefined,
              padding: config.useGradientBorder ? `${config.gradientBorderWidth || 2}px` : undefined,
              boxShadow:
                config.tilt3d && config.tiltGlow !== false
                  ? `0 25px 60px -15px rgba(0, 0, 0, 0.95), 0 0 ${config.tiltGlowRadius || 45}px 0px ${config.tiltGlowColor || "#6366f1"}`
                  : config.bgType === "pattern"
                  ? "0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 35px -5px rgba(99, 102, 241, 0.12)"
                  : undefined,
            }}
          >
            {/* Asıl Kart İçeriği Katmanı */}
            <div
              className={`w-full h-full rounded-[14px] ${currentCodeTheme.cardBg} ${
                !config.useGradientBorder ? `border ${currentCodeTheme.borderColor}` : ""
              } overflow-hidden transition-all duration-300 code-theme-${config.codeTheme || "onedark"} relative flex flex-col`}
              style={{
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
              }}
            >
          {/* CRT Scanlines efekti (Terminal stili için) */}
          {config.windowStyle === "terminal" && (
            <div
              className="absolute inset-0 pointer-events-none z-20 opacity-10"
              style={{
                backgroundImage: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.75) 50%)",
                backgroundSize: "100% 4px",
              }}
            />
          )}

          {/* Pencere Başlık Çubuğu & Sekmeler (Sola Dayalı) */}
          {config.windowStyle !== "none" && (
            <div
              className="px-3.5 py-2 border-b border-white/10 flex items-center justify-between select-none bg-black/35 gap-3 min-w-0"
              style={
                config.windowHeaderCustom && config.windowHeaderBg
                  ? { backgroundColor: config.windowHeaderBg }
                  : undefined
              }
            >
              {/* Sol Grup: macOS/Win/Terminal/Safari Butonları + Sekmeler */}
              <div className="flex items-center gap-3 min-w-0 flex-1 overflow-hidden">
                {/* macOS Butonları - Sabit RGB ile ihracatta asla solmaz */}
                {config.windowStyle === "mac" && (
                  <div className="flex items-center space-x-2 shrink-0 pr-1">
                    <span
                      style={{
                        backgroundColor: "#ff5f56",
                        border: "1px solid #e0443e",
                        width: "12px",
                        height: "12px",
                        borderRadius: "9999px",
                        display: "inline-block",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
                      }}
                    />
                    <span
                      style={{
                        backgroundColor: "#ffbd2e",
                        border: "1px solid #dea123",
                        width: "12px",
                        height: "12px",
                        borderRadius: "9999px",
                        display: "inline-block",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
                      }}
                    />
                    <span
                      style={{
                        backgroundColor: "#27c93f",
                        border: "1px solid #1aab29",
                        width: "12px",
                        height: "12px",
                        borderRadius: "9999px",
                        display: "inline-block",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
                      }}
                    />
                  </div>
                )}

                {/* Windows Butonları */}
                {config.windowStyle === "windows" && (
                  <div className="flex items-center space-x-2 opacity-80 shrink-0 pr-1">
                    <span className="w-2.5 h-0.5 bg-slate-300 block"></span>
                    <span className="w-2.5 h-2.5 border border-slate-300 block"></span>
                    <span className="text-[10px] text-slate-300 leading-none block font-mono">✕</span>
                  </div>
                )}

                {/* Terminal Prompt (Faz 4) */}
                {config.windowStyle === "terminal" && (
                  <div className="flex items-center space-x-2 shrink-0 pr-1 font-mono">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] inline-block" />
                    <span className="text-[11px] text-emerald-400/90 font-semibold tracking-tight truncate max-w-[200px] sm:max-w-none">
                      {config.terminalPrompt || "➜ ~ kerem@snapmark:"}
                    </span>
                  </div>
                )}

                {/* Safari Tarayıcı Çubuğu (Faz 4) */}
                {config.windowStyle === "safari" && (
                  <div className="flex items-center gap-2 sm:gap-3 w-full">
                    <div className="flex items-center space-x-1.5 shrink-0">
                      <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-sm" />
                      <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-sm" />
                      <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-sm" />
                    </div>
                    <div className="hidden sm:flex items-center gap-1 text-slate-500 text-xs shrink-0 select-none">
                      <span className="px-1 hover:text-slate-300">‹</span>
                      <span className="px-1 hover:text-slate-300">›</span>
                    </div>
                    <div className="flex-1 max-w-xs sm:max-w-sm mx-auto bg-black/40 border border-white/10 rounded-lg px-2.5 py-1 text-[11px] font-mono text-slate-300 flex items-center justify-between shadow-inner">
                      <div className="flex items-center gap-1.5 truncate">
                        <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span className="text-slate-300 truncate">{config.safariUrl || "https://snapmark.dev/demo"}</span>
                      </div>
                      <span className="text-slate-500 text-[10px] select-none">↻</span>
                    </div>
                  </div>
                )}

                {/* Sola Hizalı Sekmeler */}
                {config.windowStyle !== "safari" && config.mode === "code" && config.tabs && config.tabs.length > 0 ? (
                  <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-none min-w-0">
                    {config.tabs.map((tab) => {
                      const isActive = tab.id === config.activeTabId;
                      return (
                        <div
                          key={tab.id}
                          onClick={() => onSelectTab?.(tab.id)}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer group shrink-0 ${
                            isActive
                              ? "bg-white/10 text-white font-medium border border-white/15 shadow-sm"
                              : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                          }`}
                        >
                          {config.showTabIcons !== false ? (
                            <span className="shrink-0 scale-90">
                              {getLanguageBadge(tab.language).icon}
                            </span>
                          ) : (
                            <span
                              className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                isActive ? "bg-indigo-400 shadow-sm shadow-indigo-400/50" : "bg-slate-500"
                              }`}
                            />
                          )}
                          <span className="truncate max-w-[130px]">{tab.name}</span>
                          {config.tabs.length > 1 && onCloseTab && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onCloseTab(tab.id);
                              }}
                              className="w-3.5 h-3.5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white/20 transition-all text-[9px] text-slate-300 shrink-0"
                              title="Sekmeyi Kapat"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      );
                    })}
                    {onAddTab && (
                      <button
                        type="button"
                        onClick={onAddTab}
                        className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
                        title="Yeni Sekme Ekle"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ) : (
                  config.windowStyle !== "safari" && (
                    <div className="text-xs font-mono text-slate-300/90 font-medium truncate px-1 tracking-wide">
                      {config.title || "untitled"}
                    </div>
                  )
                )}
              </div>

              {/* Sağ: Aktif Dil Rozeti veya Mod Rozeti */}
              <div className="shrink-0 flex items-center pl-2">
                {config.mode === "code" && (
                  config.showLanguageBadge !== false ? (
                    <div
                      className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg border text-[11px] font-mono font-medium shadow-sm transition-all"
                      style={{
                        borderColor: `${getLanguageBadge(config.language).color}40`,
                        backgroundColor: getLanguageBadge(config.language).bgColor,
                        color: getLanguageBadge(config.language).color,
                      }}
                    >
                      {getLanguageBadge(config.language).icon}
                      <span className="font-semibold">{getLanguageBadge(config.language).name}</span>
                    </div>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-400 uppercase bg-white/5 px-2 py-0.5 rounded border border-white/5 font-semibold">
                      {config.language}
                    </span>
                  )
                )}
                {config.mode === "tweet" && <XLogo />}
                {config.mode === "diff" && (
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-300 text-[11px] font-mono font-medium shadow-sm">
                    <GitCompare className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-semibold">Diff Karşılaştırma</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* İçerik: Kod Modu */}
          {config.mode === "code" && (
            <div
              className={`p-5 flex overflow-x-auto relative ${
                config.fontLigatures ? "font-ligatures-on" : "font-ligatures-off"
              }`}
              style={{
                fontSize: `${config.fontSize}px`,
                fontFamily: currentFontFamily,
              }}
            >
              {/* Satır Numaraları Sütunu */}
              {config.showLineNumbers && (
                <div
                  className="select-none text-slate-600 text-right pr-4 border-r border-slate-800/80 shrink-0"
                  style={{ fontFamily: currentFontFamily }}
                >
                  {lines.map((_, idx) => {
                    const lineNum = idx + 1;
                    const isHighlighted = highlightedSet.has(lineNum);
                    return (
                      <div
                        key={idx}
                        onClick={() => onToggleLineHighlight?.(lineNum)}
                        title="Vurguyu aç/kapa"
                        className={`transition-colors cursor-pointer hover:text-white flex items-center justify-end ${
                          isHighlighted ? "text-indigo-400 font-bold opacity-100" : "opacity-60"
                        }`}
                        style={{
                          height: `${lineHeightPx}px`,
                          lineHeight: `${lineHeightPx}px`,
                        }}
                      >
                        {lineNum}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Kod Gövdesi ve Vurgulama Katmanı */}
              <div className="flex-1 pl-4 relative">
                {/* Vurgulanan Satırların Arka Plan Katmanları */}
                {Array.from(highlightedSet).map((lineNum) => {
                  if (lineNum < 1 || lineNum > lines.length) return null;
                  return (
                    <div
                      key={lineNum}
                      className="absolute left-0 right-0 pointer-events-none rounded transition-all duration-200"
                      style={{
                        top: `${(lineNum - 1) * lineHeightPx}px`,
                        height: `${lineHeightPx}px`,
                        backgroundColor: "rgba(99, 102, 241, 0.18)",
                        borderLeft: "3px solid #818cf8",
                      }}
                    />
                  );
                })}

                {/* Kod İçeriği (Tam Eşit Line Height & Ligatures) */}
                <pre
                  suppressHydrationWarning
                  className={`!bg-transparent !p-0 !m-0 !overflow-visible ${
                    config.fontLigatures ? "font-ligatures-on" : "font-ligatures-off"
                  }`}
                  style={{
                    lineHeight: `${lineHeightPx}px`,
                    fontFamily: currentFontFamily,
                  }}
                >
                  <code
                    suppressHydrationWarning
                    className={`language-${config.language} !bg-transparent !p-0 ${
                      config.fontLigatures ? "font-ligatures-on" : "font-ligatures-off"
                    }`}
                    style={{
                      fontFamily: currentFontFamily,
                      fontSize: `${config.fontSize}px`,
                      lineHeight: `${lineHeightPx}px`,
                    }}
                    dangerouslySetInnerHTML={{ __html: highlightedCode }}
                  />
                  {config.typewriterPlaying && typewriterProgress < (config.code?.length || 0) && (
                    <span
                      className="inline-block w-2 bg-indigo-400 animate-pulse ml-0.5 align-middle"
                      style={{ height: `${config.fontSize * 1.1}px` }}
                    />
                  )}
                </pre>
              </div>
            </div>
          )}

          {/* İçerik: Tweet / X Kartı Modu (Faz 3) */}
          {config.mode === "tweet" && (
            <div className="p-6 sm:p-7 space-y-4 select-text">
              {/* Profil & Yazar Üst Başlığı */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  {/* Profil Fotoğrafı */}
                  <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/10 shadow-sm bg-slate-800">
                    {config.tweetAvatar ? (
                      <img
                        src={config.tweetAvatar}
                        alt={config.tweetName}
                        className="w-full h-full object-cover"
                        crossOrigin="anonymous"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-base">
                        {(config.tweetName || "U")[0].toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* İsim, Kullanıcı Adı ve Rozet */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-white text-base tracking-tight truncate">
                        {config.tweetName || "Kullanıcı Adı"}
                      </span>
                      {config.tweetVerified === "blue" && <BlueCheckBadge />}
                      {config.tweetVerified === "gold" && <GoldCheckBadge />}
                    </div>
                    <div className="text-xs text-slate-400 font-normal truncate">
                      @{config.tweetHandle || "kullanici"}
                    </div>
                  </div>
                </div>

                {/* X Logo Simgesi */}
                <div className="shrink-0 p-1">
                  <XLogo />
                </div>
              </div>

              {/* Tweet Metni */}
              <div
                className="text-slate-100 font-normal whitespace-pre-wrap leading-relaxed tracking-normal"
                style={{
                  fontSize: `${config.fontSize + 2}px`,
                  lineHeight: 1.5,
                }}
              >
                {renderFormattedTweet(config.tweetContent || config.code)}
              </div>

              {/* Tarih & İstemci */}
              <div className="text-xs text-slate-500 font-normal pt-1 flex items-center gap-2">
                <span>{config.tweetDate || "21:42 · 10 Eyl 2026"}</span>
                {config.tweetClient && (
                  <>
                    <span>·</span>
                    <span className="text-slate-400 font-medium">{config.tweetClient}</span>
                  </>
                )}
              </div>

              {/* Sosyal Etkileşim Sayaçları (Opsiyonel) */}
              {config.tweetShowMetrics && (
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 select-none">
                  <div className="flex items-center gap-1.5 hover:text-sky-400 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-[11px] font-mono">124</span>
                  </div>
                  <div className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
                    <Repeat2 className="w-4 h-4 text-emerald-400/90" />
                    <span className="text-[11px] font-mono">{config.tweetRetweets || "382"}</span>
                  </div>
                  <div className="flex items-center gap-1.5 hover:text-rose-400 transition-colors">
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />
                    <span className="text-[11px] font-mono">{config.tweetLikes || "1.4K"}</span>
                  </div>
                  <div className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors">
                    <BarChart2 className="w-4 h-4" />
                    <span className="text-[11px] font-mono">{config.tweetViews || "54.8K"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Bookmark className="w-4 h-4 hover:text-indigo-400 transition-colors cursor-pointer" />
                    <Share2 className="w-4 h-4 hover:text-indigo-400 transition-colors cursor-pointer" />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* İçerik: Alıntı & Fikir Modu (Faz 3) */}
          {config.mode === "quote" && (
            <div className="p-7 sm:p-8 space-y-6">
              {config.quoteStyle === "minimal" && (
                <>
                  <p
                    className="text-slate-100 font-medium leading-relaxed italic whitespace-pre-wrap break-words"
                    style={{ fontSize: `${config.fontSize + 3}px` }}
                  >
                    {config.showQuoteMarks && (
                      <span className="text-2xl sm:text-3xl font-serif text-indigo-400 font-bold leading-none select-none inline-block mr-1 align-baseline -translate-y-0.5">
                        “
                      </span>
                    )}
                    <span>{config.quoteContent || config.code}</span>
                    {config.showQuoteMarks && (
                      <span className="text-2xl sm:text-3xl font-serif text-indigo-400 font-bold leading-none select-none inline-block ml-1 align-baseline -translate-y-0.5">
                        ”
                      </span>
                    )}
                  </p>
                  <div className="pt-5 border-t border-white/10">
                    <h4 className="text-sm font-bold text-white tracking-tight">
                      {config.quoteAuthor || config.authorName || "Steve Jobs"}
                    </h4>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">
                      {config.quoteTitle || config.authorHandle || "Apple Kurucusu & Vizyoner"}
                    </p>
                  </div>
                </>
              )}

              {config.quoteStyle === "card" && (
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 shadow-inner space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
                    <QuoteIcon className="w-3.5 h-3.5" />
                    <span>Alıntı</span>
                  </div>
                  <p
                    className="text-slate-100 font-normal leading-relaxed whitespace-pre-wrap break-words"
                    style={{ fontSize: `${config.fontSize + 2}px` }}
                  >
                    {config.showQuoteMarks && (
                      <span className="text-2xl sm:text-3xl font-serif text-indigo-400 font-bold leading-none select-none inline-block mr-1 align-baseline -translate-y-0.5">
                        “
                      </span>
                    )}
                    <span>{config.quoteContent || config.code}</span>
                    {config.showQuoteMarks && (
                      <span className="text-2xl sm:text-3xl font-serif text-indigo-400 font-bold leading-none select-none inline-block ml-1 align-baseline -translate-y-0.5">
                        ”
                      </span>
                    )}
                  </p>
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="font-bold text-white">
                      {config.quoteAuthor || config.authorName || "Steve Jobs"}
                    </span>
                    <span className="text-slate-400">
                      {config.quoteTitle || config.authorHandle || "Apple Kurucusu"}
                    </span>
                  </div>
                </div>
              )}

              {config.quoteStyle === "accent" && (
                <div className="border-l-4 border-indigo-500 pl-6 space-y-4">
                  <p
                    className="text-slate-100 font-semibold leading-relaxed tracking-tight whitespace-pre-wrap break-words"
                    style={{ fontSize: `${config.fontSize + 3}px` }}
                  >
                    {config.showQuoteMarks && (
                      <span className="text-2xl sm:text-3xl font-serif text-indigo-400 font-bold leading-none select-none inline-block mr-1 align-baseline -translate-y-0.5">
                        “
                      </span>
                    )}
                    <span>{config.quoteContent || config.code}</span>
                    {config.showQuoteMarks && (
                      <span className="text-2xl sm:text-3xl font-serif text-indigo-400 font-bold leading-none select-none inline-block ml-1 align-baseline -translate-y-0.5">
                        ”
                      </span>
                    )}
                  </p>
                  <div className="pt-2">
                    <h4 className="text-sm font-bold text-indigo-300">
                      {config.quoteAuthor || config.authorName || "Steve Jobs"}
                    </h4>
                    <p className="text-xs text-slate-400 font-medium">
                      {config.quoteTitle || config.authorHandle || "Apple Kurucusu"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* İçerik: Diff / Karşılaştırma Modu (Faz 5) */}
          {config.mode === "diff" && (
            <div className="p-4 sm:p-5 space-y-4 select-text">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {/* Sol Sütun: Önce (Kötü Pratik) */}
                <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 overflow-hidden flex flex-col shadow-inner">
                  <div className="px-3 py-2 bg-rose-950/60 border-b border-rose-500/25 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-rose-300">
                      <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
                      <span>{config.diffBeforeLabel || "Önce (Kötü Pratik)"}</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-rose-400/90 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                      BEFORE
                    </span>
                  </div>
                  <div
                    className="p-3.5 flex-1 overflow-x-auto"
                    style={{
                      fontFamily: currentFontFamily,
                      fontSize: `${Math.max(12, config.fontSize - 1)}px`,
                      lineHeight: `${Math.max(20, lineHeightPx - 2)}px`,
                    }}
                  >
                    <pre
                      suppressHydrationWarning
                      className="!bg-transparent !p-0 !m-0 !overflow-visible"
                      style={{ fontFamily: currentFontFamily }}
                    >
                      <code
                        suppressHydrationWarning
                        className={`language-${config.language} !bg-transparent !p-0`}
                        dangerouslySetInnerHTML={{ __html: highlightedBeforeCode }}
                      />
                    </pre>
                  </div>
                </div>

                {/* Sağ Sütun: Sonra (Temiz Kod) */}
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 overflow-hidden flex flex-col shadow-inner">
                  <div className="px-3 py-2 bg-emerald-950/60 border-b border-emerald-500/25 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                      <span>{config.diffAfterLabel || "Sonra (Temiz Kod)"}</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-400/90 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      AFTER
                    </span>
                  </div>
                  <div
                    className="p-3.5 flex-1 overflow-x-auto"
                    style={{
                      fontFamily: currentFontFamily,
                      fontSize: `${Math.max(12, config.fontSize - 1)}px`,
                      lineHeight: `${Math.max(20, lineHeightPx - 2)}px`,
                    }}
                  >
                    <pre
                      suppressHydrationWarning
                      className="!bg-transparent !p-0 !m-0 !overflow-visible"
                      style={{ fontFamily: currentFontFamily }}
                    >
                      <code
                        suppressHydrationWarning
                        className={`language-${config.language} !bg-transparent !p-0`}
                        dangerouslySetInnerHTML={{ __html: highlightedAfterCode }}
                      />
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* İçerik: Terminal / CLI Modu (Faz 7B) */}
          {config.mode === "terminal" && (
            <div className="p-6 sm:p-7 space-y-4 font-mono text-sm leading-relaxed select-text">
              {/* Terminal Komut Satırı */}
              <div className="flex items-center gap-2 text-zinc-100 flex-wrap">
                <span className="text-emerald-400 font-bold select-none">
                  {config.terminalUser || "developer@snapmark:~"}$
                </span>
                <span className="font-semibold text-white tracking-wide">
                  {config.terminalCommand || config.code || "npm install @snapmark/core"}
                </span>
                <span className="w-2 h-4 bg-emerald-400 inline-block animate-pulse ml-0.5" />
              </div>

              {/* Terminal Çıktı Bloğu */}
              {(config.terminalOutput || "").trim() && (
                <div className="pt-3 border-t border-white/10 space-y-1.5 text-xs">
                  {(config.terminalOutput || "").split("\n").map((line, idx) => {
                    let lineClass = "text-zinc-400";
                    if (
                      line.includes("✔") ||
                      line.includes("success") ||
                      line.includes("Ready") ||
                      line.includes("Done")
                    ) {
                      lineClass = "text-emerald-400 font-medium";
                    } else if (line.includes("⚠") || line.includes("warn")) {
                      lineClass = "text-amber-400 font-medium";
                    } else if (line.includes("✖") || line.includes("error") || line.includes("ERR")) {
                      lineClass = "text-rose-400 font-medium";
                    } else if (line.includes("ℹ") || line.includes("info")) {
                      lineClass = "text-sky-400";
                    }
                    return (
                      <div key={idx} className={`${lineClass} font-mono whitespace-pre-wrap`}>
                        {line}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Filigran / Kart Altlığı (Opsiyonel) */}
          {config.showWatermark && (
            <div className="px-5 py-2.5 border-t border-white/10 flex items-center justify-between text-xs select-none bg-black/25">
              <div className="flex items-center space-x-2 font-mono text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
                <span className="text-[11px] font-medium text-slate-200">
                  {config.watermarkText || "@keremdev"}
                </span>
              </div>
              <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                <span>SnapMark</span>
              </div>
            </div>
          )}
            </div>
        </div>
      </div>
    </div>
  </div>
);
};
