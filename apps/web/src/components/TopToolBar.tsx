import { useAuth } from '@/providers/AuthProvider'
import { useDiagram } from '@/providers/DiagramProvider'
import { AppDispatch, RootState } from '@/redux/store'
import {
   CreateDiagramPayload,
   saveDiagram,
} from '@/redux/store/slices/diagram/thunks/diagram-thunks'
import { Button } from '@repo/ui/components/ui/button'
import { UserName } from '@shared/types/common'
import { CreateDiagramCommand } from '@shared/types/diagram'
import { Eye, Grid } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
export const TopToolBar = () => {
   const { userName } = useAuth()
   const { currentDiagram } = useDiagram()
   const dispatch = useDispatch<AppDispatch>()
   const diagramState = useSelector((state: RootState) => state.diagrams)

   const handleSaveDiagram = () => {
      const diagramToSave = diagramState.draftDiagrams.find(
         d => d.id === currentDiagram.id,
      )
      if (!diagramToSave) throw new Error('Diagram not found in the drafts')
      const cmd: CreateDiagramCommand = {
         id: diagramToSave.id,
         name: diagramToSave.name,
         description: diagramToSave.description,
         nodes: diagramToSave.nodes,
         edges: diagramToSave.edges,
      }
      const payload: CreateDiagramPayload = {
         userName: userName as UserName,
         cmd: cmd,
      }
      dispatch(saveDiagram(payload))
   }

   return (
      <div className="border-b bg-white p-2">
         <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
               Selected Diagram : {''}
               <span className="ml-2 text-lg font-bold text-indigo-600">
                  {currentDiagram.name}
               </span>
            </div>

            {/* Right Section - View Options */}
            <div className="flex items-center space-x-2 px-2">
               <button className="rounded p-1 hover:bg-gray-100">
                  <Grid className="size-4" />
               </button>
               <button className="rounded p-1 hover:bg-gray-100">
                  <Eye className="size-4" />
               </button>
               <Button onClick={handleSaveDiagram}>Save</Button>
               <Button variant="secondary">Share</Button>
            </div>
         </div>
      </div>
   )
}
