import {
   AccountId,
   BaseRow,
   Email,
   Name,
   SessionId,
   UserId,
   VerificationTokenId,
} from './common'

export type Users = BaseRow<UserId> & {
   name: Name | null
   email: Email
   emailVerified: Date | null
   image: string | null
}

export type Accounts = BaseRow<AccountId> & {
   userId: UserId
   type: string
   provider: string
   providerAccountId: string
   refreshToken: string | null
   accessToken: string | null
   expiresAt: number | null
   tokenType: string | null
   scope: string | null
   idToken: string | null
}

export type Sessions = BaseRow<SessionId> & {
   sessionToken: string
   userId: UserId
   expires: Date
}
export type VerificationTokens = BaseRow<VerificationTokenId> & {
   identifier: string
   token: string
   expires: Date
}
