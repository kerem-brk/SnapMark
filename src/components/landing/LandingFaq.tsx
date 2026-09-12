"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "SnapMark gerçekten tamamen ücretsiz mi?",
    answer:
      "Evet! SnapMark, geliştirici topluluğu için tamamen ücretsiz ve reklamsız olarak geliştirilmiştir. Herhangi bir gizli ücret, abonelik, kredi kartı veya kayıt olma zorunluluğu yoktur.",
  },
  {
    question: "Yazdığım kodlar sunucularınıza iletiliyor veya kaydediliyor mu?",
    answer:
      "Kesinlikle hayır. SnapMark %100 istemci taraflı (client-side) çalışır. Kod renklendirme, tuval çizimi, 3D hesaplamaları ve dosya dışa aktarma işlemlerinin tamamı tarayıcınızın içinde Web API'leri ile gerçekleşir.",
  },
  {
    question: "4K çözünürlükte indirme ne kadar net sonuç veriyor?",
    answer:
      "SnapMark dışa aktarma motoru 4x Retina piksel yoğunluğu (DPI) çarpanı kullanır. Bu sayede Twitter/X, LinkedIn ve Instagram algoritmalarının görsel sıkıştırmasında dahi kodlarınız pırıl pırıl, keskin ve okunabilir kalır.",
  },
  {
    question: "Sosyal medya gönderileri için hangi formatlar hazır bulunuyor?",
    answer:
      "Twitter / X Gönderisi (1200×675), Instagram Dikey Hikaye (1080×1920), Instagram Kare (1080×1080), LinkedIn Başlık Görseli (1584×396) ve YouTube Küçük Resim (1280×720) en-boy oranları tek tıkla uygulanabilir.",
  },
  {
    question: "Kendi şirket logomu veya filigranımı ekleyebilir miyim?",
    answer:
      "Evet. Ayarlar panelindeki 'Özel Marka Logosu & Filigran' bölümünden PNG veya SVG formatındaki logonuzu yükleyebilir, 4 köşeden dilediğinize yerleştirip opaklık ve boyutunu hassasça ayarlayabilirsiniz.",
  },
];

export const LandingFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-14">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
          Merak Edilenler
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-4 mb-3">
          Sıkça Sorulan Sorular
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          SnapMark kullanımı, gizlilik ve özellikler hakkında aklınıza takılanlar.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? "bg-slate-900/90 border-indigo-500/40 shadow-lg shadow-indigo-500/5"
                  : "bg-slate-900/40 border-slate-800/80 hover:border-slate-700/80"
              }`}
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full px-6 py-4 sm:py-5 flex items-center justify-between text-left cursor-pointer gap-4"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                  <span className="text-sm sm:text-base font-semibold text-slate-100">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                    isOpen ? "rotate-180 text-indigo-400" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/60 pl-14">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
