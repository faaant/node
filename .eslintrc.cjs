module.exports = {
  env: {
    node: true,
    es2021: true
  },
  plugins: ['sonar'],
  extends: ['standard','plugin:sonar/recommended'],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
  }
};
