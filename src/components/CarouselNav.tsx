"use client";

import React, { useState, useRef, useEffect } from "react";
import { CardConfig, CardMode } from "@/types";
import {
  Plus,
  Copy,
  Trash2,
  Download,
  Layers,
  Code2,
  GitCompare,
  Quote,
  MessageSquare,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Check,
  X,
  ChevronDown,
  Terminal,
  GripVertical,
} from "lucide-react";
import { getT } from "@/lib/i18n";
import { CarouselSlide } from "@/types";

interface CarouselNavProps {
  config: CardConfig;
  onSelectSlide: (slideId: string) => void;
  onAddSlide: () => void;
  onDuplicateSlide: (slideId: string) => void;
  onDeleteSlide: (slideId: string) => void;
  onMoveSlide: (slideId: string, direction: "left" | "right") => void;
  onUpdateSlideMode: (slideId: string, mode: CardMode) => void;
  onRenameSlide: (slideId: string, newName: string) => void;
  onReorderSlides?: (newSlides: CarouselSlide[]) => void;
  onZipExport: () => Promise<void>;
  isZipExporting: boolean;
  zipProgress?: string;
}

const MODES: {
  id: CardMode;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  badgeBg: string;
}[] = [
  {
    id: "code",
    label: "Kod",
    icon: Code2,
    color: "text-emerald-400",
    badgeBg: "bg-emerald-500/10 border-emerald-500/30",
  },
  {
    id: "diff",
    label: "Diff",
    icon: GitCompare,
    color: "text-amber-400",
    badgeBg: "bg-amber-500/10 border-amber-500/30",
  },
  {
    id: "quote",
    label: "Alıntı",
    icon: Quote,
    color: "text-indigo-400",
    badgeBg: "bg-indigo-500/10 border-indigo-500/30",
  },
  {
    id: "tweet",
    label: "Tweet",
    icon: MessageSquare,
    color: "text-sky-400",
    badgeBg: "bg-sky-500/10 border-sky-500/30",
  },
  {
    id: "terminal",
    label: "CLI",
    icon: Terminal,
    color: "text-emerald-400",
    badgeBg: "bg-emerald-500/10 border-emerald-500/30",
  },
];

export const CarouselNav: React.FC<CarouselNavProps> = ({
  config,
  onSelectSlide,
  onAddSlide,
  onDuplicateSlide,
  onDeleteSlide,
  onMoveSlide,
  onUpdateSlideMode,
  onRenameSlide,
  onReorderSlides,
  onZipExport,
  isZipExporting,
  zipProgress,
}) => {
  const t = getT(config.uiLanguage);
  const slides = config.slides || [];
  const activeSlideId = config.activeSlideId || slides[0]?.id;

  // Slayt Yeniden Adlandırma Durumu
  const [editingSlideId, setEditingSlideId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState<string>("");

  // Sürükle & Bırak (Drag and Drop) Durumu
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Mod Seçim Menüsü Açık Olan Slayt
  const [openModeMenuSlideId, setOpenModeMenuSlideId] = useState<string | null>(null);
  const modeMenuRef = useRef<HTMLDivElement | null>(null);

  // Menü dışına tıklandığında modu kapat
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modeMenuRef.current && !modeMenuRef.current.contains(e.target as Node)) {
        setOpenModeMenuSlideId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleStartRename = (slideId: string, currentName: string) => {
    setEditingSlideId(slideId);
    setEditingName(currentName);
  };

  const handleSaveRename = (slideId: string) => {
    if (editingName.trim()) {
      onRenameSlide(slideId, editingName.trim());
    }
    setEditingSlideId(null);
    setEditingName("");
  };

  const handleCancelRename = () => {
    setEditingSlideId(null);
    setEditingName("");
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.setData("text/plain", index.toString());
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }
    if (onReorderSlides) {
      const updated = [...slides];
      const [removed] = updated.splice(draggedIndex, 1);
      updated.splice(targetIndex, 0, removed);
      onReorderSlides(updated);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="w-full max-w-5xl bg-[#0f172a]/95 backdrop-blur-md border border-slate-800 rounded-2xl p-3 sm:p-4 shadow-2xl shadow-black/50 space-y-3">
      {/* Üst Bar: Başlık, Bilgi & ZIP İndir Butonu */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold text-white tracking-tight">
                {t.carouselStudio}
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 font-semibold">
                {t.slideCount(slides.length)}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">
              {config.uiLanguage === "en"
                ? "Drag & drop to reorder, click mode badge to change slide type, double-click to rename."
                : "Sürükleyip bırakarak sıralayın, moda tıklayıp (Kod/Diff/Alıntı/Tweet) tipini değiştirin, çift tıklayarak adlandırın."}
            </p>
          </div>
        </div>

        {/* Eylemler: Yeni Slayt Ekle & Toplu ZIP İndirme */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onAddSlide}
            className="px-2.5 py-1.5 rounded-xl border border-dashed border-indigo-500/40 hover:border-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95"
            title={t.addSlide}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.addSlide}</span>
          </button>

          <button
            type="button"
            onClick={onZipExport}
            disabled={isZipExporting || slides.length === 0}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border shadow-md cursor-pointer ${
              isZipExporting
                ? "bg-indigo-950/80 border-indigo-500/50 text-indigo-200"
                : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border-indigo-400/40 active:scale-95 shadow-indigo-500/20"
            }`}
            title="Tüm slaytları yüksek çözünürlüklü tek bir ZIP arşivi olarak indir"
          >
            {isZipExporting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-300" />
                <span>{zipProgress || t.zipPreparing}</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>{t.downloadAllZip}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Slayt Kartları Listesi */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-1.5 pt-1 scrollbar-thin scrollbar-thumb-slate-700">
        {slides.map((slide, index) => {
          const isActive = slide.id === activeSlideId;
          const modeInfo = MODES.find((m) => m.id === slide.mode) || MODES[0];
          const IconComp = modeInfo.icon;
          const isEditing = editingSlideId === slide.id;
          const isModeMenuOpen = openModeMenuSlideId === slide.id;

          const isDragging = draggedIndex === index;
          const isDragOver = dragOverIndex === index;

          return (
            <div
              key={slide.id}
              draggable={!isEditing}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              onClick={() => onSelectSlide(slide.id)}
              className={`group relative flex items-center gap-2 px-2.5 py-2 rounded-xl border text-xs font-medium cursor-pointer transition-all shrink-0 select-none shadow-sm ${
                isDragging
                  ? "opacity-40 scale-95 border-dashed border-indigo-400 bg-indigo-950/20"
                  : isDragOver
                  ? "ring-2 ring-indigo-400 border-indigo-400 bg-indigo-950/60 scale-[1.02]"
                  : isActive
                  ? "bg-[#161f36] border-indigo-500 text-white shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/50"
                  : "bg-slate-900/80 border-slate-800/90 text-slate-300 hover:border-slate-700 hover:bg-slate-800/90 hover:text-white"
              }`}
            >
              {/* Sürükleme Tutamacı (Grip Handle) */}
              <div
                className="cursor-grab active:cursor-grabbing text-slate-500 hover:text-slate-300 transition-colors p-0.5 -ml-0.5"
                title={config.uiLanguage === "en" ? "Drag to reorder" : "Sıralamak için sürükleyin"}
              >
                <GripVertical className="w-3.5 h-3.5" />
              </div>

              {/* Sıralama Okları (Sol / Sağ) */}
              <div className="flex items-center -space-x-1 mr-0.5">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (index > 0) onMoveSlide(slide.id, "left");
                  }}
                  title={index === 0 ? "İlk slayt" : "Sola / Öne taşı"}
                  className={`p-1 rounded hover:bg-slate-700/60 transition-colors ${
                    index === 0
                      ? "opacity-20 cursor-not-allowed text-slate-600"
                      : "text-slate-400 hover:text-white cursor-pointer"
                  }`}
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  disabled={index === slides.length - 1}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (index < slides.length - 1) onMoveSlide(slide.id, "right");
                  }}
                  title={index === slides.length - 1 ? "Son slayt" : "Sağa / Arkaya taşı"}
                  className={`p-1 rounded hover:bg-slate-700/60 transition-colors ${
                    index === slides.length - 1
                      ? "opacity-20 cursor-not-allowed text-slate-600"
                      : "text-slate-400 hover:text-white cursor-pointer"
                  }`}
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Slayt Numarası */}
              <span
                className={`w-5 h-5 rounded-full text-[10px] font-mono flex items-center justify-center font-bold shrink-0 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-200"
                }`}
              >
                {index + 1}
              </span>

              {/* Slayt İsmi (Çift tıkla veya ikonla düzenle) */}
              {isEditing ? (
                <div
                  className="flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="text"
                    value={editingName}
                    autoFocus
                    onChange={(e) => setEditingName(e.target.value)}
                    onBlur={() => handleSaveRename(slide.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSaveRename(slide.id);
                      if (e.key === "Escape") handleCancelRename();
                    }}
                    className="w-28 sm:w-36 px-2 py-0.5 text-xs bg-slate-950 border border-indigo-500 rounded-lg text-white outline-none font-medium"
                    placeholder="Slayt Adı"
                  />
                  <button
                    type="button"
                    onClick={() => handleSaveRename(slide.id)}
                    className="p-1 rounded hover:bg-emerald-500/20 text-emerald-400 cursor-pointer"
                    title="Kaydet"
                  >
                    <Check className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelRename}
                    className="p-1 rounded hover:bg-rose-500/20 text-rose-400 cursor-pointer"
                    title="İptal"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div
                  className="flex items-center gap-1.5 cursor-pointer"
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    handleStartRename(slide.id, slide.name || `Slayt ${index + 1}`);
                  }}
                  title="İsmi değiştirmek için çift tıklayın"
                >
                  <span className="truncate max-w-[120px] sm:max-w-[170px] font-semibold text-slate-200">
                    {slide.name || `Slayt ${index + 1}`}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartRename(slide.id, slide.name || `Slayt ${index + 1}`);
                    }}
                    className="opacity-0 group-hover:opacity-60 hover:opacity-100! p-0.5 text-slate-400 hover:text-white transition-opacity cursor-pointer"
                    title="Slaytı Yeniden Adlandır"
                  >
                    <Pencil className="w-2.5 h-2.5" />
                  </button>
                </div>
              )}

              {/* Hızlı Mod Değiştirici Buton & Mini Dropdown Menü */}
              <div className="relative">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenModeMenuSlideId(isModeMenuOpen ? null : slide.id);
                  }}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border text-[10px] font-mono shrink-0 transition-all cursor-pointer ${modeInfo.badgeBg} ${
                    isModeMenuOpen ? "ring-1 ring-white/30" : ""
                  }`}
                  title={`Modu değiştir (Şu an: ${modeInfo.label})`}
                >
                  <IconComp className={`w-3 h-3 ${modeInfo.color}`} />
                  <span className="font-semibold text-slate-200">{modeInfo.label}</span>
                  <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
                </button>

                {/* Açılır Mod Seçim Listesi */}
                {isModeMenuOpen && (
                  <div
                    ref={modeMenuRef}
                    onClick={(e) => e.stopPropagation()}
                    className="absolute bottom-full mb-1.5 left-0 z-50 w-32 bg-[#0f172a] border border-slate-700/80 rounded-xl shadow-2xl p-1 space-y-0.5 animate-in fade-in zoom-in-95 duration-100"
                  >
                    <div className="px-2 py-1 text-[9px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                      Slayt Modu
                    </div>
                    {MODES.map((m) => {
                      const ModeIcon = m.icon;
                      const isSelected = slide.mode === m.id;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => {
                            onUpdateSlideMode(slide.id, m.id);
                            setOpenModeMenuSlideId(null);
                          }}
                          className={`w-full flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-medium text-left transition-colors cursor-pointer ${
                            isSelected
                              ? "bg-indigo-600/30 text-white font-bold"
                              : "text-slate-300 hover:bg-slate-800 hover:text-white"
                          }`}
                        >
                          <ModeIcon className={`w-3.5 h-3.5 ${m.color}`} />
                          <span className="flex-1">{m.label}</span>
                          {isSelected && <Check className="w-3 h-3 text-indigo-400" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Çoğalt & Sil Butonları */}
              <div className="flex items-center gap-0.5 pl-0.5 opacity-60 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDuplicateSlide(slide.id);
                  }}
                  title="Bu slaytı çoğalt"
                  className="p-1 rounded-md text-slate-400 hover:text-indigo-300 hover:bg-indigo-500/20 transition-colors cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                </button>

                {slides.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteSlide(slide.id);
                    }}
                    title="Bu slaytı sil"
                    className="p-1 rounded-md text-slate-400 hover:text-rose-400 hover:bg-rose-500/20 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {/* Yeni Slayt Ekle Butonu */}
        <button
          type="button"
          onClick={onAddSlide}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-dashed border-slate-700/80 hover:border-indigo-500/60 bg-slate-900/40 hover:bg-indigo-500/10 text-slate-400 hover:text-indigo-300 text-xs font-medium cursor-pointer transition-all shrink-0 active:scale-95"
          title={t.addSlide}
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{t.addSlide}</span>
        </button>
      </div>
    </div>
  );
};
