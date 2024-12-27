'use client'
import { UserName } from '@shared/types/common'
import React, { createContext, useContext, useState, ReactNode } from 'react'

// Define the structure of the AuthContext
interface AuthContextType {
   isAuthenticated: boolean
   userName: UserName
   login: () => void
   logout: () => void
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined)

const validUsername = 'syntaxia-user2' as UserName
// AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
   const [isAuthenticated, setIsAuthenticated] = useState(false)
   const [username, setUsername] = useState<UserName | undefined>(validUsername)

   const login = () => {
      // Set your constant username
      setIsAuthenticated(true)
      setUsername(validUsername)
   }

   const logout = () => {
      setIsAuthenticated(false)
      setUsername(undefined)
   }
   if (!username) {
      throw new Error('AuthProvider requires a username')
   }

   return (
      <AuthContext.Provider
         value={{ isAuthenticated, userName: username, login, logout }}
      >
         {children}
      </AuthContext.Provider>
   )
}

// Custom hook to use the AuthContext
export const useAuth = () => {
   const context = useContext(AuthContext)
   if (!context) {
      throw new Error('useAuth must be used within an AuthProvider')
   }
   return context
}
