import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import perfectionist from 'eslint-plugin-perfectionist';
import prettierConfig from 'eslint-config-prettier';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import tsParser from '@typescript-eslint/parser'
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const sharedRules = {
  'no-console': 0,
  'quotes': ['error', 'single'],
  '@typescript-eslint/naming-convention': 0,
  '@typescript-eslint/no-unused-vars': [1, { args: 'none' }],
  'react/react-in-jsx-scope': 0,
  'react/jsx-props-no-spreading': 0,
  'prefer-destructuring': [1, { object: true, array: false }],
  '@typescript-eslint/no-non-null-assertion': 'off',
  '@typescript-eslint/no-explicit-any': 'off'
};


const perfectionistConfig = {
  'perfectionist/sort-imports': [
    1,
    {
      order: 'asc',
      type: 'line-length',
      'newlines-between': 'always',
      groups: [
        ['builtin', 'external'],
        'internal',
        ['parent', 'sibling', 'index'],
        'type'
      ],
      'custom-groups': {
        value: {
          'hooks': 'src/hooks/**',
          'utils': 'src/utils/**',
          'components': 'src/components/**'
        }
      },
      'internal-pattern': ['src/**']
    }
  ]
};

export default [
  {
    ignores: ['*.cjs', '*.mjs', 'vite.config.ts']
  },
  reactRecommended,
  prettierConfig,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.test.ts', '**/*.test.tsx'],
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.jest,
      },
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.json',
        sourceType: 'module',
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true }
      }
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      'perfectionist': perfectionist,
    },
    rules: {
      ...sharedRules,
      ...perfectionistConfig
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
];