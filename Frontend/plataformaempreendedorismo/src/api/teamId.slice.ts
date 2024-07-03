import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Team, TeamApiResponse } from '../model/team'


export const teamIdApiSlice = createApi({
  reducerPath: 'teamId',
  tagTypes: ['teamId'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
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

export const { useGetTeamByIdQuery } = teamIdApiSlice