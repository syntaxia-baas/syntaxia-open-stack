import { UserArgs } from '@server/types/common-fields'
import { TokenDecoded } from '../token'
import { Request } from 'express'

export interface CustomRequest extends Request {
   'decoded-token': TokenDecoded
   'user-args': UserArgs
}
