module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  plugins: ['n', 'sonar'],
  extends: [
    'standard',
    'plugin:n/recommended',
    'plugin:sonar/recommended',
    'prettier',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  globals: {
    Response: 'readonly',
  },
  rules: {},
}
