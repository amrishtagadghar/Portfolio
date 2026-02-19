import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B0F1A",
        "ink-muted": "#3B4254",
        "ink-soft": "#6B7280",
        paper: "#F7F8FB",
        mist: "#EEF1F7",
        sky: "#BFD9FF",
        lavender: "#D7C6FF",
        blush: "#F7B7D2",
        peach: "#FFD2B8",
        mint: "#BFF3DD",
        focus: "#3B82F6",
        rust: "#E8709F",
        leaf: "#6ABFA3"
      },
      fontFamily: {
        sans: ["Aileron", "Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
        serif: ["Aileron", "Inter", "system-ui", "sans-serif"]
      },
      borderRadius: {
        md: "20px",
        lg: "32px",
        xl: "48px",
        hero: "64px"
      },
      boxShadow: {
        glass: "0 10px 40px rgba(11, 15, 26, 0.10), 0 2px 10px rgba(11, 15, 26, 0.06)"
      }
    }
  },
  plugins: []
};

export default config;
