import { Errors } from '@server/core/errors/errors'
import { Branded } from '@shared/types/common'
import { Request } from 'express'

/**
 * Retrieves the value of a required header from the request.
 *
 * @param request - The HTTP request object.
 * @param headerName - The name of the header to retrieve.
 * @returns The value of the specified header.
 * @throws UnauthorizedException if the header is not present in the request.
 */
export const getRequiredHeader = <B extends Branded>(
   request: Request,
   headerName: string,
): B => {
   const value = request.header(headerName) as B
   if (!value) {
      throw Errors.AuthError(`Missing required header: ${headerName}`)
   }
   return value
}
