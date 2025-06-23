// eslint.config.js (ESLint v9+ compliant)

import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import prettier from "eslint-plugin-prettier";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: true,
        tsconfigRootDir: process.cwd(),
      },
    },
    plugins: {
      react,
      prettier,
    },
    rules: {
      "react/react-in-jsx-scope": "off", // ✅ Not needed in Next.js/React 17+
      "prettier/prettier": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "no-useless-catch": "off",
      "no-undef": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
