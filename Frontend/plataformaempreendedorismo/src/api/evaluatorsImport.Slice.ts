import { createApi } from '@reduxjs/toolkit/query/react'
import { authFetchBaseQuery } from '../redux/auth.middleware'

export const evaluatorsImport = createApi({
  reducerPath: 'evaluatorsImport',
  baseQuery: authFetchBaseQuery(import.meta.env.VITE_BASE_URL),
  endpoints: (build) => ({
    evaluatorsImport: build.mutation({
      query: (body) => ({
        url: '/api/upload/arquivo',
        method: 'POST',
        body,
      })
    })
  })
})

export const { useEvaluatorsImportMutation } = evaluatorsImport