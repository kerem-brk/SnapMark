import React from "react";
import type { Metadata } from "next";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingShowcase } from "@/components/landing/LandingShowcase";
import { LandingFeatures } from "@/components/landing/LandingFeatures";
import { LandingFaq } from "@/components/landing/LandingFaq";
import { LandingFooter } from "@/components/landing/LandingFooter";

export const metadata: Metadata = {
  title: "SnapMark Pro — Geliştiriciler İçin Kristal Netliğinde 4K Kod Kartı Tasarım Stüdyosu",
  description:
    "Bulanık ekran alıntılarına son verin. 4K Ultra-HD çözünürlük, 3D perspektif eğimi, Instagram ve LinkedIn carousel slaytları, daktilo animasyonu ve zengin tipografiyle göz alıcı kod kartları üretin. 100% ücretsiz ve tarayıcıda çalışır.",
  openGraph: {
    title: "SnapMark Pro — Geliştiriciler İçin 4K Kod Kartı Stüdyosu",
    description:
      "3D perspektif, çoklu carousel slaytları, daktilo animasyonu ve sosyal medya formatlarıyla profesyonel kod kartları oluşturun.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Navigation Bar */}
      <LandingNavbar />

      {/* Main Sections */}
      <main className="flex-1">
        <LandingHero />
        <LandingShowcase />
        <LandingFeatures />
        <LandingFaq />
      </main>

      {/* Footer & Conversion Banner */}
      <LandingFooter />
    </div>
  );
}
