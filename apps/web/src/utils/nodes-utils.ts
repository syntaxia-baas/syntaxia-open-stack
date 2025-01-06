import { EdgeId, NodeId } from '@shared/types/common'
import {
   NodeElement,
   EdgeElement,
   NodeCustomData,
   EdgeCustomData,
} from '@shared/types/diagram'
import { Edge, Node, MarkerType } from '@xyflow/react'

export const buildNodes = (
   nodes: NodeElement[],
): Node<NodeCustomData>[] | undefined => {
   return nodes.map(node => {
      return {
         id: node.id,
         type: node.type,
         position: {
            x: node.position.x ?? 0,
            y: node.position.y ?? 0,
         },
         data: node.data,
      }
   })
}

export const buildEdges = (
   edges: EdgeElement[],
): Edge<EdgeCustomData>[] | undefined => {
   if (!edges) return
   return edges.map(edge => {
      return {
         id: edge.id,
         source: edge.source,
         target: edge.target,
         animated: edge.animated ?? false,
      }
   })
}

export const buildNodeElements = (
   nodes: Node<NodeCustomData>[],
): NodeElement[] => {
   return nodes.map(node => {
      return {
         id: node.id as NodeId,
         type: node.type,
         position: node.position,
         data: node.data,
      }
   })
}

export const buildEdgeElements = (
   edges: Edge<EdgeCustomData>[],
): EdgeElement[] => {
   return edges.map(edge => {
      return {
         id: edge.id as EdgeId,
         source: edge.source,
         target: edge.target,
         type: edge.type as MarkerType,
         animated: edge.animated,
      }
   })
}

export const buildNode = (node: Node<NodeCustomData>): NodeElement => {
   return {
      id: node.id as NodeId,
      type: node.type,
      position: node.position,
      data: node.data,
   }
}
export const buildEdge = (edge: Edge<EdgeCustomData>): EdgeElement => {
   return {
      id: edge.id as EdgeId,
      source: edge.source,
      target: edge.target,
      animated: edge.animated,
      type: edge.type as MarkerType,
   }
}
