import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import next from 'eslint-plugin-next';

export default [
  // Base JavaScript rules
  js.configs.recommended,

  // TypeScript support
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

  // Prettier overrides
  prettier,

  // Custom project-specific rules
  {
    rules: {
      // Next.js doesn't require 'React' in scope
      'react/react-in-jsx-scope': 'off',
      'no-useless-catch': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',

      // Optional: turn off overly strict rules
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-floating-promises': 'off',
    },
  },
];
