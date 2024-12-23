const { resolve } = require('node:path')

const project = resolve(process.cwd(), 'tsconfig.json')

/** @type {import("eslint").Linter.Config} */
module.exports = {
   extends: [
      './base.js',
      require.resolve('@vercel/style-guide/eslint/next'),
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:tailwindcss/recommended',
   ],
   globals: {
      React: true,
      JSX: true,
   },
   env: {
      node: true,
      browser: true,
   },
   plugins: ['react', 'react-hooks', 'tailwindcss', 'only-warn'],
   settings: {
      'import/resolver': {
         typescript: {
            project,
         },
      },
   },
   overrides: [{ files: ['*.js?(x)', '*.ts?(x)'] }],
}
