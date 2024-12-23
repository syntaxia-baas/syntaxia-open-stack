import { Provider } from '@nestjs/common'
import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import * as schema from './schemas/schema'

export const DRIZZLE_TOKEN = Symbol('drizzle-connection')
export const DrizzleProvider: Provider = {
   provide: DRIZZLE_TOKEN,
   useFactory: async () => {
      const queryClient = postgres(process.env.DATABASE_URL!, {
         max: 10,
         idle_timeout: 20,
         connect_timeout: 10,
      })
      return drizzle(queryClient, { schema })
   },
}
