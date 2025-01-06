import { BaseRow, Branded, Description, EdgeId, Name, NodeId } from './common'

export type Style =
   | 'background'
   | 'font-color'
   | 'border-color'
   | 'border-width'
   | 'border-style'
   | 'font-size'
   | 'font-family'
   | 'font-weight'
   | 'font-style'
   | 'text-decoration'
   | 'text-align'
   | 'text-transform'
   | 'line-height'
   | 'letter-spacing'
   | 'width'
   | 'height'
   | 'padding'
   | 'margin'
   | 'border-radius'
   | 'box-shadow'
   | 'position'
   | 'top'
   | 'left'
   | 'right'
   | 'bottom'
   | 'z-index'
   | 'display'
   | 'flex-direction'
   | 'justify-content'
   | 'align-items'
   | 'align-content'
   | 'flex-wrap'
   | 'flex-grow'
   | 'flex-shrink'
   | 'flex-basis'
   | 'order'
   | 'grid-template-columns'
   | 'grid-template-rows'
   | 'grid-template-areas'
   | 'grid-template'
   | 'grid-column-gap'
   | 'grid-row-gap'
   | 'grid-gap'
   | 'grid-auto-columns'
   | 'grid-auto-rows'
   | 'grid-auto-flow'
   | 'grid'
   | 'grid-column-start'
   | 'grid-column-end'
   | 'grid-row-start'
   | 'grid-row-end'
   | 'grid-column'
   | 'grid-row'
   | 'grid-area'
   | 'background-color'
   | 'background-image'
   | 'background-repeat'
   | 'background-position'
   | 'background-size'
   | 'background-attachment'
   | 'background-clip'
   | 'background-origin'
   | 'background-blend-mode'
   | 'background-gradient'
   | 'color'
   | 'opacity'
   | 'transition'
   | 'transform'
   | 'filter'
   | 'perspective'
   | 'perspective-origin'
   | 'transform-origin'
   | 'transform-style'
   | 'backface-visibility'
   | 'visibility'
   | 'overflow'
   | 'overflow-x'
   | 'overflow-y'
   | 'clip'
   | 'clip-path'
   | 'clip-rule'
   | 'mask'
   | 'mask-type'
   | 'mask-image'
   | 'mask-mode'
   | 'mask-size'
   | 'mask-repeat'
   | 'mask-position'
   | 'mask-clip'
   | 'mask-origin'
   | 'mask-composite'
   | 'mask-border'
   | 'mask-border-source'
   | 'mask-border-slice'
   | 'mask-border-width'
   | 'mask-border-outset'
   | 'mask-border-repeat'
   | 'mask-border-mode'
   | 'mask-border'

export type NodeCustomData = Record<string, unknown> & {
   label: string
}

export type EdgeCustomData = Record<string, unknown> & {
   label: string
}

export type XYPosition = {
   x?: number
   y?: number
}
export type NodeElement = {
   id: NodeId // unique id used to identify the node
   type?: string //"circle" | "rect" | "diamond" | "ellipse" | "triangle"
   position: XYPosition // current position of the node on the canvas
   data: NodeCustomData // data to be displayed on the node
   style?: { [key in Style]: string } // style of the node
}
export type EdgeMarker = {
   type: MarkerType
   color?: string
   width?: number
   height?: number
   markerUnits?: string
   orient?: string
   strokeWidth?: number
}
export type EdgeMarkerType = string | EdgeMarker
export declare enum MarkerType {
   Arrow = 'arrow',
   ArrowClosed = 'arrowclosed',
}
export type DiagramId = Branded<string, 'DiagramId'>
export type EdgeElement = {
   id: EdgeId // unique id used to identify the edge
   source: string // id of the source node
   target: string // id of the target node
   type: MarkerType // type of the edge
   animated?: boolean // whether the edge should be animated
   data?: EdgeCustomData // data to be displayed on the node
   style?: { [key in Style]: string } // style of the edge
}

export type Diagram = BaseRow<DiagramId> & {
   nodes: NodeElement[]
   edges: EdgeElement[]
   name: Name
   description: Description | null
}

export type CreateDiagramCommand = {
   id: DiagramId
   name: Name
   description: Description | null
   nodes: NodeElement[]
   edges: EdgeElement[]
}

export type UpdateDiagramCommand = {
   name: Name
   description: Description | null
   Nodes: NodeElement[]
   Edges: EdgeElement[]
}
