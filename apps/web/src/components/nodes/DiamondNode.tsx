/* eslint-disable react/prop-types */
import { NodeProps, Node } from '@xyflow/react'

interface DiamondNodeProps extends Record<string, unknown> {
   label: string
}

type DiamondNodeData = Node<DiamondNodeProps, 'DiamondNode'>

export const DiamondNode: React.FC<NodeProps<DiamondNodeData>> = ({ data }) => {
   return (
      <div className="flex size-24 rotate-45 items-center justify-center border-2 border-purple-500 bg-purple-100">
         <span className="-rotate-45">{data.label}</span>
      </div>
   )
}
