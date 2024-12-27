'use client'
import { Diagram } from '@shared/types/diagram'
import { createContext, ReactNode, useContext } from 'react'

type DiagramContextType = {
   currentDiagram: Diagram
}
const DiagramContext = createContext<DiagramContextType | undefined>(undefined)
export type DiagramProviderProps = {
   currentDiagram: Diagram
   children: ReactNode
}
export const DiagramProvider = ({
   currentDiagram,
   children,
}: DiagramProviderProps) => {
   return (
      <DiagramContext.Provider
         value={{
            currentDiagram,
         }}
      >
         {children}
      </DiagramContext.Provider>
   )
}

export const useDiagram = () => {
   const context = useContext(DiagramContext)
   if (!context) {
      throw new Error('useDiagram must be used within a DiagramProvider')
   }
   return context
}
