/* eslint-disable react/prop-types */
import { NodeProps, Node, Handle, Position } from '@xyflow/react'

interface EndNodeProps extends Record<string, unknown> {
   label: string
   isConnectable: boolean
}

export type EndNodeData = Node<EndNodeProps, 'EndNode'>

export const EndNode: React.FC<NodeProps<EndNodeData>> = ({
   data,
   isConnectable,
}) => {
   return (
      <>
         <div className="flex size-8 items-center justify-center rounded-full border-2 border-red-500 bg-red-100 shadow-sm">
            <div className="text-center text-[8px] font-medium text-red-800">
               {data.label}
            </div>
         </div>
         <Handle
            type="target"
            className="bg-red-500 opacity-50"
            position={Position.Top}
            isConnectable={isConnectable}
         />
      </>
   )
}
