import { createApi } from '@reduxjs/toolkit/query/react'
import { Banner } from '../model/banner'
import { Evaluation, EvaluationById, EvaluationData, TeamEvaluation, TeamEvaluationResponse } from '../model/evaluationFormat'
import { CreateOrUpdateStudent, StudentIdResponse, StudentsResponse } from '../model/student'
import { CreateOrUpdateTeacher, TeacherIdResponse, TeachersResponse } from '../model/teacher'
import { TeamIdResponse, TeamsResponse, UpdateTeam } from '../model/team'
import { authFetchBaseQuery } from '../redux/auth.middleware'
import { Ods } from '../model/ods'
import { TeamPrototypeById } from '../model/prototyping'
import { ItensRelatorio, RelatorioGeral, ReportClassification, ReportClassificationByFormat, ReportTeamId } from '../model/reports'


export const studentsApiSlice = createApi({
  reducerPath: 'studentsApi',
  tagTypes: ['Student', 'Team', 'Teacher', 'Banner', 'Evaluation', 'importApi', 'Ods', 'Prototype', 'Report'],
  baseQuery: authFetchBaseQuery(import.meta.env.VITE_API_URL),
  // baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),

  endpoints: (build) => ({

    //IMPORTS
    uploadFile: build.mutation({
      query: (body) => ({
        url: '/api/upload/arquivo',
        method: 'POST',
        body,
      }),
      invalidatesTags: (_result, _error) => [
        { type: 'Student', id: 'LIST' },
        { type: 'Teacher', id: 'LIST' },
        { type: 'Team', id: 'teamById' },
      ],
    }),

    //STUDENT
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

    //TEAM -
    getTeamById: build.query<TeamIdResponse, number>({
      query: (id) => `/equipes/${id}`,
      providesTags: (result, _error, id) => [
        { type: 'Team', id },
        { type: 'Team', id: 'teamById' },
        { type: 'Team', id: result?.nomeEquipe }],
    }),

    getAllTeams: build.query<TeamsResponse[], void>({
      query: () => '/equipes',
      transformResponse: (response: TeamsResponse[]) => {
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

    updateTeam: build.mutation<UpdateTeam, { id: any; data: Partial<UpdateTeam> }>({
      query: ({ id, data }) => ({
        url: `/equipes/editar`,
        method: 'PUT',
        body: { id, ...data },
      }),
      invalidatesTags: (_result, _error, { id, }: any) => [
        { type: 'Team', id },
      ],
    }),



    //ODS
    getOds: build.query<Ods[], void>({
      query: () => '/ods',
      transformResponse: (response: Ods[]) => {
        return response.sort((a, b) => a.codigo.localeCompare(b.codigo))
      },
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }: any) => ({ type: 'Ods', id } as const)),
            { type: 'Ods', id: 'LIST' },
          ]
          : [{ type: 'Ods', id: 'LIST' }],
    }),


    //TEACHER 
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

    //BANNER
    getBannerById: build.query<Banner, number>({
      query: (id) => `/banner/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Banner', id }],
    }),

    createBanner: build.mutation<void, FormData>({
      query: (data) => ({
        url: `/banner/cadastrar`,
        method: 'POST',
        body: data,
      }),
      //invalidar a tag de banner por id
      // invalidatesTags: [{ type: 'Banner', id: 'LIST' }],
    }),

    updateBanner: build.mutation<FormData, { id: number; data: FormData }>({
      query: ({ data }) => ({
        url: `/banner/editar`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Banner', id }],
    }),

    //EVALUATION
    getEvaluationById: build.query<EvaluationById, number>({
      query: (id) => `/avaliacoes/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Evaluation', id }],
    }),

    getEvaluationData: build.query<EvaluationData[], { idFormatoAvaliacao: number, idAvaliador: number, idEquipe: number }>({
      query: ({ idFormatoAvaliacao, idAvaliador, idEquipe }) =>
        `/avaliacoes/formato/${idFormatoAvaliacao}/avaliador/${idAvaliador}/equipe/${idEquipe}`,
      providesTags: (_result, _error, { idFormatoAvaliacao, idAvaliador, idEquipe }) => [
        { type: 'Evaluation', id: `LIST_${idFormatoAvaliacao}_${idAvaliador}_${idEquipe}` },
      ]
    }),

    postEvaluation: build.mutation<void, { data: Evaluation[], evaluationTypeId?: any, idFormatoAvaliacao?: number, idAvaliador?: number, idEquipe?: number }>({
      query: ({ data }) => ({
        url: `/avaliacoes`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (_result, _error, { evaluationTypeId, idAvaliador, idEquipe, idFormatoAvaliacao }) => [
        { type: 'Evaluation', id: `LIST_${evaluationTypeId}` }, // Invalida apenas o evaluationTypeId correspondente
        { type: 'Evaluation', id: `LIST_${idFormatoAvaliacao}_${idAvaliador}_${idEquipe}` },
        { type: 'Report', id: `LIST` },
      ],
    }),

    putEvaluation: build.mutation<void, { data: Evaluation[], evaluationTypeId?: any, idFormatoAvaliacao?: number, idAvaliador?: number, idEquipe?: number }>({
      query: ({ data }) => ({
        url: `/avaliacoes/editar`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { evaluationTypeId, idAvaliador, idEquipe, idFormatoAvaliacao }) => [
        { type: 'Evaluation', id: `LIST_${evaluationTypeId}` }, // Invalida apenas o evaluationTypeId correspondente
        { type: 'Evaluation', id: `LIST_${idFormatoAvaliacao}_${idAvaliador}_${idEquipe}` }, // Invalida o cache específico do getEvaluationData
        { type: 'Report', id: `LIST` },
      ],
    }),

    getTeamsEvaluations: build.query<TeamEvaluationResponse[], TeamEvaluation>({
      query: ({ evaluationTypeId, evaluatorId }) => `/avaliacoes/equipes?idTipoAvaliacao=${evaluationTypeId}&idAvaliador=${evaluatorId}`,
      transformResponse: (response: TeamEvaluationResponse[]) => {
        return response.sort((a, b) => a.nome.localeCompare(b.nome))
      },
      providesTags: (result, _error, { evaluationTypeId }) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Evaluation', id } as const)),
            { type: 'Evaluation', id: `LIST_${evaluationTypeId}` },
          ]
          : [{ type: 'Evaluation', id: `LIST_${evaluationTypeId}` }],
    }),

    //PROTOTYPE
    getTeamPrototypingById: build.query<TeamPrototypeById, number>({
      query: (id) => `/prototipo/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Prototype', id }],
    }),


    createTeamPrototyping: build.mutation<void, FormData>({
      query: (data) => ({
        url: `/prototipo/cadastrar`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ({ id }: any) => [{ type: 'Prototype', id, }]
    }),

    updateTeamPrototyping: build.mutation<FormData, { id: number; data: FormData }>({
      query: ({ data }) => ({
        url: `/prototipo/editar`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Prototype', id }],
    }),

    //REPORTS
    getTeamsReports: build.query<RelatorioGeral[], void>({
      query: () => `/relatorios/relatorio-geral`,
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ equipe }) => ({ type: 'Report', equipe } as const)),
            { type: 'Report', id: `LIST` },
          ]
          : [{ type: 'Report', id: `LIST` }],
    }),

    getTeamsReportItems: build.query<ItensRelatorio[], void>({
      query: () => `/relatorios/itens-relatorio`,
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ idSubcriterio }) => ({ type: 'Report', id: idSubcriterio } as const)),
            { type: 'Report', id: `LIST` },
          ]
          : [{ type: 'Report', id: `LIST` }],
    }),

    getTeamReport: build.query<ReportTeamId[], number>({
      query: (idEquipe) => `/relatorios/notas-equipe/${idEquipe}`,
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ equipe }) => ({ type: 'Report', equipe } as const)),
            { type: 'Report', id: `LIST` },
          ]
          : [{ type: 'Report', id: `LIST` }],
    }),

    getTeamClassification: build.query<ReportClassification[], void>({
      query: () => `/relatorios/classificacao`,
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ equipe }) => ({ type: 'Report', equipe } as const)),
            { type: 'Report', id: `LIST` },
          ]
          : [{ type: 'Report', id: `LIST` }],
    }),

    getTeamReportClassificationByFormat: build.query<ReportClassificationByFormat[], number>({
      query: (idFormatoAvaliacao) => `/relatorios/classificacao-por-formato/${idFormatoAvaliacao}`,
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ equipe }) => ({ type: 'Report', equipe } as const)),
            { type: 'Report', id: `LIST` },
          ]
          : [{ type: 'Report', id: `LIST` }],
    })

  }),
})

export const {
  //Imports
  useUploadFileMutation,

  //Students
  useGetStudentQuery,
  useGetAllStudentsQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,

  //Teams
  useGetTeamByIdQuery,
  useGetAllTeamsQuery,
  useUpdateTeamMutation,

  //Ods
  useGetOdsQuery,

  //Teachers
  useGetTeacherQuery,
  useGetTeachersQuery,
  useCreateTeacherMutation,
  useUpdateTeacherMutation,
  useDeleteTeacherMutation,

  //Banner
  useGetBannerByIdQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,

  //Evaluations
  useGetEvaluationByIdQuery,
  useGetTeamsEvaluationsQuery,
  usePostEvaluationMutation,
  usePutEvaluationMutation,
  useGetEvaluationDataQuery,

  //PROTOTYPE
  useCreateTeamPrototypingMutation,
  useGetTeamPrototypingByIdQuery,
  useUpdateTeamPrototypingMutation,

  //REPORTS
  useGetTeamsReportsQuery,
  useGetTeamsReportItemsQuery,
  useGetTeamReportQuery,
  useGetTeamClassificationQuery,
  useGetTeamReportClassificationByFormatQuery,

} = studentsApiSlice

// As TagTypes, providesTags, e invalidatesTags são usadas em RTK Query para facilitar o gerenciamento de cache de dados e invalidar dados quando necessário.Essas tags ajudam a garantir que os dados no cache sejam atualizados corretamente quando ações como criação, atualização ou exclusão de recursos ocorrem.Vamos explorar cada um desses conceitos com mais detalhes e exemplos.

// TagTypes define os tipos de tags que serão usados para identificar os dados no cache.Isso é útil para categorizar e organizar os dados de maneira que possam ser facilmente referenciados e invalidados.

//  providesTags é usado em endpoints de consulta(query) para associar tags aos dados retornados.Quando um endpoint fornece tags, ele sinaliza ao RTK Query que esses dados estão associados a essas tags específicas.

//  invalidatesTags é usado em endpoints de mutação(mutation) para especificar quais tags devem ser invalidadas quando a mutação ocorre.Quando uma tag é invalidada, o RTK Query sabe que precisa reexecutar as consultas associadas a essas tags para garantir que o cache esteja atualizado.

