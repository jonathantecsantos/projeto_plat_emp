import { createApi } from '@reduxjs/toolkit/query/react'
import { CreateOrUpdateStudent, StudentIdResponse, StudentsResponse } from '../model/student'
import { TeamIdResponse } from '../model/team'
import { authFetchBaseQuery } from '../redux/auth.middleware'
import { CreateOrUpdateTeacher, TeacherIdResponse, TeachersResponse } from '../model/teacher'

//atualizar as configurações de api para incluir o teamApiSlice e tornar essa config unica
export const studentsApiSlice = createApi({
  reducerPath: 'studentsApi',
  tagTypes: ['Student', 'Team', 'Teacher'],
  baseQuery: authFetchBaseQuery(import.meta.env.VITE_API_URL),
  // baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (build) => ({
    getStudent: build.query<StudentIdResponse, number>({
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

    createStudent: build.mutation<CreateOrUpdateStudent, Partial<CreateOrUpdateStudent>>({
      query: (data) => ({
        url: `/alunos/cadastrar`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }: any) => [
        { type: 'Student', id: 'LIST' },
        { type: 'Team', id },
      ],
    }),

    updateStudent: build.mutation<CreateOrUpdateStudent, { id: any; data: Partial<CreateOrUpdateStudent> }>({
      query: ({ id, data }) => ({
        url: `/alunos/editar`,
        method: 'PUT',
        body: { id, ...data },
      }),
      invalidatesTags: (_result, _error, { id, data }: any) => [
        { type: 'Student', id },
        { type: 'Team', id: data.id },
      ],
    }),

    deleteStudent: build.mutation<void, any>({
      query: (id) => ({
        url: `/alunos/apagar/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Student', id },
        { type: 'Team', id }
      ],
    }),

    //TEAM ENDPOINTS -> Para o invalidatesTags falta adicionar o restante
    getTeamById: build.query<TeamIdResponse, number>({
      query: (id) => `/equipes/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Team', id }],
    }),


    //TEACHER ENDPOINTS
    getTeacher: build.query<TeacherIdResponse, number>({
      query: (id) => `/professores/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Teacher', id }],
    }),

    getTeachers: build.query<TeachersResponse[], void>({
      query: () => `/professores`,
      transformResponse: (response: TeachersResponse[]) => {
        return response.sort((a, b) => a.nome.localeCompare(b.nome))
      },
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }: any) => ({ type: 'Teacher', id } as const)),
            { type: 'Teacher', id: 'LIST' },
          ]
          : [{ type: 'Teacher', id: 'LIST' }],
    }),

    createTeacher: build.mutation<CreateOrUpdateTeacher, Partial<CreateOrUpdateTeacher>>({
      query: (data) => ({
        url: `/professores/cadastrar`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }: any) => [
        { type: 'Teacher', id: 'LIST' },
        { type: 'Team', id },
      ],
    }),

    updateTeacher: build.mutation<CreateOrUpdateTeacher, { id: any; data: Partial<CreateOrUpdateTeacher> }>({
      query: ({ id, data }) => ({
        url: `/professores/editar`,
        method: 'PUT',
        body: { id, ...data },
      }),
      invalidatesTags: (_result, _error, { id, data }: any) => [
        { type: 'Teacher', id },
        { type: 'Team', id: data.id },
      ],
    }),

    deleteTeacher: build.mutation<void, any>({
      query: (id) => ({
        url: `/professores/apagar/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Teacher', id },
        { type: 'Team', id }
      ],
    }),
  }),
})

export const {
  //Teams
  useGetTeamByIdQuery,

  //Students
  useGetStudentQuery,
  useGetAllStudentsQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,

  //Teachers
  useGetTeacherQuery,
  useGetTeachersQuery,
  useCreateTeacherMutation,
  useUpdateTeacherMutation,
  useDeleteTeacherMutation,

} = studentsApiSlice

// As TagTypes, providesTags, e invalidatesTags são usadas em RTK Query para facilitar o gerenciamento de cache de dados e invalidar dados quando necessário.Essas tags ajudam a garantir que os dados no cache sejam atualizados corretamente quando ações como criação, atualização ou exclusão de recursos ocorrem.Vamos explorar cada um desses conceitos com mais detalhes e exemplos.

// TagTypes define os tipos de tags que serão usados para identificar os dados no cache.Isso é útil para categorizar e organizar os dados de maneira que possam ser facilmente referenciados e invalidados.

//  providesTags é usado em endpoints de consulta(query) para associar tags aos dados retornados.Quando um endpoint fornece tags, ele sinaliza ao RTK Query que esses dados estão associados a essas tags específicas.

//  invalidatesTags é usado em endpoints de mutação(mutation) para especificar quais tags devem ser invalidadas quando a mutação ocorre.Quando uma tag é invalidada, o RTK Query sabe que precisa reexecutar as consultas associadas a essas tags para garantir que o cache esteja atualizado.

