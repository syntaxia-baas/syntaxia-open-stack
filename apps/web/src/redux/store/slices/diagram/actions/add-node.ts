import { createAction } from '@reduxjs/toolkit'
import { Description, EdgeId, Name, UserName } from '@shared/types/common'
import {
   DiagramId,
   EdgeCustomData,
   EdgeElement,
   NodeCustomData,
   NodeElement,
} from '@shared/types/diagram'
import { NodeChange, Node, Edge, EdgeChange } from '@xyflow/react'

export type CreateNewDiagramPayload = {
   id: DiagramId
   name: Name
   description: Description | null
   userName: UserName
}
export const createNewDiagram = createAction(
   'diagrams/createNewDiagram',
   (payload: CreateNewDiagramPayload) => ({
      payload,
   }),
)

export type OnNodesChangePayload = {
   id: DiagramId
   nodeChanges: NodeChange<Node<NodeCustomData>>[]
}
export const nodesChange = createAction(
   'diagrams/nodesChange',
   (payload: OnNodesChangePayload) => ({
      payload,
   }),
)
export type OnEdgesChangePayload = {
   id: DiagramId
   edgeChanges: EdgeChange<Edge<EdgeCustomData>>[]
}
export const edgesChange = createAction(
   'diagrams/edgesChange',
   (payload: OnEdgesChangePayload) => ({
      payload,
   }),
)

export type SelectedDiagramPayload = {
   id: DiagramId
}
export const selectedDiagram = createAction(
   'diagrams/selectedDiagram',
   (payload: SelectedDiagramPayload) => ({
      payload,
   }),
)

export type AddNodePayload = {
   id: DiagramId
   node: NodeElement
}
export const addNode = createAction(
   'diagrams/addNode',
   (payload: AddNodePayload) => ({
      payload,
   }),
)

// export type UpdateNodesPayload = {
//    id: DiagramId
//    nodes: NodeElement[]
// }
// export const updateNodes = createAction(
//    'diagrams/updateNodes',
//    (payload: UpdateNodesPayload) => ({
//       payload,
//    }),
// )

// export type DeleteNodePayload = {
//    id: DiagramId
//    nodeId: NodeId
// }

// export const deleteNode = createAction(
//    'diagrams/deleteNode',
//    (payload: DeleteNodePayload) => ({
//       payload,
//    }),
// )

export type UpdateEdgePayload = {
   id: DiagramId
   edge: Edge<EdgeCustomData>
}

export const updateEdge = createAction(
   'diagrams/updateEdge',
   (payload: UpdateEdgePayload) => ({
      payload,
   }),
)

export type UpdateEdgesPayload = {
   id: DiagramId
   edges: EdgeElement[]
}

export const updateEdges = createAction(
   'diagrams/updateEdges',
   (payload: UpdateEdgesPayload) => ({
      payload,
   }),
)

export type DeleteEdgePayload = {
   id: DiagramId
   edgeId: EdgeId
}

export const deleteEdge = createAction(
   'diagrams/deleteEdge',
   (payload: DeleteEdgePayload) => ({
      payload,
   }),
)
export type LoadingMessage = {
   loading: boolean
   message: string
}

export const setLoading = createAction<LoadingMessage>('diagrams/set-loading')
export const setError = createAction<string>('diagrams/set-error')
