module.exports = {
  root: true,
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    react: {
      version: '18.3',
    },
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  globals: {
    inkdrop: 'readonly',
  },
  rules: {
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
};
