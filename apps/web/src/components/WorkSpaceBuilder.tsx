'use client'
import { CanvasArea } from './CanvasArea'
import { LeftSidebar } from './LeftSideBar'
import { SecondaryToolBar } from './SecondaryToolBar'
import { TopToolBar } from './TopToolBar'

export const WorkSpaceBuilder = () => {
   return (
      <div className="flex h-screen flex-col bg-gray-50">
         <TopToolBar />
         <SecondaryToolBar />
         <div className="flex flex-1 overflow-hidden">
            <LeftSidebar />
            <CanvasArea />
         </div>
      </div>
   )
}
