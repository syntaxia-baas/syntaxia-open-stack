/* eslint-disable react/prop-types */
import { NodeProps, Node, Handle, Position } from '@xyflow/react'

interface ProcessNodeProps extends Record<string, unknown> {
   label: string
   isConnectable: boolean
}

export type ProcessNodeData = Node<ProcessNodeProps, 'ProcessNode'>
export const ProcessNode: React.FC<NodeProps<ProcessNodeData>> = ({
   data,
   isConnectable,
}) => {
   return (
      <>
         <div className="flex h-8 w-16 items-center justify-center rounded border-2 border-blue-500 bg-blue-100">
            <div className="text-center text-[8px] font-medium text-blue-800">
               {data.label}
            </div>
         </div>
         <Handle
            type="target"
            className="bg-blue-500 opacity-50"
            position={Position.Top}
            isConnectable={isConnectable}
         />
         <Handle
            type="source"
            className="bg-blue-500 opacity-50"
            position={Position.Bottom}
            isConnectable={isConnectable}
         />
      </>
   )
}
