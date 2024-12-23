// src/drizzle/drizzle.service.ts
import { Injectable, Inject } from '@nestjs/common'

import { eq, desc, asc, and } from 'drizzle-orm'
import { DRIZZLE_TOKEN } from './drizzle.provider'

@Injectable()
export class DrizzleService {
   constructor(
      @Inject(DRIZZLE_TOKEN)
      private db: any, //NodePgDatabase<typeof schema>
   ) {}

   // Query builders
   select() {
      return this.db.select()
   }

   insert(table: any) {
      return this.db.insert(table)
   }

   update(table: any) {
      return this.db.update(table)
   }

   delete(table: any) {
      return this.db.delete(table)
   }

   // Transaction support
   async transaction<T>(
      callback: (tx: any /* NodePgDatabase<typeof schema> */) => Promise<T>,
   ): Promise<T> {
      return this.db.transaction(callback)
   }

   // Raw query execution
   async execute<T = any>(query: string, params?: any[]): Promise<T> {
      return this.db.execute(query, params)
   }

   // Helper methods for common operations
   async findById(table: any, id: string) {
      const [record] = await this.db
         .select()
         .from(table)
         .where(eq(table.id, id))
      return record
   }

   async findMany(
      table: any,
      where: any = {},
      options: {
         limit?: number
         offset?: number
         orderBy?: { column: string; order: 'asc' | 'desc' }
      } = {},
   ) {
      let query = this.db.select().from(table)

      // Apply where conditions
      Object.entries(where).forEach(([key, value]) => {
         query = query.where(eq(table[key], value))
      })

      // Apply pagination
      if (options.limit) {
         query = query.limit(options.limit)
      }
      if (options.offset) {
         query = query.offset(options.offset)
      }

      // Apply ordering
      if (options.orderBy) {
         const { column, order } = options.orderBy
         query = query.orderBy(
            order === 'desc' ? desc(table[column]) : asc(table[column]),
         )
      }

      return query
   }

   // Tenant-aware queries
   async withTenant(tenantId: string) {
      return {
         findById: async (table: any, id: string) => {
            const [record] = await this.db
               .select()
               .from(table)
               .where(and(eq(table.id, id), eq(table.tenantId, tenantId)))
            return record
         },

         findMany: async (table: any, where: any = {}, options = {}) => {
            return this.findMany(table, { ...where, tenantId }, options)
         },

         create: async (table: any, data: any) => {
            const [record] = await this.db
               .insert(table)
               .values({ ...data, tenantId })
               .returning()
            return record
         },

         update: async (table: any, id: string, data: any) => {
            const [record] = await this.db
               .update(table)
               .set(data)
               .where(and(eq(table.id, id), eq(table.tenantId, tenantId)))
               .returning()
            return record
         },

         delete: async (table: any, id: string) => {
            const [record] = await this.db
               .delete(table)
               .where(and(eq(table.id, id), eq(table.tenantId, tenantId)))
               .returning()
            return record
         },
      }
   }

   // Soft delete support
   async softDelete(table: any, id: string) {
      const [record] = await this.db
         .update(table)
         .set({ deletedAt: new Date() })
         .where(eq(table.id, id))
         .returning()
      return record
   }

   // Batch operations
   async batchInsert(table: any, data: any[]) {
      return this.db.insert(table).values(data).returning()
   }

   async batchUpdate(table: any, data: { id: string; [key: string]: any }[]) {
      const results = await Promise.all(
         data.map(({ id, ...updates }) =>
            this.db
               .update(table)
               .set(updates)
               .where(eq(table.id, id))
               .returning(),
         ),
      )
      return results.map(([record]) => record)
   }
}
