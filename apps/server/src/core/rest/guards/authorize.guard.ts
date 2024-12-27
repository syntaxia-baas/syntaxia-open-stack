// guards/auth.guard.ts
import { Injectable, Logger, ExecutionContext } from '@nestjs/common'
import { CanActivate } from '@nestjs/common'
import { CustomRequest } from '../decorators/custom-request'
import { getRequiredHeader } from './read-header'
import { UserName } from '@shared/types/common'

@Injectable()
export class AuthorizeGuard implements CanActivate {
   private readonly logger = new Logger(AuthorizeGuard.name)

   constructor() {}

   async canActivate(ctx: ExecutionContext): Promise<boolean> {
      const request = ctx.switchToHttp().getRequest<CustomRequest>()

      const userName = getRequiredHeader<UserName>(request, 'username')

      request['user-args'] = { userName }

      return true
   }
}
