// src/drizzle/migrate.ts
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'
import * as dotenv from 'dotenv'
dotenv.config()

const runMigrate = async () => {
   console.log(`🚀 Starting migration... using ${process.env.DATABASE_URL!}`)
   const connection = postgres(process.env.DATABASE_URL!)
   const drizzleDB = drizzle(connection)

   console.log('⏳ Running migrations...')

   const start = Date.now()
   await migrate(drizzleDB, { migrationsFolder: './src/drizzle/migrations' })
   const end = Date.now()

   console.log(`✅ Migrations completed in ${end - start}ms`)

   process.exit(0)
}

runMigrate().catch(err => {
   console.error('❌ Migration failed')
   console.error(err)
   process.exit(1)
})
