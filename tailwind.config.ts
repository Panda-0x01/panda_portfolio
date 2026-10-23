import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0D0D0D",
        paper: "#F5F5F5",
        muted: "#A0A0A0",
        accent: "#FFFFFF",
        line: "#333333",
        hover: "#D9D9D9",
        dim: "#555555",
      },
      fontFamily: {
        display: ['"Anton"', '"Archivo Black"', '"Barlow Condensed"', "sans-serif"],
        condensed: ['"Barlow Condensed"', '"Archivo Black"', "sans-serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      letterSpacing: {
        display: "-0.03em",
        tighter2: "-0.035em",
      },
      lineHeight: {
        display: "0.9",
        hero: "0.85",
      },
      screens: {
        xs: "480px",
      },
      transitionTimingFunction: {
        cine: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "marquee-x": {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(-50%,0,0)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        "marquee-x": "marquee-x 40s linear infinite",
        blink: "blink 1.2s step-end infinite",
      },
    },
  },
  plugins: [],
};

export default config;
