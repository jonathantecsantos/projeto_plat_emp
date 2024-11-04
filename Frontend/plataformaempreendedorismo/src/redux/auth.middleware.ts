import { BaseQueryFn, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { store } from './store'

export const authFetchBaseQuery = (
  baseUrl: string,
  prepareHeaders?: (headers: Headers) => Promise<void>
): BaseQueryFn<string | FetchArgs> => {
  return fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = store.getState().auth.token

      if (!token) {
        throw alert('Token de autenticação não encontrado, realize login novamente.')
      }

      headers.set('Authorization', `Bearer ${token}`)

      if (prepareHeaders) {
        return prepareHeaders(headers)
      }

      return headers
    },

    // ResponseHandler utilizado para correção deste erro no front
    // {
    //   "status": "PARSING_ERROR",
    //   "originalStatus": 201,
    //   "data": "Aluno cadastrado com sucesso!",
    //   "error": "SyntaxError: Unexpected token 'A', \"Aluno cada\"... is not valid JSON"
    // }
    responseHandler: async (response) => {
      const text = await response.text();
      try {
        return JSON.parse(text);
      } catch {
        return text;
      }
    },
  })
}