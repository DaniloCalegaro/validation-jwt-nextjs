import axios, { AxiosError, HeadersDefaults } from 'axios'
import { parseCookies, setCookie } from 'nookies'
import { signOut } from '../context/AuthContext'

type failedRequestQueueData = {
  onSuccess: (token: string) => void
  onFailure: (error: AxiosError) => void
}

let isRefreshing = false
let failedRequestQueue: failedRequestQueueData[] = []
export interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string
}

export function setupAPIClient(context = undefined) {
  let cookies = parseCookies(context)

  const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
      Authorization: `Bearer ${cookies['nextauth.token']}`
    }
  })

  // token refresh
  api.interceptors.response.use(
    response => {
      return response
    },
    error => {
      if (error.response?.status === 401) {
        if (error.response.data?.code === 'token.expired') {
          cookies = parseCookies(context)

          const { 'nextauth.refreshToken': refreshToken } = cookies
          const originalConfig = error.config

          if (!isRefreshing) {
            isRefreshing = true

            api
              .post('/refresh', {
                refreshToken
              })
              .then(response => {
                const { token } = response.data

                setCookie(context, 'nextauth.token', token, {
                  maxAge: 60 * 60 * 24 * 30, // 30 days
                  path: '/'
                })
                setCookie(
                  context,
                  'nextauth.refreshToken',
                  response.data.refreshToken,
                  {
                    maxAge: 60 * 60 * 24 * 30, // 30 days
                    path: '/'
                  }
                )

                api.defaults.headers = {
                  Authorization: `Bearer ${token}`
                } as CommonHeaderProperties

                failedRequestQueue.forEach(request => request.onSuccess(token))
                console.log(failedRequestQueue)
                failedRequestQueue = []
              })
              .catch(err => {
                failedRequestQueue.forEach(request => request.onFailure(err))
                failedRequestQueue = []

                if (process.browser) {
                  signOut()
                }
              })
              .finally(() => {
                isRefreshing = false
              })
          }

          return new Promise((resolve, reject) => {
            failedRequestQueue.push({
              onSuccess: token => {
                originalConfig.headers['Authorization'] = `Bearer ${token}`

                resolve(api(originalConfig))
              },
              onFailure: error => {
                reject(error)
              }
            })
          })
        } else {
          if (process.browser) {
            signOut()
          }
        }
      }

      return Promise.reject(error)
    }
  )

  return api
}
