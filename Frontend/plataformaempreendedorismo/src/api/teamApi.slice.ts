import { createApi } from '@reduxjs/toolkit/query/react'
import { TeamIdResponse } from '../model/team'
import { authFetchBaseQuery } from '../redux/auth.middleware'


export const teamApiSlice = createApi({
  reducerPath: 'teamApi',
  tagTypes: ['teamApi'],
  baseQuery: authFetchBaseQuery(import.meta.env.VITE_API_URL),
  endpoints: (build) => ({
    getTeamById: build.query<TeamIdResponse, number>({
      query: (id) => `equipes/${id}`,
    }),
  }),
})

export const { useGetTeamByIdQuery } = teamApiSlice