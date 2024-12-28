import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DrizzleProvider } from './drizzle.provider'
import { DrizzleService } from './drizzle-service'

@Module({
   imports: [ConfigModule],
   providers: [DrizzleProvider, DrizzleService],
   exports: [DrizzleService],
})
export class DrizzleModule {}
