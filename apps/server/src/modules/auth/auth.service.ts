import { Injectable } from '@nestjs/common'
import { DrizzleService } from '@server/core/drizzle/drizzle-service'

@Injectable()
export class AuthService {
   constructor(private drizzleService: DrizzleService) {}

   async findUserByEmail(email: string) {
      return new Error(
         'Method not implemented. Implement this method in the UserRepository class',
      )
      // const db = this.drizzleService.getDb()
      // return db.select().from(users).where(users.email.eq(email)).limit(1)
   }

   async createUser(name: string, email: string, image: string | null = null) {
      throw new Error(
         'Method not implemented. Implement this method in the UserRepository class',
      )
      // const db = this.drizzleService.getDb()
      // return db.insert(users).values({ name, email, image }).returning(users.id)
   }

   async linkAccount(userId: number, accountData: any) {
      // const db = this.drizzleService.getDb()
      // return db.insert(accounts).values({
      //    userId,
      //    ...accountData,
      // })
      throw new Error('Method not implemented. ')
   }

   async createSession(userId: number, sessionToken: string, expires: Date) {
      // const db = this.drizzleService.getDb()
      // return db.insert(sessions).values({
      //    userId,
      //    sessionToken,
      //    expires,
      // })
      throw new Error('Method not implemented. ')
   }

   async findSessionByToken(sessionToken: string) {
      return new Error(
         'Method not implemented. Implement this method in the UserRepository class',
      )
      // const db = this.drizzleService.getDb()
      // return db
      //    .select()
      //    .from(sessions)
      //    .where(sessions.sessionToken.eq(sessionToken))
      //    .limit(1)
   }
}
