import { Button } from '@repo/ui/components/ui/button'
import {
   Dialog,
   DialogTrigger,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogFooter,
   DialogDescription,
} from '@repo/ui/components/ui/dialog'
import { Input } from '@repo/ui/components/ui/input'
import { Label } from '@repo/ui/components/ui/label'
import { Description, Name } from '@shared/types/common'
import { useState } from 'react'

type DialogProps = {
   onSave: (name: Name, description: Description) => void
   listingBarExpanded: boolean
}

export const CreateNewDiagramDialog = ({
   onSave,
   listingBarExpanded,
}: DialogProps) => {
   const [name, setName] = useState<Name>('' as Name)
   const [description, setDescription] = useState<Description>(
      '' as Description,
   )
   const [open, setOpen] = useState(false)
   return (
      <Dialog open={open}>
         <DialogTrigger asChild>
            {listingBarExpanded ? (
               <Button
                  onClick={() => {
                     setOpen(true)
                     console.log('clicked')
                  }}
               >
                  Create new
               </Button>
            ) : (
               <Button
                  onClick={() => {
                     setOpen(true)
                     console.log('clicked')
                  }}
                  className="mr-6"
               >
                  +
               </Button>
            )}
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle>Create Diagram </DialogTitle>
               <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
               <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                     Name
                  </Label>
                  <Input
                     id="name"
                     value={name}
                     className="col-span-3"
                     placeholder="Enter Diagram Name"
                     onChange={e => setName(e.target.value as Name)}
                  />
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                     Description
                  </Label>
                  <Input
                     id="description"
                     value={description}
                     placeholder="Enter Diagram Description"
                     className="col-span-3"
                     onChange={e =>
                        setDescription(e.target.value as Description)
                     }
                  />
               </div>
            </div>
            <DialogFooter>
               <Button
                  type="submit"
                  onClick={() => {
                     onSave(name, description)
                     setOpen(false)
                  }}
               >
                  Save changes
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   )
}
