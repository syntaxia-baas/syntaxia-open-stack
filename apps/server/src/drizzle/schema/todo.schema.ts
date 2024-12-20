import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const todoTable = pgTable('todo', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 250 }).notNull(),
  description: text('description'),
  status: varchar('status', { length: 50 }).notNull().default('pending'),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt'),
});
