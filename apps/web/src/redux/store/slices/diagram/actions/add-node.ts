import { createAction } from '@reduxjs/toolkit'
import { NodeElement } from '../state'

export type CreateNewDiagramPayload = {
   name: string
   description: string | null
}
export const createNewDiagram = createAction(
   'diagrams/createNewDiagram',
   (payload: CreateNewDiagramPayload) => ({
      payload,
   }),
)

export type AddNodePayload = {
   node: NodeElement
}
export const addNode = createAction(
   'diagrams/addNode',
   (payload: AddNodePayload) => ({
      payload,
   }),
)

export type UpdateNodePayload = {
   node: NodeElement
}
export const updateNode = createAction(
   'diagrams/updateNode',
   (payload: UpdateNodePayload) => ({
      payload,
   }),
)

export type DeleteNodePayload = {
   nodeId: string
}

export const deleteNode = createAction(
   'diagrams/deleteNode',
   (payload: DeleteNodePayload) => ({
      payload,
   }),
)

export type AddEdgePayload = {
   source: string
   target: string
}

export const addEdge = createAction(
   'diagrams/addEdge',
   (payload: AddEdgePayload) => ({
      payload,
   }),
)

export type UpdateEdgePayload = {
   source: string
   target: string
}

export const updateEdge = createAction(
   'diagrams/updateEdge',
   (payload: UpdateEdgePayload) => ({
      payload,
   }),
)

export type DeleteEdgePayload = {
   edgeId: string
}

export const deleteEdge = createAction(
   'diagrams/deleteEdge',
   (payload: DeleteEdgePayload) => ({
      payload,
   }),
)
