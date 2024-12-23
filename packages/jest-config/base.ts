import type { Config } from 'jest'

export const config = {
   collectCoverage: true,
   coverageDirectory: 'coverage',
   coverageProvider: 'v8',
   moduleFileExtensions: ['js', 'ts', 'json'],
   transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
   },
} as const satisfies Config
