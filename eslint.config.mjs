import js from '@eslint/js';
import globals from 'globals';
import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        React: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin
    },
    rules: {
      // 👇 REGLAS BÁSICAS Y SEGURAS
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      
      // Reglas de TypeScript (básicas y compatibles)
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      
      // Reglas de formato básicas
      'quotes': ['warn', 'single', { avoidEscape: true }],
      'semi': ['warn', 'always'],
      'comma-spacing': ['warn', { before: false, after: true }],
      'object-curly-spacing': ['warn', 'always'],
    }
  },
  
  {
    ignores: [
      'node_modules/',
      '.next/',
      'dist/',
      'build/',
      '*.config.js'
    ]
  }
];