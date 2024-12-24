import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { ConfigModule } from '@nestjs/config'
import { DrizzleService } from '@server/core/drizzle/drizzle-service'

@Module({
   imports: [ConfigModule],
   controllers: [AuthController],
   providers: [AuthService, DrizzleService],
   exports: [AuthService],
})
export class AuthModule {}
