import globals from 'globals';
import eslint from '@eslint/js';
import babelParser from '@babel/eslint-parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['lib'],
  },
  eslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        inkdrop: 'readonly',
      },
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-react'],
        },
      },
      parser: babelParser,
    },
  },
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      import: importPlugin,
    },
    settings: {
      react: {
        version: '18.3',
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx'],
        },
      },
    },
    languageOptions: {
      ...reactPlugin.configs.flat.recommended.languageOptions,
      ...reactPlugin.configs.flat['jsx-runtime'].languageOptions,
    },
    rules: {
      ...reactPlugin.configs.flat.recommended.rules,
      ...reactPlugin.configs.flat['jsx-runtime'].rules,
      ...reactHooksPlugin.configs['recommended-latest'].rules,
      ...importPlugin.flatConfigs.recommended.rules,
      'no-console': 'warn',
      'no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'no-shadow': 'off',
      'react/prop-types': 'off',
      'react/jsx-props-no-spreading': 'off',
      'import/no-unresolved': [
        'error',
        { ignore: ['inkdrop', 'react', 'electron'] },
      ],
      'import/no-extraneous-dependencies': 'off',
    },
  },
  eslintConfigPrettier,
];
