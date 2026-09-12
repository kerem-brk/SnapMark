"use client";

import React, { useRef } from "react";
import { CardConfig } from "@/types";
import { FileCode, Sparkles, Plus, Wand2 } from "lucide-react";

interface CodeEditorProps {
  config: CardConfig;
  onChange: (code: string) => void;
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

  const handleFormatCode = () => {
    const formatted = config.code
      .split("\n")
      .map((line) => line.trimEnd())
      .join("\n")
      .trim();
    onChange(formatted);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Tab tuşuna basıldığında odak kaybolmasın, 2 boşluk girinti eklesin
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const val = textarea.value;

      const updated = val.substring(0, start) + "  " + val.substring(end);
      onChange(updated);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  const lineCount = config.code.split("\n").length;

  return (
    <div className="bg-[#0f1523] border border-slate-800 rounded-2xl p-4 flex flex-col space-y-3 shadow-lg">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300">
          <FileCode className="w-4 h-4 text-indigo-400" />
          <span>{config.mode === "code" ? "Kod Giriş Editörü" : "Alıntı & Metin Editörü"}</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono">
          <span>{lineCount} satır</span>
          <span>{config.code.length} karakter</span>
        </div>
      </div>

      {/* Çoklu Dosya Sekmeleri (Editör Üstü Hızlı Geçiş & İsim Düzenleme) */}
      {config.mode === "code" && config.tabs && config.tabs.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-800/60">
          {config.tabs.map((tab) => {
            const isActive = tab.id === config.activeTabId;
            return (
              <div
                key={tab.id}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  isActive
                    ? "bg-indigo-600/25 text-indigo-200 border border-indigo-500/40 shadow-sm"
                    : "bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-slate-200"
                }`}
                onClick={() => onSelectTab?.(tab.id)}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isActive ? "bg-indigo-400 shadow-sm shadow-indigo-400/50" : "bg-slate-500"
                  }`}
                />
                <input
                  type="text"
                  value={tab.name}
                  onChange={(e) => onRenameTab?.(tab.id, e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-transparent text-inherit font-mono text-xs outline-none w-24 sm:w-28 focus:border-b focus:border-indigo-400"
                  title="Dosya adını düzenlemek için tıkla"
                />
                {config.tabs.length > 1 && onCloseTab && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onCloseTab(tab.id);
                    }}
                    className="text-slate-500 hover:text-rose-400 ml-1 text-xs"
                    title="Sekmeyi Sil"
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
              className="px-2 py-1 rounded-lg text-xs font-medium bg-slate-800/70 hover:bg-slate-700 text-slate-300 border border-slate-700/50 flex items-center gap-1 transition-colors shrink-0"
              title="Yeni Dosya Sekmesi Ekle"
            >
              <Plus className="w-3 h-3 text-indigo-400" />
              <span className="hidden sm:inline">Yeni Sekme</span>
            </button>
          )}
        </div>
      )}

      <div className="relative">
        <textarea
          ref={textareaRef}
          value={config.code}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            config.mode === "code"
              ? "Kodunu buraya yapıştır veya yaz..."
              : "Paylaşmak istediğin düşünceyi veya alıntıyı buraya yaz..."
          }
          rows={10}
          className="w-full bg-[#0a0d15] text-slate-200 font-mono text-xs p-3.5 rounded-xl border border-slate-800/80 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none leading-relaxed resize-y selection:bg-indigo-600 selection:text-white"
          spellCheck={false}
        />
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] text-slate-400 font-mono">Tab</kbd>
          <span>ile 2 boşluk girinti verilir</span>
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleFormatCode}
            className="text-slate-400 hover:text-white flex items-center gap-1 transition-all"
            title="Gereksiz satır sonu boşluklarını temizle ve hizala"
          >
            <Wand2 className="w-3 h-3 text-cyan-400" />
            <span>Kodu Temizle</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (config.mode === "code") {
                const samples: Record<string, string> = {
                  csharp: `// C# 12 Primary Constructors & LINQ
namespace SnapMark.Demo;

public record Developer(string Name, string Role, int Level)
{
    public static IEnumerable<Developer> GetTeam() =>
        [
            new("Kerem", "Architect", 10),
            new("Antigravity", "AI Partner", 99)
        ];
}

var elite = Developer.GetTeam().Where(d => d.Level > 5);
Console.WriteLine($"Ekip hazır: {string.Join(", ", elite)} 🚀");`,

                  rust: `// Rust: Bellek Güvenli & Sıfır Maliyetli Soyutlama
use std::collections::HashMap;

#[derive(Debug)]
pub struct CodeSnap {
    pub title: String,
    pub stars: u32,
}

fn main() {
    let mut showcase = HashMap::new();
    showcase.insert("SnapMark", CodeSnap {
        title: "Faz 2 Studio".into(),
        stars: 100,
    });
    
    for (name, item) in &showcase {
        println!("{}: {:?} 🚀", name, item);
    }
}`,

                  cpp: `// C++20 Ranges & Modern Syntax
#include <iostream>
#include <vector>
#include <ranges>

int main() {
    std::vector<int> numbers = {1, 2, 3, 4, 5, 6, 7, 8};
    
    auto even_squares = numbers 
        | std::views::filter([](int n) { return n % 2 == 0; })
        | std::views::transform([](int n) { return n * n; });

    std::cout << "Kareler: ";
    for (int v : even_squares) std::cout << v << " ";
    std::cout << "🚀\\n";
    return 0;
}`,

                  c: `// C11 Standart C Kod Örneği
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    char username[32];
    int score;
} Player;

int main(void) {
    Player p = {"@keremdev", 999};
    printf("SnapMark C Modu: %s (Skor: %d) 🚀\\n", p.username, p.score);
    return 0;
}`,

                  python: `# Python 3.12 Pattern Matching & Dataclass
from dataclasses import dataclass

@dataclass
class CodeCard:
    username: str = "@keremdev"
    theme: str = "Cyberpunk"

def render_card(card: CodeCard) -> str:
    match card.theme:
        case "Cyberpunk":
            return f"⚡ {card.username} için neon kart hazır!"
        case _:
            return f"🎨 {card.username} için standart kart hazır."

print(render_card(CodeCard(username="@keremdev")))`,

                  typescript: `// SnapMark: Kodunu 10/10 bir görsele dönüştür
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

console.log("Hazır! Tek tıkla PNG veya panoya kopyala 🚀");`,
                };

                onChange(samples[config.language] || samples.typescript);
              } else {
                onChange(`"Tasarım sadece nasıl göründüğü veya nasıl hissettirdiği değildir. 
Tasarım, onun nasıl çalıştığıdır."

— Steve Jobs`);
              }
            }}
            className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-all"
          >
            <Sparkles className="w-3 h-3" />
            <span>Örnek Doldur ({config.language.toUpperCase()})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
