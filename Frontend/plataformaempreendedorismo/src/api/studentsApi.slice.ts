import { createApi } from '@reduxjs/toolkit/query/react'
import { authFetchBaseQuery } from '../redux/auth.middleware'
import { Student } from '../model/student'

export const studentsApiSlice = createApi({
  reducerPath: 'studentsApi',
  tagTypes: ['Student'],
  baseQuery: authFetchBaseQuery(import.meta.env.VITE_API_URL),
  endpoints: (build) => ({
    updateStudent: build.mutation<Student, { id: any; data: Partial<Student> }>({
      query: ({ id, ...patch }) => ({
        url: `api/v1/user/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Student', id }],
    }),
    getStudents: build.query<Student[], void>({
      query: () => `alunos`,
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }: any) => ({ type: 'Student', id } as const)),
            { type: 'Student', id: 'LIST' },
          ]
          : [{ type: 'Student', id: 'LIST' }],
    }),
    getStudent: build.query<Student, string>({
      query: (id) => `api/v1/user${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Student', id },],
    }),
    createStudent: build.mutation<Student, Student>({
      query: (data) => ({
        url: `/api/v1/student`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Student', id: 'LIST' }],
    }),
    deleteStudent: build.mutation<void, string>({
      query: (id) => ({
        url: `api/v1/user/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Student', id }],
    }),
  }),
})

export const {
  useGetStudentsQuery,
  useGetStudentQuery,
  useUpdateStudentMutation,
  useCreateStudentMutation,
  useDeleteStudentMutation }
  = studentsApiSlice;
