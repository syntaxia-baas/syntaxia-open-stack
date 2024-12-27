'use client'
import { CanvasArea } from './CanvasArea'
import { LeftSidebar } from './LeftSideBar'
import { SecondaryToolBar } from './SecondaryToolBar'
import { TopToolBar } from './TopToolBar'
import { DiagramProvider } from '@/providers/DiagramViewProvider'
import { Diagram } from '@shared/types/diagram'

interface Props {
   currentDiagram: Diagram | undefined
}

export const DiagramBuilder = ({ currentDiagram }: Props) => {
   return (
      <>
         {currentDiagram ? (
            <DiagramProvider currentDiagram={currentDiagram}>
               <div className="flex w-full flex-col">
                  <TopToolBar />
                  <SecondaryToolBar />
                  <div className="flex flex-1 overflow-hidden">
                     <LeftSidebar />
                     <CanvasArea />
                  </div>
               </div>
            </DiagramProvider>
         ) : (
            <>
               <div className="mx-auto flex h-full items-center justify-center text-center text-4xl text-gray-400">
                  Create a diagram or Select a diagram to start working
               </div>
            </>
         )}
      </>
   )
}
