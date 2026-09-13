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
} from "lucide-react";
import { CardConfig } from "@/types";
import { detectLanguageFromFilename } from "@/lib/constants";
import { getT } from "@/lib/i18n";

interface HeaderProps {
  config: CardConfig;
  onChangeConfig: (newConfig: Partial<CardConfig>) => void;
  onCopyImage: () => void;
  onDownloadImage: () => void;
  onDownloadSvg: () => void;
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
}

export const Header: React.FC<HeaderProps> = ({
  config,
  onChangeConfig,
  onCopyImage,
  onDownloadImage,
  onDownloadSvg,
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
      const shareData = {
        title: config.title || "SnapMark Kod Kartı",
        code: config.code,
        language: config.language,
        theme: config.theme,
        padding: config.padding,
        mode: config.mode,
        windowStyle: config.windowStyle,
      };
      const jsonStr = JSON.stringify(shareData);
      const encoded = btoa(encodeURIComponent(jsonStr));
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

    try {
      let rawUrl = importUrl.trim();
      if (rawUrl.includes("github.com") && rawUrl.includes("/blob/")) {
        rawUrl = rawUrl.replace("github.com", "raw.githubusercontent.com").replace("/blob/", "/");
      }
      if (rawUrl.includes("gist.github.com") && !rawUrl.includes("gist.githubusercontent.com")) {
        rawUrl = rawUrl.replace("gist.github.com", "gist.githubusercontent.com") + "/raw";
      }

      const res = await fetch(rawUrl);
      if (!res.ok) throw new Error(isEn ? "Failed to download file (404 or connection error)" : "Dosya indirilemedi (404 veya bağlantı hatası)");
      const fetchedCode = await res.text();

      const filename = rawUrl.split("/").pop()?.split("?")[0] || "snippet.ts";
      const detectedLang = detectLanguageFromFilename(filename);
      const lang = detectedLang || "typescript";

      onChangeConfig({
        code: fetchedCode,
        title: filename,
        language: lang,
        mode: "code",
      });
      setIsImportModalOpen(false);
      setImportUrl("");
    } catch (err: any) {
      setImportError(err.message || (isEn ? "Error fetching code" : "Kod çekilirken hata oluştu"));
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <>
      <header className="h-16 border-b border-slate-800 bg-[#0d131f]/95 backdrop-blur-md px-3 sm:px-6 flex items-center justify-between z-30 sticky top-0 gap-2 sm:gap-4">
        {/* Sol Grup: Menü Aç/Kapat, Logo ve SnapMark Başlığı */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer ${
                isSidebarOpen
                  ? "bg-indigo-600/20 text-indigo-300 border-indigo-500/40 hover:bg-indigo-600/30"
                  : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white"
              }`}
              title={isSidebarOpen ? (isEn ? "Hide Menu" : "Menüyü Kapat") : (isEn ? "Open Menu" : "Menüyü Aç")}
            >
              {isSidebarOpen ? (
                <PanelLeftClose className="w-4 h-4" />
              ) : (
                <PanelLeftOpen className="w-4 h-4 text-indigo-400" />
              )}
              <span className="hidden 2xl:inline">
                {isSidebarOpen ? (isEn ? "Menu" : "Menü") : (isEn ? "Open Menu" : "Menüyü Aç")}
              </span>
            </button>
          )}

          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-500 flex items-center justify-center font-black text-white shadow-lg shadow-pink-500/20 shrink-0">
            <Sparkles className="w-4 h-4 text-white" />
          </div>

          {/* Sadece SnapMark başlığı - Vitrin rozeti silindi! */}
          <div className="flex items-center">
            <h1 className="font-bold text-base tracking-tight text-white shrink-0">SnapMark</h1>
          </div>
        </div>

        {/* Orta Grup: Temiz Hızlı Araçlar (Geri/İleri Al, Komut Paleti, Sunum) */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          {/* Geri Al / İleri Al */}
          <div className="flex items-center bg-slate-900/90 p-0.5 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={onUndo}
              disabled={!canUndo}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                canUndo
                  ? "text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer"
                  : "text-slate-600 cursor-not-allowed"
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
                  ? "text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer"
                  : "text-slate-600 cursor-not-allowed"
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
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 transition-all cursor-pointer shadow-sm group"
            title={isEn ? "Open Commands (Ctrl+K)" : "Komut Paletini Aç (Ctrl+K)"}
          >
            <Search className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-medium">{isEn ? "Commands" : "Komutlar"}</span>
            <kbd className="text-[9px] font-mono px-1 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
              Ctrl+K
            </kbd>
          </button>

          {/* Sunum Modu */}
          <button
            type="button"
            onClick={onTogglePresentation}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 hover:text-white transition-all cursor-pointer"
            title={isEn ? "Presentation Mode (F11)" : "Tam Ekran Sunum Modu (F11)"}
          >
            <Maximize2 className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-[11px] font-medium">{isEn ? "Present" : "Sunum"}</span>
          </button>
        </div>

        {/* Sağ Grup: Dil Seçici, Çözünürlük, Araçlar Menüsü, Paylaş, Kopyala ve PNG İndir */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* DİL DEĞİŞTİRİCİ (TR / EN) - Süper Net ve Her Zaman Görünür */}
          <div className="flex items-center bg-slate-900/90 p-0.5 rounded-xl border border-slate-800 text-[11px] font-bold shrink-0">
            <button
              type="button"
              onClick={() => onChangeConfig({ uiLanguage: "tr" })}
              className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                config.uiLanguage !== "en"
                  ? "bg-indigo-600 text-white shadow-sm font-bold"
                  : "text-slate-400 hover:text-white"
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
                  ? "bg-indigo-600 text-white shadow-sm font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
              title="Switch to English"
            >
              EN
            </button>
          </div>

          {/* Çözünürlük Çarpanı (1x, 2x Retina, 4x 4K) - xl+ ekranlarda */}
          <div className="hidden xl:flex items-center bg-slate-900/90 p-0.5 rounded-xl border border-slate-800 text-[11px] font-semibold text-slate-400">
            {([1, 2, 4] as const).map((scale) => (
              <button
                key={scale}
                type="button"
                onClick={() => onChangeConfig({ exportScale: scale })}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                  (config.exportScale || 2) === scale
                    ? "bg-indigo-600 text-white shadow-sm font-bold"
                    : "hover:text-slate-200"
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

          {/* İkincil Araçlar Açılır Menüsü (Sıkışmayı Önleyen Dropdown) */}
          <div className="relative" ref={toolsMenuRef}>
            <button
              type="button"
              onClick={() => setIsToolsMenuOpen((prev) => !prev)}
              className={`p-2 rounded-xl border transition-all flex items-center gap-1 text-xs font-semibold cursor-pointer ${
                isToolsMenuOpen
                  ? "bg-indigo-600/20 text-indigo-300 border-indigo-500/50"
                  : "bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white"
              }`}
              title={isEn ? "More Tools" : "Daha Fazla Araç"}
            >
              <MoreHorizontal className="w-4 h-4" />
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isToolsMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[#0e1424] border border-slate-700/80 rounded-2xl shadow-2xl p-1.5 z-50 space-y-0.5 animate-in fade-in duration-150">
                {onExportVideo && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsToolsMenuOpen(false);
                      onExportVideo();
                    }}
                    disabled={isVideoExporting || isExporting}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-200 hover:bg-slate-800 transition-colors text-left cursor-pointer"
                  >
                    <Video className="w-4 h-4 text-purple-400 shrink-0" />
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
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-200 hover:bg-slate-800 transition-colors text-left cursor-pointer"
                >
                  <Download className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="flex-1 font-medium">{t.exportSvg}</span>
                </button>

                {onOpenFeedPreview && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsToolsMenuOpen(false);
                      onOpenFeedPreview();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-200 hover:bg-slate-800 transition-colors text-left cursor-pointer"
                  >
                    <Smartphone className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="flex-1 font-medium">{t.feedSimulation}</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setIsToolsMenuOpen(false);
                    setIsImportModalOpen(true);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-200 hover:bg-slate-800 transition-colors text-left cursor-pointer"
                >
                  <Github className="w-4 h-4 text-slate-300 shrink-0" />
                  <span className="flex-1 font-medium">GitHub / Gist Import</span>
                </button>

                <div className="h-px bg-slate-800 my-1" />

                {onExportThemeJson && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsToolsMenuOpen(false);
                      onExportThemeJson();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-200 hover:bg-slate-800 transition-colors text-left cursor-pointer"
                  >
                    <FileDown className="w-4 h-4 text-amber-400 shrink-0" />
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
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-200 hover:bg-slate-800 transition-colors text-left cursor-pointer"
                  >
                    <FileUp className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="flex-1 font-medium">{t.themeUpload}</span>
                  </button>
                )}

                <Link
                  href="/landing"
                  onClick={() => setIsToolsMenuOpen(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-200 hover:bg-slate-800 transition-colors text-left"
                >
                  <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span className="flex-1 font-medium">{isEn ? "Showcase Page" : "Vitrin Sayfası"}</span>
                </Link>

                <div className="h-px bg-slate-800 my-1" />

                {onOpenShortcuts && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsToolsMenuOpen(false);
                      onOpenShortcuts();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-200 hover:bg-slate-800 transition-colors text-left cursor-pointer"
                  >
                    <Keyboard className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span className="flex-1 font-medium">{t.shortcuts}</span>
                    <kbd className="text-[10px] font-mono text-slate-400">?</kbd>
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
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-rose-300 hover:bg-rose-950/40 transition-colors text-left cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4 text-rose-400 shrink-0" />
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
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border cursor-pointer ${
              sharedFeedback
                ? "bg-emerald-600 text-white border-emerald-500 shadow-sm"
                : "bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700 shadow-sm"
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
                <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">{t.share}</span>
              </>
            )}
          </button>

          {/* Panoya Kopyala (Copy) */}
          <button
            type="button"
            onClick={onCopyImage}
            disabled={isExporting}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border cursor-pointer ${
              copied
                ? "bg-emerald-600 text-white border-emerald-500"
                : "bg-slate-800/90 hover:bg-slate-700 text-slate-200 border-slate-700 hover:border-slate-600 shadow-sm"
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
                <Copy className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden sm:inline">{t.copyImage}</span>
              </>
            )}
          </button>

          {/* PNG İndir (Ana Eylem Butonu) */}
          <button
            type="button"
            onClick={onDownloadImage}
            disabled={isExporting}
            className="px-3 sm:px-4 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-400 hover:to-indigo-500 text-white shadow-lg shadow-pink-500/20 flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t.downloadPng}</span>
            <span className="hidden sm:inline text-[10px] bg-black/30 px-1.5 py-0.5 rounded font-mono">
              {config.exportScale || 2}x
            </span>
          </button>
        </div>
      </header>

      {/* GitHub / Gist İçe Aktarma Modalı */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#0f172a] border border-slate-700 rounded-2xl w-full max-w-md p-5 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Github className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-sm text-white">{isEn ? "Import from GitHub / Gist" : "GitHub / Gist'ten Kod Çek"}</h3>
              </div>
              <button
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
                className="w-full bg-[#131b2a] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
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
                className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
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
