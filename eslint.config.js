import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

// Flat config (ESLint 9). Replaces the former .eslintrc.cjs + .eslintignore.
//
// One migration hazard worth remembering: in eslintrc, a `files: ['*.ts']`
// override matched a basename at any depth. In flat config the same pattern
// only matches the repo root, so every override below is written as `**/*.ts`.
export default [
  {
    // Formerly .eslintignore. node_modules is ignored by default in flat
    // config; the rest still has to be named explicitly.
    ignores: ['dist/', '.astro/', 'public/', '.vercel/', 'pnpm-lock.yaml'],
  },

  js.configs.recommended,
  ...astro.configs['flat/recommended'],

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'prefer-const': 'warn',
      'no-var': 'error',
    },
  },

  {
    // CLI scripts can use console
    files: ['scripts/**/*.js', 'scripts/**/*.ts'],
    rules: {
      'no-console': 'off',
    },
  },

  {
    // TypeScript files — the TS compiler already reports unused symbols, and
    // the base rule misfires on type-only syntax.
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      sourceType: 'module',
      ecmaVersion: 'latest',
    },
    rules: {
      'no-unused-vars': 'off',
    },
  },

  {
    // JSX/TSX files with accessibility rules
    ...jsxA11y.flatConfigs.recommended,
    files: ['**/*.jsx', '**/*.tsx'],
  },
];
