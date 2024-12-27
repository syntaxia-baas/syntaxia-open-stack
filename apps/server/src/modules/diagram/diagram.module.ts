import { Module } from '@nestjs/common'
import { DiagramService } from './diagram.service'
import { DiagramController } from './diagram.controller'
import { DiagramRepository } from './diagram.repository'
import { DrizzleModule } from '@server/core/drizzle/drizzle.module'

@Module({
   imports: [DrizzleModule],
   controllers: [DiagramController],
   providers: [DiagramService, DiagramRepository],
})
export class DiagramModule {}
