import {
   Palette,
   AlignCenter,
   AlignLeft,
   AlignRight,
   Bold,
   Italic,
   Layers,
   Underline,
   Lock,
   Redo,
   Undo,
} from 'lucide-react'
export const SecondaryToolBar = () => {
   return (
      <div className=" border-b bg-white p-2">
         <div className="flex items-center space-x-6">
            {/* Text Formatting */}
            <div className="flex items-center space-x-2">
               <select className="w-32 rounded border p-1">
                  <option>Arial</option>
                  <option>Helvetica</option>
                  <option>Times New Roman</option>
               </select>
               <select className="w-20 rounded border p-1">
                  <option>12px</option>
                  <option>14px</option>
                  <option>16px</option>
               </select>
               <div className="flex space-x-1">
                  <button className="rounded p-1 hover:bg-gray-100">
                     <Bold className="size-4" />
                  </button>
                  <button className="rounded p-1 hover:bg-gray-100">
                     <Italic className="size-4" />
                  </button>
                  <button className="rounded p-1 hover:bg-gray-100">
                     <Underline className="size-4" />
                  </button>
               </div>
            </div>

            {/* Alignment */}
            <div className="flex items-center space-x-1">
               <button className="rounded p-1 hover:bg-gray-100">
                  <AlignLeft className="size-4" />
               </button>
               <button className="rounded p-1 hover:bg-gray-100">
                  <AlignCenter className="size-4" />
               </button>
               <button className="rounded p-1 hover:bg-gray-100">
                  <AlignRight className="size-4" />
               </button>
            </div>

            {/* Colors */}
            <div className="flex items-center space-x-2">
               <Palette className="size-4" />
               <input type="color" className="size-6" />
               <select className="rounded border p-1">
                  <option>Solid</option>
                  <option>Dashed</option>
                  <option>Dotted</option>
               </select>
            </div>

            {/* Layer Controls */}
            <div className="flex items-center space-x-1">
               <button className="rounded p-1 hover:bg-gray-100">
                  <Layers className="size-4" />
               </button>
               <button className="rounded p-1 hover:bg-gray-100">
                  <Lock className="size-4" />
               </button>
            </div>
            <div className="flex items-center space-x-4 px-2">
               <div className="h-6 w-px bg-gray-300" />
               <button className="rounded p-1 hover:bg-gray-100">
                  <Undo className="size-4" />
               </button>
               <button className="rounded p-1 hover:bg-gray-100">
                  <Redo className="size-4" />
               </button>
            </div>
         </div>
      </div>
   )
}
