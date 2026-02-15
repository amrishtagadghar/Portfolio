import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#10131A",
        paper: "#F6F3EC",
        sand: "#DED4C5",
        rust: "#A5482A",
        leaf: "#2B554A"
      },
      fontFamily: {
        sans: ["Aileron", "Avenir Next", "Segoe UI", "sans-serif"],
        serif: ["Iowan Old Style", "Times New Roman", "serif"]
      }
    }
  },
  plugins: []
};

export default config;
