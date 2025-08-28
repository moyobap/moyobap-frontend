import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5B8DEF",
        success: "#1DB954",
        warning: "#F59E0B",
        danger: "#EF4444",
        "gray-900": "#111827",
        "gray-800": "#1F2937",
        "gray-700": "#374151",
        "gray-600": "#6B7280",
        "gray-500": "#9CA3AF",
        "gray-400": "#D1D5DB",
        "gray-300": "#E5E7EB",
        "gray-200": "#F3F4F6",
        "gray-100": "#FFFFFF",
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        pill: "999px",
      },
      spacing: {
        4: "4px",
        8: "8px",
        12: "12px",
        16: "16px",
        20: "20px",
        24: "24px",
        32: "32px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
        md: "0 4px 6px rgba(0, 0, 0, 0.1)",
        lg: "0 10px 15px rgba(0, 0, 0, 0.15)",
      },
      fontFamily: {
        sans: ['"Noto Sans KR"', "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
