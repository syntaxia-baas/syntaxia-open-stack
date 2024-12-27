/* eslint-disable react/prop-types */
import { NodeProps, Node, Handle, Position } from '@xyflow/react'

interface StartNodeProps extends Record<string, unknown> {
   label: string
   isConnectable: boolean
}

export type StartNodeData = Node<StartNodeProps, 'StartNode'>

export const StartNode: React.FC<NodeProps<StartNodeData>> = ({
   data,
   isConnectable,
}) => {
   return (
      <>
         <div className="flex size-8 items-center justify-center rounded-full border-2 border-green-500 bg-green-100 shadow-sm">
            <div className="text-center text-[8px] font-medium text-green-800">
               {data.label}
            </div>
         </div>

         <Handle
            type="source"
            className="bg-green-500 opacity-50"
            position={Position.Bottom}
            isConnectable={isConnectable}
         />
      </>
   )
}
