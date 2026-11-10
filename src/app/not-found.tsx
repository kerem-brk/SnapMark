import React from "react";
import Link from "next/link";
import { Sparkles, Home, ArrowLeft, Camera } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
      {/* İnce radyal ışıma */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: "radial-gradient(circle at 50% 40%, rgba(255, 79, 0, 0.12) 0%, transparent 65%)"
        }}
      />

      <div className="relative z-10 max-w-md w-full text-center space-y-6">
        {/* Üst Rozet */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-800 text-xs font-mono text-orange-400">
          <Camera className="w-3.5 h-3.5 text-[#FF4F00]" />
          <span>HATA 404 • SAYFA BULUNAMADI</span>
        </div>

        {/* 404 Başlık */}
        <div className="space-y-2">
          <h1 className="text-7xl sm:text-8xl font-black tracking-tight text-white font-mono">
            4<span className="text-[#FF4F00]">0</span>4
          </h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-neutral-200">
            Aradığınız Kare Çerçevede Yok
          </h2>
          <p className="text-sm text-neutral-400 leading-relaxed max-w-sm mx-auto">
            İstediğiniz sayfa taşınmış, silinmiş veya yanlış yazılmış olabilir. Kod kartlarınızı 4K Ultra-HD tasarlamaya hemen geri dönebilirsiniz.
          </p>
        </div>

        {/* Aksiyon Butonları */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/studio"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#FF4F00] hover:bg-[#e04500] text-white text-sm font-semibold shadow-lg shadow-orange-500/20 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Stüdyoyu Aç</span>
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 text-sm font-medium transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Ana Sayfa</span>
          </Link>
        </div>

        {/* Geri Dönüş Linki */}
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>SnapMark stüdyo paneline dön</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
