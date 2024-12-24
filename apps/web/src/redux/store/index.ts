import { configureStore } from '@reduxjs/toolkit'
import diagramReducer from './slices/diagram/diagram-slice'

const store = configureStore({
   reducer: {
      diagrams: diagramReducer,
   },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
