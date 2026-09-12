"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Terminal, Layers, ShieldCheck, Download, Code2, Check } from "lucide-react";

export const LandingHero: React.FC = () => {
  return (
    <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-cyan-500/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Pill Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-medium mb-8 animate-fade-in">
        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>SnapMark Pro Studio v2.4 Yayında</span>
        <span className="text-slate-500">•</span>
        <span className="text-slate-400">100% Tarayıcıda & Ücretsiz</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.1] mb-6">
        Geliştiriciler için <br />
        <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
          Kristal Netliğinde
        </span>{" "}
        Kod Kartları
      </h1>

      {/* Subtitle */}
      <p className="text-base sm:text-xl text-slate-400 max-w-2xl font-normal leading-relaxed mb-10">
        Bulanık ekran alıntıları yerine; 4K çözünürlük, 3D perspektif eğimi, çoklu carousel slaytları,
        daktilo animasyonu ve zengin tipografiyle sosyal medyada fark yaratan içerikler üretin.
      </p>

      {/* Call to Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-3.5 mb-16 w-full sm:w-auto">
        <Link
          href="/"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer group"
        >
          <span>Stüdyoyu Başlat</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
        <a
          href="#showcase"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-medium text-sm transition-all"
        >
          <span>Canlı Örnekleri Gör</span>
        </a>
      </div>

      {/* Floating 3D Showcase Card Mockup */}
      <div className="w-full max-w-4xl relative group select-none">
        {/* Neon Border Wrapper */}
        <div
          className="rounded-3xl p-[2px] transition-transform duration-500 group-hover:scale-[1.01]"
          style={{
            background: "linear-gradient(135deg, #6366f1, #a855f7, #06b6d4)",
            boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.95), 0 0 50px 0px rgba(99, 102, 241, 0.25)",
          }}
        >
          <div className="rounded-[22px] bg-[#0c121e] border border-white/10 overflow-hidden shadow-2xl">
            {/* Title Bar */}
            <div className="px-4 py-3 bg-black/40 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-sm" />
                <div className="ml-3 flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 text-xs font-mono text-slate-200 border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  <span>cleanArchitecture.ts</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                <span className="hidden sm:inline text-emerald-400">TypeScript 5.8</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px]">
                  4K Retina
                </span>
              </div>
            </div>

            {/* Code Body */}
            <div className="p-6 sm:p-8 text-left font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto custom-scrollbar bg-[#0a0e1a]/95">
              <pre className="text-slate-300">
                <code>
                  <span className="text-purple-400">interface</span> <span className="text-cyan-300">DeveloperStory</span> {"{\n"}
                  {"  "}username: <span className="text-emerald-400">&quot;@keremdev&quot;</span>;{"\n"}
                  {"  "}powers: [<span className="text-emerald-400">&quot;3D Perspective&quot;</span>, <span className="text-emerald-400">&quot;Typewriter&quot;</span>, <span className="text-emerald-400">&quot;Carousel&quot;</span>];{"\n"}
                  {"  "}quality: <span className="text-amber-400">&quot;Ultra-HD 4K&quot;</span>;{"\n"}
                  {"}"}
                  {"\n\n"}
                  <span className="text-slate-500">// 🚀 Tek tıkla panoya kopyala veya sosyal medya boyutunda indir</span>{"\n"}
                  <span className="text-purple-400">export async function</span> <span className="text-blue-400">createImpact</span>() {"{\n"}
                  {"  "}<span className="text-purple-400">const</span> card = <span className="text-purple-400">await</span> SnapMark.<span className="text-blue-400">render</span>({"{\n"}
                  {"    "}theme: <span className="text-emerald-400">&quot;cyberpunk&quot;</span>,{"\n"}
                  {"    "}format: <span className="text-emerald-400">&quot;twitter-post&quot;</span>,{"\n"}
                  {"    "}gradientBorder: <span className="text-amber-400">true</span>,{"\n"}
                  {"  "}{"}"});{"\n"}
                  {"  "}return card.<span className="text-blue-400">export4K</span>();{"\n"}
                  {"}"}
                </code>
              </pre>
            </div>

            {/* Card Footer Bar */}
            <div className="px-6 py-3 bg-black/40 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-300">@keremdev</span>
              </div>
              <span className="text-slate-500 text-[11px]">SnapMark Studio</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
