"use client";

import React from "react";
import {
  Sparkles,
  Layers,
  Command,
  Play,
  ShieldCheck,
  Share2,
  Maximize2,
  Sliders,
  Download,
  Eye,
} from "lucide-react";

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
  tag?: string;
}

const FEATURES: FeatureItem[] = [
  {
    icon: <Download className="w-5 h-5 text-indigo-400" />,
    title: "4K Ultra-HD & Vektör SVG",
    desc: "Bulanıklığa son. 1x, 2x ve 4K retina çözünürlüğünde PNG, ölçeklenebilir SVG ve çoklu slaytlar için tek tıkla toplu ZIP indirme desteği.",
    tag: "Yüksek Çözünürlük",
  },
  {
    icon: <Eye className="w-5 h-5 text-purple-400" />,
    title: "3D Perspektif & Eğim",
    desc: "X ve Y eksenlerinde gerçekçi 3D derinlik açısı verin. Otomatik dinamik gölgeler ile kartlarınızı düz tasarımlardan ayırın.",
    tag: "3D Derinlik",
  },
  {
    icon: <Layers className="w-5 h-5 text-cyan-400" />,
    title: "Çoklu Carousel Slaytları",
    desc: "LinkedIn ve Instagram için çoklu slayt akışları tasarlayın. Slaytları yeniden sıralayın, çoğaltın ve her slaytta farklı modlar kullanın.",
    tag: "Çoklu İçerik",
  },
  {
    icon: <Command className="w-5 h-5 text-amber-400" />,
    title: "Komut Paleti (Ctrl + K)",
    desc: "Klavyeden elinizi kaldırmadan tüm temalara, formatlara, export seçeneklerine ve kısayollara anında arayarak ulaşın.",
    tag: "Hızlı İş Akışı",
  },
  {
    icon: <Play className="w-5 h-5 text-pink-400" />,
    title: "Daktilo (Typewriter) Akışı",
    desc: "Kodunuzu harf harf canlı yazdıran daktilo animasyonunu tek tıkla başlatın. Sunum modunda etkileşimli gösterimler yapın.",
    tag: "Canlı Animasyon",
  },
  {
    icon: <Sparkles className="w-5 h-5 text-emerald-400" />,
    title: "Özel Marka Logosu & Filigran",
    desc: "Kendi PNG/SVG logonuzu yükleyin, 4 köşeden birine konumlandırın, boyut ve opaklık ayarlarıyla kişisel imzanızı atın.",
    tag: "Markalaşma",
  },
  {
    icon: <Share2 className="w-5 h-5 text-blue-400" />,
    title: "Sosyal Medya Hazır Boyutları",
    desc: "Twitter (16:9), Instagram Story (9:16), Instagram Kare (1:1), LinkedIn Banner ve YouTube Thumbnail oranlarına tek tıkla uyarlayın.",
    tag: "Çoklu Platform",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-teal-400" />,
    title: "%100 İstemci Taraflı & Güvenli",
    desc: "Yazdığınız kodlar, API anahtarları veya logolar hiçbir sunucuya iletilmez. Her şey yerel tarayıcınızda işlenir ve otomatik saklanır.",
    tag: "Tam Gizlilik",
  },
];

export const LandingFeatures: React.FC = () => {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
          Güçlü Özellikler
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-4 mb-4">
          Geliştiricilerin İhtiyaç Duyduğu <br />
          <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Tüm İnce Ayarlar Tek Çatıda
          </span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Karmaşık grafik programlarına ihtiyaç duymadan, saniyeler içinde profesyonel ve yüksek etkileşimli içerikler hazırlayın.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURES.map((f, idx) => (
          <div
            key={idx}
            className="group relative rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-indigo-500/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 flex flex-col justify-between"
          >
            <div>
              {/* Icon & Tag */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center group-hover:scale-110 group-hover:border-indigo-500/50 transition-all">
                  {f.icon}
                </div>
                {f.tag && (
                  <span className="text-[10px] font-medium font-mono text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded-md border border-slate-700/50">
                    {f.tag}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                {f.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {f.desc}
              </p>
            </div>

            {/* Micro Indicator Line */}
            <div className="w-8 h-0.5 bg-slate-800 group-hover:bg-indigo-500 group-hover:w-full transition-all duration-300 mt-5 rounded-full" />
          </div>
        ))}
      </div>
    </section>
  );
};
