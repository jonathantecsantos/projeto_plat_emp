import { BaseQueryFn, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { store } from './store'

const PUBLIC_ENDPOINTS = [
  /^\/ods$/,
  /^\/professores$/,
  /^\/instituicoes$/,
  /^\/atividades$/,
  /^\/inscricoes$/,
  /^\/eventos\/\d+\/validade$/,
  /^\/uploads\/.*/,
]

export const authFetchBaseQuery = (
  baseUrl: string,
  prepareHeaders?: (headers: Headers) => Promise<void>
): BaseQueryFn<string | FetchArgs> => {
  return async (args, api, extraOptions) => {
    const url = typeof args === 'string' ? args : args.url
    const cleanUrl = url.split('?')[0]
    const isPublic = PUBLIC_ENDPOINTS.some(endpoint => endpoint.test(cleanUrl))


    const baseQuery = fetchBaseQuery({
      baseUrl,
      prepareHeaders: (headers) => {
        if (!isPublic) {
          const token = store.getState().auth.token
          if (!token) {
            throw new Error('Token de autenticação não encontrado')
          }
          headers.set('Authorization', `Bearer ${token}`)
        }

        if (prepareHeaders) {
          return prepareHeaders(headers)
        }

        return headers
      },
      responseHandler: async (response) => {
        const text = await response.text()
        try {
          return JSON.parse(text)
        } catch {
          return text
        }
      }
    })

    return baseQuery(args, api, extraOptions)
  }
}