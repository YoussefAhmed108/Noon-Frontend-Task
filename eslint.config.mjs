import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Base configurations
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // Additional rules for consistent code style and quality
  {
    rules: {
      // Consistency rules
      'quotes': ['error', 'single', { avoidEscape: true }],
      'semi': ['error', 'always'],
      'indent': ['error', 2, { SwitchCase: 1 }],
      'comma-dangle': ['error', 'always-multiline'],

      // Code quality rules
      'no-unused-vars': 'off', // Turned off in favor of TypeScript rule
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true
      }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-duplicate-imports': 'error',

      // React specific rules
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
      'react/self-closing-comp': 'error',
      'react/no-unescaped-entities': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // TypeScript specific rules
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/ban-ts-comment': 'warn',

      // JSX accessibility
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-has-content': 'error',
      'jsx-a11y/aria-props': 'error',

      // Import organization - relaxed to make fixing easier
      'import/order': ['error', {
        'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        'alphabetize': { order: 'asc' },
        'pathGroups': [
          {
            'pattern': 'react',
            'group': 'external',
            'position': 'before'
          },
          {
            'pattern': 'next/**',
            'group': 'external',
            'position': 'after'
          }
        ],
        'pathGroupsExcludedImportTypes': ['react']
      }],

      // Naming conventions
      'camelcase': ['error', {
        properties: 'never',
        ignoreDestructuring: true,
        // Allow snake_case for specific API response handling
        allow: ['^NEXT_PUBLIC_']
      }]
    },

    settings: {
      react: {
        version: 'detect'
      }
    }
  }
];

export default eslintConfig;
