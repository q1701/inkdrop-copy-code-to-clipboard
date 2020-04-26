module.exports = {
  root: true,
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'prettier/react',
  ],
  settings: {
    react: {
      version: '16.12',
    },
  },
  parser: 'babel-eslint',
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
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-shadow': 'off',
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/no-unresolved': ['error', { ignore: ['inkdrop', 'react'] }],
    'import/no-extraneous-dependencies': 'off',
  },
};
