import { UserName } from '@shared/types/common'
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
