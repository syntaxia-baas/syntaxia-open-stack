import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { DrizzleModule } from './core/drizzle/drizzle.module'
import { DiagramModule } from './modules/diagram/diagram.module'
import { Auth } from './modules/auth/entities/auth.entity'
import { AuthModule } from './modules/auth/auth.module'

@Module({
   imports: [
      DrizzleModule,
      DiagramModule,
      AuthModule,
      ConfigModule.forRoot({
         isGlobal: true,
         envFilePath: `.env.${process.env.NODE_ENV}`,
      }),
   ],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
