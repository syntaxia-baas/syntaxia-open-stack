import {
   addEdge,
   applyEdgeChanges,
   applyNodeChanges,
   Background,
   Controls,
   Edge,
   MiniMap,
   Node,
   OnConnect,
   OnEdgesChange,
   OnNodesChange,
   Panel,
   ReactFlow,
   ReactFlowInstance,
   ReactFlowProvider,
} from '@xyflow/react'
import { useCallback, useEffect, useState } from 'react'
import { nodeTypes } from './nodes/node-types'
import { RightSideBar } from './RightSideBar'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { NodeId } from '@shared/types/common'
import { buildEdges, buildNodes } from '@/utils/nodes-utils'
import {
   addNode,
   edgesChange,
   nodesChange,
} from '@/redux/store/slices/diagram/actions/add-node'
import {
   EdgeCustomData,
   NodeCustomData,
   NodeElement,
} from '@shared/types/diagram'
import { useDiagram } from '@/providers/DiagramViewProvider'

export const CanvasArea = () => {
   const dispatch = useDispatch<AppDispatch>()
   const diagramState = useSelector((state: RootState) => state.diagrams)
   const { currentDiagram } = useDiagram()
   const [selectedNode, setSelectedNode] = useState<Node | null>(null)
   const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance<
      Node<NodeCustomData>,
      Edge<EdgeCustomData>
   > | null>(null)
   const [nodes, setNodes] = useState<Node<NodeCustomData>[]>([])
   const [edges, setEdges] = useState<Edge<EdgeCustomData>[]>([])

   useEffect(() => {
      setNodes(buildNodes(currentDiagram.nodes) || [])
      setEdges(buildEdges(currentDiagram.edges) || [])
   }, [currentDiagram])

   const onNodesChange: OnNodesChange<Node<NodeCustomData>> = useCallback(
      changes => {
         setNodes(nds => applyNodeChanges(changes, nds))
         dispatch(nodesChange({ id: currentDiagram.id, nodeChanges: changes }))
      },
      [dispatch, currentDiagram.id],
   )
   const onEdgesChange: OnEdgesChange<Edge<EdgeCustomData>> = useCallback(
      changes => {
         setEdges(eds => applyEdgeChanges(changes, eds))
         dispatch(edgesChange({ id: currentDiagram.id, edgeChanges: changes }))
      },

      [dispatch, currentDiagram.id],
   )
   const onConnect: OnConnect = useCallback(
      connection => setEdges(eds => addEdge(connection, eds)),
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

         const newNode: Node<NodeCustomData> = {
            id: `${type}-${nodes.length + 1}`,
            type,
            position,
            data: { label: `${label} ${nodes.length + 1}` },
         }

         const newNodeElement: NodeElement = {
            id: newNode.id as NodeId,
            type: newNode.type,
            position: newNode.position,
            data: newNode.data,
         }

         setNodes(nds => {
            const updateNodes = nds.concat(newNode)
            return updateNodes
         })
         dispatch(addNode({ id: currentDiagram.id, node: newNodeElement }))
      },
      [reactFlowInstance, nodes.length, dispatch, currentDiagram.id],
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
                  <ReactFlow<Node<NodeCustomData>, Edge<EdgeCustomData>>
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
                     <div className="absolute inset-0 flex flex-col items-center justify-center text-2xl text-gray-400">
                        {diagramState.loading && (
                           <>
                              <h1> {currentDiagram?.name} </h1>
                              <h1>{diagramState.fallBackMessage}</h1>
                           </>
                        )}
                     </div>

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
