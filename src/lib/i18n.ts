import { UiLanguage } from "@/types";

export interface Translations {
  // Brand & Header
  brandSubtitle: string;
  showcaseBadge: string;
  menuToggle: string;
  menuOpen: string;
  commands: string;
  presentation: string;
  socialFeed: string;
  feedSimulation: string;
  undo: string;
  redo: string;
  exportPng: string;
  downloadPng: string;
  exportSvg: string;
  exportVideo: string;
  copyImage: string;
  copyToClipboard: string;
  copied: string;
  copiedFeedback: string;
  share: string;
  shareCopied: string;
  githubImport: string;
  themeDownload: string;
  themeUpload: string;
  resetDefaults: string;
  shortcuts: string;
  langSwitch: string;

  // Modes
  modeCode: string;
  modeDiff: string;
  modeTerminal: string;
  modeTweet: string;
  modeQuote: string;
  contentMode: string;

  // Controls Accordions
  secCarousel: string;
  carouselStudio: string;
  secMode: string;
  secDiff: string;
  diffEditor: string;
  secTerminal: string;
  secTypewriter: string;
  typewriter: string;
  secTilt: string;
  tiltStudio: string;
  secBackground: string;
  background: string;
  secCode: string;
  codeText: string;
  secFormat: string;
  canvasFormat: string;
  secCard: string;
  cardFrame: string;
  secLogo: string;
  brandLogo: string;
  secQr: string;
  qrBadge: string;
  secWatermark: string;
  watermarkText: string;
  secPresets: string;
  presets: string;

  // Background & Animation
  animatedWaves: string;
  animatedWavesDesc: string;
  speedSlow: string;
  speedNormal: string;
  speedFast: string;

  // Carousel
  carouselTitle: string;
  carouselDesc: string;
  addSlide: string;
  exportZip: string;
  downloadAllZip: string;
  zipPreparing: string;
  slide: string;
  slides: string;
  slideCount: (count: number) => string;
  dragTip: string;

  // Social Feed Preview Modal
  feedModalTitle: string;
  feedModalDesc: string;
  tabTwitter: string;
  tabLinkedIn: string;
  tabInstagram: string;
  close: string;

  // Code Editor
  editorTitleCode: string;
  editorTitleQuote: string;
  lineLabel: string;
  charLabel: string;
  newTab: string;
  cleanCode: string;
  tabIndentTip: string;
  placeholderCode: string;
  placeholderQuote: string;

  // Presentation Mode
  presentationTitle: string;
  presentationExit: string;
  presentationTip: string;

  // Command Palette Categories
  catActions: string;
  catModes: string;
  catFormats: string;
  catThemes: string;
  catFonts: string;
  catEffects: string;
}

export const DICTIONARY: Record<UiLanguage, Translations> = {
  tr: {
    brandSubtitle: "Geliştiriciler İçin 4K Kod Kartı Stüdyosu",
    showcaseBadge: "Vitrin",
    menuToggle: "Menü",
    menuOpen: "Menüyü Aç",
    commands: "Komutlar",
    presentation: "Sunum",
    socialFeed: "Akış Simülasyonu",
    feedSimulation: "Akış Simülasyonu",
    undo: "Geri Al",
    redo: "İleri Al",
    exportPng: "PNG İndir",
    downloadPng: "PNG İndir",
    exportSvg: "SVG",
    exportVideo: "Video (WebM)",
    copyImage: "Kopyala",
    copyToClipboard: "Panoya Kopyala",
    copied: "Kopyalandı!",
    copiedFeedback: "Kopyalandı!",
    share: "Paylaş",
    shareCopied: "Kopyalandı!",
    githubImport: "GitHub",
    themeDownload: "Tema İndir",
    themeUpload: "Tema Yükle",
    resetDefaults: "Sıfırla",
    shortcuts: "Kısayollar",
    langSwitch: "English",

    modeCode: "Kod",
    modeDiff: "Diff",
    modeTerminal: "Terminal",
    modeTweet: "Tweet (X)",
    modeQuote: "Alıntı & Not",
    contentMode: "İçerik Türü & Kart Modu",

    secCarousel: "Carousel & Çoklu Slayt",
    carouselStudio: "Carousel & Çoklu Slayt Stüdyosu",
    secMode: "İçerik Türü & Kart Modu",
    secDiff: "Diff / Karşılaştırma",
    diffEditor: "Diff & Karşılaştırma Editörü",
    secTerminal: "Terminal & CLI Komutu",
    secTypewriter: "Canlı Daktilo & Animasyon",
    typewriter: "Canlı Daktilo & Animasyon",
    secTilt: "3D Perspektif & Eğim Stüdyosu",
    tiltStudio: "3D Perspektif & Eğim Stüdyosu",
    secBackground: "Arka Plan Türü & Renkler",
    background: "Arka Plan Türü & Renkler",
    secCode: "Kod & Metin Ayarları",
    codeText: "Kod & Metin Ayarları",
    secFormat: "Format & Tuval Ölçüsü",
    canvasFormat: "Format & Tuval Ölçüsü",
    secCard: "Kart Çerçevesi & Boşluk",
    cardFrame: "Kart Çerçevesi & Boşluk",
    secLogo: "Marka & Logo Filigranı",
    brandLogo: "Marka & Logo Filigranı",
    secQr: "Dinamik QR Kod Rozeti",
    qrBadge: "Dinamik QR Kod Rozeti",
    secWatermark: "Filigran & Alt Bilgi",
    watermarkText: "Filigran & Alt Bilgi",
    secPresets: "Tasarım Şablonları (Presets)",
    presets: "Tasarım Şablonları (Presets)",

    animatedWaves: "Hareketli Arka Plan Dalgaları",
    animatedWavesDesc: "Statik degrade yerine yumuşak, canlı renk dalgaları akar",
    speedSlow: "Yavaş",
    speedNormal: "Normal",
    speedFast: "Hızlı",

    carouselTitle: "Carousel & Çoklu Slayt Stüdyosu",
    carouselDesc: "Sürükleyip bırakarak sıralayın, çift tıklayıp adlandırın, modunu değiştirin.",
    addSlide: "Slayt Ekle",
    exportZip: "Tümünü ZIP İndir",
    downloadAllZip: "Tümünü ZIP İndir",
    zipPreparing: "ZIP Hazırlanıyor...",
    slide: "Slayt",
    slides: "Slayt",
    slideCount: (count: number) => `${count} Slayt`,
    dragTip: "Sürükleyip bırakarak sıralayın",

    feedModalTitle: "Canlı Sosyal Medya Akış Simülasyonu",
    feedModalDesc: "Kartınızın Twitter, LinkedIn ve Instagram zaman akışlarında nasıl görüneceğini canlı inceleyin.",
    tabTwitter: "Twitter / X Feed",
    tabLinkedIn: "LinkedIn Post",
    tabInstagram: "Instagram Akışı",
    close: "Kapat",

    editorTitleCode: "Kod Giriş Editörü",
    editorTitleQuote: "Alıntı & Metin Editörü",
    lineLabel: "satır",
    charLabel: "karakter",
    newTab: "Yeni Sekme",
    cleanCode: "Kodu Temizle",
    tabIndentTip: "ile 2 boşluk girinti verilir",
    placeholderCode: "Kodunu buraya yapıştır veya yaz...",
    placeholderQuote: "Paylaşmak istediğin düşünceyi veya alıntıyı buraya yaz...",

    presentationTitle: "Sunum Modu",
    presentationExit: "Çıkış",
    presentationTip: "İpucu: ← → ile slayt, Boşluk ile daktilo",

    catActions: "Eylemler",
    catModes: "Modlar",
    catFormats: "Formatlar",
    catThemes: "Temalar",
    catFonts: "Fontlar",
    catEffects: "Efektler",
  },
  en: {
    brandSubtitle: "4K Code Image Studio for Developers",
    showcaseBadge: "Showcase",
    menuToggle: "Menu",
    menuOpen: "Open Menu",
    commands: "Commands",
    presentation: "Present",
    socialFeed: "Feed Preview",
    feedSimulation: "Feed Simulation",
    undo: "Undo",
    redo: "Redo",
    exportPng: "Export PNG",
    downloadPng: "Export PNG",
    exportSvg: "SVG",
    exportVideo: "Video (WebM)",
    copyImage: "Copy",
    copyToClipboard: "Copy to Clipboard",
    copied: "Copied!",
    copiedFeedback: "Copied!",
    share: "Share",
    shareCopied: "Copied!",
    githubImport: "GitHub",
    themeDownload: "Export Theme",
    themeUpload: "Import Theme",
    resetDefaults: "Reset",
    shortcuts: "Shortcuts",
    langSwitch: "Türkçe",

    modeCode: "Code",
    modeDiff: "Diff",
    modeTerminal: "Terminal",
    modeTweet: "Tweet (X)",
    modeQuote: "Quote & Note",
    contentMode: "Content Type & Card Mode",

    secCarousel: "Carousel & Multiple Slides",
    carouselStudio: "Carousel & Multi-Slide Studio",
    secMode: "Content Type & Card Mode",
    secDiff: "Diff / Code Comparison",
    diffEditor: "Diff & Comparison Editor",
    secTerminal: "Terminal & CLI Output",
    secTypewriter: "Live Typewriter Animation",
    typewriter: "Live Typewriter & Animation",
    secTilt: "3D Perspective & Tilt Studio",
    tiltStudio: "3D Perspective & Tilt Studio",
    secBackground: "Background Type & Colors",
    background: "Background Type & Colors",
    secCode: "Code & Text Typography",
    codeText: "Code & Typography Settings",
    secFormat: "Format & Canvas Size",
    canvasFormat: "Canvas & Social Formats",
    secCard: "Card Frame & Padding",
    cardFrame: "Card Frame & Shadows",
    secLogo: "Branding & Logo Watermark",
    brandLogo: "Brand & Logo Watermark",
    secQr: "Dynamic QR Code Badge",
    qrBadge: "Dynamic QR Code Badge",
    secWatermark: "Watermark & Footer",
    watermarkText: "Watermark & Signature",
    secPresets: "Design Templates (Presets)",
    presets: "Presets & Templates",

    animatedWaves: "Animated Gradient Waves",
    animatedWavesDesc: "Flowing smooth dynamic gradient mesh instead of static background",
    speedSlow: "Slow",
    speedNormal: "Normal",
    speedFast: "Fast",

    carouselTitle: "Carousel & Multi-Slide Studio",
    carouselDesc: "Drag & drop to reorder, double click to rename, click mode pill to switch.",
    addSlide: "Add Slide",
    exportZip: "Download All (ZIP)",
    downloadAllZip: "Download All ZIP",
    zipPreparing: "Preparing ZIP...",
    slide: "Slide",
    slides: "Slides",
    slideCount: (count: number) => `${count} ${count === 1 ? "Slide" : "Slides"}`,
    dragTip: "Drag & drop to reorder slides",

    feedModalTitle: "Live Social Media Feed Simulation",
    feedModalDesc: "Preview how your card will appear in real Twitter, LinkedIn, and Instagram feeds before posting.",
    tabTwitter: "Twitter / X Feed",
    tabLinkedIn: "LinkedIn Post",
    tabInstagram: "Instagram Feed",
    close: "Close",

    editorTitleCode: "Code Input Editor",
    editorTitleQuote: "Quote & Text Editor",
    lineLabel: "lines",
    charLabel: "chars",
    newTab: "New Tab",
    cleanCode: "Format Code",
    tabIndentTip: "inserts 2 spaces indent",
    placeholderCode: "Paste or write your code here...",
    placeholderQuote: "Write the quote or thought you want to share...",

    presentationTitle: "Presentation Mode",
    presentationExit: "Exit",
    presentationTip: "Tip: ← → to navigate, Space to toggle typewriter",

    catActions: "Actions",
    catModes: "Modes",
    catFormats: "Formats",
    catThemes: "Themes",
    catFonts: "Fonts",
    catEffects: "Effects",
  },
};

export function getT(lang?: UiLanguage): Translations {
  return DICTIONARY[lang === "en" ? "en" : "tr"];
}
