import { ConfigService } from '@nestjs/config'
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js'

import postgres, { Sql } from 'postgres'
import * as T from 'effect/Effect'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import {
   Injectable,
   OnModuleDestroy,
   OnApplicationShutdown,
} from '@nestjs/common'
import { fromPromiseToEffect } from '../effect/effect-util'
import { SyntaxiaError } from '../errors/errors'
import { FuncAction } from '../repo/Repository'
import dotenv from 'dotenv'
dotenv.config()
@Injectable()
export class DrizzleService implements OnModuleDestroy, OnApplicationShutdown {
   private pool: Sql // Connection pool
   private db: PostgresJsDatabase

   constructor(private configService: ConfigService) {
      const connectionString = this.configService.get<string>('DATABASE_URL')
      if (!connectionString) {
         throw new Error('DatabaseService: DATABASE_URL is not defined')
      }

      // Initialize connection pool
      this.pool = postgres(connectionString, {
         max: 10, // Maximum number of connections in the pool
         idle_timeout: 30, // Seconds a connection is idle before being closed
      })

      // Create the Drizzle database instance
      this.db = drizzle(this.pool)
      console.log('✅🛢️ DatabaseService: Database connection pool established')
   }
   onApplicationShutdown(signal?: string) {
      console.log(`Application is shutting down due to: ${signal}`)
      // Perform app-wide cleanup, like closing database connections
      this.endPool()
   }

   getDatabase(): PostgresJsDatabase {
      return this.db
   }

   async run(actions: FuncAction[]): Promise<any> {
      return await this.db.transaction(async txDb => {
         return actions.map(dbAction => dbAction(txDb))
      })
   }

   runEffect(actions: FuncAction[]): T.Effect<void, SyntaxiaError> {
      const result: T.Effect<void, SyntaxiaError> = fromPromiseToEffect(
         this.run(actions),
      )
      return result
   }

   // async migrate() {
   //   await migrate(this.db, { migrationsFolder: "./drizzle/migrations" });
   // }

   async runMigrate() {
      const connection = postgres(process.env.DATABASE_URL!)
      const drizzleDB = drizzle(connection)

      console.log('⏳ Running migrations...')

      const start = Date.now()
      await migrate(drizzleDB, { migrationsFolder: './src/drizzle/migrations' })
      const end = Date.now()

      console.log(`✅ Migrations completed in ${end - start}ms`)

      // process.exit(0)
   }

   async endPool() {
      await this.pool.end()
      console.log('❌🛢️ DatabaseService: Database connection pool closed')
   }

   async onModuleDestroy() {
      // Gracefully close the pool when the service is destroyed
      await this.endPool()
   }
}
