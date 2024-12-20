import { PgColumn, PgTable } from 'drizzle-orm/pg-core';

export type Branded<K, T = unknown> = K & {
  __brand: T;
};

export const branded = <K, T = unknown>(value: K): Branded<K, T> => {
  return value as Branded<K, T>;
};

export type BasicTable = PgTable & {
  id: PgColumn;
  createdAt: PgColumn;
  createdBy: PgColumn;
  updatedAt: PgColumn;
  updatedBy: PgColumn;
  disable: PgColumn;
};
