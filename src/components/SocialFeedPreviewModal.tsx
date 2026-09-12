"use client";

import React, { useState } from "react";
import {
  X,
  Heart,
  MessageCircle,
  Repeat,
  Bookmark,
  Share,
  ThumbsUp,
  Send,
  MoreHorizontal,
  Globe,
  Sparkles,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import { CardConfig, UiLanguage } from "@/types";
import { getT } from "@/lib/i18n";
import { PreviewCard } from "./PreviewCard";

interface SocialFeedPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: CardConfig;
  uiLanguage?: UiLanguage;
  childrenPreview?: React.ReactNode;
}

type PlatformTab = "twitter" | "linkedin" | "instagram";

export const SocialFeedPreviewModal: React.FC<SocialFeedPreviewModalProps> = ({
  isOpen,
  onClose,
  config,
  uiLanguage,
  childrenPreview,
}) => {
  const [activePlatform, setActivePlatform] = useState<PlatformTab>("twitter");
  const effectiveLang = uiLanguage || config.uiLanguage || "tr";
  const t = getT(effectiveLang);
  const preview = childrenPreview || <PreviewCard config={config} />;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#0b101b] border border-slate-700/80 rounded-3xl w-full max-w-2xl my-auto shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Başlığı */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white">
                {t.feedModalTitle}
              </h3>
              <p className="text-[11px] text-slate-400">
                {t.feedModalDesc}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title={t.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Platform Seçim Sekmeleri */}
        <div className="px-5 py-3 border-b border-slate-800/80 bg-[#090d16] flex items-center gap-2 shrink-0 overflow-x-auto">
          <button
            onClick={() => setActivePlatform("twitter")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activePlatform === "twitter"
                ? "bg-sky-500/20 border border-sky-500/50 text-sky-300 shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent"
            }`}
          >
            <Twitter className="w-3.5 h-3.5 text-sky-400" />
            <span>{t.tabTwitter}</span>
          </button>

          <button
            onClick={() => setActivePlatform("linkedin")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activePlatform === "linkedin"
                ? "bg-blue-600/20 border border-blue-500/50 text-blue-300 shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent"
            }`}
          >
            <Linkedin className="w-3.5 h-3.5 text-blue-400" />
            <span>{t.tabLinkedIn}</span>
          </button>

          <button
            onClick={() => setActivePlatform("instagram")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activePlatform === "instagram"
                ? "bg-pink-600/20 border border-pink-500/50 text-pink-300 shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent"
            }`}
          >
            <Instagram className="w-3.5 h-3.5 text-pink-400" />
            <span>{t.tabInstagram}</span>
          </button>
        </div>

        {/* Canlı Akış Önizleme Gövdesi */}
        <div className="p-4 sm:p-6 overflow-y-auto flex justify-center bg-slate-950/60 custom-scrollbar">
          {/* 1. TWITTER / X TIMELINE MOCKUP */}
          {activePlatform === "twitter" && (
            <div className="w-full max-w-lg bg-black border border-slate-800 rounded-2xl p-4 sm:p-5 text-left font-sans shadow-xl">
              {/* Tweet Header */}
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-md">
                  KD
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="font-bold text-white text-sm">Kerem Dev</span>
                      <span className="text-sky-400 text-xs font-bold">✔</span>
                      <span className="text-slate-500 text-xs font-mono">@keremdev</span>
                      <span className="text-slate-600 text-xs">• 14d</span>
                    </div>
                    <MoreHorizontal className="w-4 h-4 text-slate-500 shrink-0" />
                  </div>
                  <p className="text-slate-200 text-xs sm:text-sm mt-1 leading-relaxed">
                    Bulanık ekran alıntıları yerine kristal netliğinde 4K kod mimarisi paylaşımı 🚀 Sosyal medya akışında bambaşka duruyor!
                  </p>
                </div>
              </div>

              {/* Media Slot (Kartın Kendisi) */}
              <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#0a0f1d] shadow-inner flex items-center justify-center p-2 mb-3">
                <div className="w-full scale-95 origin-center pointer-events-none">
                  {preview}
                </div>
              </div>

              {/* Tweet Engagement Actions */}
              <div className="flex items-center justify-between text-slate-500 text-xs px-2 pt-1 border-t border-slate-900">
                <div className="flex items-center gap-1.5 hover:text-sky-400 transition-colors cursor-pointer">
                  <MessageCircle className="w-4 h-4" />
                  <span>28</span>
                </div>
                <div className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors cursor-pointer">
                  <Repeat className="w-4 h-4" />
                  <span>94</span>
                </div>
                <div className="flex items-center gap-1.5 hover:text-pink-400 transition-colors cursor-pointer text-pink-400/90 font-medium">
                  <Heart className="w-4 h-4 fill-pink-500" />
                  <span>412</span>
                </div>
                <div className="flex items-center gap-1.5 hover:text-sky-400 transition-colors cursor-pointer">
                  <Bookmark className="w-4 h-4" />
                  <span>68</span>
                </div>
                <Share className="w-4 h-4 hover:text-white transition-colors cursor-pointer" />
              </div>
            </div>
          )}

          {/* 2. LINKEDIN FEED MOCKUP */}
          {activePlatform === "linkedin" && (
            <div className="w-full max-w-lg bg-[#1b2230] border border-slate-700/80 rounded-2xl p-4 sm:p-5 text-left font-sans shadow-xl">
              {/* Post Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    KD
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-white text-sm">Kerem Dev</span>
                      <span className="text-[10px] text-slate-400">• 1st</span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate max-w-[220px]">
                      Senior Software Architect & Full-Stack Lead
                    </p>
                    <div className="flex items-center gap-1 text-[10px] text-slate-500">
                      <span>2h</span>
                      <span>•</span>
                      <Globe className="w-3 h-3" />
                    </div>
                  </div>
                </div>
                <button className="px-3 py-1 rounded-full text-xs font-bold text-sky-400 hover:bg-sky-500/10 transition-colors">
                  + Takip Et
                </button>
              </div>

              <p className="text-slate-200 text-xs sm:text-sm mb-3 leading-relaxed">
                Yazılım projelerinde okunabilir ve sürdürülebilir mimari kurarken uyguladığım son pratikler. Detaylar aşağıdaki görselde 👇 #cleancode #architecture
              </p>

              {/* Media Slot */}
              <div className="rounded-xl overflow-hidden border border-slate-700/60 bg-[#0d131f] shadow-inner flex items-center justify-center p-2 mb-3">
                <div className="w-full scale-95 origin-center pointer-events-none">
                  {preview}
                </div>
              </div>

              {/* Reactions Bar */}
              <div className="flex items-center justify-between text-slate-400 text-xs pb-2 border-b border-slate-700/60">
                <span className="flex items-center gap-1">
                  <span>👍 👏 💡</span>
                  <span className="text-slate-300 font-medium">184</span>
                </span>
                <span>32 yorum • 14 yeniden paylaşım</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-around pt-2 text-slate-400 text-xs font-semibold">
                <button className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg hover:bg-slate-700/50 hover:text-white transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span>Beğen</span>
                </button>
                <button className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg hover:bg-slate-700/50 hover:text-white transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span>Yorum Yap</span>
                </button>
                <button className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg hover:bg-slate-700/50 hover:text-white transition-colors">
                  <Repeat className="w-4 h-4" />
                  <span>Paylaş</span>
                </button>
                <button className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg hover:bg-slate-700/50 hover:text-white transition-colors">
                  <Send className="w-4 h-4" />
                  <span>Gönder</span>
                </button>
              </div>
            </div>
          )}

          {/* 3. INSTAGRAM FEED MOCKUP */}
          {activePlatform === "instagram" && (
            <div className="w-full max-w-sm bg-black border border-slate-800 rounded-3xl overflow-hidden text-left font-sans shadow-2xl">
              {/* IG Header */}
              <div className="px-4 py-3 border-b border-slate-900 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full p-[2px] bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-white font-bold text-[10px]">
                      KD
                    </div>
                  </div>
                  <div>
                    <span className="font-bold text-white text-xs block">kerem.codes</span>
                    <span className="text-[9px] text-slate-400">Orijinal İçerik</span>
                  </div>
                </div>
                <MoreHorizontal className="w-4 h-4 text-slate-400" />
              </div>

              {/* Media Container */}
              <div className="bg-[#0c121e] flex items-center justify-center p-2">
                <div className="w-full scale-95 origin-center pointer-events-none">
                  {preview}
                </div>
              </div>

              {/* IG Actions */}
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 fill-rose-500 text-rose-500 cursor-pointer" />
                    <MessageCircle className="w-5 h-5 hover:text-slate-300 cursor-pointer" />
                    <Send className="w-5 h-5 hover:text-slate-300 cursor-pointer" />
                  </div>
                  <Bookmark className="w-5 h-5 hover:text-slate-300 cursor-pointer" />
                </div>

                <div className="text-xs font-bold text-white">524 beğenme</div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  <span className="font-bold text-white mr-1.5">kerem.codes</span>
                  Bulanık ekran alıntıları mazide kaldı ✨ Kodları 4K çözünürlükle sunun. #developer #coding #nextjs
                </p>

                <span className="text-[10px] text-slate-500 uppercase font-mono block pt-1">
                  12 SAAT ÖNCE
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
