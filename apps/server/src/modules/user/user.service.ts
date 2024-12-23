// import {
//    Inject,
//    Injectable,
//    InternalServerErrorException,
//    NotFoundException,
// } from '@nestjs/common'
// import { DrizzleService } from '@server/core/drizzle/drizzle-service'
// import { DRIZZLE_TOKEN } from '@server/core/drizzle/drizzle.provider'
// import { usersTable } from '@server/core/drizzle/schemas/users.schema'

// import { eq } from 'drizzle-orm'
// import { CreateUserDto } from './dto/create-user.dto'
// import { UpdateUserDto } from './dto/update-user.dto'

// @Injectable()
// export class UserService {
//    constructor(@Inject(DRIZZLE_TOKEN) private db: DrizzleService) {}
//    async create(createUser: CreateUserDto) {
//       try {
//          const createdUsers = await this.db
//             .insert(usersTable)
//             .values(createUser)
//             .returning()
//          return createdUsers.pop()
//       } catch (error) {
//          console.log('Error creating user:', error)
//          throw new InternalServerErrorException('Failed to create user')
//       }
//    }

//    async findAll() {
//       return await this.db.select().from(usersTable)
//    }

//    async findOne(id: string) {
//       const users = await this.db
//          .select()
//          .from(usersTable)
//          .where(eq(usersTable.id, id))
//       const user = users.pop()
//       if (!user) {
//          throw new NotFoundException()
//       }
//       return user
//    }

//    async update(id: string, updateUser: UpdateUserDto) {
//       try {
//          const updatedUser = await this.db
//             .update(usersTable)
//             .set(updateUser)
//             .where(eq(usersTable.id, id))
//             .returning()
//          if (updatedUser.length === 0) {
//             throw new NotFoundException()
//          }
//          return updatedUser.pop()
//       } catch (error) {
//          console.log('Error in updating user:', error)
//          throw new InternalServerErrorException('Failed to update user')
//       }
//    }

//    async remove(id: string) {
//       const deleteUser = await this.db
//          .delete(usersTable)
//          .where(eq(usersTable.id, id))
//          .returning()
//       if (deleteUser.length === 0) {
//          throw new NotFoundException()
//       }
//    }
// }
