import { configureStore } from '@reduxjs/toolkit'
import diagramReducer from './slices/diagram/diagram-slice'

const store = configureStore({
   reducer: {
      diagrams: diagramReducer,
   },
   middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
         serializableCheck: {
            // ignore specific paths or actions
            ignoredPaths: ['diagrams.draftDiagrams'],
         },
      }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
