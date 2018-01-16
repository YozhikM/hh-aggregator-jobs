module.exports = {
  env: {
    es6: true,
    browser: true,
    jest: true,
  },
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'plugin:flowtype/recommended'],
  plugins: ['flowtype', 'prettier'],
  rules: {
    'react/jsx-filename-extension': 0,
    'jsx-a11y/anchor-is-valid': 0
  },
};
