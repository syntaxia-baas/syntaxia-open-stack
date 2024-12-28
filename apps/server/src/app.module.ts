import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { DrizzleModule } from './core/drizzle/drizzle.module'
import { DiagramModule } from './modules/diagram/diagram.module'

import { AuthModule } from './modules/auth/auth.module'

@Module({
   imports: [
      DrizzleModule,
      DiagramModule,
      AuthModule,
      ConfigModule.forRoot({
         isGlobal: true,
      }),
   ],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
