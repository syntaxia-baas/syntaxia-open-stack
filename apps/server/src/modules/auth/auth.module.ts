import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { ConfigModule } from '@nestjs/config'
import { DrizzleService } from '@server/core/drizzle/drizzle-service'
import { AuthorizeGuard } from '@server/core/rest/guards/authorize.guard'

@Module({
   imports: [ConfigModule],
   controllers: [AuthController],
   providers: [AuthorizeGuard, AuthService, DrizzleService],
   exports: [AuthService],
})
export class AuthModule {}
