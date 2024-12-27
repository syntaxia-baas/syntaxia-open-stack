import { NodeTypes } from '@xyflow/react'
import { EndNode } from './EndNode'
import { DecisionNode } from './DecisionNode'
import { ProcessNode } from './ProcessNode'
import { StartNode } from './StartNode'

export const nodeTypes: NodeTypes = {
   startNode: StartNode,
   processNode: ProcessNode,
   decisionNode: DecisionNode,
   endNode: EndNode,
}
