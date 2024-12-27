import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { CustomRequest } from './custom-request'

export const GetUserArgs = createParamDecorator((_, ctx: ExecutionContext) => {
   const request = ctx.switchToHttp().getRequest<CustomRequest>()
   if (!request['user-args']) {
      throw new Error('User args not found in request')
   }
   return request['user-args']
})
