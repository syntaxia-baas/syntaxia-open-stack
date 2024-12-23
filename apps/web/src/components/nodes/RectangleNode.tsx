/* eslint-disable react/prop-types */
import { NodeProps, Node } from '@xyflow/react'

interface RectangleNodeProps extends Record<string, unknown> {
   label: string
}
export type RectangleNodeData = Node<RectangleNodeProps, 'RectangleNode'>
export const RectangleNode: React.FC<NodeProps<RectangleNodeData>> = ({
   data,
}) => {
   return (
      <div className="flex h-16 w-32 items-center justify-center rounded border-2 border-green-500 bg-green-100">
         {data.label}
      </div>
   )
}
