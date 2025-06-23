import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import next from 'eslint-plugin-next';
import eslintPluginNext from 'eslint-plugin-next';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  // JavaScript base rules
  js.configs.recommended,

  // TypeScript recommended settings
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
  },

  // Next.js plugin rules
  {
    plugins: { next },
    rules: {
      ...next.configs['recommended'].rules,
    },
  },

  // Prettier override to disable conflicts
  prettier,

  // Custom overrides
  {
    rules: {
      // No need to import React in scope
      'react/react-in-jsx-scope': 'off',

      // Common overrides
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-floating-promises': 'off',
      'no-useless-catch': 'off',
    },
  },
];
