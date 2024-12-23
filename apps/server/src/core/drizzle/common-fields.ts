import {
   boolean,
   PgColumn,
   PgTable,
   timestamp,
   varchar,
} from 'drizzle-orm/pg-core'
import { Branded, UserName } from '../../../../packages/common/src/common/types'

const brandedIDColumn = <ID extends Branded<unknown>>() =>
   varchar('id', { length: 26 }).$type<ID>().primaryKey().notNull()

const addBasicFields = <ID extends Branded<unknown>>() => ({
   id: brandedIDColumn<ID>(),
   createdAt: timestamp('createdAt', { withTimezone: true })
      .notNull()
      .defaultNow(),
   createdBy: varchar('createdBy').$type<UserName>(),
   updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .defaultNow(),
   updatedBy: varchar('updatedBy').$type<UserName>(),
   disable: boolean('disable').notNull().default(false),
})

export type BasicTable = PgTable & {
   id: PgColumn
   createdAt: PgColumn
   createdBy: PgColumn
   updatedAt: PgColumn
   updatedBy: PgColumn
   disable: PgColumn
}

export const dirzzleFields = {
   addBasicFields,
}
