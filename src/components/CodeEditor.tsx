"use client";
import React, { useRef, useState, useMemo } from "react";
import { CardConfig } from "@/types";
import { FileCode, Plus, Wand2, GitCompare, MessageSquare, Quote, Terminal } from "lucide-react";
import { getT } from "@/lib/i18n";

interface CodeEditorProps {
  config: CardConfig;
  onChange: (code: string, field?: "code" | "tweetContent" | "quoteContent" | "diffBeforeCode" | "diffAfterCode" | "terminalOutput") => void;
  onSelectTab?: (tabId: string) => void;
  onAddTab?: () => void;
  onCloseTab?: (tabId: string) => void;
  onRenameTab?: (tabId: string, newName: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  config,
  onChange,
  onSelectTab,
  onAddTab,
  onCloseTab,
  onRenameTab,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [diffSubTab, setDiffSubTab] = useState<"before" | "after">("after");

  const isEn = config.uiLanguage === "en";
  const t = getT(config.uiLanguage);

  // Modlara göre editörde görüntülenecek ve düzenlenecek asıl metin
  const currentText = useMemo(() => {
    switch (config.mode) {
      case "tweet":
        return config.tweetContent !== undefined ? config.tweetContent : config.code;
      case "quote":
        return config.quoteContent !== undefined ? config.quoteContent : config.code;
      case "diff":
        return diffSubTab === "before"
          ? (config.diffBeforeCode || "")
          : (config.diffAfterCode || "");
      case "terminal":
        return config.terminalOutput !== undefined ? config.terminalOutput : config.code;
      case "code":
      default:
        return config.code;
    }
  }, [config.mode, config.tweetContent, config.quoteContent, config.diffBeforeCode, config.diffAfterCode, config.terminalOutput, config.code, diffSubTab]);

  const handleTextChange = (newVal: string) => {
    switch (config.mode) {
      case "tweet":
        onChange(newVal, "tweetContent");
        break;
      case "quote":
        onChange(newVal, "quoteContent");
        break;
      case "diff":
        onChange(newVal, diffSubTab === "before" ? "diffBeforeCode" : "diffAfterCode");
        break;
      case "terminal":
        onChange(newVal, "terminalOutput");
        break;
      case "code":
      default:
        onChange(newVal, "code");
        break;
    }
  };

  const handleFormatCode = () => {
    const formatted = currentText
      .split("\n")
      .map((line) => line.trimEnd())
      .join("\n")
      .trim();
    handleTextChange(formatted);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Esc tuşu textarea'dan odağı kaldırır (Klavye tuzağını önler - WCAG 2.1.2)
    if (e.key === "Escape") {
      textareaRef.current?.blur();
      return;
    }

    // Tab tuşuna basıldığında odak kaybolmasın, 2 boşluk girinti eklesin
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const val = textarea.value;

      const updated = val.substring(0, start) + "  " + val.substring(end);
      handleTextChange(updated);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  const lineCount = (currentText || "").split("\n").length;

  const modeIcon = useMemo(() => {
    switch (config.mode) {
      case "tweet":
        return <MessageSquare className="w-4 h-4 text-[#FF4F00]" />;
      case "quote":
        return <Quote className="w-4 h-4 text-[#FF4F00]" />;
      case "diff":
        return <GitCompare className="w-4 h-4 text-[#FF4F00]" />;
      case "terminal":
        return <Terminal className="w-4 h-4 text-[#FF4F00]" />;
      case "code":
      default:
        return <FileCode className="w-4 h-4 text-[#FF4F00]" />;
    }
  }, [config.mode]);

  const modeTitle = useMemo(() => {
    switch (config.mode) {
      case "tweet":
        return isEn ? "Tweet / X Content Editor" : "Tweet / X Gönderi Metni Editörü";
      case "quote":
        return isEn ? "Quote & Note Editor" : "Alıntı & Vecize Metni Editörü";
      case "diff":
        return isEn ? "Git Diff Code Editor" : "Git Diff Kod Karşılaştırma Editörü";
      case "terminal":
        return isEn ? "Terminal Output Editor" : "Terminal Konsol Çıktısı Editörü";
      case "code":
      default:
        return t.editorTitleCode;
    }
  }, [config.mode, isEn, t.editorTitleCode]);

  const placeholderText = useMemo(() => {
    switch (config.mode) {
      case "tweet":
        return isEn ? "Write your tweet / post content here..." : "Buraya paylaşılacak tweet veya gönderi metnini yazın...";
      case "quote":
        return t.placeholderQuote;
      case "diff":
        return diffSubTab === "before"
          ? (isEn ? "Paste 'Before' (original/buggy) code here..." : "Buraya 'Önce' (eski/hatalı) kod bloğunu yapıştırın...")
          : (isEn ? "Paste 'After' (refactored/clean) code here..." : "Buraya 'Sonra' (temiz/refactor edilmiş) kod bloğunu yapıştırın...");
      case "terminal":
        return isEn ? "Enter terminal console output lines here..." : "Buraya terminal konsol satırlarını yazın...";
      case "code":
      default:
        return t.placeholderCode;
    }
  }, [config.mode, diffSubTab, isEn, t.placeholderCode, t.placeholderQuote]);

  return (
    <div className="bg-[#FAF8F5] border border-[#D6D0C4] rounded-2xl p-4 flex flex-col space-y-3 shadow-md">
      <div className="flex items-center justify-between border-b border-[#D6D0C4] pb-2.5">
        <div className="flex items-center space-x-2 text-xs font-semibold text-[#18181B]">
          {modeIcon}
          <span>{modeTitle}</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-[#57534E] font-mono">
          <span>{lineCount} {t.lineLabel}</span>
          <span>{(currentText || "").length} {t.charLabel}</span>
        </div>
      </div>

      {/* Diff Modu İçin Alt Sekmeler: Önce / Sonra */}
      {config.mode === "diff" && (
        <div className="flex items-center gap-2 pb-1 border-b border-[#D6D0C4]">
          <button
            type="button"
            onClick={() => setDiffSubTab("before")}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              diffSubTab === "before"
                ? "bg-rose-500/15 text-rose-600 border border-rose-500/30 shadow-sm"
                : "bg-[#F4F1EA] text-[#57534E] border border-[#D6D0C4] hover:text-[#18181B]"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>{isEn ? "Before Code (Old / Buggy)" : "Önce (Eski / Hatalı Kod)"}</span>
          </button>
          <button
            type="button"
            onClick={() => setDiffSubTab("after")}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              diffSubTab === "after"
                ? "bg-emerald-500/15 text-emerald-600 border border-emerald-500/30 shadow-sm"
                : "bg-[#F4F1EA] text-[#57534E] border border-[#D6D0C4] hover:text-[#18181B]"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>{isEn ? "After Code (New / Clean)" : "Sonra (Yeni / Temiz Kod)"}</span>
          </button>
        </div>
      )}

      {/* Çoklu Dosya Sekmeleri (Editör Üstü Hızlı Geçiş & İsim Düzenleme) */}
      {config.mode === "code" && config.tabs && config.tabs.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-[#D6D0C4]">
          {config.tabs.map((tab) => {
            const isActive = tab.id === config.activeTabId;
            return (
              <div
                key={tab.id}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    onSelectTab?.(tab.id);
                  }
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#FF4F00]/10 text-[#FF4F00] border border-[#FF4F00]/30 shadow-sm font-semibold"
                    : "bg-[#F4F1EA] text-[#57534E] border border-[#D6D0C4] hover:text-[#18181B]"
                }`}
                onClick={() => onSelectTab?.(tab.id)}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isActive ? "bg-[#FF4F00] shadow-sm shadow-orange-500/50" : "bg-stone-400"
                  }`}
                />
                <input
                  type="text"
                  value={tab.name}
                  onChange={(e) => onRenameTab?.(tab.id, e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-transparent text-inherit font-mono text-xs outline-none w-24 sm:w-28 focus:border-b focus:border-[#FF4F00]"
                  title={isEn ? "Click to rename file" : "Dosya adını düzenlemek için tıkla"}
                />
                {config.tabs.length > 1 && onCloseTab && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onCloseTab(tab.id);
                    }}
                    className="text-stone-400 hover:text-rose-500 ml-1 text-xs cursor-pointer"
                    title={isEn ? "Delete Tab" : "Sekmeyi Sil"}
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
              className="px-2 py-1 rounded-lg text-xs font-medium bg-[#F4F1EA] hover:bg-[#EAE5DC] text-[#18181B] border border-[#D6D0C4] flex items-center gap-1 transition-colors shrink-0 cursor-pointer"
              title={t.newTab}
            >
              <Plus className="w-3 h-3 text-[#FF4F00]" />
              <span className="hidden sm:inline">{t.newTab}</span>
            </button>
          )}
        </div>
      )}

      <div className="relative">
        <textarea
          ref={textareaRef}
          value={currentText}
          onChange={(e) => handleTextChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholderText}
          rows={10}
          className="w-full bg-[#18181B] text-[#F4F1EA] font-mono text-xs p-3.5 rounded-xl border border-[#D6D0C4] focus:border-[#FF4F00] focus:ring-1 focus:ring-[#FF4F00] outline-none leading-relaxed resize-y selection:bg-[#FF4F00] selection:text-white"
          spellCheck={false}
        />
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
        <span className="flex items-center gap-1.5 flex-wrap">
          <span className="inline-flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-stone-200 border border-stone-300 text-[10px] text-stone-700 font-mono">Tab</kbd>
            <span className="text-stone-600">{t.tabIndentTip}</span>
          </span>
          <span className="text-stone-300">|</span>
          <span className="inline-flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-stone-200 border border-stone-300 text-[10px] text-stone-700 font-mono">Esc</kbd>
            <span className="text-stone-600">{isEn ? "Release focus" : "Odağı bırak"}</span>
          </span>
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleFormatCode}
            className="text-stone-600 hover:text-stone-900 flex items-center gap-1 transition-all cursor-pointer font-medium"
            title={isEn ? "Trim & format whitespace" : "Boşlukları temizle ve hizala"}
          >
            <Wand2 className="w-3 h-3 text-[#FF4F00]" />
            <span>{isEn ? "Format Whitespace" : "Boşlukları Düzenle"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
