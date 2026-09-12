"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Search,
  Download,
  Copy,
  FileCode,
  Sparkles,
  Terminal,
  Type,
  Maximize2,
  RotateCcw,
  HelpCircle,
  Laptop,
  Check,
  Share2,
  Sliders,
  Palette,
  Layout,
  Video,
  Smartphone,
  Languages,
  Waves,
} from "lucide-react";
import { THEMES, FONT_FAMILIES, SOCIAL_PRESETS } from "@/lib/constants";
import { CardMode, SocialPresetId, ThemeId, FontFamilyId, UiLanguage } from "@/types";

interface CommandItem {
  id: string;
  category: string;
  title: string;
  description?: string;
  shortcut?: string;
  icon: React.ReactNode;
  active?: boolean;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onExportPng: () => void;
  onExportSvg: () => void;
  onExportZip: () => void;
  onExportVideo?: () => void;
  onOpenFeedPreview?: () => void;
  onToggleLanguage?: () => void;
  uiLanguage?: UiLanguage;
  onCopyImage: () => void;
  onOpenShortcuts: () => void;
  onTogglePresentation: () => void;
  onResetDefaults: () => void;
  currentMode: CardMode;
  onModeChange: (mode: CardMode) => void;
  currentTheme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
  currentFont: FontFamilyId;
  onFontChange: (font: FontFamilyId) => void;
  currentSocialPreset?: SocialPresetId;
  onSocialPresetChange: (preset: SocialPresetId) => void;
  tilt3d?: boolean;
  onToggleTilt3d: () => void;
  gradientBorder?: boolean;
  onToggleGradientBorder: () => void;
  grainTexture?: boolean;
  onToggleGrainTexture: () => void;
  animatedBg?: boolean;
  onToggleAnimatedBg?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onExportPng,
  onExportSvg,
  onExportZip,
  onExportVideo,
  onOpenFeedPreview,
  onToggleLanguage,
  uiLanguage = "tr",
  onCopyImage,
  onOpenShortcuts,
  onTogglePresentation,
  onResetDefaults,
  currentMode,
  onModeChange,
  currentTheme,
  onThemeChange,
  currentFont,
  onFontChange,
  currentSocialPreset = "free",
  onSocialPresetChange,
  tilt3d = false,
  onToggleTilt3d,
  gradientBorder = false,
  onToggleGradientBorder,
  grainTexture = false,
  onToggleGrainTexture,
  animatedBg = false,
  onToggleAnimatedBg,
}) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const isEn = uiLanguage === "en";

  // Focus on input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Build command items
  const commands: CommandItem[] = useMemo(() => {
    const catActions = isEn ? "Actions" : "Eylemler";
    const catModes = isEn ? "Modes" : "Modlar";
    const catFormats = isEn ? "Formats" : "Formatlar";
    const catThemes = isEn ? "Themes" : "Temalar";
    const catFonts = isEn ? "Fonts" : "Fontlar";
    const catEffects = isEn ? "Effects" : "Efektler";

    const list: CommandItem[] = [
      // Eylemler / Actions
      {
        id: "export-png",
        category: catActions,
        title: isEn ? "Export PNG (High Quality)" : "PNG Görseli İndir (Yüksek Kalite)",
        description: isEn ? "Export current card as 2K/4K PNG" : "Mevcut kartı 2K/4K PNG olarak indir",
        shortcut: "Ctrl+S",
        icon: <Download className="w-4 h-4 text-emerald-400" />,
        action: () => {
          onExportPng();
          onClose();
        },
      },
      {
        id: "copy-clipboard",
        category: catActions,
        title: isEn ? "Copy to Clipboard" : "Panoya Kopyala",
        description: isEn ? "Copy image directly to clipboard" : "Görseli doğrudan panoya kopyala",
        shortcut: "Ctrl+Shift+C",
        icon: <Copy className="w-4 h-4 text-blue-400" />,
        action: () => {
          onCopyImage();
          onClose();
        },
      },
      {
        id: "export-svg",
        category: catActions,
        title: isEn ? "Export Vector SVG" : "Vektörel SVG Olarak İndir",
        description: isEn ? "Save in scalable vector SVG format" : "Büyütülebilir SVG formatında kaydet",
        icon: <FileCode className="w-4 h-4 text-purple-400" />,
        action: () => {
          onExportSvg();
          onClose();
        },
      },
      {
        id: "export-zip",
        category: catActions,
        title: isEn ? "Download All Slides (ZIP)" : "Tüm Slaytları İndir (ZIP)",
        description: isEn ? "Pack all carousel slides in a single archive" : "Carousel'deki tüm slaytları tek arşivde paketle",
        icon: <Download className="w-4 h-4 text-amber-400" />,
        action: () => {
          onExportZip();
          onClose();
        },
      },
      ...(onExportVideo
        ? [
            {
              id: "export-video",
              category: catActions,
              title: isEn ? "Export WebM Video (Live Animation)" : "WebM Video İndir (Canlı Animasyon)",
              description: isEn ? "Record typewriter or animated waves into WebM video" : "Daktilo veya animasyonlu arka planı WebM video olarak kaydet",
              icon: <Video className="w-4 h-4 text-purple-400" />,
              action: () => {
                onExportVideo();
                onClose();
              },
            },
          ]
        : []),
      ...(onOpenFeedPreview
        ? [
            {
              id: "feed-preview",
              category: catActions,
              title: isEn ? "Social Media Feed Simulation" : "Sosyal Medya Akış Simülasyonu (Feed Preview)",
              description: isEn ? "Preview how your card appears on Twitter, LinkedIn & IG feeds" : "Twitter/X, LinkedIn ve Instagram akışlarında kartın canlı görünümünü incele",
              icon: <Smartphone className="w-4 h-4 text-emerald-400" />,
              action: () => {
                onOpenFeedPreview();
                onClose();
              },
            },
          ]
        : []),
      ...(onToggleLanguage
        ? [
            {
              id: "toggle-language",
              category: catActions,
              title: isEn
                ? "Dili Türkçe Yap (Switch to Turkish)"
                : "Switch Language to English (İngilizce Yap)",
              description: isEn ? "Switch interface language" : "SnapMark arayüz dilini değiştir",
              icon: <Languages className="w-4 h-4 text-indigo-400" />,
              action: () => {
                onToggleLanguage();
                onClose();
              },
            },
          ]
        : []),
      {
        id: "presentation-mode",
        category: catActions,
        title: isEn ? "Full Screen Presentation Mode" : "Tam Ekran Sunum Modu",
        description: isEn ? "Hide UI menus and present slides cleanly" : "Tüm menüleri gizle, temiz sunum görünümüne geç",
        shortcut: "F11",
        icon: <Maximize2 className="w-4 h-4 text-sky-400" />,
        action: () => {
          onTogglePresentation();
          onClose();
        },
      },
      {
        id: "show-shortcuts",
        category: catActions,
        title: isEn ? "Keyboard Shortcuts Guide" : "Klavye Kısayolları Rehberi",
        description: isEn ? "View all shortcut key bindings" : "Tüm tuş kombinasyonlarını görüntüle",
        shortcut: "?",
        icon: <HelpCircle className="w-4 h-4 text-indigo-400" />,
        action: () => {
          onOpenShortcuts();
          onClose();
        },
      },
      {
        id: "landing-page",
        category: catActions,
        title: isEn ? "Landing & Showcase Page" : "Vitrin & Tanıtım Sayfası (Landing)",
        description: isEn ? "Explore SnapMark features and interactive showcase" : "SnapMark özelliklerini ve örnek vitrinini incele",
        icon: <Sparkles className="w-4 h-4 text-emerald-400" />,
        action: () => {
          window.location.href = "/landing";
          onClose();
        },
      },
      {
        id: "reset-defaults",
        category: catActions,
        title: isEn ? "Reset to Factory Defaults" : "Fabrika Ayarlarına Sıfırla",
        description: isEn ? "Reset all configuration and code to initial state" : "Tüm ayarları ve kodu ilk haline döndür",
        icon: <RotateCcw className="w-4 h-4 text-rose-400" />,
        action: () => {
          onResetDefaults();
          onClose();
        },
      },

      // Modlar / Modes
      {
        id: "mode-code",
        category: catModes,
        title: isEn ? "Code Editor Mode" : "Kod Editörü Modu",
        description: isEn ? "Syntax highlighted code snippet" : "Sözdizimi vurgulu kod bloğu",
        shortcut: "Ctrl+1",
        icon: <FileCode className="w-4 h-4 text-indigo-400" />,
        active: currentMode === "code",
        action: () => {
          onModeChange("code");
          onClose();
        },
      },
      {
        id: "mode-diff",
        category: catModes,
        title: isEn ? "Diff (Comparison) Mode" : "Diff (Karşılaştırma) Modu",
        description: isEn ? "Before / After code comparison" : "Önce / Sonra kod kıyaslama görünümü",
        shortcut: "Ctrl+4",
        icon: <Sliders className="w-4 h-4 text-cyan-400" />,
        active: currentMode === "diff",
        action: () => {
          onModeChange("diff");
          onClose();
        },
      },
      {
        id: "mode-tweet",
        category: catModes,
        title: isEn ? "Tweet / X Post Mode" : "Tweet / X Gönderi Modu",
        description: isEn ? "Social media post card design" : "Sosyal medya gönderisi tasarımı",
        shortcut: "Ctrl+2",
        icon: <Share2 className="w-4 h-4 text-sky-400" />,
        active: currentMode === "tweet",
        action: () => {
          onModeChange("tweet");
          onClose();
        },
      },
      {
        id: "mode-quote",
        category: catModes,
        title: isEn ? "Quote & Note Mode" : "Alıntı & Aforizma Modu",
        description: isEn ? "Large typographic quote card" : "Büyük tipografik alıntı kartı",
        shortcut: "Ctrl+3",
        icon: <Type className="w-4 h-4 text-amber-400" />,
        active: currentMode === "quote",
        action: () => {
          onModeChange("quote");
          onClose();
        },
      },
      {
        id: "mode-terminal",
        category: catModes,
        title: isEn ? "Terminal / CLI Output Mode" : "Terminal / CLI Çıktı Modu",
        description: isEn ? "Console command and colored output" : "Konsol komutu ve renkli terminal çıktısı",
        icon: <Terminal className="w-4 h-4 text-emerald-400" />,
        active: currentMode === "terminal",
        action: () => {
          onModeChange("terminal");
          onClose();
        },
      },

      // Sosyal Medya Formatları / Formats
      ...SOCIAL_PRESETS.map((preset) => ({
        id: `social-${preset.id}`,
        category: catFormats,
        title: `${preset.icon} ${preset.name}`,
        description: preset.description,
        icon: <Layout className="w-4 h-4 text-violet-400" />,
        active: currentSocialPreset === preset.id,
        action: () => {
          onSocialPresetChange(preset.id);
          onClose();
        },
      })),

      // Efektler / Effects
      {
        id: "toggle-tilt",
        category: catEffects,
        title: isEn
          ? tilt3d ? "3D Tilt: Off" : "3D Tilt: On"
          : tilt3d ? "3D Perspektif Eğimi: Kapat" : "3D Perspektif Eğimi: Aç",
        description: isEn ? "Adds 3D isometric depth to card" : "Karta 3 boyutlu izometrik derinlik kazandırır",
        icon: <Laptop className="w-4 h-4 text-pink-400" />,
        active: tilt3d,
        action: () => {
          onToggleTilt3d();
          onClose();
        },
      },
      {
        id: "toggle-gradient-border",
        category: catEffects,
        title: isEn
          ? gradientBorder ? "Gradient Border: Off" : "Gradient Border: On"
          : gradientBorder ? "Degrade Kenarlık: Kapat" : "Degrade Kenarlık: Aç",
        description: isEn ? "Adds glowing dual-tone border" : "Kart çevresine neon degrade çerçeve çeker",
        icon: <Sparkles className="w-4 h-4 text-cyan-400" />,
        active: gradientBorder,
        action: () => {
          onToggleGradientBorder();
          onClose();
        },
      },
      {
        id: "toggle-grain",
        category: catEffects,
        title: isEn
          ? grainTexture ? "Film Grain Texture: Off" : "Film Grain Texture: On"
          : grainTexture ? "Film Grain Dokusu: Kapat" : "Film Grain Dokusu: Aç",
        description: isEn ? "Adds organic film noise layer" : "Arka plana organik film kumlanması ekler",
        icon: <Sparkles className="w-4 h-4 text-amber-400" />,
        active: grainTexture,
        action: () => {
          onToggleGrainTexture();
          onClose();
        },
      },
      ...(onToggleAnimatedBg
        ? [
            {
              id: "toggle-animated-bg",
              category: catEffects,
              title: isEn
                ? animatedBg ? "Animated Waves: Off" : "Animated Waves: On"
                : animatedBg ? "Hareketli Arka Plan Dalgaları: Kapat" : "Hareketli Arka Plan Dalgaları: Aç",
              description: isEn ? "Flowing GPU-accelerated gradient wave motion" : "Kart arkasında akıcı GPU hızlandırmalı degrade dalga animasyonu",
              icon: <Waves className="w-4 h-4 text-cyan-400" />,
              active: animatedBg,
              action: () => {
                onToggleAnimatedBg();
                onClose();
              },
            },
          ]
        : []),

      // Temalar / Themes
      ...THEMES.map((theme) => ({
        id: `theme-${theme.id}`,
        category: catThemes,
        title: isEn ? `Theme: ${theme.name}` : `Tema: ${theme.name}`,
        description: isEn ? "Set background gradient and card color" : "Arka plan degrade ve kart rengini ayarla",
        icon: <Palette className="w-4 h-4 text-fuchsia-400" />,
        active: currentTheme === theme.id,
        action: () => {
          onThemeChange(theme.id);
          onClose();
        },
      })),

      // Fontlar / Fonts
      ...FONT_FAMILIES.map((font) => ({
        id: `font-${font.id}`,
        category: catFonts,
        title: `Font: ${font.name}`,
        description: isEn ? "Change code and text typography" : "Kod ve metin tipografisini değiştir",
        icon: <Type className="w-4 h-4 text-emerald-400" />,
        active: currentFont === font.id,
        action: () => {
          onFontChange(font.id);
          onClose();
        },
      })),
    ];

    return list;
  }, [
    isEn,
    onExportPng,
    onExportSvg,
    onExportZip,
    onExportVideo,
    onOpenFeedPreview,
    onToggleLanguage,
    uiLanguage,
    onCopyImage,
    onOpenShortcuts,
    onTogglePresentation,
    onResetDefaults,
    currentMode,
    onModeChange,
    currentTheme,
    onThemeChange,
    currentFont,
    onFontChange,
    currentSocialPreset,
    onSocialPresetChange,
    tilt3d,
    onToggleTilt3d,
    gradientBorder,
    onToggleGradientBorder,
    grainTexture,
    onToggleGrainTexture,
    animatedBg,
    onToggleAnimatedBg,
    onClose,
  ]);

  // Filter commands based on query
  const filteredCommands = useMemo(() => {
    if (!query.trim()) return commands;
    const cleanQuery = query.toLowerCase().trim();
    return commands.filter(
      (c) =>
        c.title.toLowerCase().includes(cleanQuery) ||
        c.category.toLowerCase().includes(cleanQuery) ||
        c.description?.toLowerCase().includes(cleanQuery)
    );
  }, [commands, query]);

  // Keyboard navigation within the palette
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector<HTMLElement>("[data-selected='true']");
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#0d121f] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-white/[0.02]">
          <Search className="w-5 h-5 text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder={
              isEn
                ? "Search or type a command... (e.g. export, tweet, fira, sunset)"
                : "Bir komut arayın veya yazın... (örn: indir, tweet, fira, sunset)"
            }
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono text-zinc-400 bg-white/5 border border-white/10 rounded">
            ESC
          </kbd>
        </div>

        {/* Command List */}
        <div ref={listRef} className="overflow-y-auto p-2 space-y-1 custom-scrollbar">
          {filteredCommands.length === 0 ? (
            <div className="py-12 text-center text-zinc-500 text-sm">
              {isEn ? "No matching commands found." : "Eşleşen komut bulunamadı."}
            </div>
          ) : (
            filteredCommands.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={item.id}
                  data-selected={isSelected}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer ${
                    isSelected
                      ? "bg-indigo-600/20 text-white border border-indigo-500/30"
                      : "text-zinc-300 hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-1.5 rounded-lg shrink-0 ${
                        isSelected ? "bg-indigo-500/20 text-indigo-300" : "bg-white/5 text-zinc-400"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium truncate">{item.title}</span>
                        {item.active && (
                          <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">
                            <Check className="w-2.5 h-2.5" /> {isEn ? "Active" : "Aktif"}
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-xs text-zinc-500 truncate">{item.description}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/5">
                      {item.category}
                    </span>
                    {item.shortcut && (
                      <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-zinc-400 bg-white/10 rounded border border-white/10">
                        {item.shortcut}
                      </kbd>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 border-t border-white/10 bg-black/40 flex items-center justify-between text-[11px] text-zinc-500">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10 text-zinc-400">↑</kbd>
              <kbd className="ml-1 px-1.5 py-0.5 bg-white/5 rounded border border-white/10 text-zinc-400">↓</kbd> {isEn ? "Navigate" : "Gezin"}
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10 text-zinc-400">↵</kbd> {isEn ? "Select" : "Seç"}
            </span>
          </div>
          <span className="font-mono text-[10px] text-indigo-400">SnapMark Pro Studio</span>
        </div>
      </div>
    </div>
  );
};
