'use client'
import {
   addEdge,
   Background,
   Connection,
   Controls,
   Edge,
   MiniMap,
   Node,
   OnConnect,
   ReactFlow,
   ReactFlowProvider,
   useEdgesState,
   useNodesState,
} from '@xyflow/react'
import { useCallback, useState } from 'react'
import { nodeTypes } from './nodes/node-types'

import { SecondaryToolBar } from './SecondaryToolBar'
import { RightSideBar } from './RightSideBar'
import { LeftSidebar } from './LeftSideBar'

export const WorkSpace = () => {
   const [nodes, setNodes, onNodesChange] = useNodesState<Node>([])
   const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([])
   const [selectedNode, setSelectedNode] = useState<Node | null>(null)

   // Handle new connections between nodes
   const onConnect: OnConnect = useCallback(
      (params: Connection) => {
         setEdges(eds => addEdge({ ...params, animated: true }, eds))
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

         const type = event.dataTransfer.getData('application/reactflow')
         const label = event.dataTransfer.getData('nodeName')

         // Check if the dropped element is valid
         if (typeof type === 'undefined' || !type) {
            return
         }

         const position = {
            x:
               event.clientX -
               (event.target as HTMLDivElement).getBoundingClientRect().left,
            y:
               event.clientY -
               (event.target as HTMLDivElement).getBoundingClientRect().top,
         }

         const newNode = {
            id: `${type}-${nodes.length + 1}`,
            type,
            position,
            data: { label: `${label} ${nodes.length + 1}` },
         }

         setNodes(nds => nds.concat(newNode))
      },
      [nodes, setNodes],
   )

   // Handle node selection
   const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
      event.preventDefault()
      setSelectedNode(node)
   }, [])
   return (
      <>
         <div className="flex h-screen">
            {/* Left Sidebar */}
            <div className="w-64 border-r p-4">
               <LeftSidebar />
            </div>
            {/* Main Canvas */}
            <div className="flex-1">
               <ReactFlowProvider>
                  <div className="size-full">
                     <ReactFlow
                        nodes={nodes}
                        edges={edges}
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
                        <SecondaryToolBar />
                     </ReactFlow>
                  </div>
               </ReactFlowProvider>
            </div>

            {selectedNode && (
               <RightSideBar selectedNode={selectedNode} setNodes={setNodes} />
            )}
         </div>
      </>
   )
}
