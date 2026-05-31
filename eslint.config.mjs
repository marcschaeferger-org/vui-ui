import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import nextPlugin from '@next/eslint-plugin-next';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default [
  // Global ignores
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/dist/**',
      '**/storybook-static/**',
      '**/coverage/**',
      '**/.storybook/**',
      '.prettierrc.mjs',
      'eslint.config.mjs',
      'jest.config.cjs',
      'jest.setup.cjs',
      'postcss.config.cjs',
      'next.config.mjs',
    ],
  },

  // Base recommended rules
  js.configs.recommended,

  // TypeScript ESLint
  ...tseslint.configs.recommended,

  // JSX A11y
  jsxA11y.flatConfigs.recommended,

  // Mantine-style rules (stylistic rules as warnings, correctness as errors)
  {
    rules: {
      // Correctness / security — errors
      'no-duplicate-imports': 'error',
      'no-self-compare': 'error',
      'no-template-curly-in-string': 'error',
      'default-case-last': 'error',
      'no-alert': 'error',
      'no-script-url': 'error',
      'no-throw-literal': 'error',
      'no-useless-call': 'error',
      'no-useless-constructor': 'error',
      'no-useless-return': 'warn',
      'no-useless-assignment': 'warn',
      'no-control-regex': 'warn',
      'no-useless-escape': 'warn',
      'prefer-promise-reject-errors': 'error',
      'prefer-object-spread': 'error',
      radix: 'error',
      eqeqeq: ['warn', 'smart'],
      'no-undef': 'off',

      // Stylistic — warnings
      'no-var': 'warn',
      curly: 'warn',
      'dot-notation': 'warn',
      'no-console': 'warn',
      'no-else-return': 'warn',
      'no-eval': 'warn',
      'no-lonely-if': 'warn',
      'no-multi-assign': 'warn',
      'no-multi-str': 'warn',
      'no-param-reassign': 'warn',
      'no-return-assign': 'warn',
      'no-sequences': 'warn',
      'no-unneeded-ternary': 'warn',
      'object-shorthand': 'warn',
      'operator-assignment': ['warn', 'always'],
      'prefer-arrow-callback': 'warn',
      'prefer-const': 'warn',
      'prefer-exponentiation-operator': 'warn',
      'prefer-object-has-own': 'warn',
      'prefer-template': 'warn',
      yoda: 'warn',
      'default-case': 'off',
    },
  },

  // TypeScript-specific rules
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/consistent-generic-constructors': 'error',
      '@typescript-eslint/method-signature-style': ['error', 'property'],
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/lines-between-class-members': 'off',
      '@typescript-eslint/indent': 'off',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/comma-dangle': 'off',
      '@typescript-eslint/no-redeclare': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-loop-func': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-wrapper-object-types': 'warn',
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'none',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },

  // React
  {
    plugins: { react },
    settings: { react: { version: 'detect' } },
    rules: {
      'react/button-has-type': 'warn',
      'react/jsx-boolean-value': 'warn',
      'react/jsx-curly-brace-presence': ['warn', 'never'],
      'react/jsx-fragments': ['warn', 'syntax'],
      'react/jsx-no-comment-textnodes': 'error',
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-target-blank': 'error',
      'react/no-children-prop': 'error',
      'react/no-deprecated': 'error',
      'react/no-find-dom-node': 'error',
      'react/no-string-refs': 'error',
      'react/self-closing-comp': 'warn',
      'react/void-dom-elements-no-children': 'error',
      'react/react-in-jsx-scope': 'off',
    },
  },

  // React Hooks
  {
    plugins: { 'react-hooks': reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-hooks/rules-of-hooks': 'warn',
    },
  },

  // Next.js
  {
    plugins: { '@next/next': nextPlugin },
    rules: {
      ...nextPlugin.configs.recommended.rules,
    },
  },

  // JSX A11y overrides (matching mantine config)
  {
    rules: {
      'jsx-a11y/no-autofocus': 'off',
      'jsx-a11y/control-has-associated-label': 'off',
      'jsx-a11y/mouse-events-have-key-events': 'off',
      'jsx-a11y/label-has-for': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      'jsx-a11y/label-has-associated-control': 'off',
      'jsx-a11y/anchor-has-content': 'off',
    },
  },

  // TypeScript project configuration with explicit tsconfigRootDir
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
  },
];
