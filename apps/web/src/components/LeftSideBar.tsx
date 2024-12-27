import { ChevronRight, Circle, Layout, Square, Triangle } from 'lucide-react'
import { useState } from 'react'

export const LeftSidebar = () => {
   const [sidebarExpanded, setSidebarExpanded] = useState(true)
   const onDragStart = (
      event: React.DragEvent,
      nodeType: string,
      nodeName: string,
   ) => {
      event.dataTransfer.setData('application/reactflow', nodeType)
      event.dataTransfer.setData('nodeName', nodeName)
      event.dataTransfer.effectAllowed = 'move'
   }
   return (
      <>
         <div
            className={`${sidebarExpanded ? 'w-64' : 'w-12'} border-r bg-white transition-all duration-300`}
         >
            {/* Sidebar Toggle */}
            <button
               onClick={() => setSidebarExpanded(!sidebarExpanded)}
               className="flex w-full items-center justify-between border-b p-2 hover:bg-gray-100"
            >
               {sidebarExpanded && <span>Elements</span>}
               <ChevronRight
                  className={`size-4  transition-transform ${sidebarExpanded ? 'rotate-180' : ''}`}
               />
            </button>
            {sidebarExpanded && (
               <div className="p-4">
                  {/* Shapes Section */}
                  <div className="mb-6">
                     <h3 className="mb-3 text-xs font-semibold uppercase text-gray-500">
                        Node Types
                     </h3>
                     <div className="space-y-2">
                        <div
                           className="flex cursor-pointer items-center space-x-3 rounded p-2 hover:bg-gray-100"
                           draggable
                           onDragStart={e =>
                              onDragStart(e, 'startNode', 'Start')
                           }
                        >
                           <Circle className="size-5 fill-green-200 stroke-green-500 " />
                           <span>Start</span>
                        </div>
                        <div
                           className="flex cursor-pointer items-center space-x-3 rounded p-2 hover:bg-gray-100"
                           draggable
                           onDragStart={e =>
                              onDragStart(e, 'processNode', 'Process')
                           }
                        >
                           <Square className="size-5 fill-blue-200  stroke-blue-500 " />
                           <span>Process</span>
                        </div>
                        <div
                           className="flex cursor-pointer items-center space-x-3 rounded p-2 hover:bg-gray-100"
                           draggable
                           onDragStart={e =>
                              onDragStart(e, 'decisionNode', 'Decision')
                           }
                        >
                           <Triangle className="size-5 fill-orange-200 stroke-orange-500" />
                           <span>Desicion</span>
                        </div>
                        <div
                           className="flex cursor-pointer items-center space-x-3 rounded p-2 hover:bg-gray-100"
                           draggable
                           onDragStart={e => onDragStart(e, 'endNode', 'End')}
                        >
                           <Circle className="size-5 fill-red-200 stroke-red-500" />
                           <span>End</span>
                        </div>
                     </div>
                  </div>

                  {/* Components Section */}
                  <div>
                     <h3 className="mb-3 text-xs font-semibold uppercase text-gray-500">
                        Components
                     </h3>
                     <div className="space-y-2">
                        <div
                           className="flex cursor-pointer items-center space-x-3 rounded p-2 hover:bg-gray-100"
                           draggable
                           onDragStart={e =>
                              onDragStart(e, 'container', 'Container')
                           }
                        >
                           <Layout className="size-5" />
                           <span>Container</span>
                        </div>
                        {/* Add more components here as needed */}
                     </div>
                  </div>
               </div>
            )}
         </div>
      </>
   )
}
