import { Repository } from '@server/core/repo/Repository'
import { usersTable } from '@server/core/drizzle/schemas/auth.schema'
import { UserId } from '@shared/types/common'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserRepository extends Repository<typeof usersTable, UserId> {
   constructor() {
      super(usersTable)
   }
}
