import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const evaluatorsImport = createApi({
  reducerPath: 'evaluatorsImport',
  baseQuery: fetchBaseQuery(({
    baseUrl: 'http://localhost:8080'
  })),
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