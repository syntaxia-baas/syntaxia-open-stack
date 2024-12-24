import { pgTable, jsonb, varchar } from 'drizzle-orm/pg-core'
import { dirzzleFields } from '../common-fields'
import { DiagramId, EdgeElement, NodeElement } from '@shared/types/diagram'
import { Description, Name } from '@shared/types/common'

export const diagramsTable = pgTable('diagrams', {
   name: varchar('name', { length: 50 }).$type<Name>().notNull(),
   description: varchar('description', { length: 255 }).$type<Description>(),
   nodes: jsonb('nodes').$type<NodeElement[]>().notNull(),
   edges: jsonb('edges').$type<EdgeElement[]>().notNull(),
   ...dirzzleFields.addBasicFields<DiagramId>(),
})
