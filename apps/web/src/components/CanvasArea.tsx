import {
   addEdge,
   Background,
   Connection,
   Controls,
   Edge,
   MiniMap,
   Node,
   OnConnect,
   Panel,
   ReactFlow,
   ReactFlowInstance,
   ReactFlowProvider,
   useEdgesState,
   useNodesState,
} from '@xyflow/react'
import { useCallback, useState } from 'react'
import { nodeTypes } from './nodes/node-types'
import { RightSideBar } from './RightSideBar'
export const CanvasArea = () => {
   const [nodes, setNodes, onNodesChange] = useNodesState<Node>([])
   const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])
   const [selectedNode, setSelectedNode] = useState<Node | null>(null)
   const [reactFlowInstance, setReactFlowInstance] =
      useState<ReactFlowInstance | null>(null)

   // Handle new connections between nodes
   const onConnect: OnConnect = useCallback(
      (connection: Connection) => {
         setEdges(eds => addEdge({ ...connection, animated: true }, eds))
      },
      [setEdges],
   )

   // Handle dropping new nodes onto the canvas
   const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      event.dataTransfer.dropEffect = 'move'
   }, [])

   // Create new node when shape is dropped
   const onDrop = useCallback(
      (event: React.DragEvent<HTMLDivElement>) => {
         event.preventDefault()

         if (!reactFlowInstance) return

         const position = reactFlowInstance.screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
         })

         const type = event.dataTransfer.getData('application/reactflow')
         const label = event.dataTransfer.getData('nodeName')

         const newNode = {
            id: `${type}-${nodes.length + 1}`,
            type,
            position,
            data: { label: `${label} ${nodes.length + 1}` },
         }

         // const { type, color } = JSON.parse(event.dataTransfer.getData('application/reactflow'));

         // const newNode = {
         //   id: `${type}-${nodes.length + 1}`,
         //   type,
         //   position,
         //   data: { label: `${type.charAt(0).toUpperCase() + type.slice(1)} ${nodes.length + 1}`, color },
         // };

         setNodes(nds => nds.concat(newNode))
      },
      [reactFlowInstance, nodes, setNodes],
   )

   // Handle node selection
   const onNodeClick = useCallback((_: unknown, node: Node) => {
      setSelectedNode(node)
   }, [])
   return (
      <div className="relative flex-1">
         <div className="absolute inset-0 m-2 overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-white">
            <ReactFlowProvider>
               <div className="size-full">
                  <ReactFlow
                     nodes={nodes}
                     edges={edges}
                     onInit={setReactFlowInstance}
                     onNodesChange={onNodesChange}
                     onEdgesChange={onEdgesChange}
                     onConnect={onConnect}
                     onDrop={onDrop}
                     onDragOver={onDragOver}
                     onNodeClick={onNodeClick}
                     nodeTypes={nodeTypes}
                     fitView
                  >
                     <Background />
                     <Controls />
                     <MiniMap />

                     <Panel position="top-right">
                        <div className="text-sm text-gray-600">
                           {selectedNode ? (
                              <RightSideBar
                                 selectedNode={selectedNode}
                                 setNodes={setNodes}
                              />
                           ) : (
                              'No node selected'
                           )}
                        </div>
                     </Panel>
                  </ReactFlow>
               </div>
            </ReactFlowProvider>
         </div>
      </div>
   )
}
