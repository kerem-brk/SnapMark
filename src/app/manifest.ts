import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SnapMark — Kod & Görsel Kart Stüdyosu",
    short_name: "SnapMark",
    description:
      "Kod parçacıklarını, Markdown notlarını ve tweet'leri 4K görsellere ve animasyonlu videolara dönüştürün.",
    start_url: "/",
    display: "standalone",
    background_color: "#090d16",
    theme_color: "#6366f1",
    orientation: "any",
    categories: ["developer tools", "utilities", "productivity"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
