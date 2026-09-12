"use client";

import React, { useEffect } from "react";
import { Keyboard, X, Sparkles } from "lucide-react";
import { UiLanguage } from "@/types";

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
  uiLanguage?: UiLanguage;
}

interface ShortcutItem {
  keys: string[];
  descriptionTr: string;
  descriptionEn: string;
  categoryTr: string;
  categoryEn: string;
}

const SHORTCUTS: ShortcutItem[] = [
  {
    keys: ["Ctrl", "S"],
    descriptionTr: "Yüksek çözünürlüklü PNG indir",
    descriptionEn: "Download high-resolution PNG",
    categoryTr: "Dışa Aktarma",
    categoryEn: "Export",
  },
  {
    keys: ["Ctrl", "Shift", "C"],
    descriptionTr: "Görseli doğrudan panoya kopyala",
    descriptionEn: "Copy image directly to clipboard",
    categoryTr: "Dışa Aktarma",
    categoryEn: "Export",
  },
  {
    keys: ["Ctrl", "Z"],
    descriptionTr: "Son değişikliği geri al (Undo)",
    descriptionEn: "Undo last change",
    categoryTr: "Düzenleme",
    categoryEn: "Editing",
  },
  {
    keys: ["Ctrl", "Y"],
    descriptionTr: "Geri alınan değişikliği yinele (Redo)",
    descriptionEn: "Redo last undone change",
    categoryTr: "Düzenleme",
    categoryEn: "Editing",
  },
  {
    keys: ["Ctrl", "1"],
    descriptionTr: "Kod Moduna geç",
    descriptionEn: "Switch to Code Mode",
    categoryTr: "Gezinti & Modlar",
    categoryEn: "Navigation & Modes",
  },
  {
    keys: ["Ctrl", "2"],
    descriptionTr: "Diff (Önce/Sonra) Moduna geç",
    descriptionEn: "Switch to Diff Mode",
    categoryTr: "Gezinti & Modlar",
    categoryEn: "Navigation & Modes",
  },
  {
    keys: ["Ctrl", "3"],
    descriptionTr: "Alıntı (Quote) Moduna geç",
    descriptionEn: "Switch to Quote Mode",
    categoryTr: "Gezinti & Modlar",
    categoryEn: "Navigation & Modes",
  },
  {
    keys: ["Ctrl", "4"],
    descriptionTr: "Tweet (Twitter/X) Moduna geç",
    descriptionEn: "Switch to Tweet Mode",
    categoryTr: "Gezinti & Modlar",
    categoryEn: "Navigation & Modes",
  },
  {
    keys: ["Ctrl", "5"],
    descriptionTr: "Terminal (CLI) Moduna geç",
    descriptionEn: "Switch to Terminal Mode",
    categoryTr: "Gezinti & Modlar",
    categoryEn: "Navigation & Modes",
  },
  {
    keys: ["Ctrl", "K"],
    descriptionTr: "Komut Paletini aç / hızlı işlem ara",
    descriptionEn: "Open Command Palette / quick actions",
    categoryTr: "Gezinti & Modlar",
    categoryEn: "Navigation & Modes",
  },
  {
    keys: ["F11"],
    descriptionTr: "Tam ekran sunum modunu aç / kapat",
    descriptionEn: "Toggle full-screen presentation mode",
    categoryTr: "Gezinti & Modlar",
    categoryEn: "Navigation & Modes",
  },
  {
    keys: ["Ctrl", "Alt", "← / →"],
    descriptionTr: "Carousel slaytları arasında geçiş yap",
    descriptionEn: "Navigate between carousel slides",
    categoryTr: "Gezinti & Modlar",
    categoryEn: "Navigation & Modes",
  },
  {
    keys: ["?"],
    descriptionTr: "Klavye kısayolları rehberini aç/kapat",
    descriptionEn: "Toggle keyboard shortcuts guide",
    categoryTr: "Gezinti & Modlar",
    categoryEn: "Navigation & Modes",
  },
];

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({
  isOpen,
  onClose,
  uiLanguage = "tr",
}) => {
  const isEn = uiLanguage === "en";

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories = isEn
    ? ["Export", "Editing", "Navigation & Modes"]
    : ["Dışa Aktarma", "Düzenleme", "Gezinti & Modlar"];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#0f172a] border border-slate-700/80 rounded-2xl p-5 shadow-2xl shadow-black/80 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Başlık */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Keyboard className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                {isEn ? "Keyboard Shortcuts Guide" : "Klavye Kısayolları Rehberi"}
              </h3>
              <p className="text-[11px] text-slate-400">
                {isEn
                  ? "Produce at lightspeed in SnapMark Pro Studio"
                  : "SnapMark Pro Studio'da ışık hızında üretim yapın"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Kısayol Listeleri (Kategori Kategori) */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-700">
          {categories.map((cat) => (
            <div key={cat} className="space-y-2">
              <h4 className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                {cat}
              </h4>
              <div className="space-y-1.5">
                {SHORTCUTS.filter((s) => (isEn ? s.categoryEn : s.categoryTr) === cat).map(
                  (shortcut, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs"
                    >
                      <span className="text-slate-300 font-medium">
                        {isEn ? shortcut.descriptionEn : shortcut.descriptionTr}
                      </span>
                      <div className="flex items-center gap-1">
                        {shortcut.keys.map((k, kIdx) => (
                          <kbd
                            key={kIdx}
                            className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-slate-200 text-[10px] font-mono shadow-sm"
                          >
                            {k}
                          </kbd>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Alt Bilgi */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>{isEn ? "Press ESC to close" : "Kapatmak için ESC tuşuna basabilirsiniz"}</span>
          </div>
          <span className="font-mono text-[10px] text-indigo-400">SnapMark v2.6</span>
        </div>
      </div>
    </div>
  );
};
