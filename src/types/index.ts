export type ThemeId =
  | "candy"
  | "sunset"
  | "cyberpunk"
  | "emerald"
  | "ocean"
  | "nordic"
  | "midnight"
  | "monochrome"
  | "aurora"
  | "tokyo"
  | "fireice"
  | "hyper";

export type PatternId = "grid" | "dots" | "stars" | "carbon" | "waves" | "blueprint";

export type BackgroundType = "gradient" | "pattern" | "custom" | "transparent";

export type GradientType = "linear" | "radial" | "conic";

export interface GradientColorStop {
  color: string;
  position: number; // 0 - 100
}

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  gradient: string;
  cssGradient: string;
  cardBg: string;
  borderColor: string;
}

export interface PatternConfig {
  id: PatternId;
  name: string;
  className: string;
  style?: React.CSSProperties;
}

export type LanguageId =
  | "typescript"
  | "javascript"
  | "python"
  | "csharp"
  | "rust"
  | "cpp"
  | "c"
  | "html"
  | "css"
  | "json"
  | "sql"
  | "markdown"
  | "bash";

export type AspectRatioId = "auto" | "16:9" | "1:1" | "4:5" | "custom";

export type WindowStyle = "mac" | "windows" | "none" | "terminal" | "safari";

export type TiltPreset = "flat" | "isometric" | "tiltRight" | "tiltLeft" | "floating";

export type ShadowStyle = "none" | "soft" | "hard";

export type CardWidth = "compact" | "normal" | "wide" | "full";

export type CodeThemeId =
  | "onedark"
  | "dracula"
  | "monokai"
  | "githubDark"
  | "nord"
  | "tokyonight"
  | "synthwave"
  | "solarized";

export interface CodeThemeConfig {
  id: CodeThemeId;
  name: string;
  cardBg: string;
  borderColor: string;
  dotColor: string;
}

export type FontFamilyId =
  | "jetbrains"
  | "fira"
  | "geist"
  | "sourcecode"
  | "cascadia"
  | "inconsolata"
  | "ubuntu"
  | "spacemono"
  | "robotomono"
  | "victormono"
  | "mono";

export type ExportScale = 1 | 2 | 4;

export interface CodeTab {
  id: string;
  name: string;
  language: LanguageId;
  code: string;
}

export interface SavedPreset {
  id: string;
  name: string;
  createdAt: number;
  config: Partial<CardConfig>;
}

export type CardMode = "code" | "tweet" | "quote" | "diff" | "terminal";
export type VerifiedType = "none" | "blue" | "gold";
export type QuoteStyle = "minimal" | "card" | "accent";
export type TypewriterSpeed = "slow" | "normal" | "fast" | "turbo";

export type SocialPresetId =
  | "free"
  | "twitter"
  | "instagram-story"
  | "instagram-square"
  | "linkedin-banner"
  | "youtube-thumb";

export interface SocialPresetConfig {
  id: SocialPresetId;
  name: string;
  description: string;
  width: number;
  height: number;
  icon: string;
  aspectRatio: string;
}

export interface CarouselSlide {
  id: string;
  name: string;
  title: string;
  code: string;
  language: LanguageId;
  mode: CardMode;
  quoteContent?: string;
  quoteAuthor?: string;
  quoteTitle?: string;
  tweetContent?: string;
  diffBeforeCode?: string;
  diffAfterCode?: string;
  terminalCommand?: string;
  terminalOutput?: string;
  terminalUser?: string;
}

export interface CardConfig {
  title: string;
  language: LanguageId;
  code: string;
  bgType: BackgroundType;
  theme: ThemeId;
  pattern: PatternId;
  patternOpacity: number;
  patternSpotlight: boolean;
  codeTheme: CodeThemeId;
  customBgUrl: string;
  // Özel çoklu renk degrade ayarları
  useCustomGradient: boolean;
  gradientType: GradientType;
  gradientStops: GradientColorStop[];
  gradientColors: [string, string, string];
  gradientAngle: number;
  // Tuval ve oran ayarları
  padding: number;
  showLineNumbers: boolean;
  windowStyle: WindowStyle;
  aspectRatio: AspectRatioId;
  customWidth: number;
  customHeight: number;
  fontSize: number;
  shadow: ShadowStyle;
  cardWidth: CardWidth;
  highlightedLines: string;
  showWatermark: boolean;
  watermarkText: string;
  mode: CardMode;
  authorName: string;
  authorHandle: string;
  // Faz 2 Gelişmiş Özellikler
  fontFamily: FontFamilyId;
  fontLigatures: boolean;
  exportScale: ExportScale;
  tabs: CodeTab[];
  activeTabId: string;
  // Faz 3 Çok Modlu İçerik Özellikleri
  tweetAvatar: string;
  tweetName: string;
  tweetHandle: string;
  tweetVerified: VerifiedType;
  tweetContent: string;
  tweetDate: string;
  tweetClient: string;
  tweetShowMetrics: boolean;
  tweetLikes: string;
  tweetRetweets: string;
  tweetViews: string;
  tweetBookmarks: string;
  quoteContent: string;
  quoteAuthor: string;
  quoteTitle: string;
  quoteStyle: QuoteStyle;
  showQuoteMarks?: boolean;
  // Faz 4 Zirve Stüdyo Özellikleri
  tilt3d?: boolean;
  tiltPreset?: TiltPreset;
  tiltRotateX?: number;
  tiltRotateY?: number;
  tiltRotateZ?: number;
  tiltGlow?: boolean;
  tiltGlowColor?: string;
  tiltGlowRadius?: number;
  safariUrl?: string;
  terminalPrompt?: string;
  showLanguageBadge?: boolean;
  showTabIcons?: boolean;
  showQrCode?: boolean;
  qrText?: string;
  qrPosition?: "bottom-right" | "bottom-left" | "top-right";
  typewriterActive?: boolean;
  typewriterSpeed?: number;
  // Faz 5 İçerik Üretici & Animasyon Süper Güçleri
  slides?: CarouselSlide[];
  activeSlideId?: string;
  showSlideCounter?: boolean;
  showSwipeIndicator?: boolean;
  diffBeforeLabel?: string;
  diffAfterLabel?: string;
  diffBeforeCode?: string;
  diffAfterCode?: string;
  typewriterPlaying?: boolean;
  typewriterSpeedMode?: TypewriterSpeed;
  // Faz 6 Pro Studio Güç Paketi
  useGradientBorder?: boolean;
  gradientBorderPreset?: GradientBorderPreset;
  gradientBorderWidth?: number;
  gradientBorderColors?: string[];
  gradientBorderAngle?: number;
  useGrainTexture?: boolean;
  grainOpacity?: number;
  // Faz 7 Pro Studio & Genişletmeler
  socialPreset?: SocialPresetId;
  windowHeaderBg?: string;
  windowHeaderCustom?: boolean;
  logoUrl?: string;
  logoPosition?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  logoOpacity?: number;
  logoSize?: number;
  terminalCommand?: string;
  terminalOutput?: string;
  terminalUser?: string;
  // Faz 8 Süper Güç Paketi
  uiLanguage?: UiLanguage;
  animatedBackground?: boolean;
  animatedBackgroundSpeed?: AnimatedBgSpeed;
}

export type UiLanguage = "tr" | "en";
export type AnimatedBgSpeed = "slow" | "normal" | "fast";

export type GradientBorderPreset = "rainbow" | "cyberpunk" | "sunset" | "electric" | "emerald" | "custom";

export type ToastType = "success" | "info" | "warning" | "error";

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
  description?: string;
}
