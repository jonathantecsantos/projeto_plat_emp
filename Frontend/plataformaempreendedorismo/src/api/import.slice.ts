import { createApi } from '@reduxjs/toolkit/query/react'
import { authFetchBaseQuery } from '../redux/auth.middleware'

export const importApiSlice = createApi({
  reducerPath: 'importApi',
  baseQuery: authFetchBaseQuery(import.meta.env.VITE_API_URL),
  endpoints: (build) => ({
    uploadFile: build.mutation({
      query: (body) => ({
        url: '/api/upload/arquivo',
        method: 'POST',
        body,
      }),
    })
  })
})

export const { useUploadFileMutation } = importApiSlice