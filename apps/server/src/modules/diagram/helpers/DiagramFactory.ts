import { UserName } from '@shared/types/common'
import { CreateDiagramCommand, Diagram } from '@shared/types/diagram'

export const DiagramFactory = {
   createDiagram: (cmd: CreateDiagramCommand, userName: UserName): Diagram => {
      const diagram: Diagram = {
         id: cmd.id,
         name: cmd.name,
         description: cmd.description,
         nodes: cmd.nodes,
         edges: cmd.edges,
         createdBy: userName,
         createdAt: new Date(),
         updatedBy: userName,
         updatedAt: new Date(),
         disable: false,
      }
      return diagram
   },
}
