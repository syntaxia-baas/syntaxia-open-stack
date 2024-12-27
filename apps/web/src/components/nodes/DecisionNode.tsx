/* eslint-disable react/prop-types */
import { NodeProps, Node, Position, Handle } from '@xyflow/react'

interface DecisionNodeProps extends Record<string, unknown> {
   label: string
   isConnectable: boolean
}

type DecisionNodeData = Node<DecisionNodeProps, 'DecisionNode'>
export const DecisionNode: React.FC<NodeProps<DecisionNodeData>> = ({
   data,
   isConnectable,
}) => {
   return (
      <>
         <div className=" flex size-10 rotate-45 items-center justify-center border-2 border-orange-500 bg-orange-100">
            <div className="-rotate-45 text-center text-[7px] font-medium text-orange-800">
               {data.label}
            </div>
         </div>

         <Handle
            type="source"
            className=" -mb-2 bg-orange-500 opacity-50"
            position={Position.Bottom}
            isConnectable={isConnectable}
         />
         <Handle
            type="target"
            className="-mt-2 bg-orange-500 opacity-50 "
            position={Position.Top}
            isConnectable={isConnectable}
         />
      </>
   )
}
