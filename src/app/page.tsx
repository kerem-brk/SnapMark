"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { Header } from "@/components/Header";
import { Controls } from "@/components/Controls";
import { CodeEditor } from "@/components/CodeEditor";
import { PreviewCard } from "@/components/PreviewCard";
import { CarouselNav } from "@/components/CarouselNav";
import { ToastContainer } from "@/components/Toast";
import { ShortcutsModal } from "@/components/ShortcutsModal";
import { CommandPalette } from "@/components/CommandPalette";
import { PresentationMode } from "@/components/PresentationMode";
import { SocialFeedPreviewModal } from "@/components/SocialFeedPreviewModal";
import {
  DEFAULT_CONFIG,
  updateFilenameExtension,
  detectLanguageFromFilename,
  LANG_TO_DEFAULT_EXT,
} from "@/lib/constants";
import { CardConfig, CarouselSlide, CardMode, ToastMessage, ToastType } from "@/types";
import { toPng, toBlob, toSvg } from "html-to-image";
import { Eye, Edit3, Sliders, PanelLeftOpen, ZoomIn, ZoomOut } from "lucide-react";
import JSZip from "jszip";

export default function Home() {
  const [config, setConfig] = useState<CardConfig>(DEFAULT_CONFIG);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [isVideoExporting, setIsVideoExporting] = useState<boolean>(false);
  const [isZipExporting, setIsZipExporting] = useState<boolean>(false);
  const [zipProgress, setZipProgress] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"preview" | "controls" | "editor">("preview");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isFeedModalOpen, setIsFeedModalOpen] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Toast Bildirimleri (Faz 6)
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const showToast = useCallback((message: string, type: ToastType = "success", description?: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev.slice(-4), { id, type, message, description }]);
  }, []);
  const handleDismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Kısayollar Modalı (Faz 6)
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState<boolean>(false);

  // Komut Paleti, Sunum Modu ve Zoom (Faz 7A)
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isPresentationOpen, setIsPresentationOpen] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  // JSON Tema Dışa ve İçe Aktarma (Faz 7A)
  const handleExportThemeJson = useCallback(() => {
    try {
      const themeData = JSON.stringify(config, null, 2);
      const blob = new Blob([themeData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `snapmark-theme-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast("Tema JSON dosyası olarak indirildi", "success");
    } catch (e) {
      showToast("Tema dışa aktarılamadı", "error");
    }
  }, [config, showToast]);

  const handleImportThemeJson = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const parsed = JSON.parse(text);
        if (parsed && typeof parsed === "object") {
          setConfig((prev) => ({ ...prev, ...parsed }));
          showToast("Tema başarıyla yüklendi", "success");
        }
      } catch (err) {
        showToast("Geçersiz JSON tema dosyası", "error");
      }
    };
    reader.readAsText(file);
  }, [showToast]);

  // Geri Al / İleri Al (Undo / Redo - Faz 6)
  const historyRef = useRef<CardConfig[]>([]);
  const historyIndexRef = useRef<number>(-1);
  const isUndoRedoAction = useRef<boolean>(false);
  const [canUndo, setCanUndo] = useState<boolean>(false);
  const [canRedo, setCanRedo] = useState<boolean>(false);

  // Otomatik Kaydetme Anahtarı (Faz 6)
  const AUTOSAVE_KEY = "snapmark_autosave_v2";

  // Paylaşılan URL Hash'ini veya LocalStorage Kaydını Çöz ve Yükle
  useEffect(() => {
    const loadInitialConfig = () => {
      try {
        if (typeof window !== "undefined") {
          const hash = window.location.hash;
          if (hash && hash.startsWith("#c=")) {
            const encoded = hash.replace("#c=", "");
            const decoded = decodeURIComponent(escape(atob(encoded)));
            const parsed = JSON.parse(decoded);
            if (parsed && typeof parsed === "object") {
              setConfig((prev) => ({ ...prev, ...parsed }));
              showToast("Paylaşılan kart yüklendi", "info");
              return;
            }
          }

          // Hash yoksa LocalStorage'dan geri yükle
          const saved = localStorage.getItem(AUTOSAVE_KEY);
          if (saved) {
            const parsedSaved = JSON.parse(saved);
            if (parsedSaved && typeof parsedSaved === "object") {
              setConfig((prev) => ({ ...prev, ...parsedSaved }));
            }
          }
        }
      } catch (e) {
        console.error("Ayarlar yüklenemedi:", e);
      }
    };

    loadInitialConfig();
    window.addEventListener("hashchange", loadInitialConfig);
    return () => window.removeEventListener("hashchange", loadInitialConfig);
  }, [showToast]);

  // LocalStorage Otomatik Kaydetme (Faz 6)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const timer = setTimeout(() => {
      try {
        const { customBgUrl, tweetAvatar, ...safeConfig } = config;
        const toSave = {
          ...safeConfig,
          customBgUrl: customBgUrl?.startsWith("http") ? customBgUrl : undefined,
          tweetAvatar: tweetAvatar?.startsWith("http") ? tweetAvatar : undefined,
        };
        localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(toSave));
      } catch (e) {
        console.error("LocalStorage kaydedilemedi:", e);
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [config]);

  // Undo / Redo Geçmiş Yığını (Faz 6)
  useEffect(() => {
    if (isUndoRedoAction.current) {
      isUndoRedoAction.current = false;
      return;
    }

    const timer = setTimeout(() => {
      const history = historyRef.current;
      const currentIndex = historyIndexRef.current;

      const newHistory = history.slice(0, currentIndex + 1);
      newHistory.push(config);

      if (newHistory.length > 30) {
        newHistory.shift();
      }

      historyRef.current = newHistory;
      historyIndexRef.current = newHistory.length - 1;
      setCanUndo(newHistory.length > 1);
      setCanRedo(false);
    }, 250);

    return () => clearTimeout(timer);
  }, [config]);

  const handleUndo = useCallback(() => {
    const history = historyRef.current;
    const currentIndex = historyIndexRef.current;
    if (currentIndex > 0) {
      const targetIndex = currentIndex - 1;
      const prevConfig = history[targetIndex];
      historyIndexRef.current = targetIndex;
      isUndoRedoAction.current = true;
      setConfig(prevConfig);
      setCanUndo(targetIndex > 0);
      setCanRedo(true);
      showToast("Değişiklik geri alındı", "info");
    }
  }, [showToast]);

  const handleRedo = useCallback(() => {
    const history = historyRef.current;
    const currentIndex = historyIndexRef.current;
    if (currentIndex < history.length - 1) {
      const targetIndex = currentIndex + 1;
      const nextConfig = history[targetIndex];
      historyIndexRef.current = targetIndex;
      isUndoRedoAction.current = true;
      setConfig(nextConfig);
      setCanUndo(true);
      setCanRedo(targetIndex < history.length - 1);
      showToast("Değişiklik yinelendi", "info");
    }
  }, [showToast]);

  const handleResetDefaults = useCallback(() => {
    try {
      localStorage.removeItem(AUTOSAVE_KEY);
      setConfig(DEFAULT_CONFIG);
      historyRef.current = [DEFAULT_CONFIG];
      historyIndexRef.current = 0;
      setCanUndo(false);
      setCanRedo(false);
      showToast("Fabrika ayarlarına dönüldü", "info", "Tüm ayarlar ve kodlar sıfırlandı");
    } catch (e) {
      console.error(e);
    }
  }, [showToast]);

  const handleConfigChange = (updates: Partial<CardConfig>) => {
    setConfig((prev) => {
      const next = { ...prev, ...updates };

      // 1. KULLANICI YAZILIM DİLİNİ DEĞİŞTİRDİĞİNDE (Örn: Python seçti)
      // Dosya adının ve aktif sekmenin uzantısını otomatik olarak o dile senkronize et!
      if (updates.language && updates.language !== prev.language) {
        const newLang = updates.language;
        const currentTitle = updates.title || prev.title || "snippet.ts";
        const newTitle = updateFilenameExtension(currentTitle, newLang);
        next.title = newTitle;

        if (next.tabs && next.tabs.length > 0) {
          next.tabs = next.tabs.map((t) =>
            t.id === next.activeTabId
              ? {
                  ...t,
                  language: newLang,
                  name: updateFilenameExtension(t.name, newLang),
                }
              : t
          );
        }
      }

      // 2. KULLANICI DOSYA ADINI ELLE DEĞİŞTİRDİĞİNDE (Örn: script.py yazdı)
      // Uzantıdan dili otomatik tanı ve yazılım dilini de otomatik güncelle!
      if (updates.title && updates.title !== prev.title && !updates.language) {
        const detected = detectLanguageFromFilename(updates.title);
        if (detected) {
          next.language = detected;
        }
        if (next.tabs && next.tabs.length > 0) {
          next.tabs = next.tabs.map((t) =>
            t.id === next.activeTabId
              ? {
                  ...t,
                  name: updates.title!,
                  language: detected || t.language,
                }
              : t
          );
        }
      }

      // 3. GENEL SENKRONIZASYON: Dış kaynaklardan (GitHub İçe Aktarma, URL Paylaşımı)
      // gelen code/title/language güncellemelerini aktif sekmeye de yansıt.
      if (next.tabs && next.tabs.length > 0) {
        next.tabs = next.tabs.map((t) =>
          t.id === next.activeTabId
            ? {
                ...t,
                code: updates.code ?? t.code,
                name: updates.title ?? t.name,
                language: updates.language ?? t.language,
              }
            : t
        );
      }

      return next;
    });
  };

  // Aktif Sekmeyi Değiştirme
  const handleSelectTab = useCallback((tabId: string) => {
    setConfig((prev) => {
      if (!prev.tabs) return prev;
      const targetTab = prev.tabs.find((t) => t.id === tabId);
      if (!targetTab) return prev;

      // Önceki aktif sekmenin mevcut kodunu ve dilini kaydet
      const updatedTabs = prev.tabs.map((t) =>
        t.id === prev.activeTabId
          ? { ...t, code: prev.code, language: prev.language, name: prev.title || t.name }
          : t
      );

      return {
        ...prev,
        tabs: updatedTabs,
        activeTabId: tabId,
        code: targetTab.code,
        language: targetTab.language,
        title: targetTab.name,
      };
    });
  }, []);

  // Yeni Sekme Ekleme (Seçili dilin varsayılan uzantısıyla açılır)
  const handleAddTab = useCallback(() => {
    setConfig((prev) => {
      const tabs = prev.tabs || [];
      const newIndex = tabs.length + 1;
      const newTabId = `tab-${Date.now()}`;
      const ext = LANG_TO_DEFAULT_EXT[prev.language] || ".ts";
      const newTab = {
        id: newTabId,
        name: `module-${newIndex}${ext}`,
        language: prev.language,
        code: `// Yeni Kod Dosyası (#${newIndex})\nexport const active = true;\n`,
      };

      // Mevcut aktif sekmenin kodunu kaydet
      const updatedTabs = tabs.map((t) =>
        t.id === prev.activeTabId
          ? { ...t, code: prev.code, language: prev.language, name: prev.title || t.name }
          : t
      );

      return {
        ...prev,
        tabs: [...updatedTabs, newTab],
        activeTabId: newTabId,
        code: newTab.code,
        language: newTab.language,
        title: newTab.name,
      };
    });
  }, []);

  // Sekmeyi Kapatma
  const handleCloseTab = useCallback((tabId: string) => {
    setConfig((prev) => {
      const tabs = prev.tabs || [];
      if (tabs.length <= 1) return prev;

      const filteredTabs = tabs.filter((t) => t.id !== tabId);
      let nextActiveId = prev.activeTabId;
      let nextCode = prev.code;
      let nextLang = prev.language;
      let nextTitle = prev.title;

      if (prev.activeTabId === tabId) {
        const fallbackTab = filteredTabs[0];
        nextActiveId = fallbackTab.id;
        nextCode = fallbackTab.code;
        nextLang = fallbackTab.language;
        nextTitle = fallbackTab.name;
      }

      return {
        ...prev,
        tabs: filteredTabs,
        activeTabId: nextActiveId,
        code: nextCode,
        language: nextLang,
        title: nextTitle,
      };
    });
  }, []);

  // Sekme Adını Değiştirme (Uzantıdan dili otomatik algılar)
  const handleRenameTab = useCallback((tabId: string, newName: string) => {
    setConfig((prev) => {
      const tabs = prev.tabs || [];
      const detectedLang = detectLanguageFromFilename(newName);
      const isCurrentActive = prev.activeTabId === tabId;

      const updatedTabs = tabs.map((t) =>
        t.id === tabId
          ? {
              ...t,
              name: newName,
              language: detectedLang || t.language,
            }
          : t
      );

      return {
        ...prev,
        tabs: updatedTabs,
        title: isCurrentActive ? newName : prev.title,
        language: isCurrentActive && detectedLang ? detectedLang : prev.language,
      };
    });
  }, []);

  // Kod Değişikliği (Aktif Sekme ile Senkron)
  const handleCodeChange = useCallback((newCode: string) => {
    setConfig((prev) => {
      const tabs = prev.tabs?.map((t) =>
        t.id === prev.activeTabId ? { ...t, code: newCode } : t
      );
      return {
        ...prev,
        code: newCode,
        tabs: tabs || prev.tabs,
      };
    });
  }, []);

  // Satır vurgusunu aç/kapa (tuvalden tıklanınca)
  const handleToggleLineHighlight = useCallback((lineNum: number) => {
    setConfig((prev) => {
      const set = new Set<number>();
      if (prev.highlightedLines) {
        const parts = prev.highlightedLines.split(",");
        for (const part of parts) {
          const trimmed = part.trim();
          if (trimmed.includes("-")) {
            const [s, e] = trimmed.split("-").map((n) => parseInt(n.trim(), 10));
            if (!isNaN(s) && !isNaN(e)) {
              for (let i = Math.min(s, e); i <= Math.max(s, e); i++) set.add(i);
            }
          } else {
            const num = parseInt(trimmed, 10);
            if (!isNaN(num)) set.add(num);
          }
        }
      }

      if (set.has(lineNum)) {
        set.delete(lineNum);
      } else {
        set.add(lineNum);
      }

      const sorted = Array.from(set).sort((a, b) => a - b);
      const ranges: string[] = [];
      let rangeStart: number | null = null;
      let rangePrev: number | null = null;

      for (const num of sorted) {
        if (rangeStart === null) {
          rangeStart = num;
          rangePrev = num;
        } else if (num === rangePrev! + 1) {
          rangePrev = num;
        } else {
          if (rangeStart === rangePrev) {
            ranges.push(`${rangeStart}`);
          } else if (rangePrev! === rangeStart + 1) {
            ranges.push(`${rangeStart}, ${rangePrev}`);
          } else {
            ranges.push(`${rangeStart}-${rangePrev}`);
          }
          rangeStart = num;
          rangePrev = num;
        }
      }
      if (rangeStart !== null) {
        if (rangeStart === rangePrev) {
          ranges.push(`${rangeStart}`);
        } else if (rangePrev! === rangeStart + 1) {
          ranges.push(`${rangeStart}, ${rangePrev}`);
        } else {
          ranges.push(`${rangeStart}-${rangePrev}`);
        }
      }

      return {
        ...prev,
        highlightedLines: ranges.join(", "),
      };
    });
  }, []);

  // Panoya Kopyalama Fonksiyonu
  const handleCopyImage = useCallback(async () => {
    if (!cardRef.current) return;
    setIsExporting(true);

    try {
      const scale = config.exportScale || 2;
      const blob = await toBlob(cardRef.current, {
        pixelRatio: scale,
        cacheBust: true,
      });

      if (!blob) throw new Error("Görsel blobu üretilemedi");

      await navigator.clipboard.write([
        new ClipboardItem({
          "image/png": blob,
        }),
      ]);

      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      showToast("Görsel panoya kopyalandı", "success", "Sosyal medyaya veya sohbete Ctrl+V ile yapıştırabilirsiniz");
    } catch (err) {
      console.error("Panoya kopyalama hatası:", err);
      // Fallback: Data URL oluşturup bildir
      try {
        const scale = config.exportScale || 2;
        const dataUrl = await toPng(cardRef.current, { pixelRatio: scale });
        const link = document.createElement("a");
        link.download = `${config.title || "snapmark"}.png`;
        link.href = dataUrl;
        link.click();
        showToast("Panoya kopyalanamadı, PNG olarak indirildi", "info");
      } catch (e) {
        showToast("Görsel kopyalanırken bir sorun oluştu", "error");
      }
    } finally {
      setIsExporting(false);
    }
  }, [config.title, config.exportScale, showToast]);

  // PNG İndirme Fonksiyonu
  const handleDownloadImage = useCallback(async () => {
    if (!cardRef.current) return;
    setIsExporting(true);

    try {
      const scale = config.exportScale || 2;
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: scale,
        cacheBust: true,
      });

      const link = document.createElement("a");
      link.download = `${config.title || "snapmark"}.png`;
      link.href = dataUrl;
      link.click();
      showToast("PNG görseli indirildi", "success", `${config.exportScale || 2}x çözünürlükte kaydedildi`);
    } catch (err) {
      console.error("İndirme hatası:", err);
      showToast("Görsel indirilirken bir hata oluştu", "error");
    } finally {
      setIsExporting(false);
    }
  }, [config.title, config.exportScale, showToast]);

  // SVG İndirme Fonksiyonu
  const handleDownloadSvg = useCallback(async () => {
    if (!cardRef.current) return;
    setIsExporting(true);

    try {
      const dataUrl = await toSvg(cardRef.current, {
        cacheBust: true,
      });

      const link = document.createElement("a");
      link.download = `${config.title || "snapmark"}.svg`;
      link.href = dataUrl;
      link.click();
      showToast("Vektörel SVG indirildi", "info", "Sınırsız ölçeklenebilir vektör çıktısı");
    } catch (err) {
      console.error("SVG indirme hatası:", err);
      showToast("SVG çıktısı alınırken bir hata oluştu", "error");
    } finally {
      setIsExporting(false);
    }
  }, [config.title, showToast]);

  // 1. Slayt Seçimi (Mevcut slayt içeriğini kaydet, yeni slaytı yükle) (Faz 5)
  const handleSelectSlide = useCallback((targetSlideId: string) => {
    setConfig((prev) => {
      const slides = prev.slides || [];
      const targetSlide = slides.find((s) => s.id === targetSlideId);
      if (!targetSlide) return prev;

      // Mevcut aktif slaytın son halini güncelle
      const updatedSlides = slides.map((s) =>
        s.id === prev.activeSlideId
          ? {
              ...s,
              title: prev.title,
              code: prev.code,
              language: prev.language,
              mode: prev.mode,
              quoteContent: prev.quoteContent,
              quoteAuthor: prev.quoteAuthor,
              quoteTitle: prev.quoteTitle,
              tweetContent: prev.tweetContent,
              diffBeforeCode: prev.diffBeforeCode,
              diffAfterCode: prev.diffAfterCode,
            }
          : s
      );

      return {
        ...prev,
        slides: updatedSlides,
        activeSlideId: targetSlideId,
        title: targetSlide.title || prev.title,
        code: targetSlide.code ?? prev.code,
        language: targetSlide.language || prev.language,
        mode: targetSlide.mode || "code",
        quoteContent: targetSlide.quoteContent ?? prev.quoteContent,
        quoteAuthor: targetSlide.quoteAuthor ?? prev.quoteAuthor,
        quoteTitle: targetSlide.quoteTitle ?? prev.quoteTitle,
        tweetContent: targetSlide.tweetContent ?? prev.tweetContent,
        diffBeforeCode: targetSlide.diffBeforeCode ?? prev.diffBeforeCode,
        diffAfterCode: targetSlide.diffAfterCode ?? prev.diffAfterCode,
      };
    });
  }, []);

  // 2. Yeni Slayt Ekleme (Faz 5)
  const handleAddSlide = useCallback(() => {
    setConfig((prev) => {
      const slides = prev.slides || [];
      const newNum = slides.length + 1;
      const newSlideId = `slide-${Date.now()}`;
      const newSlide: CarouselSlide = {
        id: newSlideId,
        name: `Slayt ${newNum}`,
        title: `0${newNum}. Yeni Slayt Başlığı`,
        language: prev.language,
        mode: "code",
        code: `// Slayt #${newNum}\nexport function slideContent() {\n  return "SnapMark Carousel";\n}`,
      };

      // Mevcut aktif slaytın içeriğini koru
      const updatedSlides = slides.map((s) =>
        s.id === prev.activeSlideId
          ? {
              ...s,
              title: prev.title,
              code: prev.code,
              language: prev.language,
              mode: prev.mode,
              quoteContent: prev.quoteContent,
              quoteAuthor: prev.quoteAuthor,
              quoteTitle: prev.quoteTitle,
              tweetContent: prev.tweetContent,
              diffBeforeCode: prev.diffBeforeCode,
              diffAfterCode: prev.diffAfterCode,
            }
          : s
      );

      return {
        ...prev,
        slides: [...updatedSlides, newSlide],
        activeSlideId: newSlideId,
        title: newSlide.title,
        code: newSlide.code,
        language: newSlide.language,
        mode: newSlide.mode,
      };
    });
  }, []);

  // 3. Slayt Çoğaltma (Faz 5)
  const handleDuplicateSlide = useCallback((slideId: string) => {
    setConfig((prev) => {
      const slides = prev.slides || [];
      const target = slides.find((s) => s.id === slideId);
      if (!target) return prev;

      const dupId = `slide-${Date.now()}`;
      const dupSlide: CarouselSlide = {
        ...target,
        id: dupId,
        name: `${target.name} (Kopya)`,
        title: `${target.title} (Kopya)`,
      };

      const updatedSlides = [...slides, dupSlide];
      return {
        ...prev,
        slides: updatedSlides,
        activeSlideId: dupId,
        title: dupSlide.title,
        code: dupSlide.code,
        language: dupSlide.language,
        mode: dupSlide.mode,
        quoteContent: dupSlide.quoteContent ?? prev.quoteContent,
        quoteAuthor: dupSlide.quoteAuthor ?? prev.quoteAuthor,
        quoteTitle: dupSlide.quoteTitle ?? prev.quoteTitle,
        tweetContent: dupSlide.tweetContent ?? prev.tweetContent,
        diffBeforeCode: dupSlide.diffBeforeCode ?? prev.diffBeforeCode,
        diffAfterCode: dupSlide.diffAfterCode ?? prev.diffAfterCode,
      };
    });
  }, []);

  // 4. Slayt Silme (Faz 5)
  const handleDeleteSlide = useCallback((slideId: string) => {
    setConfig((prev) => {
      const slides = prev.slides || [];
      if (slides.length <= 1) return prev;

      const updatedSlides = slides.filter((s) => s.id !== slideId);
      const nextActiveId =
        prev.activeSlideId === slideId ? updatedSlides[0]?.id : prev.activeSlideId;
      const targetSlide = updatedSlides.find((s) => s.id === nextActiveId);

      return {
        ...prev,
        slides: updatedSlides,
        activeSlideId: nextActiveId,
        ...(targetSlide
          ? {
              title: targetSlide.title || prev.title,
              code: targetSlide.code ?? prev.code,
              language: targetSlide.language || prev.language,
              mode: targetSlide.mode || "code",
              quoteContent: targetSlide.quoteContent ?? prev.quoteContent,
              quoteAuthor: targetSlide.quoteAuthor ?? prev.quoteAuthor,
              quoteTitle: targetSlide.quoteTitle ?? prev.quoteTitle,
              tweetContent: targetSlide.tweetContent ?? prev.tweetContent,
              diffBeforeCode: targetSlide.diffBeforeCode ?? prev.diffBeforeCode,
              diffAfterCode: targetSlide.diffAfterCode ?? prev.diffAfterCode,
            }
          : {}),
      };
    });
  }, []);

  // 5. Slayt Sıralama (Sola / Sağa Taşıma)
  const handleMoveSlide = useCallback((slideId: string, direction: "left" | "right") => {
    setConfig((prev) => {
      const slides = (prev.slides || []).map((s) =>
        s.id === prev.activeSlideId
          ? {
              ...s,
              title: prev.title,
              code: prev.code,
              language: prev.language,
              mode: prev.mode,
              quoteContent: prev.quoteContent,
              quoteAuthor: prev.quoteAuthor,
              quoteTitle: prev.quoteTitle,
              tweetContent: prev.tweetContent,
              diffBeforeCode: prev.diffBeforeCode,
              diffAfterCode: prev.diffAfterCode,
            }
          : s
      );

      const index = slides.findIndex((s) => s.id === slideId);
      if (index === -1) return prev;

      const targetIndex = direction === "left" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= slides.length) return prev;

      const updated = [...slides];
      const temp = updated[index];
      updated[index] = updated[targetIndex];
      updated[targetIndex] = temp;

      return {
        ...prev,
        slides: updated,
      };
    });
  }, []);

  // 6. Slayt Modu Değiştirme (Kod, Diff, Alıntı, Tweet)
  const handleUpdateSlideMode = useCallback((slideId: string, mode: CardMode) => {
    setConfig((prev) => {
      const isActive = prev.activeSlideId === slideId;
      const slides = (prev.slides || []).map((s) =>
        s.id === slideId
          ? {
              ...s,
              mode,
            }
          : s
      );

      return {
        ...prev,
        slides,
        ...(isActive ? { mode } : {}),
      };
    });
  }, []);

  // 7. Slayt Yeniden Adlandırma
  const handleRenameSlide = useCallback((slideId: string, newName: string) => {
    setConfig((prev) => {
      const slides = (prev.slides || []).map((s) =>
        s.id === slideId
          ? {
              ...s,
              name: newName,
            }
          : s
      );

      return {
        ...prev,
        slides,
      };
    });
  }, []);

  // 8. Toplu Carousel ZIP İndirme (JSZip ile 100% İstemci Taraflı) (Faz 5)
  const handleZipExport = useCallback(async () => {
    if (!cardRef.current) return;
    // Anlık aktif slayt içeriğini senkronize et
    const slides = (config.slides || []).map((s) =>
      s.id === config.activeSlideId
        ? {
            ...s,
            title: config.title,
            code: config.code,
            language: config.language,
            mode: config.mode,
            quoteContent: config.quoteContent,
            quoteAuthor: config.quoteAuthor,
            quoteTitle: config.quoteTitle,
            tweetContent: config.tweetContent,
            diffBeforeCode: config.diffBeforeCode,
            diffAfterCode: config.diffAfterCode,
          }
        : s
    );

    if (slides.length === 0) return;

    setIsZipExporting(true);
    const originalConfig = { ...config };

    try {
      const zip = new JSZip();
      const scale = config.exportScale || 2;

      for (let i = 0; i < slides.length; i++) {
        const currentSlide = slides[i];
        setZipProgress(`Slayt ${i + 1}/${slides.length} hazırlanıyor...`);

        // Slayt verisini tuvale yükle
        setConfig((prev) => ({
          ...prev,
          activeSlideId: currentSlide.id,
          title: currentSlide.title || prev.title,
          code: currentSlide.code ?? prev.code,
          language: currentSlide.language || prev.language,
          mode: currentSlide.mode || "code",
          quoteContent: currentSlide.quoteContent ?? prev.quoteContent,
          quoteAuthor: currentSlide.quoteAuthor ?? prev.quoteAuthor,
          quoteTitle: currentSlide.quoteTitle ?? prev.quoteTitle,
          tweetContent: currentSlide.tweetContent ?? prev.tweetContent,
          diffBeforeCode: currentSlide.diffBeforeCode ?? prev.diffBeforeCode,
          diffAfterCode: currentSlide.diffAfterCode ?? prev.diffAfterCode,
        }));

        // Render ve Prism'in tamamlanması için bekle
        await new Promise((resolve) => setTimeout(resolve, 250));

        if (cardRef.current) {
          const dataUrl = await toPng(cardRef.current, {
            pixelRatio: scale,
            cacheBust: true,
          });

          // Base64 DataUrl'i ikili Blob'a dönüştür
          const base64Data = dataUrl.split(",")[1];
          if (base64Data) {
            const fileName = `slayt-${String(i + 1).padStart(2, "0")}.png`;
            zip.file(fileName, base64Data, { base64: true });
          }
        }
      }

      setZipProgress("ZIP paketi oluşturuluyor...");
      const zipBlob = await zip.generateAsync({ type: "blob" });

      // İndirmeyi başlat
      const link = document.createElement("a");
      link.href = URL.createObjectURL(zipBlob);
      link.download = `snapmark-carousel-${Date.now()}.zip`;
      link.click();
      URL.revokeObjectURL(link.href);
      showToast("Tüm slaytlar ZIP olarak indirildi", "success", `${slides.length} adet görsel başarıyla arşivlendi`);
    } catch (err) {
      console.error("ZIP Export Hatası:", err);
      showToast("Slaytlar ZIP olarak indirilirken bir hata oluştu", "error");
    } finally {
      // Orijinal durumu geri yükle
      setConfig(originalConfig);
      setIsZipExporting(false);
      setZipProgress("");
    }
  }, [config, showToast]);

  // 5B. Slaytları Sürükle & Bırak ile Yeniden Sıralama (Faz 8)
  const handleReorderSlides = useCallback((newSlides: CarouselSlide[]) => {
    setConfig((prev) => ({
      ...prev,
      slides: newSlides,
    }));
  }, []);

  // 9. Canlı Animasyon Dışa Aktarma (WebM Video) (Faz 8)
  const handleExportVideo = useCallback(async () => {
    if (!cardRef.current) return;

    if (typeof window === "undefined" || !window.MediaRecorder) {
      showToast("Tarayıcınız video kaydetmeyi desteklemiyor", "error");
      return;
    }

    setIsVideoExporting(true);
    showToast(
      config.uiLanguage === "en" ? "Video recording started..." : "Video kaydı başlatıldı...",
      "info",
      config.uiLanguage === "en" ? "Capturing live animation into WebM" : "Canlı animasyon kaydediliyor (~3 saniye)"
    );

    try {
      const cardEl = cardRef.current;
      const rect = cardEl.getBoundingClientRect();
      const canvas = document.createElement("canvas");
      const scale = 1.5;
      canvas.width = Math.round(rect.width * scale);
      canvas.height = Math.round(rect.height * scale);
      const ctx = canvas.getContext("2d");

      if (!ctx) throw new Error("Canvas context oluşturulamadı");

      const stream = canvas.captureStream(25);
      const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
        ? "video/webm;codecs=vp9"
        : MediaRecorder.isTypeSupported("video/webm")
        ? "video/webm"
        : "";

      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunks.push(e.data);
      };

      const recordPromise = new Promise<Blob>((resolve, reject) => {
        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: "video/webm" });
          resolve(blob);
        };
        recorder.onerror = (e) => reject(e);
      });

      recorder.start();

      // Toplam 25 kare alarak akıcı animasyon yakala
      const totalFrames = 25;
      for (let i = 0; i < totalFrames; i++) {
        try {
          const imgDataUrl = await toPng(cardEl, {
            pixelRatio: scale,
            cacheBust: false,
          });
          const img = new Image();
          await new Promise<void>((resolve) => {
            img.onload = () => {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              resolve();
            };
            img.onerror = () => resolve();
            img.src = imgDataUrl;
          });
        } catch {
          // sonraki kareye devam et
        }
        await new Promise((r) => setTimeout(r, 80));
      }

      recorder.stop();
      const videoBlob = await recordPromise;

      const url = URL.createObjectURL(videoBlob);
      const link = document.createElement("a");
      link.download = `${config.title || "snapmark"}-animation.webm`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);

      showToast(
        config.uiLanguage === "en" ? "Animation video exported (.webm)" : "Animasyonlu video indirildi (.webm)",
        "success",
        config.uiLanguage === "en" ? "Ready for Twitter/X, LinkedIn & Web" : "Sosyal medya ve web için hazır"
      );
    } catch (err) {
      console.error("Video export hatası:", err);
      showToast("Video dışa aktarılırken bir sorun oluştu", "error");
    } finally {
      setIsVideoExporting(false);
    }
  }, [config.title, config.uiLanguage, showToast]);

  // Klavye Kısayolları Motoru (Faz 6)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      // Ctrl + S / Cmd + S -> PNG İndir
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s" && !e.shiftKey) {
        e.preventDefault();
        handleDownloadImage();
        return;
      }

      // Ctrl + Shift + C / Cmd + Shift + C -> Panoya Kopyala
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "c") {
        e.preventDefault();
        handleCopyImage();
        return;
      }

      // Input içindeyken diğer kısayolları atla
      if (isInput) return;

      // Ctrl + Z -> Geri Al (Undo)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z" && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
        return;
      }

      // Ctrl + Y veya Ctrl + Shift + Z -> İleri Al (Redo)
      if (
        ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "z")
      ) {
        e.preventDefault();
        handleRedo();
        return;
      }

      // Ctrl + 1/2/3/4 -> Mod Değiştir
      if ((e.ctrlKey || e.metaKey) && e.key === "1") {
        e.preventDefault();
        handleConfigChange({ mode: "code" });
        showToast("Kod Moduna geçildi", "info");
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "2") {
        e.preventDefault();
        handleConfigChange({ mode: "diff" });
        showToast("Diff Karşılaştırma Moduna geçildi", "info");
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "3") {
        e.preventDefault();
        handleConfigChange({ mode: "quote" });
        showToast("Alıntı Moduna geçildi", "info");
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "4") {
        e.preventDefault();
        handleConfigChange({ mode: "tweet" });
        showToast("Tweet Moduna geçildi", "info");
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "5") {
        e.preventDefault();
        handleConfigChange({ mode: "terminal" });
        showToast("Terminal CLI Moduna geçildi", "info");
        return;
      }

      // Ctrl + K -> Komut Paleti Aç/Kapat (Faz 7A)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
        return;
      }

      // F11 -> Sunum Modu Aç/Kapat (Faz 7A)
      if (e.key === "F11") {
        e.preventDefault();
        setIsPresentationOpen((prev) => !prev);
        return;
      }

      // Ctrl + Alt + ArrowLeft / ArrowRight -> Slaytlar Arası Gezinme
      if ((e.ctrlKey || e.metaKey) && e.altKey && e.key === "ArrowLeft") {
        e.preventDefault();
        const slides = config.slides || [];
        const idx = slides.findIndex((s) => s.id === config.activeSlideId);
        if (idx > 0) {
          handleSelectSlide(slides[idx - 1].id);
        }
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.altKey && e.key === "ArrowRight") {
        e.preventDefault();
        const slides = config.slides || [];
        const idx = slides.findIndex((s) => s.id === config.activeSlideId);
        if (idx !== -1 && idx < slides.length - 1) {
          handleSelectSlide(slides[idx + 1].id);
        }
        return;
      }

      // ? veya Ctrl + / -> Kısayollar Penceresi
      if (e.key === "?" || ((e.ctrlKey || e.metaKey) && e.key === "/")) {
        e.preventDefault();
        setIsShortcutsModalOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    handleDownloadImage,
    handleCopyImage,
    handleUndo,
    handleRedo,
    handleSelectSlide,
    config.slides,
    config.activeSlideId,
    showToast,
  ]);

  return (
    <div className="h-screen flex flex-col bg-[#090d14] overflow-hidden">
      {/* Üst Çubuk */}
      <Header
        config={config}
        onChangeConfig={handleConfigChange}
        onCopyImage={handleCopyImage}
        onDownloadImage={handleDownloadImage}
        onDownloadSvg={handleDownloadSvg}
        isExporting={isExporting}
        copied={copied}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={canUndo}
        canRedo={canRedo}
        onOpenShortcuts={() => setIsShortcutsModalOpen(true)}
        onResetDefaults={handleResetDefaults}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onTogglePresentation={() => setIsPresentationOpen(true)}
        onExportThemeJson={handleExportThemeJson}
        onImportThemeJson={handleImportThemeJson}
        onExportVideo={handleExportVideo}
        isVideoExporting={isVideoExporting}
        onOpenFeedPreview={() => setIsFeedModalOpen(true)}
      />

      {/* Mobil Sekme Çubuğu (Yalnızca küçük ekranlarda görünür) */}
      <div className="flex md:hidden items-center justify-around bg-[#0d131f] border-b border-slate-800 p-2 z-20 shrink-0">
        <button
          onClick={() => setActiveTab("preview")}
          className={`flex-1 py-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
            activeTab === "preview"
              ? "bg-indigo-600 text-white shadow-sm font-semibold"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Önizleme</span>
        </button>
        <button
          onClick={() => setActiveTab("controls")}
          className={`flex-1 py-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
            activeTab === "controls"
              ? "bg-indigo-600 text-white shadow-sm font-semibold"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Ayarlar</span>
        </button>
        <button
          onClick={() => setActiveTab("editor")}
          className={`flex-1 py-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
            activeTab === "editor"
              ? "bg-indigo-600 text-white shadow-sm font-semibold"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Kod Editörü</span>
        </button>
      </div>

      {/* Ana Çalışma Alanı (2 Sütunlu Sabit Studio Yerleşimi) */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        {/* Sol Kontrol Paneli (Masaüstünde orantılı ve bağımsız kaydırmalı akordeon) */}
        <aside
          className={`transition-all duration-300 ease-in-out shrink-0 h-full ${
            activeTab === "controls" ? "block w-full" : "hidden"
          } ${
            isSidebarOpen
              ? "md:block md:w-[380px] lg:w-[410px] xl:w-[430px] opacity-100"
              : "md:w-0 md:opacity-0 md:overflow-hidden md:border-r-0 pointer-events-none"
          }`}
        >
          <div className="w-full md:w-[380px] lg:w-[410px] xl:w-[430px] h-full overflow-hidden">
            <Controls config={config} onChange={handleConfigChange} />
          </div>
        </aside>

        {/* Sağ Çalışma Alanı: Canlı Tuval & Editör */}
        <main
          className={`flex-1 min-w-0 h-full overflow-y-auto p-4 md:p-8 flex flex-col items-center justify-start space-y-6 pb-16 relative ${
            activeTab !== "controls" ? "flex" : "hidden md:flex"
          }`}
        >
          {/* Menü kapalıyken masaüstünde beliren 'Menüyü Aç' butonu */}
          {!isSidebarOpen && (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="hidden md:flex absolute top-4 left-4 z-20 px-3 py-1.5 rounded-xl bg-[#121827]/95 hover:bg-indigo-600 border border-slate-700 hover:border-indigo-500 text-slate-300 hover:text-white shadow-xl backdrop-blur-md transition-all items-center gap-2 text-xs font-semibold group"
              title="Ayarlar Menüsünü Aç"
            >
              <PanelLeftOpen className="w-4 h-4 text-indigo-400 group-hover:text-white" />
              <span>Menüyü Aç</span>
            </button>
          )}

          {/* 0. Carousel & Çoklu Slayt Navigasyonu (Faz 5) */}
          <div className="w-full flex justify-center">
            <CarouselNav
              config={config}
              onSelectSlide={handleSelectSlide}
              onAddSlide={handleAddSlide}
              onDuplicateSlide={handleDuplicateSlide}
              onDeleteSlide={handleDeleteSlide}
              onMoveSlide={handleMoveSlide}
              onUpdateSlideMode={handleUpdateSlideMode}
              onRenameSlide={handleRenameSlide}
              onReorderSlides={handleReorderSlides}
              onZipExport={handleZipExport}
              isZipExporting={isZipExporting}
              zipProgress={zipProgress}
            />
          </div>

          {/* 1. Canlı Görsel Kart Tuvali & Yakınlaştırma (Faz 7A) */}
          <div className="w-full flex flex-col items-center justify-center gap-3">
            <div
              className={`w-full flex items-center justify-center transition-all duration-150 origin-center ${
                activeTab === "editor" ? "hidden md:flex" : "flex"
              }`}
              style={{
                transform: zoomLevel !== 100 ? `scale(${zoomLevel / 100})` : undefined,
              }}
            >
              <PreviewCard
                config={config}
                cardRef={cardRef}
                onToggleLineHighlight={handleToggleLineHighlight}
                onSelectTab={handleSelectTab}
                onAddTab={handleAddTab}
                onCloseTab={handleCloseTab}
              />
            </div>

            {/* Tuval Yakınlaştırma (Canvas Zoom) Çubuğu (Faz 7A) */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs text-slate-400 select-none shadow-lg">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(50, z - 10))}
                className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors"
                title="Uzaklaştır"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel(100)}
                className="font-mono text-[11px] font-semibold text-slate-300 hover:text-indigo-400 px-1"
                title="Varsayılan Boyut (%100)"
              >
                %{zoomLevel}
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(200, z + 10))}
                className="p-1 rounded hover:bg-white/10 hover:text-white transition-colors"
                title="Yakınlaştır"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <span className="text-slate-700">|</span>
              <button
                type="button"
                onClick={() => setZoomLevel(100)}
                className="text-[10px] text-slate-400 hover:text-indigo-400 font-medium px-1.5 py-0.5 rounded hover:bg-white/5"
                title="Ölçeği Sıfırla"
              >
                Sığdır
              </button>
            </div>
          </div>

          {/* 2. Alt Kod Giriş Editörü */}
          <div
            className={`w-full max-w-4xl ${
              activeTab === "preview" ? "hidden md:block" : "block"
            }`}
          >
            <CodeEditor
              config={config}
              onChange={handleCodeChange}
              onSelectTab={handleSelectTab}
              onAddTab={handleAddTab}
              onCloseTab={handleCloseTab}
              onRenameTab={handleRenameTab}
            />
          </div>

          {/* Alt Bilgi */}
          <footer className="text-center text-[11px] text-slate-500 py-2">
            ⚡ SnapMark Pro Studio • Faz 6 Pro Studio Güç Paketi Aktif (Auto-Save, Undo/Redo & Shortcuts)
          </footer>
        </main>

        {/* Mobil Yüzen Ayarlar Butonu (Aşağı kaydırıldığında menüye anında erişim) */}
        <div className="md:hidden fixed bottom-5 right-5 z-40">
          <button
            type="button"
            onClick={() => setActiveTab(activeTab === "controls" ? "preview" : "controls")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-2xl shadow-indigo-500/50 border border-indigo-400/30 backdrop-blur-md active:scale-95 transition-all cursor-pointer"
          >
            <Sliders className="w-4 h-4" />
            <span>{activeTab === "controls" ? "Kartı Gör" : "Ayarlar Menüsü"}</span>
          </button>
        </div>
      </div>

      {/* Toast Bildirim Sistemi (Faz 6) */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />

      {/* Klavye Kısayolları Rehber Modalı (Faz 6) */}
      <ShortcutsModal
        isOpen={isShortcutsModalOpen}
        onClose={() => setIsShortcutsModalOpen(false)}
        uiLanguage={config.uiLanguage}
      />

      {/* Komut Paleti (Command Palette - Faz 7A) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onExportPng={handleDownloadImage}
        onExportSvg={handleDownloadSvg}
        onExportZip={handleZipExport}
        onCopyImage={handleCopyImage}
        onOpenShortcuts={() => setIsShortcutsModalOpen(true)}
        onTogglePresentation={() => setIsPresentationOpen(true)}
        onResetDefaults={handleResetDefaults}
        currentMode={config.mode}
        onModeChange={(mode) => handleConfigChange({ mode })}
        currentTheme={config.theme}
        onThemeChange={(theme) => handleConfigChange({ theme })}
        currentFont={config.fontFamily}
        onFontChange={(fontFamily) => handleConfigChange({ fontFamily })}
        currentSocialPreset={config.socialPreset}
        onSocialPresetChange={(socialPreset) => handleConfigChange({ socialPreset })}
        tilt3d={config.tilt3d}
        onToggleTilt3d={() => handleConfigChange({ tilt3d: !config.tilt3d })}
        gradientBorder={config.useGradientBorder}
        onToggleGradientBorder={() => handleConfigChange({ useGradientBorder: !config.useGradientBorder })}
        grainTexture={config.useGrainTexture}
        onToggleGrainTexture={() => handleConfigChange({ useGrainTexture: !config.useGrainTexture })}
        onExportVideo={handleExportVideo}
        onOpenFeedPreview={() => setIsFeedModalOpen(true)}
        onToggleLanguage={() => handleConfigChange({ uiLanguage: config.uiLanguage === "en" ? "tr" : "en" })}
        uiLanguage={config.uiLanguage}
        animatedBg={config.animatedBackground}
        onToggleAnimatedBg={() => handleConfigChange({ animatedBackground: !config.animatedBackground })}
      />

      {/* Sosyal Medya Canlı Akış Simülasyonu Modalı (Faz 8) */}
      <SocialFeedPreviewModal
        isOpen={isFeedModalOpen}
        onClose={() => setIsFeedModalOpen(false)}
        config={config}
        uiLanguage={config.uiLanguage}
      />

      {/* Sunum & Tam Ekran Modu (Faz 7A) */}
      <PresentationMode
        isOpen={isPresentationOpen}
        onClose={() => setIsPresentationOpen(false)}
        slides={config.slides || []}
        activeSlideIndex={Math.max(
          0,
          (config.slides || []).findIndex((s) => s.id === config.activeSlideId)
        )}
        onPrevSlide={() => {
          const slides = config.slides || [];
          const idx = slides.findIndex((s) => s.id === config.activeSlideId);
          if (idx > 0) handleSelectSlide(slides[idx - 1].id);
        }}
        onNextSlide={() => {
          const slides = config.slides || [];
          const idx = slides.findIndex((s) => s.id === config.activeSlideId);
          if (idx !== -1 && idx < slides.length - 1) handleSelectSlide(slides[idx + 1].id);
        }}
        typewriterPlaying={config.typewriterPlaying ?? false}
        onToggleTypewriter={() =>
          handleConfigChange({ typewriterPlaying: !config.typewriterPlaying })
        }
        uiLanguage={config.uiLanguage}
      >
        <PreviewCard
          config={config}
          cardRef={cardRef}
        />
      </PresentationMode>
    </div>
  );
}
