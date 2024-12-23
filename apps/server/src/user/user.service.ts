import {
   Inject,
   Injectable,
   InternalServerErrorException,
   NotFoundException,
} from '@nestjs/common'

import { eq } from 'drizzle-orm'

import { usersTable } from '@drizzle/schemas/users.schema'

import { CreateUserDto } from '@user/dto/create-user.dto'
import { UpdateUserDto } from '@user/dto/update-user.dto'
import { DrizzleService } from '@drizzle/drizzle.service'
import { DRIZZLE_TOKEN } from '@drizzle/drizzle.provider'

@Injectable()
export class UserService {
   constructor(@Inject(DRIZZLE_TOKEN) private db: DrizzleService) {}
   async create(createUser: CreateUserDto) {
      try {
         const createdUsers = await this.db
            .insert(usersTable)
            .values(createUser)
            .returning()
         return createdUsers.pop()
      } catch (error) {
         console.log('Error creating user:', error)
         throw new InternalServerErrorException('Failed to create user')
      }
   }

   async findAll() {
      return await this.db.select().from(usersTable)
   }

   async findOne(id: string) {
      const users = await this.db
         .select()
         .from(usersTable)
         .where(eq(usersTable.id, id))
      const user = users.pop()
      if (!user) {
         throw new NotFoundException()
      }
      return user
   }

   async update(id: string, updateUser: UpdateUserDto) {
      try {
         const updatedUser = await this.db
            .update(usersTable)
            .set(updateUser)
            .where(eq(usersTable.id, id))
            .returning()
         if (updatedUser.length === 0) {
            throw new NotFoundException()
         }
         return updatedUser.pop()
      } catch (error) {
         console.log('Error in updating user:', error)
         throw new InternalServerErrorException('Failed to update user')
      }
   }

   async remove(id: string) {
      const deleteUser = await this.db
         .delete(usersTable)
         .where(eq(usersTable.id, id))
         .returning()
      if (deleteUser.length === 0) {
         throw new NotFoundException()
      }
   }
}
