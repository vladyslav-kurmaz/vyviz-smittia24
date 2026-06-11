import { createSystem, defaultConfig } from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#f0f5f1" },
          100: { value: "#dce8de" },
          500: { value: "#355E3B" },
          600: { value: "#2A4A2F" },
          700: { value: "#233d28" },
        },
        accent: {
          50: { value: "#fff7ed" },
          100: { value: "#ffedd5" },
          500: { value: "#D97708" },
          600: { value: "#B95F05" },
          700: { value: "#9A4F04" },
        },
        cream: { value: "#FFFFFF" },
        page: { value: "#FAF9F6" },
        elevated: { value: "#F3F1EC" },
        ink: { value: "#1F1C1A" },
        muted: { value: "#4A4540" },
        surface: { value: "#FFFFFF" },
      },
      fonts: {
        body: {
          value:
            'var(--font-inter), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        },
        heading: {
          value:
            'var(--font-inter), ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        },
      },
      radii: {
        card: { value: "16px" },
        cardSm: { value: "12px" },
        button: { value: "8px" },
        pill: { value: "9999px" },
      },
      shadows: {
        card: { value: "0 4px 24px rgba(41, 37, 36, 0.06), 0 1px 3px rgba(41, 37, 36, 0.04)" },
        cardHover: { value: "0 20px 48px rgba(41, 37, 36, 0.1), 0 4px 12px rgba(53, 94, 59, 0.06)" },
        glow: { value: "0 4px 16px rgba(217, 119, 8, 0.22)" },
        btn: { value: "0 2px 8px rgba(41, 37, 36, 0.08)" },
        inset: { value: "inset 0 1px 0 rgba(255,255,255,0.6)" },
      },
    },
    recipes: {
      text: {
        base: {
          lineHeight: "relaxed",
        },
      },
    },
  },
  globalCss: {
    "html, body": {
      margin: 0,
      padding: 0,
      fontFamily: "body",
    },
    body: {
      bg: "page",
      color: "ink",
      fontFamily: "body",
    },
    "h1, h2, h3, h4, h5, h6": {
      fontFamily: "heading",
    },
    "button, input, select, textarea": {
      fontFamily: "body",
    },
  },
});
