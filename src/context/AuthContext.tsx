import { createContext, ReactNode, useEffect, useState } from 'react'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import Router from 'next/router'

import { CommonHeaderProperties } from '../services/api'
import { HeadersDefaults } from 'axios'
import { api } from '../services/apiClient'

type User = {
  email: string
  permissions: string[]
  roles: string[]
}

type SignInCredentials = {
  email: string
  password: string
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>
  user: User
  isAutenticated: boolean
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut() {
  destroyCookie(undefined, 'nextauth.token')
  destroyCookie(undefined, 'nextauth.refreshToken')

  Router.push('/')
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User)
  const isAutenticated = !!user

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies()

    if (token) {
      api
        .get('/me')
        .then(response => {
          const { email, permissions, roles } = response.data

          setUser({ email, permissions, roles })
        })
        .catch(() => {
          signOut()
        })
    }
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('sessions', {
        email,
        password
      })

      const { token, refreshToken, permissions, roles } = response.data

      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })
      setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })

      setUser({
        email,
        permissions,
        roles
      })

      api.defaults.headers = {
        Authorization: `Bearer ${token}`
      } as CommonHeaderProperties

      Router.push('/dashboard')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAutenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}
