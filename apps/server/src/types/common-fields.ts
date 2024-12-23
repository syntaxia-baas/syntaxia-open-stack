import { UserName } from '@repo/common/src/common/types'
import { PgColumn, PgTable } from 'drizzle-orm/pg-core'

export type CommonDBFields = PgTable & {
   id: PgColumn
   createdAt: PgColumn
   createdBy: PgColumn
   updatedAt: PgColumn
   updatedBy: PgColumn
   disable: PgColumn
}

export type CommonArgs = {
   userName: UserName
}
