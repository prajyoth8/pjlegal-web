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
        "bounce-once": "bounce 0.8s ease-out 1",
      },
      colors: {
        navy: "#001f3f",
        gold: "#FFD700",
      },
    },
  },
  plugins: [],
};
