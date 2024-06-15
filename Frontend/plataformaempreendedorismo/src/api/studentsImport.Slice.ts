import { createApi } from '@reduxjs/toolkit/query/react';
import { authFetchBaseQuery } from '../redux/auth.middleware';

export const studentsImport = createApi({
  reducerPath: 'studentsImport',
  baseQuery: authFetchBaseQuery(import.meta.env.VITE_BASE_URL),
  endpoints: (build) => ({
    studentsImport: build.mutation({
      query: (body) => ({
        url: '/api/upload/arquivo',
        method: 'POST',
        body,
      }),
    })
  }),
})


export const { useStudentsImportMutation } = studentsImport