/** @type {import("eslint").Linter.Config} */
module.exports = {
   root: true,
   extends: [
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
      'prettier',
      'turbo',
      'plugin:jest/recommended',
      'plugin:jest-formatting/recommended',
      'plugin:testing-library/react',
      'plugin:tailwindcss/recommended',
   ],
   // plugins: ['@typescript-eslint/eslint-plugin'],
   plugins: [
      '@typescript-eslint',
      'only-warn',
      'import',
      'jest',
      'jest-dom',
      'jest-formatting',
      'prettier',
      'testing-library',
      'unused-imports',
   ],
   parser: '@typescript-eslint/parser',
   ignorePatterns: [
      '.*.js',
      '*.setup.js',
      '*.config.js',
      '.turbo/',
      'dist/',
      'coverage/',
      'node_modules/',
   ],
   rules: {
      '@typescript-eslint/no-unused-vars': [
         'error',
         {
            vars: 'all',
            args: 'after-used',
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
         },
      ],
      // Automatically remove unused imports
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
         'warn',
         {
            vars: 'all',
            varsIgnorePattern: '^_',
            args: 'after-used',
            argsIgnorePattern: '^_',
         },
      ],
   },
   overrides: [
      //For Test Files
      {
         files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts'], // Match test files
         env: {
            jest: true, // Enable Jest global variables for test files
         },
         extends: [
            'plugin:jest/recommended', // Add Jest-specific rules
            'plugin:testing-library/react', // Add Testing Library rules (if React testing is used)
            'plugin:jest-formatting/recommended',
            'plugin:jest-dom/recommended',
         ],
         rules: {
            'jest/no-mocks-import': 'off',
         },
      },
   ],
}
