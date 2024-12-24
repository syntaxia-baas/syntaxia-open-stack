import { createContext, useContext } from 'react'
import { Diagram } from 'src/redux/store/slices/diagram/state'

export type DiagramContextType = {
   diagram: Diagram | null
   setDiagram: (diagram: Diagram) => void
}
export const DiagramContext = createContext<DiagramContextType>({
   diagram: null,
   setDiagram: () => {},
})
export type DiagramProviderProps = {
   children: React.ReactNode
}
export const DiagramProvider = ({ children }: DiagramProviderProps) => {
   return (
      <DiagramContext.Provider value={{ diagram: null, setDiagram: () => {} }}>
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
