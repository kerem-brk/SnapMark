"use client";

import React, { useEffect } from "react";
import { Keyboard, X, Sparkles } from "lucide-react";

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ShortcutItem {
  keys: string[];
  description: string;
  category: "Dışa Aktarma" | "Gezinti & Modlar" | "Düzenleme";
}

const SHORTCUTS: ShortcutItem[] = [
  {
    keys: ["Ctrl", "S"],
    description: "Yüksek çözünürlüklü PNG indir",
    category: "Dışa Aktarma",
  },
  {
    keys: ["Ctrl", "Shift", "C"],
    description: "Görseli doğrudan panoya kopyala",
    category: "Dışa Aktarma",
  },
  {
    keys: ["Ctrl", "Z"],
    description: "Son değişikliği geri al (Undo)",
    category: "Düzenleme",
  },
  {
    keys: ["Ctrl", "Y"],
    description: "Geri alınan değişikliği yinele (Redo)",
    category: "Düzenleme",
  },
  {
    keys: ["Ctrl", "1"],
    description: "Kod Moduna geç",
    category: "Gezinti & Modlar",
  },
  {
    keys: ["Ctrl", "2"],
    description: "Diff (Önce/Sonra) Moduna geç",
    category: "Gezinti & Modlar",
  },
  {
    keys: ["Ctrl", "3"],
    description: "Alıntı (Quote) Moduna geç",
    category: "Gezinti & Modlar",
  },
  {
    keys: ["Ctrl", "4"],
    description: "Tweet (Twitter/X) Moduna geç",
    category: "Gezinti & Modlar",
  },
  {
    keys: ["Ctrl", "5"],
    description: "Terminal (CLI) Moduna geç",
    category: "Gezinti & Modlar",
  },
  {
    keys: ["Ctrl", "K"],
    description: "Komut Paletini aç / hızlı işlem ara",
    category: "Gezinti & Modlar",
  },
  {
    keys: ["F11"],
    description: "Tam ekran sunum modunu aç / kapat",
    category: "Gezinti & Modlar",
  },
  {
    keys: ["Ctrl", "Alt", "← / →"],
    description: "Carousel slaytları arasında geçiş yap",
    category: "Gezinti & Modlar",
  },
  {
    keys: ["?"],
    description: "Klavye kısayolları rehberini aç/kapat",
    category: "Gezinti & Modlar",
  },
];

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
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

  const categories = ["Dışa Aktarma", "Düzenleme", "Gezinti & Modlar"] as const;

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
                Klavye Kısayolları Rehberi
              </h3>
              <p className="text-[11px] text-slate-400">
                SnapMark Pro Studio'da ışık hızında üretim yapın
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
                {SHORTCUTS.filter((s) => s.category === cat).map((shortcut, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs"
                  >
                    <span className="text-slate-300 font-medium">
                      {shortcut.description}
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
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Alt Bilgi */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Kapatmak için ESC tuşuna basabilirsiniz</span>
          </div>
          <span className="font-mono text-[10px] text-indigo-400">SnapMark v2.6</span>
        </div>
      </div>
    </div>
  );
};
