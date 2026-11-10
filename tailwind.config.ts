import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        alabaster: {
          DEFAULT: "#FAF8F5",
          surface: "#FAF8F5",
          bg: "#F4F1EA",
          mat: "#E6E1D6",
          border: "#D6D0C4",
          text: "#18181B",
          subtext: "#57534E",
        },
        flame: {
          DEFAULT: "#FF4F00",
          hover: "#EA580C",
          dark: "#C2410C",
        },
        vercel: {
          black: "#000000",
          surface: "#0A0A0A",
          elevated: "#121212",
          border: "#1F1F1F",
          "border-hover": "#333333",
          subtext: "#888888",
        },
        brand: {
          cobalt: "#0070F3", // Vercel / SnapMark Signature Blue
          prism: "#7928CA",  // Cyber Violet / Prism Accent
        },
      },
      fontFamily: {
        geist: ["var(--font-geist-sans)", "Geist", "Inter", "sans-serif"],
        "geist-mono": ["var(--font-geist-mono)", "Geist Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
