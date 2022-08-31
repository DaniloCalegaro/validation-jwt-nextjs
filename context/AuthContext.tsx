import { createContext, ReactNode } from 'react'

type SignInCredentials = {
  email: string
  password: string
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>
  isAutenticated: boolean
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const isAutenticated = false

  async function signIn({ email, password }: SignInCredentials) {
    console.log({ email, password })
  }

  return (
    <AuthContext.Provider value={{ signIn, isAutenticated }}>
      {children}
    </AuthContext.Provider>
  )
}
