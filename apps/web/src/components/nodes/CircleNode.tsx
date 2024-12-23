/* eslint-disable react/prop-types */
import { NodeProps, Node } from '@xyflow/react'

interface CircleNodeProps extends Record<string, unknown> {
   label: string
}

export type CircleNodeData = Node<CircleNodeProps, 'CircleNode'>

export const CircleNode: React.FC<NodeProps<CircleNodeData>> = ({ data }) => {
   return (
      <div className="flex size-[100px] items-center justify-center rounded-full border-2 border-blue-500 bg-blue-100 shadow-sm">
         <div className="text-center text-sm font-medium text-blue-800">
            {data.label}
         </div>
      </div>
   )
}
