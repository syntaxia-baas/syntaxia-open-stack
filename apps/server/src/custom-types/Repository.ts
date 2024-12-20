// import {
//   SQL,
//   eq,
//   and,
//   InferInsertModel,
//   InferSelectModel,
//   SQLWrapper,
//   inArray,
// } from 'drizzle-orm';
// import { PgTable, PgInsertValue, PgUpdateSetSource } from 'drizzle-orm/pg-core';
// import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
// import { BasicTable, Branded } from './custom-types';

// if (!process.env.DATABASE_URL) {
//   throw new Error('DATABASE_URL is not defined');
// }

// export const db: PostgresJsDatabase = drizzle(client);
// export type CreateFunc<T extends PgTable = PgTable> = (
//   txDb: PostgresJsDatabase,
// ) => Promise<InferInsertModel<T>>;
// export type UpdateFunc<T extends PgTable = PgTable> = (
//   txDb: PostgresJsDatabase,
// ) => Promise<InferSelectModel<T> | undefined>;

// export type PaginationQuery = {
//   limit: number;
//   offset: number;
// };

// export interface IArgsContext {}

// export abstract class Repository<
//   T extends PgTable & BasicTable,
//   ID extends Branded<unknown>,
//   A extends IArgsContext,
// > {
//   //do not expose db directly to the subclasses
//   db: PostgresJsDatabase = db;
//   constructor(
//     //   protected db: PostgresJsDatabase,
//     protected table: T, //& { id: PgTable['_']['columns']['id'], tenantId: PgTable['_']['columns']['tenantId'] }
//   ) {}

//   //InferModel<T> is a utility type that extracts the model type from a table type. Its deprecated in drizzle-orm v0.3.0
//   async create(
//     data: PgInsertValue<T>,
//     context: A,
//   ): Promise<InferInsertModel<T>> {
//     const [result] = await this.db.insert(this.table).values(data).returning();
//     return result as InferInsertModel<T>;
//   }

//   async insertAll(
//     data: PgInsertValue<T>[],
//     context: A,
//   ): Promise<InferInsertModel<T>[]> {
//     const results = await this.db.insert(this.table).values(data).returning();
//     return results as InferInsertModel<T>[];
//   }

//   createAction(data: PgInsertValue<T>, context: A): CreateFunc<T> {
//     return async (txDb: PostgresJsDatabase) => {
//       const [result] = await txDb.insert(this.table).values(data).returning();
//       return result as InferInsertModel<T>;
//     };
//   }

//   async findById(id: ID, context: A): Promise<InferSelectModel<T>> {
//     const combinedQuery = this.buildQuery(context, eq(this.table.id, id));
//     const [result] = await this.db
//       .select()
//       .from(this.table)
//       .where(combinedQuery);
//     if (!result) {
//       throw new Exceptions.RowNotFound(`Record with id ${id} not found`);
//     }
//     return result as InferSelectModel<T>;
//   }

//   async findByIds(ids: ID[], context: A): Promise<InferSelectModel<T>[]> {
//     const combinedQuery = this.buildQuery(context, inArray(this.table.id, ids));
//     return this.db.select().from(this.table).where(combinedQuery) as Promise<
//       InferSelectModel<T>[]
//     >;
//   }

//   async find(
//     where: SQL<unknown>,
//     context: A,
//   ): Promise<InferSelectModel<T> | undefined> {
//     const combinedQuery = this.buildQuery(context, where);
//     const [result] = await this.db
//       .select()
//       .from(this.table)
//       .where(combinedQuery)
//       .limit(1);
//     return result as InferSelectModel<T> | undefined;
//   }

//   async filter(
//     where: SQL<unknown>,
//     context: A,
//   ): Promise<InferSelectModel<T>[]> {
//     const combinedQuery = this.buildQuery(context, where);
//     return this.db.select().from(this.table).where(combinedQuery) as Promise<
//       InferSelectModel<T>[]
//     >;
//   }

//   async paginationFilter(
//     pagination: PaginationQuery,
//     context: A,
//     where?: SQL<unknown>,
//   ): Promise<InferSelectModel<T>[]> {
//     const combinedQuery = this.buildQuery(context, where);

//     return this.db
//       .select()
//       .from(this.table)
//       .where(combinedQuery)
//       .limit(pagination.limit) // Apply the limit for pagination
//       .offset(pagination.offset) // Apply the offset for pagination
//       .execute() as Promise<InferSelectModel<T>[]>;
//   }

//   async update(
//     id: ID,
//     data: PgUpdateSetSource<T>,
//     context: A,
//   ): Promise<InferSelectModel<T> | undefined> {
//     const combinedQuery = this.buildQuery(context, eq(this.table.id, id));
//     const [result] = await this.db
//       .update(this.table)
//       .set(data)
//       .where(combinedQuery)
//       .returning();
//     return result as InferSelectModel<T> | undefined;
//   }

//   // Create deferred action for update
//   updateAction(id: ID, data: PgUpdateSetSource<T>, context: A): UpdateFunc<T> {
//     return async (txDb: PostgresJsDatabase) => {
//       const combinedQuery = this.buildQuery(context, eq(this.table.id, id));
//       const [result] = await txDb
//         .update(this.table)
//         .set(data)
//         .where(combinedQuery)
//         .returning();
//       return result as InferSelectModel<T> | undefined;
//     };
//   }

//   async updateById(
//     id: ID,
//     data: PgUpdateSetSource<T>,
//     context: A,
//   ): Promise<InferSelectModel<T> | undefined> {
//     const combinedQuery = this.buildQuery(context, eq(this.table.id, id));
//     const [result] = await this.db
//       .update(this.table)
//       .set(data)
//       .where(combinedQuery)
//       .returning();
//     return result as InferSelectModel<T> | undefined;
//   }

//   async deleteById(id: ID, context: A): Promise<boolean> {
//     const combinedQuery = this.buildQuery(context, eq(this.table.id, id));
//     const result = await this.db
//       .delete(this.table)
//       .where(combinedQuery)
//       .returning({ id: this.table.id });
//     return result.length > 0;
//   }

//   deleteByIdAction(
//     id: ID,
//     context: A,
//   ): (txDb: PostgresJsDatabase) => Promise<boolean> {
//     return async (txDb: PostgresJsDatabase) => {
//       const combinedQuery = this.buildQuery(context, eq(this.table.id, id));
//       const result = await txDb
//         .delete(this.table)
//         .where(combinedQuery)
//         .returning({ id: this.table.id });

//       return result.length > 0; // Return true if the row was deleted, false if not
//     };
//   }

//   deleteByIdsAction(
//     ids: ID[],
//     context: A,
//   ): (txDb: PostgresJsDatabase) => Promise<number> {
//     return async (txDb: PostgresJsDatabase) => {
//       const combinedQuery = this.buildQuery(
//         context,
//         inArray(this.table.id, ids),
//       );
//       const result = await txDb
//         .delete(this.table)
//         .where(combinedQuery)
//         .returning({ id: this.table.id });

//       return result.length; // Return the count of rows deleted
//     };
//   }

//   async disableById(id: ID, ctx: A): Promise<boolean> {
//     const combinedQuery = this.buildQuery(ctx, eq(this.table.id, id));
//     const result = await this.db
//       .update(this.table)
//       .set({ disable: true } as any)
//       .where(combinedQuery)
//       .returning();
//     return result.length > 0;
//   }

//   disableRowAction(
//     id: ID,
//     context: A,
//   ): (txDb: PostgresJsDatabase) => Promise<InferSelectModel<T> | undefined> {
//     return async (txDb: PostgresJsDatabase) => {
//       const combinedQuery = this.buildQuery(context, eq(this.table.id, id));
//       const [result] = await txDb
//         .update(this.table)
//         .set({ disable: true } as any) // Set disable field to true
//         .where(combinedQuery)
//         .returning();
//       return result as InferSelectModel<T> | undefined;
//     };
//   }

//   async findMany(
//     where: SQL<unknown>,
//     context: A,
//   ): Promise<InferSelectModel<T>[]> {
//     const combinedQuery = this.buildQuery(context, where);
//     return this.db.select().from(this.table).where(combinedQuery) as Promise<
//       InferSelectModel<T>[]
//     >;
//   }

//   async list(context: A): Promise<InferSelectModel<T>[]> {
//     const combinedQuery = this.buildQuery(context, undefined);
//     return this.db.select().from(this.table).where(combinedQuery) as Promise<
//       InferSelectModel<T>[]
//     >;
//   }

//   buildQuery(
//     context: A,
//     condition: SQL<unknown> | undefined,
//   ): SQL<unknown> | undefined {
//     const contextQuery = this.applyContext(context);
//     if (contextQuery) {
//       const combined = and(condition, contextQuery);
//       return combined ?? condition; // Fallback to tenantCondition if and returns undefined
//     }
//     return condition;
//   }

//   abstract applyContext(context: A): SQLWrapper | undefined;
// }
