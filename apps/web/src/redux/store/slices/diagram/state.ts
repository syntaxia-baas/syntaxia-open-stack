//create styles dictionary
import { Diagram } from '@shared/types/diagram'
export type DiagramState = {
   diagrams: Diagram[] // used to store the saved diagrams
   draftDiagrams: Diagram[] // used to store the current diagram being edited
   loading: boolean // used to indicate if the app is currently loading data
   error: unknown | null // used to store any error that occurs during the loading process
   fallBackMessage: string
}

export const initDiagramState: DiagramState = {
   diagrams: [],
   draftDiagrams: [],
   loading: true,
   error: null,
   fallBackMessage: 'Create a new Diagram to get started',
}
