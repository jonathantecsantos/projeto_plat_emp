import { createApi } from '@reduxjs/toolkit/query/react'
import { Team, TeamApiResponse } from '../model/team'
import { authFetchBaseQuery } from '../redux/auth.middleware'


export const teamApiSlice = createApi({
  reducerPath: 'teamApi',
  tagTypes: ['teamApi'],
  baseQuery: authFetchBaseQuery(import.meta.env.VITE_API_URL),
  endpoints: (build) => ({
    getTeamById: build.query<Team, any>({
      query: (id) => `equipes/${id}`,
      transformResponse: (response: TeamApiResponse): Team => ({
        nomeEquipe: response.nomeEquipe,
        alunos: response.alunos,
        professor: response.professor
      })
    }),
  }),
})

export const { useGetTeamByIdQuery } = teamApiSlice