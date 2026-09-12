import React from "react";

export interface LanguageInfo {
  id: string;
  name: string;
  color: string;
  bgColor: string;
  icon: React.ReactNode;
}

export const LANGUAGE_ICONS: Record<string, LanguageInfo> = {
  typescript: {
    id: "typescript",
    name: "TypeScript",
    color: "#3178C6",
    bgColor: "rgba(49, 120, 198, 0.15)",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <path
          d="M10.8 11.2H7.2V9.5h8.9v1.7h-3.6v9.3H10.8v-9.3zm5.7 6.1c.5.4 1.1.7 1.8.7.7 0 1.2-.3 1.2-.7 0-.5-.4-.7-1.4-1.1-1.3-.5-2.2-1.3-2.2-2.5 0-1.5 1.2-2.6 3.1-2.6 1.1 0 2 .3 2.7.8l-.6 1.4c-.6-.4-1.3-.6-2-.6-.7 0-1.2.3-1.2.7 0 .4.4.6 1.3 1 1.4.5 2.3 1.2 2.3 2.6 0 1.6-1.3 2.7-3.3 2.7-1.3 0-2.3-.4-3.1-1l.6-1.4z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  javascript: {
    id: "javascript",
    name: "JavaScript",
    color: "#F7DF1E",
    bgColor: "rgba(247, 223, 30, 0.15)",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#F7DF1E" />
        <path
          d="M7 16.5c.5.8 1.2 1.4 2.2 1.4 1.1 0 1.9-.6 1.9-2V9.5h-1.8v6.4c0 .4-.2.6-.5.6-.4 0-.7-.3-.9-.7L7 16.5zm7.3-.2c.6.9 1.5 1.5 2.7 1.5 1.3 0 2.2-.7 2.2-1.8 0-1.1-.7-1.6-2.1-2.2-1.2-.5-1.9-.9-1.9-1.7 0-.7.6-1.3 1.6-1.3.8 0 1.4.3 1.9.9l1.2-1.1c-.8-.9-1.9-1.3-3.1-1.3-2.1 0-3.3 1.3-3.3 2.8 0 1.3.8 2 2.3 2.6 1.1.5 1.7.8 1.7 1.4 0 .6-.6 1-1.6 1-.9 0-1.5-.4-2-1.1l-1.3 1.2z"
          fill="#000000"
        />
      </svg>
    ),
  },
  python: {
    id: "python",
    name: "Python",
    color: "#3776AB",
    bgColor: "rgba(55, 118, 171, 0.15)",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
        <path
          d="M11.88 2c-5.18 0-4.86 2.25-4.86 2.25l.01 2.33h4.94v.7H5.03S2 6.93 2 12.16c0 5.23 2.64 5.06 2.64 5.06h1.58v-2.21s-.09-2.64 2.6-2.64h4.48s2.51.04 2.51-2.45V5.07S16.42 2 11.88 2zm-1.35 1.44a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6z"
          fill="#3776AB"
        />
        <path
          d="M12.12 22c5.18 0 4.86-2.25 4.86-2.25l-.01-2.33h-4.94v-.7h6.94S22 17.07 22 11.84c0-5.23-2.64-5.06-2.64-5.06h-1.58v2.21s.09 2.64-2.6 2.64h-4.48s-2.51-.04-2.51 2.45v4.85S7.58 22 12.12 22zm1.35-1.44a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6z"
          fill="#FFD43B"
        />
      </svg>
    ),
  },
  rust: {
    id: "rust",
    name: "Rust",
    color: "#DEA584",
    bgColor: "rgba(222, 165, 132, 0.15)",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#DEA584" strokeWidth="2" />
        <path
          d="M8 8h5a3 3 0 0 1 0 6H8V8zm0 6h4l3 5h-2.5l-2.5-5H8"
          stroke="#DEA584"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  csharp: {
    id: "csharp",
    name: "C#",
    color: "#9B4993",
    bgColor: "rgba(155, 73, 147, 0.15)",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#9B4993" />
        <path
          d="M9.5 15.5c-2 0-3.5-1.5-3.5-3.5s1.5-3.5 3.5-3.5c1.2 0 2.2.6 2.8 1.5l-1.4 1c-.3-.5-.8-.8-1.4-.8-1.1 0-1.9.8-1.9 1.8s.8 1.8 1.9 1.8c.6 0 1.1-.3 1.4-.8l1.4 1c-.6.9-1.6 1.5-2.8 1.5zm6.5-5v1.2h1.2v1.2H16v1.2h-1.2v-1.2h-1.2v-1.2h1.2v-1.2H16z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  cpp: {
    id: "cpp",
    name: "C++",
    color: "#00599C",
    bgColor: "rgba(0, 89, 156, 0.15)",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#00599C" />
        <path
          d="M7.5 15.5c-2 0-3.5-1.5-3.5-3.5s1.5-3.5 3.5-3.5c1.2 0 2.2.6 2.8 1.5l-1.4 1c-.3-.5-.8-.8-1.4-.8-1.1 0-1.9.8-1.9 1.8s.8 1.8 1.9 1.8c.6 0 1.1-.3 1.4-.8l1.4 1c-.6.9-1.6 1.5-2.8 1.5zm6.5-4h1v1h-1v1h-1v-1h-1v-1h1v-1h1v1zm4 0h1v1h-1v1h-1v-1h-1v-1h1v-1h1v1z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  c: {
    id: "c",
    name: "C",
    color: "#A8B9CC",
    bgColor: "rgba(168, 185, 204, 0.15)",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#4B5563" />
        <path
          d="M13 16.5c-2.8 0-5-2-5-4.5s2.2-4.5 5-4.5c1.8 0 3.3.9 4.1 2.2l-1.9 1.3c-.5-.7-1.3-1.2-2.2-1.2-1.6 0-2.8 1-2.8 2.2s1.2 2.2 2.8 2.2c.9 0 1.7-.5 2.2-1.2l1.9 1.3c-.8 1.3-2.3 2.2-4.1 2.2z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  html: {
    id: "html",
    name: "HTML5",
    color: "#E34F26",
    bgColor: "rgba(227, 79, 38, 0.15)",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 3l1.7 18.5L12 24l7.3-2.5L21 3H3zm14.8 4.7l-.3 3.6H9l.2 2.2h8.2l-.6 6.3-4.8 1.4-4.8-1.4-.3-3.6h2.2l.1 1.7 2.8.8 2.8-.8.3-3.1H6.7L6 5.6h12l-.2 2.1z"
          fill="#E34F26"
        />
      </svg>
    ),
  },
  css: {
    id: "css",
    name: "CSS3",
    color: "#1572B6",
    bgColor: "rgba(21, 114, 182, 0.15)",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 3l1.7 18.5L12 24l7.3-2.5L21 3H3zm14.8 4.7l-.3 3.6H9l.2 2.2h8.2l-.6 6.3-4.8 1.4-4.8-1.4-.3-3.6h2.2l.1 1.7 2.8.8 2.8-.8.3-3.1H6.7L6 5.6h12l-.2 2.1z"
          fill="#1572B6"
        />
      </svg>
    ),
  },
  sql: {
    id: "sql",
    name: "SQL",
    color: "#00758F",
    bgColor: "rgba(0, 117, 143, 0.15)",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="5" rx="8" ry="3" stroke="#00758F" strokeWidth="2" />
        <path d="M4 5v7c0 1.66 3.58 3 8 3s8-1.34 8-3V5" stroke="#00758F" strokeWidth="2" />
        <path d="M4 12v7c0 1.66 3.58 3 8 3s8-1.34 8-3v-7" stroke="#00758F" strokeWidth="2" />
      </svg>
    ),
  },
  bash: {
    id: "bash",
    name: "Bash",
    color: "#4EAA25",
    bgColor: "rgba(78, 170, 37, 0.15)",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#293138" />
        <path
          d="M6 8l5 4-5 4M13 16h6"
          stroke="#4EAA25"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  json: {
    id: "json",
    name: "JSON",
    color: "#F58220",
    bgColor: "rgba(245, 130, 32, 0.15)",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#1C1E24" />
        <path
          d="M8 6c-1.5 0-2 1-2 2v2c0 1-.5 1.5-1.5 1.5 1 0 1.5.5 1.5 1.5v2c0 1 .5 2 2 2M16 6c1.5 0 2 1 2 2v2c0 1 .5 1.5 1.5 1.5-1 0-1.5.5-1.5 1.5v2c0 1-.5 2-2 2"
          stroke="#F58220"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  markdown: {
    id: "markdown",
    name: "Markdown",
    color: "#3B82F6",
    bgColor: "rgba(59, 130, 246, 0.15)",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#1E3A8A" />
        <path
          d="M4 16V8h3l2.5 3.5L12 8h3v8h-2v-4.5L10.5 15 8 11.5V16H4zm14.5 0l-3-4h2V8h2v4h2l-3 4z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
};

export const getLanguageBadge = (language: string): LanguageInfo => {
  const normalized = (language || "").toLowerCase();
  return (
    LANGUAGE_ICONS[normalized] || {
      id: normalized,
      name: normalized.toUpperCase(),
      color: "#6366F1",
      bgColor: "rgba(99, 102, 241, 0.15)",
      icon: (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2">
          <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    }
  );
};
