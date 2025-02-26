/** @type {import("eslint").Linter.Config} */
module.exports = {
   extends: ['@repo/eslint-config/nest.js'],
   parserOptions: {
      project: ['./tsconfig.json', './tsconfig.config.json'],
      tsconfigRootDir: __dirname,
      sourceType: 'module',
   },
   rules: {
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
   },
}
