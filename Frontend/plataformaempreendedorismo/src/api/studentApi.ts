import { createApi } from '@reduxjs/toolkit/query/react';
import { CreateStudent, Student, StudentsResponse } from '../model/student';
import { authFetchBaseQuery } from '../redux/auth.middleware';

export const studentsApiSlice = createApi({
  reducerPath: 'studentsApi',
  tagTypes: ['Student'],
  baseQuery: authFetchBaseQuery(import.meta.env.VITE_API_URL),
  endpoints: (build) => ({
    getStudent: build.query<Student, number>({
      query: (id) => `/alunos/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Student', id }],
    }),
    getAllStudents: build.query<StudentsResponse[], void>({
      query: () => `/alunos`,
      transformResponse: (response: StudentsResponse[]) => {
        return response.sort((a, b) => a.nome.localeCompare(b.nome))
      },
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }: any) => ({ type: 'Student', id } as const)),
            { type: 'Student', id: 'LIST' },
          ]
          : [{ type: 'Student', id: 'LIST' }],
    }),
    createStudent: build.mutation<CreateStudent, Partial<CreateStudent>>({
      query: (data) => ({
        url: `/alunos/cadastrar`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Student', id: 'LIST' }],
    }),
    updateStudent: build.mutation<CreateStudent, { id: any; data: Partial<CreateStudent> }>({
      query: ({ id, data }) => ({
        url: `/alunos/editar`,
        method: 'PUT',
        body: { id, ...data },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Student', id }],
    }),
    deleteStudent: build.mutation<void, string>({
      query: (id) => ({
        url: `/aluno/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Student', id }],
    }),
  }),
});

export const {
  useGetStudentQuery,
  useGetAllStudentsQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentsApiSlice;

// As TagTypes, providesTags, e invalidatesTags são usadas em RTK Query para facilitar o gerenciamento de cache de dados e invalidar dados quando necessário.Essas tags ajudam a garantir que os dados no cache sejam atualizados corretamente quando ações como criação, atualização ou exclusão de recursos ocorrem.Vamos explorar cada um desses conceitos com mais detalhes e exemplos.

// TagTypes define os tipos de tags que serão usados para identificar os dados no cache.Isso é útil para categorizar e organizar os dados de maneira que possam ser facilmente referenciados e invalidados.

//  providesTags é usado em endpoints de consulta(query) para associar tags aos dados retornados.Quando um endpoint fornece tags, ele sinaliza ao RTK Query que esses dados estão associados a essas tags específicas.

//  invalidatesTags é usado em endpoints de mutação(mutation) para especificar quais tags devem ser invalidadas quando a mutação ocorre.Quando uma tag é invalidada, o RTK Query sabe que precisa reexecutar as consultas associadas a essas tags para garantir que o cache esteja atualizado.

