import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Login, LoginResponse } from '../utils/types'

export const userApiSlice = createApi({
  reducerPath: 'userApi',
  tagTypes: ['Users'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  endpoints: (build) => ({
    userLogin: build.mutation<LoginResponse, Login>({
      query: (body) => ({
        url: `/auth`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Users'],
    }),
  }),
})

export const { useUserLoginMutation } = userApiSlice