import { createApi } from '@reduxjs/toolkit/query/react';
import { authFetchBaseQuery } from '../redux/auth.middleware';

export const teachersImport = createApi({
  reducerPath: 'teachersImport',
  baseQuery: authFetchBaseQuery(import.meta.env.VITE_BASE_URL),
  endpoints: (build) => ({
    teachersImport: build.mutation({
      query: (body) => ({
        url: '/api/upload/arquivo',
        method: 'POST',
        body,
      }),
    })
  }),
})


export const { useTeachersImportMutation } = teachersImport