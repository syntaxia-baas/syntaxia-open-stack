import { defineConfig } from 'drizzle-kit'
import * as dotenv from 'dotenv'

dotenv.config({
   path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env.dev',
})

if (!process.env.DATABASE_URL) {
   throw new Error(
      'drizzle.config could not be initialised. DATABASE_URL is not defined in the environment variables.',
   )
}

export default defineConfig({
   schema: './src/drizzle/schemas/*',
   out: './src/drizzle/migrations',
   dialect: 'postgresql',
   dbCredentials: {
      url: process.env.DATABASE_URL!,
   },
   verbose: true,
   strict: true,
})
