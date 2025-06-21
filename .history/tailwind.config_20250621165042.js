// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/**/*.html"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        roboto: ["'Roboto'", "sans-serif"],
      },
      animation: {
        gradientLoop: "gradientLoop 15s ease infinite",
        "bounce-once": "bounce 0.8s ease-out 1",
      },
      keyframes: {
        gradientLoop: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      colors: {
        navy: "#001f3f",
        gold: "#FFD700",
      },
    },
  },
  plugins: [],
};
