import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#355E3B",
          dark: "#2A4A2F",
        },
        accent: {
          DEFAULT: "#D97708",
          hover: "#B95F05",
        },
        background: "#FDFBF5",
        surface: "#FFFFFF",
        elevated: "#F6F3EA",
        foreground: "#292524",
        muted: "#6B645E",
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 10px 40px rgba(0,0,0,0.08)",
        glow: "0 8px 30px rgba(217,119,8,0.35)",
      },
    },
  },
  plugins: [],
};
export default config;
