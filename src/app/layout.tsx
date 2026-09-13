import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://snapmark-app.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SnapMark — Kod & Markdown Görsel Kart Stüdyosu | 4K & Animasyon",
    template: "%s | SnapMark",
  },
  description:
    "Kod parçacıklarını, Markdown notlarını, tweet ve terminal komutlarını tek tıkla 4K estetik görsellere ve WebM animasyon videolarına dönüştüren açık kaynak stüdyo.",
  keywords: [
    "SnapMark",
    "kod kartı",
    "code to image",
    "kod görseli yapma",
    "carbon sh alternatifi",
    "developer tools",
    "4K code screenshot",
    "kod paylaşma",
    "yazılımcı araçları",
    "carousel generator",
    "linkedin code post",
    "twitter code snippet",
    "syntax highlighting",
    "3d code card",
  ],
  authors: [{ name: "SnapMark Team", url: siteUrl }],
  creator: "SnapMark",
  publisher: "SnapMark",
  applicationName: "SnapMark",
  category: "Developer Tools",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SnapMark — Kod & Markdown Görsel Kart Stüdyosu",
    description:
      "Bulanık ekran alıntıları yerine kristal netliğinde 4K kod kartları ve WebM videoları üretin. %100 tarayıcıda, ücretsiz ve açık kaynak.",
    url: siteUrl,
    siteName: "SnapMark",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SnapMark — 4K Kod Görsel Kart Stüdyosu",
    description:
      "Kod parçacıklarını sosyal medya için 4K kartlara ve animasyonlu videolara dönüştürün.",
    creator: "@snapmark",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "SnapMark",
    alternateName: "SnapMark Pro Studio",
    url: siteUrl,
    description:
      "Kod parçacıklarını ve notları tek tıkla estetik sosyal medya görsellerine ve animasyon videolarına dönüştüren açık kaynak stüdyo.",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "4K Ultra HD Code Image Export",
      "WebM Animation Video Recording",
      "3D Perspective & Isometric Tilt",
      "Multi-Slide Carousel Studio",
      "Prism Syntax Highlighting with 8 Themes",
      "Live Social Media Feed Preview (Twitter, LinkedIn, Instagram)",
      "Dynamic QR Code Badges",
      "100% Client-Side Privacy",
    ],
  };

  return (
    <html lang="tr" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#090d14] text-slate-100 antialiased selection:bg-pink-500 selection:text-white"
      >
        {children}
      </body>
    </html>
  );
}
