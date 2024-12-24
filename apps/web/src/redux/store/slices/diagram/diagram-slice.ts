import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchDiagrams, saveDiagram } from './thunks/diagram-thunks'
import { initDiagramState } from './state'
import { createNewDiagram, CreateNewDiagramPayload } from './actions/add-node'
import { act } from 'react'

const diagramSlice = createSlice({
   name: 'diagrams',
   initialState: initDiagramState,
   reducers: {
      // updateNodes: (state, action) => {
      //    state.currentDiagram.nodes = action.payload
      // },
      // updateEdges: (state, action) => {
      //    state.currentDiagram.edges = action.payload
      // },
      // updateDiagramName: (state, action) => {
      //    state.currentDiagram.name = action.payload
      // },
      // clearCurrentDiagram: state => {
      //    state.currentDiagram = {
      //       nodes: [],
      //       edges: [],
      //       name: 'Untitled Diagram',
      //    }
      // },
      // loadDiagram: (state, action) => {
      //    state.currentDiagram = action.payload
      // },
   },
   extraReducers: builder => {
      builder
         .addCase(
            createNewDiagram,
            (state, action: PayloadAction<CreateNewDiagramPayload>) => {
               state.draftDiagrams.push({
                  nodes: [],
                  edges: [],
                  name: action.payload.name,
                  description: action.payload.description,
               })
            },
         )
         .addCase(saveDiagram.pending, state => {
            state.loading = true
         })
         .addCase(saveDiagram.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
         })
         .addCase(saveDiagram.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as unknown
         })
         .addCase(fetchDiagrams.pending, state => {
            state.loading = true
         })
         .addCase(fetchDiagrams.fulfilled, (state, action) => {
            state.loading = false
            state.savedDiagrams = action.payload
            state.error = null
         })
         .addCase(fetchDiagrams.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})
export const {
   updateNodes,
   updateEdges,
   updateDiagramName,
   clearCurrentDiagram,
   loadDiagram,
} = diagramSlice.actions

export default diagramSlice.reducer
