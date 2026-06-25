/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./*.html", "./script.js", "./pages/*.html"],
  safelist: [
    // navbar scroll-state classes applied by script.js
    "bg-surface-50/90",
    "shadow-lg",
    "shadow-slate-200/50",
    "rounded-none",
    "backdrop-blur-xl",
    // legacy dark classes kept so script.js removals don't error
    "bg-midnight-900/80",
    "bg-midnight-900/90",
    "shadow-black/10",
    "bg-midnight-950",
    "shadow-accent/5",
    "shadow-lilac/10",
    "border-accent/20",
    "border-lilac/10",
    // toast classes
    "border-l-green-500",
    "border-l-red-500",
    "border-l-accent",
    "border-l-warm",
    "dark:bg-dark-card",
    "dark:border-dark-border/20",
  ],
  theme: {
    extend: {
      colors: {
        // Light surface palette
        surface: {
          50:  "#F5F7FA",
          100: "#EEF1F5",
          200: "#E2E8F3",
          300: "#CAD5E8",
          400: "#A8BADB",
        },
        // Dark text palette (kept for reference)
        midnight: {
          950: "#040A18",
          900: "#0B1D3A",
          800: "#0F2A44",
          700: "#1A3A5F",
          600: "#234B73",
        },
        // Accent / brand blues
        accent: {
          DEFAULT: "#00B4FF",
          light:   "#33C5FF",
          dark:    "#0090CC",
          deep:    "#0072A8",
          glow:    "rgba(0, 180, 255, 0.25)",
        },
        // Lilac / violet
        lilac: {
          DEFAULT: "#8B5CF6",
          light:   "#A78BFA",
          dark:    "#7C3AED",
          deep:    "#6D28D9",
          glow:    "rgba(139, 92, 246, 0.25)",
        },
        // Warm amber
        warm: {
          DEFAULT: "#F59E0B",
          light:   "#FBBF24",
          dark:    "#D97706",
          deep:    "#B45309",
          glow:    "rgba(245, 158, 11, 0.25)",
        },
        // Body text tones
        ink: {
          900: "#1A2236",
          700: "#2E3B55",
          500: "#4A5775",
          400: "#5A6B8A",
          300: "#8A9BBC",
          200: "#B8C8DF",
        },
        // Dark mode palette (skeuomorphic)
        dark: {
          bg: "#0A0F1C",
          card: "#12182B",
          cardHover: "#151C32",
          accent: "#7C5CFF",
          secondary: "#9AA4B2",
          text: "#E6EAF2",
          textMuted: "#9AA4B2",
          border: "rgba(255, 255, 255, 0.2)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      animation: {
        float:        "float 6s ease-in-out infinite",
        "glow-pulse":  "glow-pulse 3s ease-in-out infinite",
        "fade-in":     "fade-in 0.8s ease-out forwards",
        "slide-up":    "slide-up 0.8s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-20px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.35" },
          "50%":      { opacity: "0.70" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(40px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
