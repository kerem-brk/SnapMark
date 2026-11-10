"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Copy,
  Download,
  Check,
  PanelLeftClose,
  PanelLeftOpen,
  Share2,
  Github,
  X,
  Undo2,
  Redo2,
  Keyboard,
  RotateCcw,
  Search,
  Maximize2,
  FileDown,
  FileUp,
  Video,
  Smartphone,
  Languages,
  Loader2,
  MoreHorizontal,
  ChevronDown,
  Palette,
  FileText,
} from "lucide-react";
import { LogoMark } from "@/components/Logo";
import { CardConfig, LanguageId } from "@/types";
import { detectLanguageFromFilename } from "@/lib/constants";
import { encodeShareData } from "@/lib/shareUtils";
import { getT } from "@/lib/i18n";

interface HeaderProps {
  config: CardConfig;
  onChangeConfig: (newConfig: Partial<CardConfig>) => void;
  onCopyImage: () => void;
  onDownloadImage: () => void;
  onDownloadSvg: () => void;
  onExportCarouselPdf?: () => Promise<void> | void;
  isPdfExporting?: boolean;
  onExportVideo?: () => Promise<void>;
  isVideoExporting?: boolean;
  onOpenFeedPreview?: () => void;
  isExporting: boolean;
  copied: boolean;
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  onOpenShortcuts?: () => void;
  onResetDefaults?: () => void;
  onOpenCommandPalette?: () => void;
  onTogglePresentation?: () => void;
  onExportThemeJson?: () => void;
  onImportThemeJson?: (file: File) => void;
  onOpenColorPalette?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  config,
  onChangeConfig,
  onCopyImage,
  onDownloadImage,
  onDownloadSvg,
  onExportCarouselPdf,
  isPdfExporting = false,
  onExportVideo,
  isVideoExporting = false,
  onOpenFeedPreview,
  isExporting,
  copied,
  isSidebarOpen = true,
  onToggleSidebar,
  onUndo,
  onRedo,
  canUndo = false,
  canRedo = false,
  onOpenShortcuts,
  onResetDefaults,
  onOpenCommandPalette,
  onTogglePresentation,
  onExportThemeJson,
  onImportThemeJson,
  onOpenColorPalette,
}) => {
  const isEn = config.uiLanguage === "en";
  const t = getT(config.uiLanguage);
  const [sharedFeedback, setSharedFeedback] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isToolsMenuOpen, setIsToolsMenuOpen] = useState(false);
  const toolsMenuRef = useRef<HTMLDivElement>(null);
  const themeFileInputRef = useRef<HTMLInputElement>(null);
  const [importUrl, setImportUrl] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  // Close tools dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (toolsMenuRef.current && !toolsMenuRef.current.contains(e.target as Node)) {
        setIsToolsMenuOpen(false);
      }
    };
    if (isToolsMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isToolsMenuOpen]);

  const handleShare = async () => {
    try {
      // Tüm kart ayarlarını (sekmeler, slaytlar, arka plan, efektler) taşı;
      // linki şişiren büyük görsel data URL'lerini ve oynatma durumunu hariç tut.
      const { customBgUrl, tweetAvatar, logoUrl, typewriterPlaying: _typewriterPlaying, ...rest } = config;
      void _typewriterPlaying;
      const isSmallImage = (url?: string) => !!url && url.length <= 4000;
      const shareData = {
        ...rest,
        title: config.title || "SnapMark Kod Kartı",
        ...(isSmallImage(customBgUrl) ? { customBgUrl } : config.bgType === "custom" ? { bgType: "gradient" as const } : {}),
        ...(isSmallImage(tweetAvatar) ? { tweetAvatar } : {}),
        ...(isSmallImage(logoUrl) ? { logoUrl } : {}),
      };
      const encoded = encodeShareData(shareData);
      const url = `${window.location.origin}${window.location.pathname}#c=${encoded}`;

      await navigator.clipboard.writeText(url);
      setSharedFeedback(true);
      setTimeout(() => setSharedFeedback(false), 2500);
    } catch {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setSharedFeedback(true);
        setTimeout(() => setSharedFeedback(false), 2500);
      } catch (err) {
        console.error("Paylaşım linki kopyalanamadı:", err);
      }
    }
  };

  const handleImportFromGithub = async () => {
    if (!importUrl.trim()) {
      setImportError(isEn ? "Please enter a valid GitHub or Gist URL." : "Lütfen geçerli bir GitHub veya Gist URL'si girin.");
      return;
    }

    setIsImporting(true);
    setImportError(null);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      const trimmedUrl = importUrl.trim();
      let fetchedCode = "";
      let filename = "snippet.ts";
      let detectedLang: LanguageId | null = null;

      // GitHub Gist API detection (örn: gist.github.com/user/gist_id veya gist.github.com/gist_id)
      const gistMatch = trimmedUrl.match(/gist\.github\.com\/(?:[a-zA-Z0-9-]+\/)?([a-f0-9]+)/i);

      if (gistMatch && gistMatch[1]) {
        const gistId = gistMatch[1];
        try {
          const apiRes = await fetch(`https://api.github.com/gists/${gistId}`, {
            signal: controller.signal,
            headers: { Accept: "application/vnd.github.v3+json" },
          });

          if (apiRes.ok) {
            const gistData = await apiRes.json();
            const files = Object.values(gistData.files || {}) as Array<{ filename?: string; content?: string; language?: string; size?: number }>;
            if (files.length > 0 && typeof files[0]?.content === "string") {
              const fileObj = files[0];
              const fileContent: string = fileObj.content || "";
              if ((fileObj.size || fileContent.length) > 500000) {
                throw new Error(isEn ? "File exceeds 500KB limit." : "Dosya 500KB boyut sınırını aşıyor.");
              }
              fetchedCode = fileContent;
              filename = fileObj.filename || "gist-snippet.ts";
              detectedLang = detectLanguageFromFilename(filename);
            }
          }
        } catch (apiErr: unknown) {
          if (apiErr instanceof Error && apiErr.message.includes("500KB")) throw apiErr;
          // API hata verirse aşağıdaki fallback raw indirmeye devam et
        }
      }

      // Gist API cevap vermediyse veya normal GitHub repo URL'si ise
      if (!fetchedCode) {
        let rawUrl = trimmedUrl;
        if (rawUrl.includes("github.com") && rawUrl.includes("/blob/")) {
          rawUrl = rawUrl.replace("github.com", "raw.githubusercontent.com").replace("/blob/", "/");
        }
        if (rawUrl.includes("gist.github.com") && !rawUrl.includes("gist.githubusercontent.com")) {
          rawUrl = rawUrl.replace("gist.github.com", "gist.githubusercontent.com") + "/raw";
        }

        const res = await fetch(rawUrl, { signal: controller.signal });
        if (!res.ok) throw new Error(isEn ? "Failed to download file (404 or connection error)" : "Dosya indirilemedi (404 veya bağlantı hatası)");

        const text = await res.text();
        if (text.length > 500000) {
          throw new Error(isEn ? "File exceeds 500KB limit." : "Dosya 500KB boyut sınırını aşıyor.");
        }
        fetchedCode = text;

        const urlWithoutRaw = trimmedUrl.replace(/\/raw\/?$/, "");
        const urlParts = urlWithoutRaw.split("/").filter(Boolean);
        const lastPart = urlParts[urlParts.length - 1] || "snippet.ts";
        if (lastPart.includes(".")) {
          filename = lastPart;
        } else {
          filename = "github-snippet.ts";
        }
        detectedLang = detectLanguageFromFilename(filename);
      }

      const lang = detectedLang || "typescript";

      onChangeConfig({
        code: fetchedCode,
        title: filename,
        language: lang,
        mode: "code",
      });
      setIsImportModalOpen(false);
      setImportUrl("");
    } catch (err: unknown) {
      const msg = err instanceof Error
        ? (err.name === "AbortError" ? (isEn ? "Request timed out (8s limit)" : "İstek zaman aşımına uğradı (8sn)") : err.message)
        : (isEn ? "Error fetching code" : "Kod çekilirken hata oluştu");
      setImportError(msg);
    } finally {
      clearTimeout(timeoutId);
      setIsImporting(false);
    }
  };

  return (
    <>
      <header className="h-16 border-b border-[#D6D0C4] bg-[#FAF8F5]/95 backdrop-blur-md px-3 sm:px-6 flex items-center justify-between z-30 sticky top-0 gap-2 sm:gap-4">
        {/* Sol Grup: Menü Aç/Kapat, Logo ve SnapMark Başlığı */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className={`p-2 rounded-lg border transition-all flex items-center gap-1.5 text-xs font-medium cursor-pointer ${
                isSidebarOpen
                  ? "bg-[#FF4F00]/10 text-[#FF4F00] border-[#FF4F00]/30 hover:bg-[#FF4F00]/20"
                  : "bg-[#FAF8F5] text-[#57534E] border-[#D6D0C4] hover:bg-[#EAE5DC] hover:text-[#18181B]"
              }`}
              title={isSidebarOpen ? (isEn ? "Hide Menu" : "Menüyü Kapat") : (isEn ? "Open Menu" : "Menüyü Aç")}
            >
              {isSidebarOpen ? (
                <PanelLeftClose className="w-4 h-4" />
              ) : (
                <PanelLeftOpen className="w-4 h-4 text-[#FF4F00]" />
              )}
              <span className="hidden 2xl:inline">
                {isSidebarOpen ? (isEn ? "Menu" : "Menü") : (isEn ? "Open Menu" : "Menüyü Aç")}
              </span>
            </button>
          )}

          <Link
            href="/"
            title={isEn ? "Go to Home / Showcase" : "Ana Sayfa & Vitrin"}
            className="flex items-center gap-2.5 group cursor-pointer hover:opacity-95 transition-opacity"
          >
            <LogoMark size={32} withGlow className="group-hover:scale-105 transition-transform" />

            <div className="flex items-center gap-2">
              <div className="flex items-baseline tracking-tight font-mono text-base font-bold shrink-0">
                <span className="text-[#18181B] group-hover:text-black transition-colors">Snap</span>
                <span className="text-[#FF4F00] group-hover:text-[#EA580C] transition-colors">Mark</span>
              </div>
              <span className="text-[10px] tracking-wider uppercase font-mono font-semibold px-1.5 py-0.5 rounded bg-[#FF4F00]/10 text-[#FF4F00] border border-[#FF4F00]/25">
                PRO 4K
              </span>
            </div>
          </Link>
        </div>

        {/* Orta Grup: Temiz Hızlı Araçlar (Geri/İleri Al, Komut Paleti, Sunum) */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          {/* Geri Al / İleri Al */}
          <div className="flex items-center bg-[#FAF8F5] p-0.5 rounded-xl border border-[#D6D0C4]">
            <button
              type="button"
              onClick={onUndo}
              disabled={!canUndo}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                canUndo
                  ? "text-[#18181B] hover:bg-[#EAE5DC] cursor-pointer"
                  : "text-[#A8A29E] cursor-not-allowed"
              }`}
              title={isEn ? "Undo (Ctrl+Z)" : "Geri Al (Ctrl+Z)"}
            >
              <Undo2 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={onRedo}
              disabled={!canRedo}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                canRedo
                  ? "text-[#18181B] hover:bg-[#EAE5DC] cursor-pointer"
                  : "text-[#A8A29E] cursor-not-allowed"
              }`}
              title={isEn ? "Redo (Ctrl+Y)" : "İleri Al (Ctrl+Y)"}
            >
              <Redo2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Komut Paleti */}
          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#FAF8F5] hover:bg-[#EAE5DC] border border-[#D6D0C4] text-xs text-[#18181B] transition-all cursor-pointer shadow-sm group"
            title={isEn ? "Open Commands (Ctrl+K)" : "Komut Paletini Aç (Ctrl+K)"}
          >
            <Search className="w-3.5 h-3.5 text-[#FF4F00] group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-medium">{isEn ? "Commands" : "Komutlar"}</span>
            <kbd className="text-[9px] font-mono px-1 py-0.5 rounded bg-black/5 border border-black/10 text-[#57534E]">
              Ctrl+K
            </kbd>
          </button>

          {/* Sunum Modu */}
          <button
            type="button"
            onClick={onTogglePresentation}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#FAF8F5] hover:bg-[#EAE5DC] border border-[#D6D0C4] text-xs text-[#18181B] transition-all cursor-pointer"
            title={isEn ? "Presentation Mode (F11)" : "Tam Ekran Sunum Modu (F11)"}
          >
            <Maximize2 className="w-3.5 h-3.5 text-[#FF4F00]" />
            <span className="text-[11px] font-medium">{isEn ? "Present" : "Sunum"}</span>
          </button>
        </div>

        {/* Sağ Grup: Dil Seçici, Çözünürlük, Araçlar Menüsü, Paylaş, Kopyala ve PNG İndir */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* DİL DEĞİŞTİRİCİ (TR / EN) */}
          <div className="flex items-center bg-[#FAF8F5] p-0.5 rounded-xl border border-[#D6D0C4] text-[11px] font-bold shrink-0">
            <button
              type="button"
              onClick={() => onChangeConfig({ uiLanguage: "tr" })}
              className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                config.uiLanguage !== "en"
                  ? "bg-[#FF4F00] text-white shadow-sm font-bold"
                  : "text-[#57534E] hover:text-[#18181B]"
              }`}
              title="Türkçe Dil Seçimi"
            >
              TR
            </button>
            <button
              type="button"
              onClick={() => onChangeConfig({ uiLanguage: "en" })}
              className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                config.uiLanguage === "en"
                  ? "bg-[#FF4F00] text-white shadow-sm font-bold"
                  : "text-[#57534E] hover:text-[#18181B]"
              }`}
              title="Switch to English"
            >
              EN
            </button>
          </div>

          {/* Çözünürlük Çarpanı (1x, 2x Retina, 4x 4K) */}
          <div className="hidden xl:flex items-center bg-[#FAF8F5] p-0.5 rounded-xl border border-[#D6D0C4] text-[11px] font-semibold text-[#57534E]">
            {([1, 2, 4] as const).map((scale) => (
              <button
                key={scale}
                type="button"
                onClick={() => onChangeConfig({ exportScale: scale })}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                  (config.exportScale || 2) === scale
                    ? "bg-[#FF4F00] text-white shadow-sm font-bold"
                    : "hover:text-[#18181B] hover:bg-[#EAE5DC]"
                }`}
                title={
                  scale === 4
                    ? "4x Ultra HD (4K)"
                    : scale === 2
                    ? "2x Retina HD"
                    : "1x Standard"
                }
              >
                {scale}x{scale === 4 ? " 4K" : scale === 2 ? " HD" : ""}
              </button>
            ))}
          </div>

          {/* İkincil Araçlar Açılır Menüsü */}
          <div className="relative" ref={toolsMenuRef}>
            <button
              type="button"
              onClick={() => setIsToolsMenuOpen((prev) => !prev)}
              className={`p-2 rounded-xl border transition-all flex items-center gap-1 text-xs font-semibold cursor-pointer ${
                isToolsMenuOpen
                  ? "bg-[#FF4F00]/15 text-[#FF4F00] border-[#FF4F00]/40"
                  : "bg-[#FAF8F5] text-[#18181B] border-[#D6D0C4] hover:bg-[#EAE5DC]"
              }`}
              title={isEn ? "More Tools" : "Daha Fazla Araç"}
            >
              <MoreHorizontal className="w-4 h-4" />
              <ChevronDown className="w-3 h-3 text-[#57534E]" />
            </button>

            {isToolsMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[#FAF8F5] border border-[#D6D0C4] rounded-2xl shadow-xl p-1.5 z-50 space-y-0.5 animate-in fade-in duration-150">
                {onExportVideo && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsToolsMenuOpen(false);
                      onExportVideo();
                    }}
                    disabled={isVideoExporting || isExporting}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-[#18181B] hover:bg-[#EAE5DC] transition-colors text-left cursor-pointer"
                  >
                    <Video className="w-4 h-4 text-purple-600 shrink-0" />
                    <span className="flex-1 font-medium">{t.exportVideo}</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setIsToolsMenuOpen(false);
                    onDownloadSvg();
                  }}
                  disabled={isExporting}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-[#18181B] hover:bg-[#EAE5DC] transition-colors text-left cursor-pointer"
                >
                  <Download className="w-4 h-4 text-cyan-600 shrink-0" />
                  <span className="flex-1 font-medium">{t.exportSvg}</span>
                </button>

                {onExportCarouselPdf && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsToolsMenuOpen(false);
                      onExportCarouselPdf();
                    }}
                    disabled={isPdfExporting || isExporting}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-[#18181B] hover:bg-[#EAE5DC] transition-colors text-left cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="flex-1 font-medium">
                      {isEn ? "Export PDF (LinkedIn Carousel)" : "PDF İndir (LinkedIn Carousel)"}
                    </span>
                  </button>
                )}

                {onOpenFeedPreview && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsToolsMenuOpen(false);
                      onOpenFeedPreview();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-[#18181B] hover:bg-[#EAE5DC] transition-colors text-left cursor-pointer"
                  >
                    <Smartphone className="w-4 h-4 text-[#FF4F00] shrink-0" />
                    <span className="flex-1 font-medium">{t.feedSimulation}</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setIsToolsMenuOpen(false);
                    setIsImportModalOpen(true);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-[#18181B] hover:bg-[#EAE5DC] transition-colors text-left cursor-pointer"
                >
                  <Github className="w-4 h-4 text-[#FF4F00] shrink-0" />
                  <span className="flex-1 font-medium">GitHub / Gist Import</span>
                </button>

                {onOpenColorPalette && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsToolsMenuOpen(false);
                      onOpenColorPalette();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-[#18181B] hover:bg-[#EAE5DC] transition-colors text-left cursor-pointer"
                  >
                    <Palette className="w-4 h-4 text-[#FF4F00] shrink-0" />
                    <span className="flex-1 font-medium">{isEn ? "Color & Gradient Library" : "Renk & Degrade Kütüphanesi"}</span>
                  </button>
                )}

                <div className="h-px bg-[#D6D0C4] my-1" />

                {onExportThemeJson && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsToolsMenuOpen(false);
                      onExportThemeJson();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-[#18181B] hover:bg-[#EAE5DC] transition-colors text-left cursor-pointer"
                  >
                    <FileDown className="w-4 h-4 text-[#FF4F00] shrink-0" />
                    <span className="flex-1 font-medium">{t.themeDownload}</span>
                  </button>
                )}

                {onImportThemeJson && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsToolsMenuOpen(false);
                      themeFileInputRef.current?.click();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-[#18181B] hover:bg-[#EAE5DC] transition-colors text-left cursor-pointer"
                  >
                    <FileUp className="w-4 h-4 text-[#FF4F00] shrink-0" />
                    <span className="flex-1 font-medium">{t.themeUpload}</span>
                  </button>
                )}

                <Link
                  href="/"
                  onClick={() => setIsToolsMenuOpen(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-[#18181B] hover:bg-[#EAE5DC] transition-colors text-left"
                >
                  <Sparkles className="w-4 h-4 text-[#FF4F00] shrink-0" />
                  <span className="flex-1 font-medium">{isEn ? "Showcase Page" : "Vitrin Sayfası"}</span>
                </Link>

                <div className="h-px bg-[#D6D0C4] my-1" />

                {onOpenShortcuts && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsToolsMenuOpen(false);
                      onOpenShortcuts();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-[#18181B] hover:bg-[#EAE5DC] transition-colors text-left cursor-pointer"
                  >
                    <Keyboard className="w-4 h-4 text-[#FF4F00] shrink-0" />
                    <span className="flex-1 font-medium">{t.shortcuts}</span>
                    <kbd className="text-[10px] font-mono text-[#57534E]">?</kbd>
                  </button>
                )}

                {onResetDefaults && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsToolsMenuOpen(false);
                      if (
                        confirm(
                          isEn
                            ? "Reset all settings to factory defaults?"
                            : "Tüm ayarları fabrika ayarlarına sıfırlamak istediğinize emin misiniz?"
                        )
                      ) {
                        onResetDefaults();
                      }
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4 text-rose-500 shrink-0" />
                    <span className="flex-1 font-medium">{t.resetDefaults}</span>
                  </button>
                )}
              </div>
            )}
          </div>

          <input
            ref={themeFileInputRef}
            type="file"
            accept=".json"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                onImportThemeJson?.(file);
                e.target.value = "";
              }
            }}
            className="hidden"
          />

          {/* Paylaş (Share) */}
          <button
            type="button"
            onClick={handleShare}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all border cursor-pointer ${
              sharedFeedback
                ? "bg-[#FF4F00] text-white border-[#EA580C] shadow-sm"
                : "bg-[#FAF8F5] hover:bg-[#EAE5DC] text-[#18181B] border-[#D6D0C4] shadow-sm"
            }`}
            title={isEn ? "Share link" : "Paylaşım linki kopyala"}
          >
            {sharedFeedback ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span className="hidden sm:inline">{t.copiedFeedback}</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[#FF4F00]" />
                <span className="hidden sm:inline">{t.share}</span>
              </>
            )}
          </button>

          {/* Panoya Kopyala (Copy) */}
          <button
            type="button"
            onClick={onCopyImage}
            disabled={isExporting}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all border cursor-pointer ${
              copied
                ? "bg-[#FF4F00] text-white border-[#EA580C]"
                : "bg-[#FAF8F5] hover:bg-[#EAE5DC] text-[#18181B] border-[#D6D0C4] shadow-sm"
            }`}
            title={t.copyToClipboard}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span className="hidden sm:inline">{t.copiedFeedback}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#57534E]" />
                <span className="hidden sm:inline">{t.copyImage}</span>
              </>
            )}
          </button>

          {/* PNG İndir (Ana Eylem Butonu — Flame Orange CTA) */}
          <button
            type="button"
            onClick={onDownloadImage}
            disabled={isExporting}
            className="px-3 sm:px-4 py-1.5 rounded-lg text-xs font-semibold bg-[#FF4F00] hover:bg-[#EA580C] text-white shadow-md shadow-orange-500/25 border border-orange-500/40 flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shrink-0"
          >
            <Download className="w-3.5 h-3.5 text-white" />
            <span>{t.downloadPng}</span>
            <span className="hidden sm:inline text-[10px] bg-black/15 text-white px-1.5 py-0.5 rounded font-mono font-bold">
              {config.exportScale || 2}x
            </span>
          </button>
        </div>
      </header>

      {/* GitHub / Gist İçe Aktarma Modalı */}
      {isImportModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="import-modal-title"
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div className="bg-[#0f172a] border border-slate-700 rounded-2xl w-full max-w-md p-5 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Github className="w-5 h-5 text-emerald-400" />
                <h3 id="import-modal-title" className="font-bold text-sm text-white">
                  {isEn ? "Import from GitHub / Gist" : "GitHub / Gist'ten Kod Çek"}
                </h3>
              </div>
              <button
                type="button"
                aria-label={isEn ? "Close modal" : "Pencereyi kapat"}
                onClick={() => {
                  setIsImportModalOpen(false);
                  setImportError(null);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300">
                {isEn ? "File or Gist URL:" : "Dosya veya Gist Bağlantısı (URL):"}
              </label>
              <input
                type="text"
                value={importUrl}
                onChange={(e) => setImportUrl(e.target.value)}
                placeholder="https://github.com/user/repo/blob/main/index.ts"
                className="w-full bg-[#131b2a] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
              {importError && (
                <p className="text-rose-400 text-xs">{importError}</p>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsImportModalOpen(false);
                  setImportError(null);
                }}
                className="px-3 py-1.5 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                {isEn ? "Cancel" : "İptal"}
              </button>
              <button
                type="button"
                onClick={handleImportFromGithub}
                disabled={isImporting}
                className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isImporting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>{isEn ? "Importing..." : "Çekiliyor..."}</span>
                  </>
                ) : (
                  <span>{isEn ? "Import" : "İçe Aktar"}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
