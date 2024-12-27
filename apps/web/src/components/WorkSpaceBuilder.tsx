'use client'
import { useState } from 'react'
import { ProjectListingSideBar } from './ProjectListingSideBar'
import { Diagram } from '@shared/types/diagram'
import { DiagramBuilder } from './DiagramBuilder'

export const WorkSpaceBuilder = () => {
   const [currentDiagram, setCurrentDiagram] = useState<Diagram | undefined>(
      undefined,
   )
   return (
      <div className="flex h-screen bg-gray-50">
         <ProjectListingSideBar setCurrentDiagram={setCurrentDiagram} />
         <DiagramBuilder currentDiagram={currentDiagram} />
      </div>
   )
}
