import { diagramsTable } from '@server/core/drizzle/schemas/diagram.schema'
import { Repository } from '@server/core/repo/Repository'
import { DiagramId } from '@shared/types/diagram'

export class DiagramRepository extends Repository<
   typeof diagramsTable,
   DiagramId
> {
   constructor() {
      super(diagramsTable)
   }
}
