module.exports = {
  extends: ['@repo/eslint-config/next.js', '@repo/eslint-config/server.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
  env: {
    jest: true,
  },
}
