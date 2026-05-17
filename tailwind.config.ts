import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        orion: {
          bg: "#050712",
          panel: "#0c1226",
          cyan: "#71e1ff",
          violet: "#9b6bff",
          green: "#6ef7b1",
          rose: "#ff6f91"
        }
      },
      boxShadow: {
        glass: "0 24px 90px rgba(0, 0, 0, 0.42)",
        glow: "0 0 36px rgba(113, 225, 255, 0.28)"
      },
      backdropBlur: {
        glass: "28px"
      }
    }
  },
  plugins: []
};

export default config;
