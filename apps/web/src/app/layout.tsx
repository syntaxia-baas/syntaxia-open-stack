'use client'
import localFont from 'next/font/local'
import '@repo/ui/globals.css'
import '@xyflow/react/dist/style.css'
import { Provider } from 'react-redux'
import store from '../redux/store'
import { AuthProvider } from '@/providers/AuthProvider'
import { DiagramProvider } from '@/providers/DiagramProvider'

const geistSans = localFont({
   src: './fonts/GeistVF.woff',
   variable: '--font-geist-sans',
})
const geistMono = localFont({
   src: './fonts/GeistMonoVF.woff',
   variable: '--font-geist-mono',
})

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html lang="en">
         <body
            className={`${geistSans.variable} ${geistMono.variable} bg-gray-100`}
         >
            <Provider store={store}>
               <AuthProvider>{children}</AuthProvider>
            </Provider>
         </body>
      </html>
   )
}
