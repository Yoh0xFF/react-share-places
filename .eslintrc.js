module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'semi': [2, 'always'],
    'object-curly-spacing': [2, 'always'],
    'space-in-parens': [2, 'never'],
    'quotes': [2, 'single', { avoidEscape: true }],
    'jsx-quotes': [2, 'prefer-single'],
  },
};
