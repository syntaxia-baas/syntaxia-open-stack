import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactFlow, {
   Controls,
   Background,
   MiniMap,
   addEdge,
   ReactFlowProvider,
   Panel,
} from 'reactflow'
import {
   Palette,
   Type,
   Layout,
   Square,
   Circle,
   Triangle,
   Save,
   FolderOpen,
} from 'lucide-react'
import {
   updateNodes,
   updateEdges,
   updateDiagramName,
   saveDiagram,
   fetchDiagrams,
   loadDiagram,
} from './store/diagramSlice'

// ... nodeTypes definition remains the same as before ...

const DiagramBuilder = () => {
   const dispatch = useDispatch()
   const { currentDiagram, savedDiagrams, loading } = useSelector(
      state => state.diagrams,
   )
   const [selectedNode, setSelectedNode] = useState(null)

   // Mock user ID (in a real app, this would come from authentication)
   const userId = 'user123'

   useEffect(() => {
      // Fetch saved diagrams when component mounts
      dispatch(fetchDiagrams(userId))
   }, [dispatch, userId])

   // Handle nodes change
   const onNodesChange = useCallback(
      changes => {
         const updatedNodes = changes.reduce((nodes, change) => {
            // Apply the change to the nodes array
            if (change.type === 'remove') {
               return nodes.filter(node => node.id !== change.id)
            }
            if (change.type === 'position' || change.type === 'dimensions') {
               return nodes.map(node =>
                  node.id === change.id ? { ...node, ...change } : node,
               )
            }
            return nodes
         }, currentDiagram.nodes)

         dispatch(updateNodes(updatedNodes))
      },
      [dispatch, currentDiagram.nodes],
   )

   // Handle edges change
   const onEdgesChange = useCallback(
      changes => {
         const updatedEdges = changes.reduce((edges, change) => {
            if (change.type === 'remove') {
               return edges.filter(edge => edge.id !== change.id)
            }
            return edges.map(edge =>
               edge.id === change.id ? { ...edge, ...change } : edge,
            )
         }, currentDiagram.edges)

         dispatch(updateEdges(updatedEdges))
      },
      [dispatch, currentDiagram.edges],
   )

   // Handle new connections
   const onConnect = useCallback(
      params => {
         dispatch(
            updateEdges(edges => addEdge({ ...params, animated: true }, edges)),
         )
      },
      [dispatch],
   )

   // Save current diagram
   const handleSave = useCallback(() => {
      dispatch(
         saveDiagram({
            userId,
            diagram: {
               ...currentDiagram,
               id: currentDiagram.id || undefined, // For new diagrams
               lastModified: new Date().toISOString(),
            },
         }),
      )
   }, [dispatch, currentDiagram, userId])

   // ... onDragOver, onDrop, onNodeClick, and onDragStart remain the same ...

   return (
      <div className="h-screen flex flex-col">
         {/* Top Bar with Diagram Name */}
         <div className="bg-white border-b p-2">
            <div className="flex items-center justify-between">
               <input
                  type="text"
                  value={currentDiagram.name}
                  onChange={e => dispatch(updateDiagramName(e.target.value))}
                  className="border rounded px-2 py-1"
               />
               <div className="flex items-center space-x-2">
                  {loading ? (
                     <span className="text-sm text-gray-500">Saving...</span>
                  ) : (
                     <>
                        <button
                           onClick={handleSave}
                           className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                           <Save className="w-4 h-4" />
                           <span>Save</span>
                        </button>
                        <select
                           onChange={e => {
                              const diagram = savedDiagrams.find(
                                 d => d.id === parseInt(e.target.value),
                              )
                              if (diagram) {
                                 dispatch(loadDiagram(diagram))
                              }
                           }}
                           className="border rounded px-2 py-1"
                        >
                           <option value="">Open Diagram</option>
                           {savedDiagrams.map(diagram => (
                              <option key={diagram.id} value={diagram.id}>
                                 {diagram.name}
                              </option>
                           ))}
                        </select>
                     </>
                  )}
               </div>
            </div>
         </div>

         {/* Main Content */}
         <div className="flex flex-1">
            {/* Left Sidebar */}
            {/* ... Same as before ... */}

            {/* Main Canvas */}
            <div className="flex-1">
               <ReactFlowProvider>
                  <div className="h-full">
                     <ReactFlow
                        nodes={currentDiagram.nodes}
                        edges={currentDiagram.edges}
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

                        {/* Top Toolbar */}
                        <Panel
                           position="top"
                           className="w-full bg-white border-b p-2"
                        >
                           {/* ... Same toolbar content as before ... */}
                        </Panel>
                     </ReactFlow>
                  </div>
               </ReactFlowProvider>
            </div>

            {/* Right Properties Sidebar */}
            {/* ... Same as before ... */}
         </div>
      </div>
   )
}

export default DiagramBuilder
