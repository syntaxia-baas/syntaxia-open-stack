import { Eye, Grid, Redo, Undo, ZoomIn, ZoomOut } from 'lucide-react'
export const TopToolBar = () => {
   return (
      <div className="border-b bg-white p-2">
         <div className="flex items-center justify-between">
            {/* Left Section - File Operations */}
            <div className="flex items-center space-x-4 px-2">
               <button className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700">
                  Save
               </button>
               <button className="rounded border px-3 py-1 hover:bg-gray-100">
                  Share
               </button>
               <div className="h-6 w-px bg-gray-300" />
               <button className="rounded p-1 hover:bg-gray-100">
                  <Undo className="size-4" />
               </button>
               <button className="rounded p-1 hover:bg-gray-100">
                  <Redo className="size-4" />
               </button>
            </div>

            {/* Center Section - Zoom Controls */}
            <div className="flex items-center space-x-2">
               <button className="rounded p-1 hover:bg-gray-100">
                  <ZoomOut className="size-4" />
               </button>
               <select className="rounded border px-2 py-1">
                  <option>100%</option>
                  <option>75%</option>
                  <option>50%</option>
                  <option>25%</option>
               </select>
               <button className="rounded p-1 hover:bg-gray-100">
                  <ZoomIn className="size-4" />
               </button>
            </div>

            {/* Right Section - View Options */}
            <div className="flex items-center space-x-2 px-2">
               <button className="rounded p-1 hover:bg-gray-100">
                  <Grid className="size-4" />
               </button>
               <button className="rounded p-1 hover:bg-gray-100">
                  <Eye className="size-4" />
               </button>
            </div>
         </div>
      </div>
   )
}
