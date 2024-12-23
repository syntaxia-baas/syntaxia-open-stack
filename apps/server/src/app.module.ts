import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { TodoModule } from './todo/todo.module'
import { DrizzleModule } from './core/drizzle/drizzle.module'

@Module({
   imports: [
      DrizzleModule,
      // UserModule,
      ConfigModule.forRoot({
         isGlobal: true,
         envFilePath: `.env.${process.env.NODE_ENV}`,
      }),
      TodoModule,
   ],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
