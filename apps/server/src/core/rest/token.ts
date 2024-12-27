import * as O from 'effect/Option'
import { JwtPayload } from 'jsonwebtoken'
import { UserName, Email } from '@shared/types/common'

export interface TokenDecoded {
   readonly userName: UserName
   readonly exp: string
   readonly clientId: string
   readonly email: O.Option<Email>
   readonly email_verified: O.Option<Email>
   readonly profilePicture: O.Option<string>
   readonly iss: O.Option<string>
   readonly scope: O.Option<string>
}

export interface DecodedToken {
   header: { kid: string }
   payload: JwtPayload & { iss: string }
}
