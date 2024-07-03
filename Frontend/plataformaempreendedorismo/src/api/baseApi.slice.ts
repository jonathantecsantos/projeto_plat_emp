import { createApi } from '@reduxjs/toolkit/query/react';
import { authFetchBaseQuery } from '../redux/auth.middleware';

export const baseApiSlice = <T>(entity: string) => {
  return createApi({
    reducerPath: `${entity}Api`,
    baseQuery: authFetchBaseQuery(import.meta.env.VITE_API_URL),
    tagTypes: [entity],
    endpoints: (build) => ({
      get: build.query<T, any>({
        query: (id) => `/${entity}/${id}`,
        providesTags: (_result, _error, id) => [{ type: entity, id }],
      }),
      getAll: build.query<T[], void>({
        query: () => `/${entity}`,
        providesTags: (result) =>
          result
            ? [
              ...result.map(({ id }: any) => ({ type: entity, id } as const)),
              { type: entity, id: 'LIST' },
            ]
            : [{ type: entity, id: 'LIST' }],
      }),
      create: build.mutation<T, Partial<T>>({
        query: (data) => ({
          url: `/${entity}`,
          method: 'POST',
          body: data,
        }),
        invalidatesTags: [{ type: entity, id: 'LIST' }],
      }),
      update: build.mutation<T, { id: any; data: Partial<T> }>({
        query: ({ id, data }) => ({
          url: `/${entity}/${id}`,
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: (_result, _error, { id }) => [{ type: entity, id }],
      }),
      delete: build.mutation<void, any>({
        query: (id) => ({
          url: `/${entity}/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: (_result, _error, id) => [{ type: entity, id }],
      }),
    }),
  });
};