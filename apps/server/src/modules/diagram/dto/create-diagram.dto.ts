import { Description, Name } from '@shared/types/common'
import { NodeElement, EdgeElement, DiagramId } from '@shared/types/diagram'

export class CreateDiagramDto {
   id: DiagramId
   name: Name
   description: Description | null
   nodes: NodeElement[]
   edges: EdgeElement[]
}
