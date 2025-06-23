/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // Use the TypeScript parser
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // TS lint rules
    'plugin:react/recommended',              // React lint rules
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',           // Integrates Prettier
    'next/core-web-vitals',                  // Next.js specific rules
  ],
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  rules: {
    // Customize rules here
    'react/react-in-jsx-scope': 'off', // Not needed in Next.js
    '@typescript-eslint/no-explicit-any': 'warn',
    'no-unused-vars': 'warn',
    'no-useless-catch': 'warn',
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
  },
  ignorePatterns: ['node_modules', '.next', 'dist'],
};
