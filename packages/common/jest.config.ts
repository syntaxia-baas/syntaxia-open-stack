const sharedConfig = require('@repo/jest-config/base')
/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
   ...sharedConfig,
   testEnvironment: 'node', // Type-only packages don't need DOM.
   testRegex: '.*\\.spec\\.ts$', // Focus on `.spec.ts` files.
   transform: {
      '^.+\\.ts$': 'ts-jest',
   },
   collectCoverage: false, // No need to collect coverage for shared types.
}
