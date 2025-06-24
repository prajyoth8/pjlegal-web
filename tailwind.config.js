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
      fontSize: {
        base: "16px",
      },
      animation: {
        gradientLoop: "gradientLoop 15s ease infinite",
        "bounce-once": "bounce 0.8s ease-out 1",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        gradientLoop: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        glow: {
      "0%": { textShadow: "0 0 5px #fff, 0 0 10px #f0f, 0 0 20px #f0f" },
      "100%": { textShadow: "0 0 10px #0ff, 0 0 20px #0ff, 0 0 30px #0ff" },
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
