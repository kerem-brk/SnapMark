"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Code2, Sparkles, Heart, Github, Terminal, Keyboard } from "lucide-react";

export const LandingFooter: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/80 relative overflow-hidden">
      {/* Glow Ambient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-gradient-to-b from-indigo-600/15 via-purple-600/10 to-transparent blur-[120px] pointer-events-none" />

      {/* Pre-Footer Call to Action Banner */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-indigo-500/20 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hemen Şimdi Başlayın</span>
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Kodlarınızı Sosyal Medyada <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
              Fark Edilir Kılın
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Bulanık ekran görüntülerini geride bırakın. 4K çözünürlük ve profesyonel tasarım şablonlarıyla birkaç saniye içinde ilk görselinizi üretin.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/studio"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all cursor-pointer group"
            >
              <span>Stüdyoyu Başlat (Ücretsiz)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
            <span>✨ Kredi kartı gerekmez</span>
            <span>🔒 Kayıt veya üyelik yok</span>
            <span>⚡ 100% Tarayıcıda güvenli</span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
            <Code2 className="w-5 h-5" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-white font-extrabold text-base tracking-tight">SnapMark</span>
            <span className="text-[10px] text-slate-500 font-mono">Pro Code Studio</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 text-xs font-medium text-slate-400">
          <Link href="/studio" className="hover:text-white transition-colors">
            Stüdyo
          </Link>
          <a href="#showcase" className="hover:text-white transition-colors">
            Vitrin
          </a>
          <a href="#features" className="hover:text-white transition-colors">
            Özellikler
          </a>
          <a href="#faq" className="hover:text-white transition-colors">
            SSS
          </a>
        </div>

        {/* Shortcuts & Made with Love */}
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 font-mono text-[11px]">
            <Keyboard className="w-3.5 h-3.5 text-indigo-400" />
            <span>Ctrl + K</span>
          </div>
          <span>Geliştiriciler için özenle yapıldı</span>
        </div>
      </div>
    </footer>
  );
};
