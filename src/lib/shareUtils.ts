import type {
  CardConfig,
  LanguageId,
  ThemeId,
  PatternId,
  CodeThemeId,
  FontFamilyId,
  AspectRatioId,
  WindowStyle,
  CardMode,
  BackgroundType,
  GradientType,
  GradientColorStop,
  ShadowStyle,
  CardWidth,
  ExportScale,
  CodeTab,
  CarouselSlide,
  VerifiedType,
  QuoteStyle,
  TiltPreset,
  QrPosition,
  TypewriterSpeed,
  GradientBorderPreset,
  SocialPresetId,
  LogoPosition,
  UiLanguage,
  AnimatedBgSpeed,
} from "@/types";

const ALLOWED_PATTERNS: ReadonlySet<string> = new Set(["grid", "dots", "stars", "carbon", "waves", "blueprint"]);
const ALLOWED_BG_TYPES: ReadonlySet<string> = new Set(["gradient", "pattern", "custom", "transparent"]);
const ALLOWED_GRADIENT_TYPES: ReadonlySet<string> = new Set(["linear", "radial", "conic"]);
const ALLOWED_SHADOWS: ReadonlySet<string> = new Set(["none", "soft", "hard"]);
const ALLOWED_CARD_WIDTHS: ReadonlySet<string> = new Set(["compact", "normal", "wide", "full"]);
const ALLOWED_VERIFIED: ReadonlySet<string> = new Set(["none", "blue", "gold"]);
const ALLOWED_QUOTE_STYLES: ReadonlySet<string> = new Set(["minimal", "card", "accent"]);
const ALLOWED_TILT_PRESETS: ReadonlySet<string> = new Set(["flat", "isometric", "tiltRight", "tiltLeft", "floating"]);
const ALLOWED_QR_POSITIONS: ReadonlySet<string> = new Set(["bottom-right", "bottom-left", "top-right"]);
const ALLOWED_LOGO_POSITIONS: ReadonlySet<string> = new Set(["bottom-right", "bottom-left", "top-right", "top-left"]);
const ALLOWED_TYPEWRITER_SPEEDS: ReadonlySet<string> = new Set(["slow", "normal", "fast", "turbo"]);
const ALLOWED_BORDER_PRESETS: ReadonlySet<string> = new Set(["rainbow", "cyberpunk", "sunset", "electric", "emerald", "custom"]);
const ALLOWED_SOCIAL_PRESETS: ReadonlySet<string> = new Set([
  "free", "twitter", "instagram-story", "instagram-square", "linkedin-banner", "youtube-thumb"
]);
const ALLOWED_ANIM_SPEEDS: ReadonlySet<string> = new Set(["slow", "normal", "fast"]);
const ALLOWED_DIFF_VIEWS: ReadonlySet<string> = new Set(["unified", "split"]);

/** Yalnızca düz renk değerlerine izin verir (url(), expression vb. CSS enjeksiyonunu engeller). */
function isSafeColor(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.length <= 40 &&
    /^(#[0-9a-fA-F]{3,8}|(rgb|rgba|hsl|hsla)\([\d\s.,%]+\)|[a-zA-Z]+)$/.test(value.trim())
  );
}

function clampNumber(value: unknown, min: number, max: number): number | undefined {
  if (typeof value !== "number" || !Number.isFinite(value)) return undefined;
  return Math.min(max, Math.max(min, value));
}

function pickEnum<T extends string>(value: unknown, allowed: ReadonlySet<string>): T | undefined {
  return typeof value === "string" && allowed.has(value) ? (value as T) : undefined;
}

function pickString(value: unknown, maxLen: number): string | undefined {
  return typeof value === "string" ? value.slice(0, maxLen) : undefined;
}

const ALLOWED_THEMES: ReadonlySet<string> = new Set([
  "carbon", "snapmark-vercel", "candy", "sunset", "cyberpunk", "emerald",
  "ocean", "nordic", "midnight", "monochrome", "aurora", "tokyo", "fireice", "hyper"
]);

const ALLOWED_LANGUAGES: ReadonlySet<string> = new Set([
  "typescript", "javascript", "python", "csharp", "rust", "cpp", "c",
  "html", "css", "json", "sql", "markdown", "bash", "go", "java", "kotlin",
  "swift", "php", "ruby", "yaml", "docker", "graphql", "tsx"
]);

const ALLOWED_MODES: ReadonlySet<string> = new Set([
  "code", "tweet", "quote", "diff", "terminal"
]);

const ALLOWED_WINDOW_STYLES: ReadonlySet<string> = new Set([
  "mac", "windows", "none", "terminal", "safari"
]);

const ALLOWED_ASPECT_RATIOS: ReadonlySet<string> = new Set([
  "auto", "16:9", "1:1", "4:5", "custom"
]);

const ALLOWED_CODE_THEMES: ReadonlySet<string> = new Set([
  "onedark", "dracula", "monokai", "githubDark", "nord", "tokyonight", "synthwave", "solarized"
]);

const ALLOWED_FONTS: ReadonlySet<string> = new Set([
  "jetbrains", "fira", "geist", "sourcecode", "cascadia", "inconsolata",
  "ubuntu", "spacemono", "robotomono", "victormono", "mono"
]);

/**
 * Checks if a URL is an untrusted remote URL that might trigger an external connection.
 * We only allow inline data URLs (e.g. data:image/png) or trusted safe relative asset paths.
 */
export function isSafeImageUrl(url: unknown): boolean {
  if (typeof url !== "string") return false;
  const trimmed = url.trim();
  // data:image/ (yerleşik SVG avatarlar boşluk, ' ve () içerir): yalnızca çift tırnak, ters eğik çizgi ve satır sonu reddedilir
  if (trimmed.startsWith("data:image/")) return !/["\\\r\n]/.test(trimmed);
  if (/["'()\\\s]/.test(trimmed)) return false;
  if (trimmed.startsWith("/") && !trimmed.startsWith("//") && !trimmed.startsWith("/\\")) return true;
  return false;
}

/**
 * UTF-8 safe Base64 encoder.
 */
export function encodeShareData(data: unknown): string {
  try {
    const json = JSON.stringify(data);
    const utf8Bytes = new TextEncoder().encode(json);
    let binary = "";
    const len = utf8Bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(utf8Bytes[i]);
    }
    return btoa(binary);
  } catch (err) {
    console.error("encodeShareData failed:", err);
    return "";
  }
}

/**
 * UTF-8 safe Base64 decoder with fallback for legacy btoa(encodeURIComponent(...)) encoding.
 */
export function decodeShareData(encoded: string): unknown {
  if (!encoded || typeof encoded !== "string") return null;

  // 1. Modern UTF-8 TextDecoder method
  try {
    const binary = atob(encoded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const json = new TextDecoder().decode(bytes);
    return JSON.parse(json);
  } catch {
    // 2. Legacy fallback: btoa(encodeURIComponent(json))
    try {
      const decodedUri = decodeURIComponent(atob(encoded));
      return JSON.parse(decodedUri);
    } catch {
      // 3. Fallback for unescaped atob
      try {
        return JSON.parse(atob(encoded));
      } catch {
        return null;
      }
    }
  }
}

/**
 * Strictly sanitizes and validates incoming config objects from share links or imported JSON themes.
 * Prevents arbitrary injection, untrusted external resource leaks, and invalid states.
 */
export function sanitizeConfig(input: unknown): Partial<CardConfig> {
  if (!input || typeof input !== "object") return {};
  const raw = input as Record<string, unknown>;
  const clean: Partial<CardConfig> = {};

  if (typeof raw.title === "string") {
    clean.title = raw.title.slice(0, 100);
  }

  if (typeof raw.code === "string") {
    clean.code = raw.code.slice(0, 100000); // 100KB max code
  }

  if (typeof raw.language === "string" && ALLOWED_LANGUAGES.has(raw.language)) {
    clean.language = raw.language as LanguageId;
  }

  if (typeof raw.mode === "string" && ALLOWED_MODES.has(raw.mode)) {
    clean.mode = raw.mode as CardMode;
  }

  if (typeof raw.theme === "string" && ALLOWED_THEMES.has(raw.theme)) {
    clean.theme = raw.theme as ThemeId;
  }

  if (typeof raw.codeTheme === "string" && ALLOWED_CODE_THEMES.has(raw.codeTheme)) {
    clean.codeTheme = raw.codeTheme as CodeThemeId;
  }

  if (typeof raw.fontFamily === "string" && ALLOWED_FONTS.has(raw.fontFamily)) {
    clean.fontFamily = raw.fontFamily as FontFamilyId;
  }

  if (typeof raw.windowStyle === "string" && ALLOWED_WINDOW_STYLES.has(raw.windowStyle)) {
    clean.windowStyle = raw.windowStyle as WindowStyle;
  }

  if (typeof raw.aspectRatio === "string" && ALLOWED_ASPECT_RATIOS.has(raw.aspectRatio)) {
    clean.aspectRatio = raw.aspectRatio as AspectRatioId;
  }

  if (typeof raw.padding === "number" && !isNaN(raw.padding)) {
    clean.padding = Math.min(128, Math.max(16, raw.padding));
  }

  if (typeof raw.fontSize === "number" && !isNaN(raw.fontSize)) {
    clean.fontSize = Math.min(32, Math.max(10, raw.fontSize));
  }

  if (typeof raw.showLineNumbers === "boolean") {
    clean.showLineNumbers = raw.showLineNumbers;
  }

  if (typeof raw.fontLigatures === "boolean") {
    clean.fontLigatures = raw.fontLigatures;
  }

  if (typeof raw.highlightedLines === "string") {
    clean.highlightedLines = raw.highlightedLines.slice(0, 100);
  }

  // Diff Mode fields
  if (typeof raw.diffBeforeCode === "string") {
    clean.diffBeforeCode = raw.diffBeforeCode.slice(0, 100000);
  }
  if (typeof raw.diffAfterCode === "string") {
    clean.diffAfterCode = raw.diffAfterCode.slice(0, 100000);
  }
  if (typeof raw.diffBeforeLabel === "string") {
    clean.diffBeforeLabel = raw.diffBeforeLabel.slice(0, 50);
  }
  if (typeof raw.diffAfterLabel === "string") {
    clean.diffAfterLabel = raw.diffAfterLabel.slice(0, 50);
  }

  // Tweet Mode fields
  if (typeof raw.tweetContent === "string") {
    clean.tweetContent = raw.tweetContent.slice(0, 2000);
  }
  if (typeof raw.tweetName === "string") {
    clean.tweetName = raw.tweetName.slice(0, 80);
  }
  if (typeof raw.tweetHandle === "string") {
    clean.tweetHandle = raw.tweetHandle.slice(0, 80);
  }
  if (isSafeImageUrl(raw.tweetAvatar)) {
    clean.tweetAvatar = raw.tweetAvatar as string;
  }
  if (typeof raw.tweetLikes === "string") {
    clean.tweetLikes = raw.tweetLikes.slice(0, 20);
  }
  if (typeof raw.tweetRetweets === "string") {
    clean.tweetRetweets = raw.tweetRetweets.slice(0, 20);
  }
  if (typeof raw.tweetViews === "string") {
    clean.tweetViews = raw.tweetViews.slice(0, 20);
  }

  // Quote Mode fields
  if (typeof raw.quoteContent === "string") {
    clean.quoteContent = raw.quoteContent.slice(0, 2000);
  }
  if (typeof raw.quoteAuthor === "string") {
    clean.quoteAuthor = raw.quoteAuthor.slice(0, 100);
  }
  if (typeof raw.quoteTitle === "string") {
    clean.quoteTitle = raw.quoteTitle.slice(0, 100);
  }

  // Terminal Mode fields
  if (typeof raw.terminalCommand === "string") {
    clean.terminalCommand = raw.terminalCommand.slice(0, 500);
  }
  if (typeof raw.terminalOutput === "string") {
    clean.terminalOutput = raw.terminalOutput.slice(0, 50000);
  }
  if (typeof raw.terminalUser === "string") {
    clean.terminalUser = raw.terminalUser.slice(0, 60);
  }
  if (typeof raw.terminalPrompt === "string") {
    clean.terminalPrompt = raw.terminalPrompt.slice(0, 60);
  }

  // Image URLs - only allow safe data URLs or local paths to protect privacy
  if (isSafeImageUrl(raw.customBgUrl)) {
    clean.customBgUrl = raw.customBgUrl as string;
  }
  if (isSafeImageUrl(raw.logoUrl)) {
    clean.logoUrl = raw.logoUrl as string;
  }

  if (typeof raw.showWatermark === "boolean") {
    clean.showWatermark = raw.showWatermark;
  }
  if (typeof raw.watermarkText === "string") {
    clean.watermarkText = raw.watermarkText.slice(0, 60);
  }

  // Arka plan & degrade
  const bgType = pickEnum<BackgroundType>(raw.bgType, ALLOWED_BG_TYPES);
  if (bgType) clean.bgType = bgType;
  const pattern = pickEnum<PatternId>(raw.pattern, ALLOWED_PATTERNS);
  if (pattern) clean.pattern = pattern;
  const patternOpacity = clampNumber(raw.patternOpacity, 0, 1);
  if (patternOpacity !== undefined) clean.patternOpacity = patternOpacity;
  if (typeof raw.patternSpotlight === "boolean") clean.patternSpotlight = raw.patternSpotlight;
  if (typeof raw.useCustomGradient === "boolean") clean.useCustomGradient = raw.useCustomGradient;
  const gradientType = pickEnum<GradientType>(raw.gradientType, ALLOWED_GRADIENT_TYPES);
  if (gradientType) clean.gradientType = gradientType;
  const gradientAngle = clampNumber(raw.gradientAngle, 0, 360);
  if (gradientAngle !== undefined) clean.gradientAngle = gradientAngle;
  if (Array.isArray(raw.gradientStops)) {
    const stops: GradientColorStop[] = [];
    for (const s of raw.gradientStops.slice(0, 10)) {
      if (!s || typeof s !== "object") continue;
      const stop = s as Record<string, unknown>;
      const position = clampNumber(stop.position, 0, 100);
      if (isSafeColor(stop.color) && position !== undefined) {
        stops.push({ color: stop.color, position });
      }
    }
    if (stops.length >= 2) clean.gradientStops = stops;
  }
  if (
    Array.isArray(raw.gradientColors) &&
    raw.gradientColors.length === 3 &&
    raw.gradientColors.every(isSafeColor)
  ) {
    clean.gradientColors = raw.gradientColors as [string, string, string];
  }

  // Tuval & kart
  const customWidth = clampNumber(raw.customWidth, 200, 4000);
  if (customWidth !== undefined) clean.customWidth = customWidth;
  const customHeight = clampNumber(raw.customHeight, 200, 4000);
  if (customHeight !== undefined) clean.customHeight = customHeight;
  const shadow = pickEnum<ShadowStyle>(raw.shadow, ALLOWED_SHADOWS);
  if (shadow) clean.shadow = shadow;
  const cardWidth = pickEnum<CardWidth>(raw.cardWidth, ALLOWED_CARD_WIDTHS);
  if (cardWidth) clean.cardWidth = cardWidth;
  if (raw.exportScale === 1 || raw.exportScale === 2 || raw.exportScale === 4) {
    clean.exportScale = raw.exportScale as ExportScale;
  }
  const authorName = pickString(raw.authorName, 80);
  if (authorName !== undefined) clean.authorName = authorName;
  const authorHandle = pickString(raw.authorHandle, 80);
  if (authorHandle !== undefined) clean.authorHandle = authorHandle;

  // Sekmeler
  if (Array.isArray(raw.tabs)) {
    const tabs: CodeTab[] = [];
    for (const item of raw.tabs.slice(0, 20)) {
      if (!item || typeof item !== "object") continue;
      const tab = item as Record<string, unknown>;
      if (typeof tab.id !== "string" || typeof tab.name !== "string" || typeof tab.code !== "string") continue;
      tabs.push({
        id: tab.id.slice(0, 60),
        name: tab.name.slice(0, 100),
        code: tab.code.slice(0, 100000),
        language: pickEnum<LanguageId>(tab.language, ALLOWED_LANGUAGES) || "typescript",
      });
    }
    if (tabs.length > 0) {
      clean.tabs = tabs;
      const activeTabId = typeof raw.activeTabId === "string" ? raw.activeTabId : "";
      clean.activeTabId = tabs.some((t) => t.id === activeTabId) ? activeTabId : tabs[0].id;
    }
  }

  // Slaytlar (Carousel)
  if (Array.isArray(raw.slides)) {
    const slides: CarouselSlide[] = [];
    for (const item of raw.slides.slice(0, 30)) {
      if (!item || typeof item !== "object") continue;
      const s = item as Record<string, unknown>;
      if (typeof s.id !== "string") continue;
      const slide: CarouselSlide = {
        id: s.id.slice(0, 60),
        name: pickString(s.name, 80) ?? "Slayt",
        title: pickString(s.title, 100) ?? "",
        code: pickString(s.code, 100000) ?? "",
        language: pickEnum<LanguageId>(s.language, ALLOWED_LANGUAGES) || "typescript",
        mode: pickEnum<CardMode>(s.mode, ALLOWED_MODES) || "code",
      };
      const optionalStrings: Array<[keyof CarouselSlide, number]> = [
        ["quoteContent", 2000], ["quoteAuthor", 100], ["quoteTitle", 100], ["tweetContent", 2000],
        ["diffBeforeCode", 100000], ["diffAfterCode", 100000], ["terminalCommand", 500],
        ["terminalOutput", 50000], ["terminalUser", 60],
      ];
      for (const [key, max] of optionalStrings) {
        const v = pickString(s[key], max);
        if (v !== undefined) (slide as unknown as Record<string, unknown>)[key] = v;
      }
      const diffViewMode = pickEnum<"unified" | "split">(s.diffViewMode, ALLOWED_DIFF_VIEWS);
      if (diffViewMode) slide.diffViewMode = diffViewMode;
      const slideTheme = pickEnum<ThemeId>(s.theme, ALLOWED_THEMES);
      if (slideTheme) slide.theme = slideTheme;
      if (typeof s.background === "string" && (ALLOWED_THEMES.has(s.background) || isSafeImageUrl(s.background))) {
        slide.background = s.background;
      }
      const slidePadding = clampNumber(s.padding, 16, 128);
      if (slidePadding !== undefined) slide.padding = slidePadding;
      const slideFont = pickEnum<FontFamilyId>(s.fontFamily, ALLOWED_FONTS);
      if (slideFont) slide.fontFamily = slideFont;
      slides.push(slide);
    }
    if (slides.length > 0) {
      clean.slides = slides;
      const activeSlideId = typeof raw.activeSlideId === "string" ? raw.activeSlideId : "";
      clean.activeSlideId = slides.some((s) => s.id === activeSlideId) ? activeSlideId : slides[0].id;
    }
  }
  if (typeof raw.showSlideCounter === "boolean") clean.showSlideCounter = raw.showSlideCounter;
  if (typeof raw.showSwipeIndicator === "boolean") clean.showSwipeIndicator = raw.showSwipeIndicator;
  const diffViewMode = pickEnum<"unified" | "split">(raw.diffViewMode, ALLOWED_DIFF_VIEWS);
  if (diffViewMode) clean.diffViewMode = diffViewMode;

  // Tweet & Alıntı ek alanları
  const tweetVerified = pickEnum<VerifiedType>(raw.tweetVerified, ALLOWED_VERIFIED);
  if (tweetVerified) clean.tweetVerified = tweetVerified;
  const tweetDate = pickString(raw.tweetDate, 60);
  if (tweetDate !== undefined) clean.tweetDate = tweetDate;
  const tweetClient = pickString(raw.tweetClient, 60);
  if (tweetClient !== undefined) clean.tweetClient = tweetClient;
  if (typeof raw.tweetShowMetrics === "boolean") clean.tweetShowMetrics = raw.tweetShowMetrics;
  const tweetBookmarks = pickString(raw.tweetBookmarks, 20);
  if (tweetBookmarks !== undefined) clean.tweetBookmarks = tweetBookmarks;
  const tweetReplies = pickString(raw.tweetReplies, 20);
  if (tweetReplies !== undefined) clean.tweetReplies = tweetReplies;
  const quoteStyle = pickEnum<QuoteStyle>(raw.quoteStyle, ALLOWED_QUOTE_STYLES);
  if (quoteStyle) clean.quoteStyle = quoteStyle;
  if (typeof raw.showQuoteMarks === "boolean") clean.showQuoteMarks = raw.showQuoteMarks;

  // 3D eğim, pencere, QR, daktilo
  if (typeof raw.tilt3d === "boolean") clean.tilt3d = raw.tilt3d;
  const tiltPreset = pickEnum<TiltPreset>(raw.tiltPreset, ALLOWED_TILT_PRESETS);
  if (tiltPreset) clean.tiltPreset = tiltPreset;
  const tiltRotateX = clampNumber(raw.tiltRotateX, -90, 90);
  if (tiltRotateX !== undefined) clean.tiltRotateX = tiltRotateX;
  const tiltRotateY = clampNumber(raw.tiltRotateY, -90, 90);
  if (tiltRotateY !== undefined) clean.tiltRotateY = tiltRotateY;
  const tiltRotateZ = clampNumber(raw.tiltRotateZ, -90, 90);
  if (tiltRotateZ !== undefined) clean.tiltRotateZ = tiltRotateZ;
  if (typeof raw.tiltGlow === "boolean") clean.tiltGlow = raw.tiltGlow;
  if (isSafeColor(raw.tiltGlowColor)) clean.tiltGlowColor = raw.tiltGlowColor;
  const tiltGlowRadius = clampNumber(raw.tiltGlowRadius, 0, 200);
  if (tiltGlowRadius !== undefined) clean.tiltGlowRadius = tiltGlowRadius;
  const safariUrl = pickString(raw.safariUrl, 200);
  if (safariUrl !== undefined) clean.safariUrl = safariUrl;
  if (typeof raw.showLanguageBadge === "boolean") clean.showLanguageBadge = raw.showLanguageBadge;
  if (typeof raw.showTabIcons === "boolean") clean.showTabIcons = raw.showTabIcons;
  if (typeof raw.showQrCode === "boolean") clean.showQrCode = raw.showQrCode;
  const qrText = pickString(raw.qrText, 500);
  if (qrText !== undefined) clean.qrText = qrText;
  const qrPosition = pickEnum<QrPosition>(raw.qrPosition, ALLOWED_QR_POSITIONS);
  if (qrPosition) clean.qrPosition = qrPosition;
  if (typeof raw.typewriterActive === "boolean") clean.typewriterActive = raw.typewriterActive;
  const typewriterSpeed = clampNumber(raw.typewriterSpeed, 1, 1000);
  if (typewriterSpeed !== undefined) clean.typewriterSpeed = typewriterSpeed;
  const typewriterSpeedMode = pickEnum<TypewriterSpeed>(raw.typewriterSpeedMode, ALLOWED_TYPEWRITER_SPEEDS);
  if (typewriterSpeedMode) clean.typewriterSpeedMode = typewriterSpeedMode;

  // Pro Studio efektleri
  if (typeof raw.useGradientBorder === "boolean") clean.useGradientBorder = raw.useGradientBorder;
  const gradientBorderPreset = pickEnum<GradientBorderPreset>(raw.gradientBorderPreset, ALLOWED_BORDER_PRESETS);
  if (gradientBorderPreset) clean.gradientBorderPreset = gradientBorderPreset;
  const gradientBorderWidth = clampNumber(raw.gradientBorderWidth, 0, 20);
  if (gradientBorderWidth !== undefined) clean.gradientBorderWidth = gradientBorderWidth;
  if (Array.isArray(raw.gradientBorderColors) && raw.gradientBorderColors.length <= 10 && raw.gradientBorderColors.every(isSafeColor)) {
    clean.gradientBorderColors = raw.gradientBorderColors as string[];
  }
  const gradientBorderAngle = clampNumber(raw.gradientBorderAngle, 0, 360);
  if (gradientBorderAngle !== undefined) clean.gradientBorderAngle = gradientBorderAngle;
  if (typeof raw.useGrainTexture === "boolean") clean.useGrainTexture = raw.useGrainTexture;
  const grainOpacity = clampNumber(raw.grainOpacity, 0, 1);
  if (grainOpacity !== undefined) clean.grainOpacity = grainOpacity;
  const socialPreset = pickEnum<SocialPresetId>(raw.socialPreset, ALLOWED_SOCIAL_PRESETS);
  if (socialPreset) clean.socialPreset = socialPreset;
  if (raw.windowHeaderBg === "" || isSafeColor(raw.windowHeaderBg)) clean.windowHeaderBg = raw.windowHeaderBg as string;
  if (typeof raw.windowHeaderCustom === "boolean") clean.windowHeaderCustom = raw.windowHeaderCustom;
  const logoPosition = pickEnum<LogoPosition>(raw.logoPosition, ALLOWED_LOGO_POSITIONS);
  if (logoPosition) clean.logoPosition = logoPosition;
  const logoOpacity = clampNumber(raw.logoOpacity, 0, 100);
  if (logoOpacity !== undefined) clean.logoOpacity = logoOpacity;
  const logoSize = clampNumber(raw.logoSize, 8, 400);
  if (logoSize !== undefined) clean.logoSize = logoSize;
  const uiLanguage = pickEnum<UiLanguage>(raw.uiLanguage, new Set(["tr", "en"]));
  if (uiLanguage) clean.uiLanguage = uiLanguage;
  if (typeof raw.animatedBackground === "boolean") clean.animatedBackground = raw.animatedBackground;
  const animatedBackgroundSpeed = pickEnum<AnimatedBgSpeed>(raw.animatedBackgroundSpeed, ALLOWED_ANIM_SPEEDS);
  if (animatedBackgroundSpeed) clean.animatedBackgroundSpeed = animatedBackgroundSpeed;

  return clean;
}
