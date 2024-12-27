import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { AuthorizeGuard } from './core/rest/guards/authorize.guard'

const port = process.env.PORT || 8080
async function bootstrap() {
   const app = await NestFactory.create(AppModule)
   const authGuard = app.get(AuthorizeGuard)

   app.useGlobalGuards(authGuard)
   app.enableCors(
      process.env.NODE_ENV === 'dev'
         ? {
              origin: '*',
              methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
              preflightContinue: false,
              optionsSuccessStatus: 204,
           }
         : {
              origin: ['http://localhost:3000'],
              methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
              preflightContinue: false,
              optionsSuccessStatus: 204,
           },
   )

   await app.listen(port)
   console.log(`✅ Backend is running on: http://localhost:${port}`)
}
bootstrap()
