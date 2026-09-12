"use client";

import React, { useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Minimize2,
  Play,
  Pause,
} from "lucide-react";
import { CarouselSlide, UiLanguage } from "@/types";
import { getT } from "@/lib/i18n";

interface PresentationModeProps {
  isOpen: boolean;
  onClose: () => void;
  slides: CarouselSlide[];
  activeSlideIndex: number;
  onPrevSlide: () => void;
  onNextSlide: () => void;
  typewriterPlaying: boolean;
  onToggleTypewriter: () => void;
  uiLanguage?: UiLanguage;
  children: React.ReactNode;
}

export const PresentationMode: React.FC<PresentationModeProps> = ({
  isOpen,
  onClose,
  slides,
  activeSlideIndex,
  onPrevSlide,
  onNextSlide,
  typewriterPlaying,
  onToggleTypewriter,
  uiLanguage = "tr",
  children,
}) => {
  const t = getT(uiLanguage);
  const isEn = uiLanguage === "en";

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        onPrevSlide();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        onNextSlide();
      } else if (e.key === " ") {
        // Toggle typewriter if space is pressed outside an input
        const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
        if (tag !== "input" && tag !== "textarea") {
          e.preventDefault();
          onToggleTypewriter();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onPrevSlide, onNextSlide, onToggleTypewriter, onClose]);

  if (!isOpen) return null;

  const totalSlides = slides.length || 1;
  const currentSlide = slides[activeSlideIndex];

  return (
    <div className="fixed inset-0 z-[90] bg-[#070a12] flex flex-col items-center justify-between p-6 animate-fade-in select-none">
      {/* Top Floating Mini Header */}
      <div className="w-full max-w-5xl flex items-center justify-between text-xs text-zinc-400 py-2 px-4 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-lg">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-zinc-200">{t.presentationTitle}</span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-300 font-mono truncate max-w-xs">
            {currentSlide?.title || currentSlide?.name || `${isEn ? "Slide" : "Slayt"} ${activeSlideIndex + 1}`}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex text-[11px] text-zinc-500">
            {t.presentationTip}
          </span>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-zinc-200 transition-colors"
            title={isEn ? "Exit Presentation (Esc)" : "Sunumdan Çık (Esc)"}
          >
            <Minimize2 className="w-3.5 h-3.5" />
            <span className="text-[11px] font-medium">{t.presentationExit}</span>
            <kbd className="text-[9px] font-mono px-1 py-0.5 bg-black/40 rounded">ESC</kbd>
          </button>
        </div>
      </div>

      {/* Main Canvas Center Stage */}
      <div className="flex-1 w-full max-w-6xl flex items-center justify-center my-4 overflow-hidden relative">
        <div className="transform scale-[0.88] lg:scale-100 transition-transform origin-center">
          {children}
        </div>
      </div>

      {/* Bottom Floating Presentation Controls Bar */}
      <div className="flex items-center gap-4 px-5 py-2.5 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/15 shadow-2xl">
        {/* Previous Slide */}
        <button
          onClick={onPrevSlide}
          disabled={activeSlideIndex <= 0}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/15 disabled:opacity-30 disabled:hover:bg-white/5 text-zinc-200 transition-colors cursor-pointer"
          title={isEn ? "Previous Slide (←)" : "Önceki Slayt (←)"}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Slide Counter */}
        <div className="flex items-center gap-1 font-mono text-sm px-2">
          <span className="font-bold text-white">{activeSlideIndex + 1}</span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-400">{totalSlides}</span>
        </div>

        {/* Next Slide */}
        <button
          onClick={onNextSlide}
          disabled={activeSlideIndex >= totalSlides - 1}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/15 disabled:opacity-30 disabled:hover:bg-white/5 text-zinc-200 transition-colors cursor-pointer"
          title={isEn ? "Next Slide (→)" : "Sonraki Slayt (→)"}
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="h-5 w-px bg-white/10 mx-1" />

        {/* Typewriter Play / Pause */}
        <button
          onClick={onToggleTypewriter}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
            typewriterPlaying
              ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-lg shadow-amber-500/10"
              : "bg-white/5 text-zinc-300 hover:bg-white/10"
          }`}
          title={isEn ? "Toggle Typewriter (Space)" : "Daktilo Efektini Oynat / Durdur (Boşluk Tuşu)"}
        >
          {typewriterPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{typewriterPlaying ? (isEn ? "Pause" : "Durdur") : (isEn ? "Typewriter" : "Daktilo")}</span>
        </button>
      </div>
    </div>
  );
};
