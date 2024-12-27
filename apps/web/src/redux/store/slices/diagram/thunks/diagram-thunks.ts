import axiosInstance from '@/apis/axios-instance'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { UserName } from '@shared/types/common'
import { CreateDiagramCommand } from '@shared/types/diagram'

export type CreateDiagramPayload = {
   userName: UserName
   cmd: CreateDiagramCommand
}

export const saveDiagram = createAsyncThunk(
   'diagrams/save',
   async (payload: CreateDiagramPayload, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.post(
            '/diagram/create',
            payload.cmd,
            {
               headers: {
                  'Content-Type': 'application/json',
                  username: payload.userName,
               },
            },
         )
         return response.data
      } catch (error: unknown) {
         if (error instanceof Error) {
            return rejectWithValue(error.message)
         }
         return rejectWithValue('An unknown error occurred')
      }
   },
)

export const fetchDiagrams = createAsyncThunk(
   'diagrams/fetch',
   async (userName: UserName, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get('/diagram/getAll', {
            headers: {
               'Content-Type': 'application/json',
               username: userName,
            },
         })
         return response.data
      } catch (error: unknown) {
         if (error instanceof Error) {
            return rejectWithValue(error.message)
         }
         return rejectWithValue('An unknown error occurred')
      }
   },
)
