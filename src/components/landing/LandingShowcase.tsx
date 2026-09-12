"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Code2, GitCompare, Terminal, Twitter, Quote, ArrowRight, CheckCircle2 } from "lucide-react";

type ShowcaseTab = "code" | "diff" | "terminal" | "tweet" | "quote";

interface TabItem {
  id: ShowcaseTab;
  label: string;
  icon: React.ReactNode;
  badge: string;
  title: string;
  desc: string;
}

const TABS: TabItem[] = [
  {
    id: "code",
    label: "Kod Kartı",
    icon: <Code2 className="w-4 h-4" />,
    badge: "Popüler",
    title: "Sözdizimi Vurgulu Temiz Kod Kartları",
    desc: "15+ modern tema (One Dark, Dracula, Cyberpunk, Nord...), satır numaraları, degrade kenarlık ve 3D derinlikle kod parçacıklarınızı birer sanat eserine dönüştürün.",
  },
  {
    id: "diff",
    label: "Diff Karşılaştırma",
    icon: <GitCompare className="w-4 h-4" />,
    badge: "Refactor",
    title: "Önce / Sonra Kod Değişiklikleri",
    desc: "Kırmızı ve yeşil sözdizimi ayrıştırmasıyla eski ve yeni kod farklarını anlaşılır kılın. Kod incelemeleri ve teknik paylaşımlar için ideal.",
  },
  {
    id: "terminal",
    label: "Terminal (CLI)",
    icon: <Terminal className="w-4 h-4" />,
    badge: "Yeni",
    title: "Etkileyici Komut Satırı Çıktıları",
    desc: "npm, docker, cargo ve git gibi popüler araçların terminal çıktılarını durum rozetleri (✔, ✖, ℹ, ⚠) ve renkli CLI stiliyle paylaşın.",
  },
  {
    id: "tweet",
    label: "X / Tweet",
    icon: <Twitter className="w-4 h-4" />,
    badge: "Sosyal",
    title: "Göz Alıcı Sosyal Medya Gönderileri",
    desc: "Profil fotoğrafınız, onay rozeti (@username) ve etkileşim sayaçlarıyla düşüncelerinizi ve teknik ipuçlarınızı viral formatta sunun.",
  },
  {
    id: "quote",
    label: "Alıntı & Not",
    icon: <Quote className="w-4 h-4" />,
    badge: "Minimal",
    title: "Mühendislik İlkeleri & Alıntılar",
    desc: "Zarif tırnak işaretleri, yazar bilgisi ve sıcak degrade geçişleriyle yazılım felsefesini ve ilham verici alıntıları öne çıkarın.",
  },
];

export const LandingShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ShowcaseTab>("code");
  const currentTab = TABS.find((t) => t.id === activeTab) || TABS[0];

  return (
    <section id="showcase" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
          Çok Amaçlı Tuval
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-4 mb-4">
          Her İçerik Türü İçin <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
            Özelleştirilmiş Formatlar
          </span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          SnapMark sadece bir kod güzelleştirici değil; geliştiricilerin tüm görsel paylaşım ihtiyaçlarını karşılayan hepsi bir arada tasarım stüdyosudur.
        </p>
      </div>

      {/* Tab Selector Buttons */}
      <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-500 scale-105"
                  : "bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"
                }`}
              >
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Showcase Grid: Details Left, Card Preview Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-950/60 border border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-sm relative overflow-hidden">
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 blur-[100px] pointer-events-none" />

        {/* Left Column: Context Info */}
        <div className="lg:col-span-5 flex flex-col justify-center text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 text-xs font-medium w-fit border border-indigo-500/20">
            {currentTab.icon}
            <span>{currentTab.label} Modu</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
            {currentTab.title}
          </h3>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {currentTab.desc}
          </p>

          <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>4K Ultra-HD Retina kalitesinde anında dışa aktarma</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Sosyal medya en-boy oranlarına tek tıkla otomatik sığdırma</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Özel filigran ve marka logosu entegrasyonu</span>
            </li>
          </ul>

          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer group"
            >
              <span>Bu Modu Stüdyoda Aç</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right Column: Live Card Rendering Mock */}
        <div className="lg:col-span-7 flex items-center justify-center">
          <div className="w-full max-w-xl rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-indigo-950/60 via-slate-900/90 to-purple-950/50 border border-slate-800 shadow-2xl relative">
            {/* Conditional Mock Content by Active Tab */}
            {activeTab === "code" && (
              <div className="rounded-xl bg-[#1e1e2e] border border-white/10 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">
                <div className="px-4 py-2.5 bg-black/30 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    <span className="ml-2 text-xs text-slate-400">authService.ts</span>
                  </div>
                  <span className="text-[10px] text-indigo-400">JWT • Argon2</span>
                </div>
                <div className="p-5 text-slate-300 leading-relaxed bg-[#181825]">
                  <p><span className="text-purple-400">export async function</span> <span className="text-blue-400">verifySession</span>(token: <span className="text-yellow-300">string</span>) &#123;</p>
                  <p className="pl-4"><span className="text-purple-400">const</span> payload = <span className="text-purple-400">await</span> jwt.<span className="text-blue-400">verify</span>(token, SECRET);</p>
                  <p className="pl-4"><span className="text-purple-400">if</span> (!payload.isValid) &#123;</p>
                  <p className="pl-8 text-pink-400">throw new UnauthorizedException(&quot;Invalid Token&quot;);</p>
                  <p className="pl-4">&#125;</p>
                  <p className="pl-4"><span className="text-purple-400">return</span> payload.user;</p>
                  <p>&#125;</p>
                </div>
              </div>
            )}

            {activeTab === "diff" && (
              <div className="rounded-xl bg-[#1e1e2e] border border-white/10 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">
                <div className="px-4 py-2.5 bg-black/30 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    <span className="ml-2 text-xs text-slate-400">performanceOptimizer.ts</span>
                  </div>
                  <span className="text-[10px] text-emerald-400">Diff Modu</span>
                </div>
                <div className="p-4 leading-relaxed bg-[#181825] space-y-1">
                  <div className="px-2 py-1 bg-red-500/15 border-l-2 border-red-500 text-red-300">
                    - const result = items.filter(x =&gt; x.active).map(x =&gt; x.value);
                  </div>
                  <div className="px-2 py-1 bg-emerald-500/15 border-l-2 border-emerald-500 text-emerald-300">
                    + const result = items.reduce((acc, x) =&gt; x.active ? (acc.push(x.value), acc) : acc, []);
                  </div>
                  <p className="text-slate-500 text-[11px] pt-1">// 🚀 Bellek tahsisatını 4 kat azalttık</p>
                </div>
              </div>
            )}

            {activeTab === "terminal" && (
              <div className="rounded-xl bg-[#0d1117] border border-slate-700 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">
                <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-slate-700" />
                    <div className="w-3 h-3 rounded-full bg-slate-700" />
                    <div className="w-3 h-3 rounded-full bg-slate-700" />
                    <span className="ml-2 text-xs text-slate-400">bash — 80x24</span>
                  </div>
                  <span className="text-[10px] text-cyan-400">CLI Çıktısı</span>
                </div>
                <div className="p-5 text-slate-300 space-y-2 bg-[#090d13]">
                  <p className="text-emerald-400">developer@snapmark:~$ <span className="text-white">npm run build</span></p>
                  <p className="text-slate-400 text-[11px]">&gt; next build --turbo</p>
                  <p className="text-cyan-400 text-[11px]">✔ Creating an optimized production build</p>
                  <p className="text-emerald-400 text-[11px]">✔ Compiled successfully in 1,280ms</p>
                  <p className="text-purple-300 text-[11px]">✔ 0 TypeScript errors detected</p>
                  <p className="text-amber-300 text-[11px]">✨ Ready for deployment to Edge Network</p>
                </div>
              </div>
            )}

            {activeTab === "tweet" && (
              <div className="rounded-xl bg-[#000000] border border-slate-800 shadow-2xl p-5 text-left">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                    KD
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-white text-sm">Kerem Dev</span>
                      <span className="text-cyan-400 text-xs">✔</span>
                    </div>
                    <span className="text-slate-500 text-xs font-mono">@keremdev</span>
                  </div>
                </div>
                <p className="text-slate-200 text-sm leading-relaxed mb-4">
                  Bulanık ekran alıntıları dönemi bitti. 🚀 Artık tüm teknik paylaşımlarımı ve kod mimarilerini SnapMark ile hazırlıyorum. 4K retina kalitesi sosyal medyada bambaşka görünüyor!
                </p>
                <div className="flex items-center justify-between text-slate-500 text-xs border-t border-slate-900 pt-3">
                  <span>💬 48 Yanıt</span>
                  <span>🔁 124 Yeniden Gönderi</span>
                  <span>❤️ 892 Beğeni</span>
                </div>
              </div>
            )}

            {activeTab === "quote" && (
              <div className="rounded-xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 shadow-2xl p-6 text-left relative overflow-hidden">
                <span className="text-indigo-500/20 text-7xl font-serif absolute -top-3 -left-1 select-none pointer-events-none">
                  &ldquo;
                </span>
                <p className="text-slate-200 text-base sm:text-lg italic font-serif leading-relaxed mb-4 relative z-10">
                  &ldquo;Herhangi bir aptal bir bilgisayarın anlayabileceği kodu yazabilir. İyi programcılar ise insanların anlayabileceği kodu yazar.&rdquo;
                </p>
                <div className="flex items-center gap-2 border-t border-slate-800/80 pt-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  <span className="text-xs font-semibold text-white">Martin Fowler</span>
                  <span className="text-slate-500 text-xs">• Refactoring Kitabı</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
