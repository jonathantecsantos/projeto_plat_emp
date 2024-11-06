import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Login, LoginResponse } from '../utils/types';



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


      // onQueryStarted: async (arg, { queryFulfilled, dispatch, getState }) => {
      onQueryStarted: async (queryFulfilled) => {
        try {
          const { login } = await queryFulfilled;
          // Executar ações no início da mutation ser bem sucedida
          console.log('onQueryStarted => Usuario logado com sucesso:', login);
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