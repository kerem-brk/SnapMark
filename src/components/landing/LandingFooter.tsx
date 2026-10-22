"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Keyboard } from "lucide-react";
import { Logo } from "@/components/Logo";

export const LandingFooter: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-[#0F172A] relative overflow-hidden">
      {/* Pre-Footer Call to Action Banner */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <div className="rounded-3xl p-8 sm:p-12 bg-slate-900/90 border border-slate-800 shadow-2xl relative overflow-hidden">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hemen Şimdi Başlayın</span>
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Kodlarınızı Sosyal Medyada <br />
            <span className="text-emerald-400 font-mono">
              Fark Edilir Kılın
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Bulanık ekran görüntülerini geride bırakın. 4K çözünürlük ve profesyonel tasarım şablonlarıyla birkaç saniye içinde ilk görselinizi üretin.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/studio"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-950/40 hover:-translate-y-0.5 transition-all cursor-pointer group"
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <Logo href="/" size={34} showBadge={false} showSubtitle={true} subtitleText="Pro Code Studio" />

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
            <Keyboard className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ctrl + K</span>
          </div>
          <span>Geliştiriciler için özenle yapıldı</span>
        </div>
      </div>
    </footer>
  );
};
