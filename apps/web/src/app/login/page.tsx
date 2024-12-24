'use client'

import { Button } from '@repo/ui/components/ui/button'
import { Github } from 'lucide-react'
import { useRouter } from 'next/navigation'

const LoginPage = () => {
   const router = useRouter()
   const handleNavigate = () => {
      router.push('/')
   }
   return (
      <div className="flex min-h-screen items-center justify-center ">
         <div className="sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12 text-center">
               <h1 className="text-2xl font-bold text-gray-900">
                  Welcome to{' '}
                  <span className="text-indigo-600">syntaxia-open-stack</span>
               </h1>
               <h3 className="mt-4 text-lg text-gray-700">
                  Tech Stack Demonstrator
               </h3>
               <p className="mt-2 text-sm text-gray-500">
                  (Authentication coming soon!)
               </p>
               <Button
                  type="submit"
                  className="mt-6 w-full"
                  onClick={handleNavigate}
               >
                  Enter
               </Button>
               <p className="mt-4 text-sm text-gray-500">
                  Explore modern tools and architecture demos
               </p>
               {/* GitHub Link */}
               <div className="mt-8">
                  <a
                     href="https://github.com/syntaxia-baas/syntaxia-open-stack"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="flex items-center justify-center text-gray-700 hover:text-indigo-600 transition"
                  >
                     <Github className="mr-2 h-5 w-5" />
                     View on GitHub
                  </a>
               </div>
            </div>
         </div>
      </div>
   )
}
export default LoginPage
