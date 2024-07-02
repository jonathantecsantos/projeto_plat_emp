import { createApi } from '@reduxjs/toolkit/query/react';
import { authFetchBaseQuery } from '../redux/auth.middleware';

interface User {
  id: string;
  email: string;
  username: string;
  password?: string;
  tipoPerfil: string; // Profile type (ADMIN, ALUNO, PROFESSOR, AVALIADOR)
}
//todo: winnicius
export const userApiSlice = createApi({
  reducerPath: 'userApi',
  tagTypes: ['User'],
  baseQuery: authFetchBaseQuery(import.meta.env.VITE_API_URL),
  endpoints: (build) => ({
    updateUser: build.mutation<User, Partial<User>>({
      query: ({ id, ...patch }) => ({
        url: `api/v1/user/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'User', id }],
    }),
    fetchUser: build.query<User, string>({
      query: (id) => `api/v1/user${id}`,
      providesTags: (_result, _error, id) => [{ type: 'User', id },],
    }),
    deleteUser: build.mutation<void, string>({
      query: (id) => ({
        url: `api/v1/user/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'User', id }],
    }),
  }),
});

export const { useUpdateUserMutation, useFetchUserQuery, useDeleteUserMutation } = userApiSlice;
