import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const studentsImport = createApi({
  reducerPath: 'studentsImport',
  baseQuery: fetchBaseQuery(({
    baseUrl: import.meta.env.VITE_BASE_URL
  })),
  endpoints: (build) => ({
    studentsImport: build.mutation({
      query: (body) => ({
        url: '/api/upload/arquivo',
        method: 'POST',
        body,
      })
    })
  })
})

export const { useStudentsImportMutation } = studentsImport