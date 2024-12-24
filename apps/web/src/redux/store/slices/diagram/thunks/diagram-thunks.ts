import { createAsyncThunk } from '@reduxjs/toolkit'
import mockApi from 'src/redux/mock-api'

//on success clear pending drafts
export const saveDiagramDrafts = createAsyncThunk(
   'diagrams/save',
   async (
      { userId, diagram }: { userId: string; diagram: any },
      { rejectWithValue },
   ) => {
      try {
         const response = (await mockApi.saveDiagram(userId, diagram)) as {
            data: any
         }
         return response.data
      } catch (error: any) {
         return rejectWithValue(error.message)
      }
   },
)

export const fetchDiagrams = createAsyncThunk(
   'diagrams/fetch',
   async (userId, { rejectWithValue }) => {
      try {
         const response = (await mockApi.getDiagrams(userId)) as { data: any }
         return response.data
      } catch (error: any) {
         return rejectWithValue(error.message)
      }
   },
)
