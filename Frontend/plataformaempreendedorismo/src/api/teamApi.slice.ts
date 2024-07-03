import { createApi } from '@reduxjs/toolkit/query/react'
import { authFetchBaseQuery } from '../redux/auth.middleware'
import { Team } from '../model/team';

export const teamApiSlice = createApi({
  reducerPath: 'teamApi',
  tagTypes: ['Team'],
  baseQuery: authFetchBaseQuery(import.meta.env.VITE_API_URL),
  endpoints: (build) => ({
    updateTeam: build.mutation<Team, { id: any; data: Partial<Team> }>({
      query: ({ id, ...patch }) => ({
        url: `api/v1/user/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Team', id }],
    }),
    getTeams: build.query<Team[], void>({
      query: () => `equipes`,
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }: any) => ({ type: 'Team', id } as const)),
            { type: 'Team', id: 'LIST' },
          ]
          : [{ type: 'Team', id: 'LIST' }],
    }),
    getTeam: build.query<Team, number>({
      query: (id) => `equipes/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Team', id },],
    }),
    createTeam: build.mutation<Team, Team>({
      query: (data) => ({
        url: `/api/v1/Team`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Team', id: 'LIST' }],
    }),
    deleteTeam: build.mutation<void, string>({
      query: (id) => ({
        url: `api/v1/user/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Team', id }],
    }),
  }),
})

export const {
  useGetTeamsQuery,
  useGetTeamQuery,
  useUpdateTeamMutation,
  useCreateTeamMutation,
  useDeleteTeamMutation }
  = teamApiSlice;
