import { createApi } from '@reduxjs/toolkit/query/react'
import { Team, TeamIdResponse } from '../model/team'
import { authFetchBaseQuery } from '../redux/auth.middleware'


export const teamApiSlice = createApi({
  reducerPath: 'teamApi',
  tagTypes: ['Team'],
  baseQuery: authFetchBaseQuery(import.meta.env.VITE_API_URL),
  endpoints: (build) => ({
    // getTeamById: build.query<TeamIdResponse, number>({
    //   query: (id) => `/equipes/${id}`,
    //   providesTags: (_result, _error, id) => [{ type: 'Team', id }],
    // }),
    getAllTeams: build.query<Team[], void>({
      query: () => '/equipes/listar',
      transformResponse: (response: Team[]) => {
        return response.sort((a, b) => a.nome.localeCompare(b.nome))
      },
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }: any) => ({ type: 'Team', id } as const)),
            { type: 'Team', id: 'LIST' },
          ]
          : [{ type: 'Team', id: 'LIST' }],
    }),
    updateTeam: build.mutation<Team, { id: any; data: Partial<Team> }>({
      query: ({ id, data }) => ({
        url: `/equipes/editar`,
        method: 'PUT',
        body: { id, ...data },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Team', id }],
    }),
  })
})

export const {
  // useGetTeamByIdQuery,
  useGetAllTeamsQuery,
  useUpdateTeamMutation
} = teamApiSlice