import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchDiagrams, saveDiagram } from './thunks/diagram-thunks'
import { initDiagramState } from './state'
import {
   addNode,
   AddNodePayload,
   createNewDiagram,
   CreateNewDiagramPayload,
   edgesChange,
   LoadingMessage,
   nodesChange,
   OnEdgesChangePayload,
   OnNodesChangePayload,
   selectedDiagram,
   SelectedDiagramPayload,
   setError,
   setLoading,
   updateEdge,
   UpdateEdgePayload,
} from './actions/add-node'
import { createBasicInfo, EdgeId, NodeId } from '@shared/types/common'
import { buildEdge, buildNode } from '@/utils/nodes-utils'
import { Diagram, EdgeElement, MarkerType } from '@shared/types/diagram'

const diagramSlice = createSlice({
   name: 'diagrams',
   initialState: initDiagramState,
   reducers: {},
   extraReducers: builder => {
      builder
         .addCase(
            createNewDiagram,
            (state, action: PayloadAction<CreateNewDiagramPayload>) => {
               state.draftDiagrams.push({
                  id: action.payload.id,
                  name: action.payload.name,
                  description: action.payload.description,
                  nodes: [],
                  edges: [],
                  ...createBasicInfo(action.payload.userName),
               })
            },
         )
         .addCase(
            nodesChange,
            (state, action: PayloadAction<OnNodesChangePayload>) => {
               const draftDiagram = state.draftDiagrams.find(
                  diagram => diagram.id === action.payload.id,
               )
               if (draftDiagram) {
                  const nodeChanges = action.payload.nodeChanges
                  nodeChanges.forEach(change => {
                     if (change.type === 'remove') {
                        draftDiagram.nodes = draftDiagram.nodes.filter(
                           node => node.id !== change.id,
                        )
                     } else if (change.type === 'add') {
                        draftDiagram.nodes.push(buildNode(change.item))
                     } else if (change.type === 'position') {
                        draftDiagram.nodes = draftDiagram.nodes.map(node => {
                           return node.id === change.id
                              ? {
                                   ...node,
                                   id: change.id as NodeId,
                                   position: {
                                      x: change.position?.x,
                                      y: change.position?.y,
                                   },
                                }
                              : node
                        })
                     }
                  })
               }
            },
         )
         .addCase(
            edgesChange,
            (state, action: PayloadAction<OnEdgesChangePayload>) => {
               const draftDiagram = state.draftDiagrams.find(
                  diagram => diagram.id === action.payload.id,
               )
               if (draftDiagram) {
                  const edgeChanges = action.payload.edgeChanges
                  edgeChanges.forEach(change => {
                     if (change.type === 'remove') {
                        draftDiagram.edges = draftDiagram.edges.filter(
                           edge => edge.id !== change.id,
                        )
                     } else if (change.type === 'add') {
                        draftDiagram.edges.push(buildEdge(change.item))
                     }
                  })
               }
            },
         )
         .addCase(
            setLoading,
            (state, action: PayloadAction<LoadingMessage>) => {
               const { loading, message } = action.payload
               // Update loading status and fallback message
               state.loading = loading
               state.fallBackMessage = message
            },
         )
         // Handle setError
         .addCase(setError, (state, action: PayloadAction<string>) => {
            state.error = action.payload
         })
         .addCase(
            fetchDiagrams.fulfilled,
            (state, action: PayloadAction<Diagram[]>) => {
               state.diagrams = action.payload
               state.loading = false
            },
         )
         .addCase(fetchDiagrams.rejected, (state, action) => {
            state.error = action.error.message
            state.loading = false
         })
         .addCase(fetchDiagrams.pending, state => {
            state.loading = true
         })
         .addCase(saveDiagram.fulfilled, (state, action) => {
            // Ensure the diagram is not already in the state
            if (
               !state.diagrams.some(diagram => diagram.id === action.payload.id)
            ) {
               state.diagrams.push(action.payload)
            }
            // Remove the saved diagram from the draftDiagrams array
            state.draftDiagrams = state.draftDiagrams.filter(
               diagram => diagram.id !== action.payload.id,
            )

            state.loading = false
            state.error = null
         })
         .addCase(saveDiagram.rejected, (state, action) => {
            state.error = action.error.message
            state.loading = false
         })
         .addCase(saveDiagram.pending, state => {
            state.loading = true
         })

         .addCase(addNode, (state, action: PayloadAction<AddNodePayload>) => {
            const draftDiagram = state.draftDiagrams.find(
               diagram => diagram.id === action.payload.id,
            )
            if (draftDiagram) {
               draftDiagram.nodes.push(action.payload.node)
            }
         })
         .addCase(
            updateEdge,
            (state, action: PayloadAction<UpdateEdgePayload>) => {
               const draftDiagram = state.draftDiagrams.find(
                  diagram => diagram.id === action.payload.id,
               )
               if (draftDiagram) {
                  const newEdge: EdgeElement = {
                     id: `edge-${action.payload.edge.source}-${action.payload.edge.target}` as EdgeId,
                     source: action.payload.edge.source,
                     target: action.payload.edge.target,
                     type: (action.payload.edge.type as MarkerType) || 'arrow',
                     animated: action.payload.edge.animated,
                     data: action.payload.edge.data,
                  }
                  draftDiagram.edges.push(newEdge)
               }
            },
         )
         .addCase(
            selectedDiagram,
            (state, action: PayloadAction<SelectedDiagramPayload>) => {
               const selected = state.diagrams.find(
                  diagram => diagram.id === action.payload.id,
               )
               if (!selected) {
                  throw new Error('Selected diagram not found')
               }
               //if exisists replace newly selected diagram
               const existingDraftsWithSelected = state.draftDiagrams.filter(
                  diagram => diagram.id !== action.payload.id,
               )
               const allDrafts = [...existingDraftsWithSelected, selected]
               state.draftDiagrams = allDrafts
            },
         )
   },
})

export default diagramSlice.reducer
