import { Controller, Post, Body, Get, Query } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
   constructor(private readonly authService: AuthService) {}

   @Post('register')
   async register(
      @Body('name') name: string,
      @Body('email') email: string,
      @Body('image') image: string,
   ) {
      const user = await this.authService.findUserByEmail(email)
      if (user) {
         return { message: 'User already exists' }
      }
      const newUser = await this.authService.createUser(name, email, image)
      return { message: 'User registered' } //userId: newUser.id
   }

   @Post('link-account')
   async linkAccount(@Body() accountData: any) {
      const { userId, provider, providerAccountId, accessToken, refreshToken } =
         accountData
      return this.authService.linkAccount(userId, {
         provider,
         providerAccountId,
         accessToken,
         refreshToken,
      })
   }

   @Get('session')
   async getSession(@Query('token') sessionToken: string) {
      const session = await this.authService.findSessionByToken(sessionToken)
      if (!session) {
         return { message: 'Session not found' }
      }
      return session
   }
}
