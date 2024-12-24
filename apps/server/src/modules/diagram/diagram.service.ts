import { Injectable } from '@nestjs/common'
import { CreateDiagramDto } from './dto/create-diagram.dto'
import { UpdateDiagramDto } from './dto/update-diagram.dto'
import { DiagramRepository } from './diagram.repository'
import { CommonArgs } from '@server/types/common-fields'
import { DiagramId } from '@shared/types/diagram'

@Injectable()
export class DiagramService {
   constructor(private diagramRepo: DiagramRepository) {}
   create(createDiagramDto: CreateDiagramDto, args: CommonArgs) {
      return this.diagramRepo.insertOne(createDiagramDto, args)
   }

   findAll(args: CommonArgs) {
      return this.diagramRepo.findAll(args)
   }

   findOne(id: DiagramId, args: CommonArgs) {
      return this.diagramRepo.findById(id, args)
   }

   update(id: DiagramId, updateDiagramDto: UpdateDiagramDto, args: CommonArgs) {
      return this.diagramRepo.update(id, updateDiagramDto, args)
   }

   remove(id: DiagramId, args: CommonArgs) {
      return this.diagramRepo.deleteById(id, args)
   }
}
