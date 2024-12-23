import { Button } from '@repo/ui/components/ui/button'
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@repo/ui/components/ui/card'
import Image from 'next/image'
import React from 'react'

export default function Home() {
   return (
      <div className="w-full h-screen mx-auto text-center ">
         <Card className="mx-auto mt-10 w-[350px]">
            <CardHeader>
               <CardTitle>Create project</CardTitle>
               <CardDescription>
                  Deploy your new project in one-click.
               </CardDescription>
            </CardHeader>
            <CardContent>
               <Image
                  src="/next.svg"
                  alt="Next.js logo"
                  width={180}
                  height={38}
                  priority
               />
            </CardContent>
            <CardFooter className="flex justify-between">
               <Button variant="outline">Cancel</Button>
               <Button>Deploy</Button>
            </CardFooter>
         </Card>
      </div>
   )
}
