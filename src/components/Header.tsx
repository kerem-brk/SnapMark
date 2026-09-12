"use client";

import React, { useState, useRef } from "react";
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
  const t = getT(config.uiLanguage);
  const [sharedFeedback, setSharedFeedback] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const themeFileInputRef = useRef<HTMLInputElement>(null);
  const [importUrl, setImportUrl] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

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
      setImportError("Lütfen geçerli bir GitHub veya Gist URL'si girin.");
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
      if (!res.ok) throw new Error("Dosya indirilemedi (404 veya bağlantı hatası)");
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
      setImportError(err.message || "Kod çekilirken hata oluştu");
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <>
      <header className="h-16 border-b border-slate-800 bg-[#0d131f]/95 backdrop-blur-md px-4 md:px-6 flex items-center justify-between z-30 sticky top-0 gap-3">
        {/* Sol Grup: Menü Aç/Kapat, Logo, İsim ve Vitrin Rozeti */}
        <div className="flex items-center space-x-3 shrink-0">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer ${
                isSidebarOpen
                  ? "bg-indigo-600/20 text-indigo-300 border-indigo-500/40 hover:bg-indigo-600/30"
                  : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white"
              }`}
              title={isSidebarOpen ? "Menüyü Kapat" : "Menüyü Aç"}
            >
              {isSidebarOpen ? (
                <PanelLeftClose className="w-4 h-4" />
              ) : (
                <PanelLeftOpen className="w-4 h-4 text-indigo-400" />
              )}
              <span className="hidden xl:inline">
                {isSidebarOpen ? "Menü" : "Menüyü Aç"}
              </span>
            </button>
          )}

          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-500 flex items-center justify-center font-black text-white shadow-lg shadow-pink-500/20 shrink-0">
            <Sparkles className="w-4 h-4 text-white" />
          </div>

          <div className="flex items-center gap-2">
            <h1 className="font-bold text-base tracking-tight text-white shrink-0">SnapMark</h1>
            <Link
              href="/landing"
              className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-indigo-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-500/10 flex items-center gap-1.5 hover:border-emerald-400 hover:text-emerald-200 transition-colors shrink-0"
              title="Vitrin & Tanıtım Sayfasını Aç"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Vitrin</span>
            </Link>
          </div>
        </div>

        {/* Orta Grup: Hızlı Stüdyo Araçları (Geri/İleri Al, Komut Paleti, Sunum) */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Geri Al / İleri Al */}
          <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={onUndo}
              disabled={!canUndo}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                canUndo
                  ? "text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer"
                  : "text-slate-600 cursor-not-allowed"
              }`}
              title="Geri Al (Ctrl+Z)"
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
              title="İleri Al (Ctrl+Y)"
            >
              <Redo2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Komut Paleti Butonu */}
          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 transition-all cursor-pointer shadow-sm group"
            title="Komut Paletini Aç (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-medium">Komutlar</span>
            <kbd className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
              Ctrl+K
            </kbd>
          </button>

          {/* Sunum / Tam Ekran Modu */}
          <button
            type="button"
            onClick={onTogglePresentation}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Tam Ekran Sunum Modu (F11)"
          >
            <Maximize2 className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-[11px] font-medium">Sunum</span>
          </button>

          {/* Sosyal Medya Canlı Akış Simülasyonu */}
          {onOpenFeedPreview && (
            <button
              type="button"
              onClick={onOpenFeedPreview}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-xs text-slate-300 hover:text-white transition-all cursor-pointer group shadow-sm active:scale-95"
              title={t.feedSimulation}
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-medium">{t.feedSimulation}</span>
            </button>
          )}

          {/* Dil Değiştirici (TR / EN) */}
          <button
            type="button"
            onClick={() =>
              onChangeConfig({
                uiLanguage: config.uiLanguage === "en" ? "tr" : "en",
              })
            }
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/40 text-xs font-semibold text-slate-200 hover:text-white transition-all cursor-pointer shadow-sm active:scale-95"
            title={config.uiLanguage === "en" ? "Türkçe diline geç" : "Switch to English"}
          >
            <Languages className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-[11px] uppercase tracking-wider font-bold">
              {config.uiLanguage === "en" ? "EN" : "TR"}
            </span>
          </button>
        </div>

        {/* Sağ Grup: Çözünürlük, Tema Paylaşımı, GitHub, Paylaş & İndir */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Çözünürlük Çarpanı (1x, 2x Retina, 4x Ultra HD) */}
          <div className="hidden sm:flex items-center bg-slate-900/90 p-0.5 rounded-xl border border-slate-800 text-[11px] font-semibold text-slate-400">
            {([1, 2, 4] as const).map((scale) => (
              <button
                key={scale}
                type="button"
                onClick={() => onChangeConfig({ exportScale: scale })}
                className={`px-2 py-1 rounded-lg transition-all ${
                  (config.exportScale || 2) === scale
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "hover:text-slate-200"
                }`}
                title={
                  scale === 4
                    ? "4x Ultra HD / 4K Keskinlik"
                    : scale === 2
                    ? "2x Retina HD Çıktı"
                    : "1x Standart Web Çıktısı"
                }
              >
                {scale}x{scale === 4 ? " 4K" : scale === 2 ? " HD" : ""}
              </button>
            ))}
          </div>

          {/* Tema JSON İçe / Dışa Aktar Butonları */}
          <div className="hidden xl:flex items-center bg-slate-900/90 p-0.5 rounded-xl border border-slate-800 text-xs">
            <button
              type="button"
              onClick={onExportThemeJson}
              className="p-1.5 rounded-lg text-slate-400 hover:text-amber-300 hover:bg-slate-800 transition-colors cursor-pointer"
              title="Tüm ayarları JSON teması olarak indir"
            >
              <FileDown className="w-3.5 h-3.5 text-amber-400" />
            </button>
            <button
              type="button"
              onClick={() => themeFileInputRef.current?.click()}
              className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-300 hover:bg-slate-800 transition-colors cursor-pointer"
              title="JSON teması yükle"
            >
              <FileUp className="w-3.5 h-3.5 text-emerald-400" />
            </button>
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

          {/* GitHub İçe Aktar Butonu */}
          <button
            type="button"
            onClick={() => setIsImportModalOpen(true)}
            className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition-all cursor-pointer"
            title="GitHub dosya veya Gist linkinden kod çek"
          >
            <Github className="w-3.5 h-3.5 text-slate-300" />
            <span className="hidden 2xl:inline">GitHub</span>
          </button>

          {/* Paylaş (Link Kopyala) Butonu */}
          <button
            type="button"
            onClick={handleShare}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border cursor-pointer ${
              sharedFeedback
                ? "bg-emerald-600 text-white border-emerald-500 shadow-sm"
                : "bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700 shadow-sm"
            }`}
            title="Bu kartın açılabilir bağlantısını kopyala"
          >
            {sharedFeedback ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>{t.copiedFeedback}</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t.share}</span>
              </>
            )}
          </button>

          {/* Video İndir (WebM) */}
          {onExportVideo && (
            <button
              type="button"
              onClick={onExportVideo}
              disabled={isVideoExporting || isExporting}
              className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all border shadow-sm cursor-pointer active:scale-95 ${
                isVideoExporting
                  ? "bg-purple-950/80 border-purple-500/50 text-purple-200"
                  : "bg-purple-900/30 hover:bg-purple-900/50 text-purple-200 hover:text-white border-purple-500/40"
              }`}
              title="WebM Canlı Video Olarak İndir"
            >
              {isVideoExporting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-300" />
                  <span>{config.uiLanguage === "en" ? "Recording..." : "Kaydediliyor..."}</span>
                </>
              ) : (
                <>
                  <Video className="w-3.5 h-3.5 text-purple-400" />
                  <span>{t.exportVideo}</span>
                </>
              )}
            </button>
          )}

          {/* SVG İndir */}
          <button
            type="button"
            onClick={onDownloadSvg}
            disabled={isExporting}
            className="hidden sm:flex px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 shadow-sm items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            title="Vektörel SVG Çıktısı Al"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.exportSvg}</span>
          </button>

          {/* Panoya Kopyala */}
          <button
            type="button"
            onClick={onCopyImage}
            disabled={isExporting}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border cursor-pointer ${
              copied
                ? "bg-emerald-600 text-white border-emerald-500"
                : "bg-slate-800/90 hover:bg-slate-700 text-slate-200 border-slate-700 hover:border-slate-600 shadow-sm"
            }`}
            title={t.copyToClipboard}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>{t.copiedFeedback}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-indigo-400" />
                <span>{t.copyToClipboard}</span>
              </>
            )}
          </button>

          {/* PNG İndir (Ana Eylem Butonu) */}
          <button
            type="button"
            onClick={onDownloadImage}
            disabled={isExporting}
            className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-400 hover:to-indigo-500 text-white shadow-lg shadow-pink-500/20 flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t.downloadPng}</span>
            <span className="text-[10px] bg-black/30 px-1.5 py-0.5 rounded font-mono">
              {config.exportScale || 2}x
            </span>
          </button>

          {/* Klavye Kısayolları Rehberi Butonu */}
          {onOpenShortcuts && (
            <button
              type="button"
              onClick={onOpenShortcuts}
              className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 transition-all cursor-pointer hidden md:flex items-center justify-center"
              title="Klavye Kısayolları (?)"
            >
              <Keyboard className="w-3.5 h-3.5 text-indigo-400" />
            </button>
          )}

          {/* Fabrika Ayarlarına Sıfırla */}
          {onResetDefaults && (
            <button
              type="button"
              onClick={() => {
                if (confirm("Tüm ayarları ve kodu sıfırlayıp fabrika ayarlarına dönmek istediğinize emin misiniz?")) {
                  onResetDefaults();
                }
              }}
              className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-700/80 hover:border-rose-500/40 transition-all cursor-pointer hidden xl:flex items-center justify-center"
              title="Fabrika Ayarlarına Sıfırla"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </header>

      {/* GitHub / Gist İçe Aktarma Modalı */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#0f172a] border border-slate-700 rounded-2xl w-full max-w-md p-5 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Github className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-sm text-white">GitHub / Gist'ten Kod Çek</h3>
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
                Dosya veya Gist Bağlantısı (URL):
              </label>
              <input
                type="text"
                value={importUrl}
                onChange={(e) => setImportUrl(e.target.value)}
                placeholder="https://github.com/user/repo/blob/main/index.ts"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleImportFromGithub();
                }}
                className="w-full bg-[#0a0e1a] border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-500 font-mono focus:outline-none focus:border-indigo-500"
              />
              <p className="text-[10px] text-slate-400">
                💡 İpucu: Herhangi bir GitHub dosya linkini veya Gist linkini doğrudan yapıştırabilirsiniz.
              </p>
            </div>

            {importError && (
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
                {importError}
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setIsImportModalOpen(false);
                  setImportError(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                İptal
              </button>
              <button
                type="button"
                onClick={handleImportFromGithub}
                disabled={isImporting}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md shadow-indigo-600/30 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isImporting ? "Çekiliyor..." : "Kodu Yükle"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
