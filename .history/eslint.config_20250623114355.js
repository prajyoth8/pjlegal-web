/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  ignores: ["node_modules", ".next", "out"],
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "next",
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint", "react", "prettier"],
  rules: {
    "react/react-in-jsx-scope": "off", // ✅ Not required in React 17+
    "no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "warn", // or "off" if you prefer
    "no-useless-catch": "off",
    "no-undef": "off",
    "prettier/prettier": "warn",
  },
  settings: {
    react: {
      version: "detect", // 🔍 Fixes React version warning
    },
  },
};
