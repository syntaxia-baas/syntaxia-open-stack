import { Node } from '@xyflow/react'

interface RightSideBarProps {
   selectedNode: Node
   setNodes: React.Dispatch<React.SetStateAction<Node[]>>
}

export const RightSideBar = ({ selectedNode, setNodes }: RightSideBarProps) => {
   return (
      <div className="w-64 rounded-md border bg-white p-4">
         <h2 className="mb-4 font-semibold">Properties</h2>
         <div className="space-y-4">
            <div>
               <label className="mb-1 block text-sm">Label</label>
               <input
                  type="text"
                  value={selectedNode.data.label as string}
                  onChange={e => {
                     setNodes(nds =>
                        nds.map(node =>
                           node.id === selectedNode.id
                              ? {
                                   ...node,
                                   data: {
                                      ...node.data,
                                      label: e.target.value,
                                   },
                                }
                              : node,
                        ),
                     )
                  }}
                  className="w-full rounded border p-1"
               />
            </div>
            <div>
               <label className="mb-1 block text-sm">Position X</label>
               <input
                  type="number"
                  value={selectedNode.position.x}
                  onChange={e => {
                     setNodes(nds =>
                        nds.map(node =>
                           node.id === selectedNode.id
                              ? {
                                   ...node,
                                   position: {
                                      ...node.position,
                                      x: parseInt(e.target.value),
                                   },
                                }
                              : node,
                        ),
                     )
                  }}
                  className="w-full rounded border p-1"
               />
            </div>
            <div>
               <label className="mb-1 block text-sm">Position Y</label>
               <input
                  type="number"
                  value={selectedNode.position.y}
                  onChange={e => {
                     setNodes(nds =>
                        nds.map(node =>
                           node.id === selectedNode.id
                              ? {
                                   ...node,
                                   position: {
                                      ...node.position,
                                      y: parseInt(e.target.value),
                                   },
                                }
                              : node,
                        ),
                     )
                  }}
                  className="w-full rounded border p-1"
               />
            </div>
         </div>
      </div>
   )
}
