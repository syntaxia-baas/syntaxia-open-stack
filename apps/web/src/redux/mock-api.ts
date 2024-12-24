// api/diagramApi.js
const mockApi = {
   saveDiagram: async (userId, diagram) => {
      // Simulate API call
      const response = await new Promise(resolve => {
         setTimeout(() => {
            const savedDiagrams = JSON.parse(
               localStorage.getItem(`diagrams_${userId}`) || '[]',
            )
            const updatedDiagrams = diagram.id
               ? savedDiagrams.map(d => (d.id === diagram.id ? diagram : d))
               : [...savedDiagrams, { ...diagram, id: Date.now() }]

            localStorage.setItem(
               `diagrams_${userId}`,
               JSON.stringify(updatedDiagrams),
            )
            resolve({ data: diagram })
         }, 500)
      })
      return response
   },

   getDiagrams: async userId => {
      // Simulate API call
      const response = await new Promise(resolve => {
         setTimeout(() => {
            const diagrams = JSON.parse(
               localStorage.getItem(`diagrams_${userId}`) || '[]',
            )
            resolve({ data: diagrams })
         }, 500)
      })
      return response
   },
}

export default mockApi
