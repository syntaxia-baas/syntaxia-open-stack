import { Injectable } from '@nestjs/common'
import { DiagramRepository } from './diagram.repository'
import { UserArgs } from '@server/types/common-fields'
import {
   CreateDiagramCommand,
   DiagramId,
   UpdateDiagramCommand,
} from '@shared/types/diagram'
import { DiagramFactory } from './helpers/DiagramFactory'

@Injectable()
export class DiagramService {
   constructor(private diagramRepo: DiagramRepository) {}
   create(cmd: CreateDiagramCommand, args: UserArgs) {
      const diagram = DiagramFactory.createDiagram(cmd, args.userName)
      return this.diagramRepo.insertOrUpdateOneById(diagram.id, diagram, args)
   }

   findAll(args: UserArgs) {
      return this.diagramRepo.findAll(args)
   }

   findOne(id: DiagramId, args: UserArgs) {
      return this.diagramRepo.findById(id, args)
   }

   update(id: DiagramId, cmd: UpdateDiagramCommand, args: UserArgs) {
      return this.diagramRepo.update(id, cmd, args)
   }

   remove(id: DiagramId, args: UserArgs) {
      return this.diagramRepo.deleteById(id, args)
   }
}
