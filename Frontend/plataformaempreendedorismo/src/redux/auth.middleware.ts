import { BaseQueryFn, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { store } from "./store"

export const authFetchBaseQuery = (
  baseUrl: string,
  prepareHeaders?: (headers: Headers) => Promise<void>
): BaseQueryFn<string | FetchArgs> => {
  return fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = store.getState().auth.token
      console.log('AuthMiddleware')

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      if (prepareHeaders) {
        return prepareHeaders(headers)
      }

      return headers
    },
  })
}