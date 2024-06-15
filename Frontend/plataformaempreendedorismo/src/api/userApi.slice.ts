import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Login, LoginResponse } from '../utils/types';



export const userApiSlice = createApi({
  reducerPath: 'userApi',
  tagTypes: ['UsersPost'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  endpoints: (build) => ({
    userLogin: build.mutation<LoginResponse, Login>({
      query: (body) => ({
        url: `/api/v1/auth/login`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['UsersPost'],

      transformResponse: (response: LoginResponse): LoginResponse => ({
        data: {
          username: response.data.username,
          token: response.data.token,
          userId: response.data.userId,
        },
        message: response.message
      }),


      // onQueryStarted: async (arg, { queryFulfilled, dispatch, getState }) => {
      onQueryStarted: async (queryFulfilled) => {
        try {
          const { username } = await queryFulfilled;
          // Executar ações no início da mutation ser bem sucedida
          console.log('onQueryStarted => Usuario logado com sucesso:', username);
          // Por exemplo, disparar uma ação Redux
          //chamar um loading
          //atualizar valores do cookie
          // dispatch({ type: 'user/addSuccess', payload: user });
        } catch (error) {
          console.error("Erro ao efetuar login:", error);
        }
      },      
    }),
  }),
})

export const { useUserLoginMutation } = userApiSlice