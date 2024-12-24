import {
   integer,
   pgTable,
   serial,
   timestamp,
   varchar,
} from 'drizzle-orm/pg-core'

import { dirzzleFields } from '../common-fields'
import {
   AccountId,
   Email,
   Name,
   SessionId,
   UserId,
   VerificationTokenId,
} from '@shared/types/common'

export const usersTable = pgTable('users', {
   name: varchar('name', { length: 255 }).$type<Name>(),
   email: varchar('email', { length: 255 }).$type<Email>().notNull(),
   emailVerified: timestamp('email_verified', {
      withTimezone: true,
   }),
   image: varchar('image', { length: 255 }),
   ...dirzzleFields.addBasicFields<UserId>(),
})

export const accountsTable = pgTable('accounts', {
   userId: varchar('user_id')
      .notNull()
      .references(() => usersTable.id),
   type: varchar('type', { length: 255 }).notNull(), // 'oauth', 'credentials', etc.
   provider: varchar('provider', { length: 255 }).notNull(),
   providerAccountId: varchar('provider_account_id', { length: 255 }).notNull(),
   refreshToken: varchar('refresh_token', { length: 255 }),
   accessToken: varchar('access_token', { length: 255 }),
   expiresAt: integer('expires_at'),
   tokenType: varchar('token_type', { length: 255 }),
   scope: varchar('scope', { length: 255 }),
   idToken: varchar('id_token', { length: 255 }),
   ...dirzzleFields.addBasicFields<AccountId>(),
})

export const sessionsTable = pgTable('sessions', {
   sessionToken: varchar('session_token', { length: 255 }).notNull(),
   userId: varchar('user_id')
      .notNull()
      .references(() => usersTable.id),
   expires: timestamp('expires', { withTimezone: true }).notNull(),
   ...dirzzleFields.addBasicFields<SessionId>(),
})

export const verificationTokensTable = pgTable('verification_tokens', {
   identifier: varchar('identifier', { length: 255 }).notNull(),
   token: varchar('token', { length: 255 }).notNull(),
   expires: timestamp('expires', { withTimezone: true }).notNull(),
   ...dirzzleFields.addBasicFields<VerificationTokenId>(),
})
