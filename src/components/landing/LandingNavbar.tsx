"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Code2, ArrowRight, Menu, X, Sparkles } from "lucide-react";

export const LandingNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/landing" className="flex items-center gap-2.5 group cursor-pointer">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30 group-hover:scale-105 transition-transform">
            <Code2 className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-white font-extrabold text-base tracking-tight">SnapMark</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-indigo-500/20 text-indigo-300 font-semibold rounded border border-indigo-500/30">
                PRO
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono -mt-0.5">Code Image Studio</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-300">
          <a href="#showcase" className="hover:text-white transition-colors">
            Vitrin
          </a>
          <a href="#features" className="hover:text-white transition-colors">
            Özellikler
          </a>
          <a href="#faq" className="hover:text-white transition-colors">
            Sıkça Sorulanlar
          </a>
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/30 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all cursor-pointer group"
          >
            <span>Stüdyoyu Aç</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center gap-2">
          <Link
            href="/"
            className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-semibold text-xs"
          >
            Stüdyo
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Menü"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 px-4 py-4 space-y-3">
          <a
            href="#showcase"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-300 hover:text-white py-1"
          >
            Vitrin
          </a>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-300 hover:text-white py-1"
          >
            Özellikler
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-300 hover:text-white py-1"
          >
            Sıkça Sorulanlar
          </a>
          <div className="pt-2 border-t border-slate-800">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs"
            >
              <span>Stüdyoyu Başlat</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
