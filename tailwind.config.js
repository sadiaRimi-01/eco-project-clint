/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      {
        ecotrackdark: {
          /* REQUIRED BASE COLORS */
          "base-100": "#020617",   // page bg
          "base-200": "#020617",
          "base-300": "#020617",
          "base-content": "#ffffff",

          /* Brand */
          "primary": "#22c55e",
          "secondary": "#16a34a",
          "accent": "#4ade80",

          /* UI */
          "info": "#38bdf8",
          "success": "#22c55e",
          "warning": "#facc15",
          "error": "#ef4444",

          "--rounded-btn": "0.75rem",
          "--animation-btn": "0.25s",
          "--btn-focus-scale": "0.98",
        },
      },
    ],
  },
};
