import {
   SQL,
   eq,
   and,
   InferInsertModel,
   InferSelectModel,
   SQLWrapper,
   inArray,
   sql,
} from 'drizzle-orm'
import { PgTable, PgInsertValue, PgUpdateSetSource } from 'drizzle-orm/pg-core'
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { Branded } from '@shared/types/common'
import { Inject } from '@nestjs/common'
import { CommonDBFields, CommonArgs } from '@server/types/common-fields'
import { DrizzleService } from '../drizzle/drizzle-service'
import { Errors } from '../errors/errors'

// Define types for reuscore/errors/errorsations
export type CreateFunc<T extends PgTable = PgTable> = (
   txDb: PostgresJsDatabase,
) => Promise<InferInsertModel<T>>
export type UpdateFunc<T extends PgTable = PgTable> = (
   txDb: PostgresJsDatabase,
) => Promise<InferSelectModel<T>>
export type DeleteFunc<T extends PgTable = PgTable> = (
   txDb: PostgresJsDatabase,
) => Promise<InferSelectModel<T> | Promise<any>>

// Define a pagination structure for paginated queries
export type PaginationQuery = {
   limit: number
   offset: number
}

// Type for a generic database operation
export type FuncAction = (txDb: PostgresJsDatabase) => Promise<any>

// Base repository class providing common CRUD operations for database tables
export abstract class DatabaseService<
   T extends PgTable & CommonDBFields,
   ID extends Branded<unknown>,
> {
   @Inject() // Inject DatabaseService using NestJS dependency injection
   private readonly databaseService: DrizzleService

   constructor(protected table: T) {}

   // Getter to access the database instance
   public get db() {
      return this.databaseService.getDatabase()
   }

   // Create a new record in the database
   async insertOne(
      data: PgInsertValue<T>,
      _args: CommonArgs,
   ): Promise<InferInsertModel<T>> {
      const [result] = await this.db.insert(this.table).values(data).returning()
      return result as InferInsertModel<T>
   }

   // Insert multiple records into the database
   async insertMany(
      data: PgInsertValue<T>[],
      _args: CommonArgs,
   ): Promise<InferInsertModel<T>[]> {
      const results = await this.db.insert(this.table).values(data).returning()
      return results as InferInsertModel<T>[]
   }

   // Create a deferred action for inserting a record
   insertQuery(data: PgInsertValue<T>, _args: CommonArgs): CreateFunc<T> {
      return async (txDb: PostgresJsDatabase) => {
         const [result] = await txDb.insert(this.table).values(data).returning()
         return result as InferInsertModel<T>
      }
   }

   // Find a record by its ID
   async findById(id: ID, args: CommonArgs): Promise<InferSelectModel<T>> {
      const combinedQuery = this.buildQuery(args, eq(this.table.id, id))
      const [result] = await this.db
         .select()
         .from(this.table)
         .where(combinedQuery)
      if (!result) {
         throw Errors.RowNotFoundError(`Record with id ${id} not found`)
      }
      return result as InferSelectModel<T>
   }

   // Find multiple records by their IDs
   async findByIds(
      ids: ID[],
      args: CommonArgs,
   ): Promise<InferSelectModel<T>[]> {
      const combinedQuery = this.buildQuery(args, inArray(this.table.id, ids))
      return this.db.select().from(this.table).where(combinedQuery) as Promise<
         InferSelectModel<T>[]
      >
   }

   // Find a single record matching the condition
   async findOne(
      where: SQL<unknown>,
      args: CommonArgs,
   ): Promise<InferSelectModel<T> | undefined> {
      const combinedQuery = this.buildQuery(args, where)
      const [result] = await this.db
         .select()
         .from(this.table)
         .where(combinedQuery)
         .limit(1)
      return result as InferSelectModel<T> | undefined
   }

   // find multiple records matching the condition
   async findMany(
      where: SQL<unknown>,
      args: CommonArgs,
   ): Promise<InferSelectModel<T>[]> {
      const combinedQuery = this.buildQuery(args, where)
      return this.db.select().from(this.table).where(combinedQuery) as Promise<
         InferSelectModel<T>[]
      >
   }

   // Apply pagination and filter conditions to a query
   async findWithPagination(
      pagination: PaginationQuery,
      args: CommonArgs,
      where?: SQL<unknown>,
   ): Promise<InferSelectModel<T>[]> {
      const combinedQuery = this.buildQuery(args, where)

      return this.db
         .select()
         .from(this.table)
         .where(combinedQuery)
         .limit(pagination.limit) // Apply the limit for pagination
         .offset(pagination.offset) // Apply the offset for pagination
         .execute() as Promise<InferSelectModel<T>[]>
   }

   // Update a record by its ID
   async update(
      id: ID,
      data: PgUpdateSetSource<T>,
      args: CommonArgs,
   ): Promise<InferSelectModel<T>> {
      const combinedQuery = this.buildQuery(args, eq(this.table.id, id))
      const [result] = await this.db
         .update(this.table)
         .set(data)
         .where(combinedQuery)
         .returning()
      return result as InferSelectModel<T>
   }

   // Create a deferred action for updating a record
   updateQuery(
      id: ID,
      data: PgUpdateSetSource<T>,
      args: CommonArgs,
   ): UpdateFunc<T> {
      return async (txDb: PostgresJsDatabase) => {
         const combinedQuery = this.buildQuery(args, eq(this.table.id, id))
         const [result] = await txDb
            .update(this.table)
            .set(data)
            .where(combinedQuery)
            .returning()
         return result as InferSelectModel<T>
      }
   }

   // Delete a record by its ID
   async deleteById(id: ID, args: CommonArgs): Promise<boolean> {
      const combinedQuery = this.buildQuery(args, eq(this.table.id, id))
      const result = await this.db
         .delete(this.table)
         .where(combinedQuery)
         .returning({ id: this.table.id })
      return result.length > 0
   }

   // Count the number of records matching the query
   async count(args: CommonArgs): Promise<number> {
      const combinedQuery = this.buildQuery(args, undefined)
      const result = await this.db
         .select({ count: sql`COUNT(*)` })
         .from(this.table)
         .where(combinedQuery)
      return result[0].count as unknown as number
   }

   // Combine additional query arguments with the main condition
   buildQuery(
      args: CommonArgs,
      condition: SQL<unknown> | undefined,
   ): SQL<unknown> | undefined {
      const argsQuery = this.applyArgs(args)
      if (argsQuery) {
         const combined = and(condition, argsQuery)
         return combined ?? condition // Fallback to tenantCondition if and returns undefined
      }
      return condition
   }

   // Abstract method to be implemented by derived classes for handling additional arguments
   abstract applyArgs(args: CommonArgs): SQLWrapper | undefined
}
