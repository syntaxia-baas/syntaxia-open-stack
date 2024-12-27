import { useAuth } from '@/providers/AuthProvider'
import { AppDispatch, RootState } from '@/redux/store'
import {
   CreateNewDiagramPayload,
   SelectedDiagramPayload,
   createNewDiagram,
   selectedDiagram,
} from '@/redux/store/slices/diagram/actions/add-node'
import { fetchDiagrams } from '@/redux/store/slices/diagram/thunks/diagram-thunks'
import { Description, Name } from '@shared/types/common'
import { Diagram, DiagramId } from '@shared/types/diagram'
import { ChevronRight } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CreateNewDiagramDialog } from './CreateDiagramNameDialog'
import { ulid } from 'ulid'
interface ProjectListingSideBarProps {
   setCurrentDiagram: Dispatch<SetStateAction<Diagram | undefined>>
}
export const ProjectListingSideBar = ({
   setCurrentDiagram,
}: ProjectListingSideBarProps) => {
   const [listingBarExpanded, setListingBarExpanded] = useState(true)
   const [selectedDiagramId, setSelectedDiagramId] = useState<
      DiagramId | undefined
   >(undefined)
   const { userName } = useAuth()
   const dispatch = useDispatch<AppDispatch>()
   const diagramState = useSelector((state: RootState) => state.diagrams)
   const draftDiagrams = diagramState.draftDiagrams
   const diagrams = diagramState.diagrams

   useEffect(() => {
      dispatch(fetchDiagrams(userName))
   }, [dispatch, userName])

   const handleSave = (name: Name, description: Description) => {
      const payLoad: CreateNewDiagramPayload = {
         name,
         description,
         id: ulid() as DiagramId,
         userName,
      }
      dispatch(createNewDiagram(payLoad))
   }
   const handleSetCurrentDiagram = (diagram: Diagram) => () => {
      setCurrentDiagram(diagram)
      setSelectedDiagramId(diagram.id)
      const payload: SelectedDiagramPayload = {
         id: diagram.id,
      }
      dispatch(selectedDiagram(payload))
   }
   const isSelectedInDrafts = draftDiagrams.some(
      diagram => diagram.id === selectedDiagramId,
   )
   const DraftDiagrams = () => {
      return (
         <div className="space-y-2">
            {draftDiagrams.map(diagram => (
               <div
                  key={diagram.id}
                  onClick={() => setCurrentDiagram(diagram)}
                  className={`flex cursor-pointer items-center space-x-3 rounded p-2 hover:bg-gray-100 ${
                     selectedDiagramId === diagram.id ? 'bg-gray-200' : ''
                  }`}
               >
                  <span className="rounded-full bg-yellow-500 p-1" />
                  <span>{diagram.name}</span>
               </div>
            ))}
         </div>
      )
   }
   const SavedDiagrams = () => {
      return (
         <div className="space-y-2 ">
            {diagrams.map(diagram => (
               <div
                  key={diagram.id}
                  onClick={handleSetCurrentDiagram(diagram)}
                  className={`flex cursor-pointer items-center space-x-3 rounded p-2 hover:bg-gray-100 ${
                     !isSelectedInDrafts && selectedDiagramId === diagram.id
                        ? 'bg-gray-200'
                        : ''
                  }`}
               >
                  <span>{diagram.name}</span>
               </div>
            ))}
         </div>
      )
   }
   return (
      <>
         <div
            className={`${listingBarExpanded ? 'w-60' : 'w-12'} border-r bg-white transition-all duration-300`}
         >
            {/* Sidebar Toggle */}

            <button
               onClick={() => setListingBarExpanded(!listingBarExpanded)}
               className="flex w-full items-center justify-between border-b p-2 hover:bg-gray-100"
            >
               {listingBarExpanded && <span>Diagrams</span>}
               <ChevronRight
                  className={`size-4 transition-transform ${listingBarExpanded ? 'rotate-180' : ''}`}
               />
            </button>
            <div className="p-1 text-right">
               <CreateNewDiagramDialog
                  onSave={handleSave}
                  listingBarExpanded={listingBarExpanded}
               />
            </div>

            {listingBarExpanded && (
               <>
                  <div className="p-4">
                     <div className="mb-6 ">
                        {draftDiagrams.length > 0 && (
                           <h3 className="mb-3 text-xs font-semibold uppercase text-gray-500">
                              Drafts
                           </h3>
                        )}
                        <div className="space-y-2">
                           <DraftDiagrams />
                        </div>
                     </div>
                     <div className="mb-6 ">
                        {diagrams.length > 0 && (
                           <h3 className="mb-3 text-xs font-semibold uppercase text-gray-500">
                              Diagrams
                           </h3>
                        )}
                        <div className="space-y-2">
                           <SavedDiagrams />
                        </div>
                     </div>
                  </div>
               </>
            )}
         </div>
      </>
   )
}
