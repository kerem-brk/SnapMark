"use client";

import React, { useState } from "react";
import {
  OPEN_SOURCE_COLOR_TABLE,
  CURATED_OPEN_SOURCE_GRADIENTS,
  CuratedGradient,
  ColorFamily,
} from "@/lib/colorTable";
import { GradientColorStop, GradientType } from "@/types";
import { HexColorPicker } from "react-colorful";
import { X, Search, Check, Sparkles, Palette, Sliders, Copy } from "lucide-react";

interface ColorPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeColor: string;
  onSelectColor: (hex: string) => void;
  onApplyPreset?: (preset: CuratedGradient) => void;
  activeStopIndex?: number;
}

export const ColorPaletteModal: React.FC<ColorPaletteModalProps> = ({
  isOpen,
  onClose,
  activeColor,
  onSelectColor,
  onApplyPreset,
  activeStopIndex = 0,
}) => {
  const [activeTab, setActiveTab] = useState<"table" | "presets" | "picker">("table");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  const filteredFamilies = OPEN_SOURCE_COLOR_TABLE.filter((family) => {
    const matchesCategory =
      categoryFilter === "all" || family.category === categoryFilter;
    const matchesSearch =
      searchQuery === "" ||
      family.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      family.shades.some((s) => s.hex.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-[#0e1422] border border-slate-700/80 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Başlığı */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-[#12192b]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <span>Açık Kaynak Renk Tablosu & Degrade Stüdyosu</span>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-1.5 py-0.5 rounded-full font-normal">
                  Durak #{activeStopIndex + 1}
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                Tailwind CSS 200+ renk tablosu veya hazır açık kaynak degrade şablonları
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sekme Butonları */}
        <div className="flex border-b border-slate-800 bg-[#0d1322] px-5 pt-2 gap-2 text-xs">
          <button
            onClick={() => setActiveTab("table")}
            className={`pb-2.5 px-3 font-medium flex items-center gap-1.5 border-b-2 transition-all ${
              activeTab === "table"
                ? "border-indigo-500 text-indigo-400 font-semibold"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Renk Tablosu (200+ Ton)</span>
          </button>
          <button
            onClick={() => setActiveTab("presets")}
            className={`pb-2.5 px-3 font-medium flex items-center gap-1.5 border-b-2 transition-all ${
              activeTab === "presets"
                ? "border-indigo-500 text-indigo-400 font-semibold"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Açık Kaynak Degradeler</span>
          </button>
          <button
            onClick={() => setActiveTab("picker")}
            className={`pb-2.5 px-3 font-medium flex items-center gap-1.5 border-b-2 transition-all ${
              activeTab === "picker"
                ? "border-indigo-500 text-indigo-400 font-semibold"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Hassas Renk Seçici</span>
          </button>
        </div>

        {/* Modal Gövdesi */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {/* TAB 1: TAILWIND RENK TABLOSU */}
          {activeTab === "table" && (
            <div className="space-y-4">
              {/* Filtre ve Arama */}
              <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto text-[11px]">
                  {[
                    { id: "all", label: "Tümü" },
                    { id: "warm", label: "Sıcak" },
                    { id: "cool", label: "Soğuk" },
                    { id: "vibrant", label: "Canlı" },
                    { id: "neutral", label: "Nötr" },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setCategoryFilter(cat.id)}
                      className={`px-2.5 py-1 rounded-lg transition-all ${
                        categoryFilter === cat.id
                          ? "bg-indigo-600 text-white font-semibold"
                          : "bg-slate-800/80 text-slate-400 hover:text-white"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-48">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Renk veya Hex ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-2.5 py-1 bg-slate-800/60 border border-slate-700/60 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Renk Matrisi Tablosu */}
              <div className="space-y-2.5">
                {filteredFamilies.map((family) => (
                  <div
                    key={family.name}
                    className="p-2.5 bg-[#121827] rounded-xl border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div className="w-20 shrink-0">
                      <span className="text-xs font-semibold text-slate-300">
                        {family.name}
                      </span>
                    </div>

                    {/* Ton Kareleri */}
                    <div className="grid grid-cols-11 gap-1 flex-1">
                      {family.shades.map((shade) => {
                        const isCurrent =
                          activeColor.toLowerCase() === shade.hex.toLowerCase();
                        return (
                          <button
                            key={shade.level}
                            onClick={() => onSelectColor(shade.hex)}
                            style={{ backgroundColor: shade.hex }}
                            className={`h-7 rounded-md transition-all relative flex items-center justify-center group ${
                              isCurrent
                                ? "ring-2 ring-white scale-110 z-10 shadow-lg"
                                : "hover:scale-110 hover:z-10"
                            }`}
                            title={`${family.name}-${shade.level} (${shade.hex})`}
                          >
                            {isCurrent && (
                              <Check
                                className={`w-3 h-3 ${
                                  parseInt(shade.level) > 400
                                    ? "text-white"
                                    : "text-black"
                                }`}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: AÇIK KAYNAK HAZIR DEGRADELER */}
          {activeTab === "presets" && (
            <div className="space-y-3">
              <p className="text-[11px] text-slate-400">
                WebGradients ve Hypercolor tarafından doğrulanmış modern açık kaynak degrade kombinasyonları:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {CURATED_OPEN_SOURCE_GRADIENTS.map((preset) => {
                  const sorted = [...preset.stops].sort((a, b) => a.position - b.position);
                  const stopString = sorted
                    .map((s) => `${s.color} ${s.position}%`)
                    .join(", ");
                  const bgStyle =
                    preset.type === "radial"
                      ? `radial-gradient(circle at center, ${stopString})`
                      : preset.type === "conic"
                      ? `conic-gradient(from ${preset.angle || 90}deg at center, ${stopString})`
                      : `linear-gradient(${preset.angle || 135}deg, ${stopString})`;

                  return (
                    <button
                      key={preset.name}
                      onClick={() => {
                        if (onApplyPreset) {
                          onApplyPreset(preset);
                          onClose();
                        }
                      }}
                      className="group p-2.5 bg-[#121827] hover:bg-[#161f33] border border-slate-800 hover:border-indigo-500/50 rounded-xl flex items-center gap-3 transition-all text-left"
                    >
                      <div
                        className="w-12 h-12 rounded-lg shrink-0 shadow-md border border-white/10 group-hover:scale-105 transition-transform"
                        style={{ background: bgStyle }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-200 group-hover:text-white truncate">
                            {preset.name}
                          </span>
                          <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                            {preset.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-400">
                          {preset.stops.map((s, idx) => (
                            <span key={idx} className="flex items-center gap-1">
                              <span
                                className="w-2 h-2 rounded-full inline-block"
                                style={{ backgroundColor: s.color }}
                              />
                              <span className="font-mono">{s.color}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: REACT-COLORFUL HASSAS SEÇİCİ */}
          {activeTab === "picker" && (
            <div className="flex flex-col items-center justify-center p-4 space-y-4">
              <div className="p-3 bg-[#131b2a] rounded-2xl border border-slate-700 shadow-xl">
                <HexColorPicker
                  color={activeColor}
                  onChange={onSelectColor}
                  className="!w-[280px] !h-[200px]"
                />
              </div>

              {/* Seçili Renk Detayı ve Kopyalama */}
              <div className="flex items-center gap-3 bg-[#131b2a] px-4 py-2 rounded-xl border border-slate-700">
                <div
                  className="w-8 h-8 rounded-lg shadow-inner border border-white/20"
                  style={{ backgroundColor: activeColor }}
                />
                <span className="font-mono text-sm font-semibold text-white uppercase">
                  {activeColor}
                </span>
                <button
                  onClick={() => handleCopy(activeColor)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="HEX Kopyala"
                >
                  {copiedHex ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Hızlı Renk Önerileri */}
              <div className="w-full max-w-sm">
                <span className="text-[10px] text-slate-400 block mb-1 text-center">
                  Hızlı Seçim Noktaları
                </span>
                <div className="flex items-center justify-center gap-1.5 flex-wrap">
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
                      onClick={() => onSelectColor(hex)}
                      style={{ backgroundColor: hex }}
                      className="w-6 h-6 rounded-full border border-white/20 hover:scale-125 transition-transform"
                      title={hex}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Alt Çubuğu */}
        <div className="px-5 py-3 border-t border-slate-800 bg-[#12192b] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400">Aktif Durak Rengi:</span>
            <div
              className="w-5 h-5 rounded-md border border-white/20"
              style={{ backgroundColor: activeColor }}
            />
            <span className="text-[11px] font-mono font-semibold text-white uppercase">
              {activeColor}
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-all shadow-md"
          >
            Tamam
          </button>
        </div>
      </div>
    </div>
  );
};
