import { createApi } from '@reduxjs/toolkit/query/react'
import { Banner } from '../model/banner'
import { Coordinator } from '../model/coordinators'
import { Evaluation, EvaluationById, EvaluationData, TeamEvaluation, TeamEvaluationResponse } from '../model/evaluationFormat'
import { Evaluator } from '../model/evaluator'
import { Ods } from '../model/ods'
import { TeamPrototypeById } from '../model/prototyping'
import { ItensRelatorio, RelatorioGeral, ReportClassification, ReportClassificationByFormat, ReportTeamId } from '../model/reports'
import { CreateOrUpdateStudent, StudentIdResponse, StudentsResponse, } from '../model/student'
import { CreateOrUpdateTeacher, TeacherIdResponse, TeachersResponse } from '../model/teacher'
import { TeamIdResponse, TeamsResponse, UpdateTeam } from '../model/team'
import { PasswordResetRequest, PasswordResetResponse, UserSettings } from '../model/user'
import { authFetchBaseQuery } from '../redux/auth.middleware'
import { EvaluationTypes } from '../utils/types'
import { EventConfig } from '../model/config'


export const studentsApiSlice = createApi({
  reducerPath: 'studentsApi',
  tagTypes: ['Student', 'Team', 'Teacher', 'Banner', 'Evaluation', 'importApi', 'Ods', 'Prototype', 'Report', 'Evaluator', 'Coordinator', 'Events',],
  baseQuery: authFetchBaseQuery(import.meta.env.VITE_API_URL),
  // baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),

  endpoints: (build) => ({

    //USERS
    passwordUserReset: build.mutation<UserSettings, Partial<UserSettings>>({
      query: (data) => ({
        url: `/auth/redefinir-senha`,
        method: 'POST',
        body: data,
      }),
    }),
    passwordReset: build.mutation<PasswordResetResponse, Partial<PasswordResetRequest>>({
      query: (data) => ({
        url: `/auth/resetar-senha`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }: any) => [
        { type: 'Student', id: 'LIST' },
        { type: 'Teacher', id: 'LIST' },
        { type: 'Team', id },
      ],
    }),
    
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
    
    //CONFIGS
    createEvent: build.mutation<void, EventConfig>({
      query: (data) => ({
        url: "/eventos",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }: any) => [
        { type: 'Events', id },
      ],
    }),

    getEventById: build.query<EventConfig, number>({
      query: (id) => `eventos/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Events', id }],
    }),

    getEventValidateById: build.query<boolean, number>({
      query: (id) => `eventos/${id}/validade`,
      providesTags: (_result, _error, id) => [{ type: 'Events', id }],
    }),

    updateEvent: build.mutation<void, { id: number; data: EventConfig }>({
      query: ({ id, data }) => ({
        url: `eventos/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Events', id },
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

    //COORDINATORS
    getCoordinator: build.query<Coordinator, number>({
      query: (id) => `/coordenadores/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Coordinator', id }],
    }),

    getCoordinators: build.query<Coordinator[], void>({
      query: () => `/coordenadores`,
      transformResponse: (response: Coordinator[]) => {
        return response.sort((a, b) => a.nome.localeCompare(b.nome))
      },
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }: any) => ({ type: 'Coordinator', id } as const)),
            { type: 'Coordinator', id: 'LIST' },
          ]
          : [{ type: 'Coordinator', id: 'LIST' }],
    }),

    createCoordinator: build.mutation<Coordinator, Partial<Coordinator>>({
      query: (data) => ({
        url: `/coordenadores/cadastrar`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }: any) => [
        { type: 'Coordinator', id: 'LIST' },
        { type: 'Coordinator', id },
      ],
    }),

    updateCoordinator: build.mutation<Coordinator, { id: any; data: Partial<Coordinator> }>({
      query: ({ id, data }) => ({
        url: `/coordenadores/editar`,
        method: 'PUT',
        body: { id, ...data },
      }),
      invalidatesTags: (_result, _error, { id, data }: any) => [
        { type: 'Coordinator', id },
        { type: 'Coordinator', id: data.id },
      ],
    }),

    deleteCoordinator: build.mutation<void, any>({
      query: (id) => ({
        url: `/coordenadores/apagar/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Coordinator', id },
        { type: 'Coordinator', id: 'LIST' }
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
      invalidatesTags: (_result, _error, ) => [{ type: 'Banner' }],
    }),

    updateBanner: build.mutation<FormData, { id: number; data: FormData }>({
      query: ({ data }) => ({
        url: `/banner/editar`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Banner', id }],
    }),

    //EVALUATOR
    getEvaluationTypes: build.query<EvaluationTypes[], void>({
      query: () => `/avaliacoes/formatos`,
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }: any) => ({ type: 'Evaluation', id } as const)),
            { type: 'Evaluation', id: 'LIST' },
          ]
          : [{ type: 'Evaluation', id: 'LIST' }],
    }),

    updateEvaluator: build.mutation<Evaluator, { id: any; data: Partial<Evaluator> }>({
      query: ({ id, data }) => ({
        url: `/avaliadores/editar`,
        method: 'PUT',
        body: { id, ...data },
      }),
      invalidatesTags: (_result, _error, { id }: any) => [
        { type: 'Evaluator', id },
        { type: 'Evaluator', id: 'LIST' },
      ],
    }),

    createEvaluator: build.mutation<Evaluator, Partial<Evaluator>>({
      query: (data) => ({
        url: `/avaliadores/cadastrar`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }: any) => [
        { type: 'Evaluator', id: 'LIST' },
        { type: 'Evaluator', id },
      ],
    }),

    getEvaluators: build.query<Evaluator[], void>({
      query: () => `/avaliadores`,
      transformResponse: (response: Evaluator[]) => {
        return response.sort((a, b) => a.nome.localeCompare(b.nome))
      },
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }: any) => ({ type: 'Evaluator', id } as const)),
            { type: 'Evaluator', id: 'LIST' },
          ]
          : [{ type: 'Evaluator', id: 'LIST' }],
    }),

    getEvaluatorById: build.query<Evaluator, number>({
      query: (id) => `/avaliadores/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Evaluator', id }],
    }),

    deleteEvaluator: build.mutation<void, any>({
      query: (id) => ({
        url: `/avaliadores/apagar/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Evaluator', id },
        { type: 'Evaluator', id: 'LIST' },
      ],
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
  //Users
  usePasswordUserResetMutation,
  usePasswordResetMutation,

  //Imports
  useUploadFileMutation,
  
  //Events
  useCreateEventMutation,
  useGetEventByIdQuery,
  useUpdateEventMutation,
  useGetEventValidateByIdQuery,

  //Students
  useGetStudentQuery,
  useGetAllStudentsQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,

  //Coordinators
  useCreateCoordinatorMutation,
  useGetCoordinatorsQuery,
  useGetCoordinatorQuery,
  useUpdateCoordinatorMutation,
  useDeleteCoordinatorMutation,

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

  //Evaluators
  useGetEvaluationTypesQuery,
  useUpdateEvaluatorMutation,
  useCreateEvaluatorMutation,
  useGetEvaluatorsQuery,
  useGetEvaluatorByIdQuery,
  useDeleteEvaluatorMutation,

  //Evaluations
  useGetEvaluationByIdQuery,
  useGetTeamsEvaluationsQuery,
  usePostEvaluationMutation,
  usePutEvaluationMutation,
  useGetEvaluationDataQuery,

  //Prototype
  useCreateTeamPrototypingMutation,
  useGetTeamPrototypingByIdQuery,
  useUpdateTeamPrototypingMutation,

  //Reports
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

