// tailwind.config.js
const {heroui} = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(button|card|divider|input|ripple|spinner|form).js"
  ],
  theme: {
    extend: {
      colors: {
        /* Professional blue & cyan palette */
        primary: {
          50: "#f0f7ff",
          100: "#e0effe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0284c7",
          800: "#075985",
          900: "#0c3d66",
          950: "#0066ff",
        },
        accent: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#00d4ff",
          600: "#14b8a6",
          700: "#0d9488",
          800: "#0f766e",
          900: "#134e4a",
        },
        dark: {
          bg: "#0a0e27",
          surface: "#1a1f3a",
          border: "#252d4a",
        },
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #0066ff 0%, #0080ff 50%, #00d4ff 100%)",
        "gradient-dark": "linear-gradient(180deg, #0a0e27 0%, #1a1f3a 50%, #05070f 100%)",
        "gradient-subtle": "linear-gradient(135deg, #1a1f3a 0%, #0f1428 100%)",
        "gradient-accent": "linear-gradient(135deg, #00d4ff 0%, #0066ff 100%)",
      },
      boxShadow: {
        "glow": "0 10px 30px rgba(0, 102, 255, 0.2)",
        "glow-lg": "0 20px 60px rgba(0, 102, 255, 0.3)",
        "glow-accent": "0 10px 30px rgba(0, 212, 255, 0.2)",
      },
      animation: {
        "gradient": "gradient-shift 3s ease infinite",
        "float": "float 3s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
      keyframes: {
        "gradient-shift": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "glow": {
          "0%, 100%": { "box-shadow": "0 0 20px rgba(0, 102, 255, 0.3)" },
          "50%": { "box-shadow": "0 0 40px rgba(0, 102, 255, 0.6)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui(),
    require("daisyui")
  ],
};