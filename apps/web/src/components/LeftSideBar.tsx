import {
   ChevronRight,
   Circle,
   Layout,
   Square,
   Triangle,
   Type,
} from 'lucide-react'
import { useState } from 'react'

export const LeftSidebar = () => {
   const [activeTab, setActiveTab] = useState('shapes')
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
                  className={`size-4 transition-transform ${sidebarExpanded ? 'rotate-180' : ''}`}
               />
            </button>

            {/* Tabs */}
            {sidebarExpanded && (
               <div className="border-b">
                  <div className="flex">
                     <button
                        onClick={() => setActiveTab('shapes')}
                        className={`flex-1 px-4 py-2 text-sm ${activeTab === 'shapes' ? 'border-b-2 border-blue-500' : ''}`}
                     >
                        Shapes
                     </button>
                     <button
                        onClick={() => setActiveTab('components')}
                        className={`flex-1 px-4 py-2 text-sm ${activeTab === 'components' ? 'border-b-2 border-blue-500' : ''}`}
                     >
                        Components
                     </button>
                  </div>
               </div>
            )}

            {/* Elements */}
            {sidebarExpanded && (
               <div className="space-y-2 p-4">
                  {activeTab === 'shapes' ? (
                     <>
                        <div
                           className="flex cursor-pointer items-center space-x-3 rounded p-2 hover:bg-gray-100"
                           draggable
                           onDragStart={e =>
                              onDragStart(e, 'rectangleNode', 'Squere')
                           }
                        >
                           <Square className="size-5" />
                           <span>Rectangle</span>
                        </div>
                        <div
                           className="flex cursor-pointer items-center space-x-3 rounded p-2 hover:bg-gray-100"
                           draggable
                           onDragStart={e =>
                              onDragStart(e, 'circleNode', 'Circle')
                           }
                        >
                           <Circle className="size-5" />
                           <span>Circle</span>
                        </div>
                        <div
                           className="flex cursor-pointer items-center space-x-3 rounded p-2 hover:bg-gray-100"
                           draggable
                           onDragStart={e =>
                              onDragStart(e, 'diamondNode', 'Triangle')
                           }
                        >
                           <Triangle className="size-5" />
                           <span>Triangle</span>
                        </div>

                        <div
                           className="flex cursor-pointer items-center space-x-3 rounded p-2 hover:bg-gray-100"
                           draggable
                           onDragStart={e => onDragStart(e, 'type', 'Type')}
                        >
                           <Type className="size-5" />
                           <span>Text</span>
                        </div>
                     </>
                  ) : (
                     <>
                        <div className="flex cursor-pointer items-center space-x-3 rounded p-2 hover:bg-gray-100">
                           <Layout className="size-5" />
                           <span>Container</span>
                        </div>
                     </>
                  )}
               </div>
            )}
         </div>
      </>
   )
}
