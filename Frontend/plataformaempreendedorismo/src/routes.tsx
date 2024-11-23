import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './admin/components/common/protectedRoute'
import { RoutesNames } from './globals'
import { AdminHomePage } from './pages/adminHome'
import { BannerPage } from './pages/banner'
import { BannerPreviewPage } from './pages/bannerPreview'
import { ClassificationPage } from './pages/classification'
import { DljClassificationPage } from './pages/classificationDlj'
import { ExpoDleiClassificationPage } from './pages/classificationExpoDlei'
import { PitchClassificationPage } from './pages/classificationPitch'
import { SharkTankClassificationPage } from './pages/classificationSharkTank'
import { CompanyDetailsPage } from './pages/companyDetails'
import { ContactPage } from './pages/contact'
import { DLJEvaluationPage } from './pages/dljTeamEvaluation'
import { DLJPage } from './pages/dljTeams'
import { ExpoDleiEvaluationPage } from './pages/expoDleiTeamEvaluation'
import { ExpoDleiPage } from './pages/expoDleiTeams'
import { GeneralReportPage } from './pages/generalReport'
import { LoginPage } from './pages/login'
import { PitchEvaluationPage } from './pages/pitchTeamEvaluation'
import { PitchPage } from './pages/pitchTeams'
import { RepositoryPage } from './pages/repository'
import { SharkTankEvaluationPage } from './pages/sharkTankTeamEvaluation'
import { SharkTankPage } from './pages/sharkTankTeams'
import { StudentPage } from './pages/student'
import { StudentsDetailsPage } from './pages/students'
import { StudentSettingsPage } from './pages/studentSettings'
import { TeacherPage } from './pages/teacher'
import { TeachersPage } from './pages/teachers'
import { TeamPage } from './pages/team'
import { TeamNotesPage } from './pages/teamNotes'
import { TeamPrototypingPage } from './pages/teamPrototyping'
import { TeamsPage } from './pages/teams'
import { TeamsNotesPage } from './pages/teamsNotes'
import { UploadFilesPage } from './pages/uploadFiles'
import { Roles } from './utils/types'
import { EvaluatorsPage } from './pages/evaluators'
import { EvaluatorPage } from './pages/evaluator'

export const router = createBrowserRouter([
  {
    path: RoutesNames.home,
    element: <LoginPage />,
  },
  {
    path: RoutesNames.login,
    element: <LoginPage />,
  },
  {
    path: RoutesNames.companyDetails,
    element: <CompanyDetailsPage />,
  },
  {
    path: RoutesNames.repository,
    element: <RepositoryPage />
  },
  {
    path: RoutesNames.contact,
    element: <ContactPage />
  },
  {
    path: RoutesNames.bannerPreview,
    element: <ProtectedRoute children={<BannerPreviewPage />} allowedRoles={[Roles.Admin, Roles.Professor, Roles.Aluno, Roles.Avaliador, Roles.Coordenador]} />,
  },
  {
    path: RoutesNames.uploadFiles,
    element: <ProtectedRoute children={<UploadFilesPage />} allowedRoles={[Roles.Admin, Roles.Professor, Roles.Aluno, Roles.Avaliador, Roles.Coordenador]} />,
  },
  {
    path: RoutesNames.students,
    element: <ProtectedRoute children={<StudentsDetailsPage />} allowedRoles={[Roles.Admin, Roles.Professor, Roles.Aluno, Roles.Avaliador, Roles.Coordenador]} />,
  },
  {
    path: RoutesNames.student,
    element: <ProtectedRoute children={<StudentPage />} allowedRoles={[Roles.Admin, Roles.Professor, Roles.Aluno, Roles.Avaliador, Roles.Coordenador]} />
  },
  {
    path: RoutesNames.settings,
    element: <ProtectedRoute children={<StudentSettingsPage />} allowedRoles={[Roles.Admin, Roles.Professor, Roles.Aluno, Roles.Avaliador, Roles.Coordenador]} />
  },
  {
    path: RoutesNames.adminHome,
    element: <ProtectedRoute children={<AdminHomePage />} allowedRoles={[Roles.Admin, Roles.Professor, Roles.Aluno, Roles.Avaliador, Roles.Coordenador]} />
  },
  {
    path: RoutesNames.teachers,
    element: <ProtectedRoute children={<TeachersPage />} allowedRoles={[Roles.Admin, Roles.Professor, Roles.Aluno, Roles.Avaliador, Roles.Coordenador]} />,
  },
  {
    path: RoutesNames.teacher,
    element: <ProtectedRoute children={<TeacherPage />} allowedRoles={[Roles.Admin, Roles.Professor, Roles.Aluno, Roles.Avaliador, Roles.Coordenador]} />
  },
  {
    path: RoutesNames.evaluators,
    element: <ProtectedRoute children={<EvaluatorsPage />} allowedRoles={[Roles.Admin, Roles.Professor, Roles.Aluno, Roles.Avaliador, Roles.Coordenador]} />,
  },
  {
    path: RoutesNames.evaluator,
    element: <ProtectedRoute children={<EvaluatorPage />} allowedRoles={[Roles.Admin, Roles.Professor, Roles.Aluno, Roles.Avaliador, Roles.Coordenador]} />,
  },
  {
    path: RoutesNames.teams,
    element: <ProtectedRoute children={<TeamsPage />} allowedRoles={[Roles.Admin, Roles.Professor, Roles.Aluno, Roles.Avaliador, Roles.Coordenador]} />
  },
  {
    path: RoutesNames.team,
    element: <ProtectedRoute children={<TeamPage />} allowedRoles={[Roles.Admin, Roles.Professor, Roles.Aluno, Roles.Avaliador, Roles.Coordenador]} />
  },
  {
    path: RoutesNames.banner,
    element: <ProtectedRoute children={<BannerPage />} allowedRoles={[Roles.Admin, Roles.Professor, Roles.Aluno, Roles.Avaliador, Roles.Coordenador]} />
  },
  {
    path: RoutesNames.dljTeams,
    element: <ProtectedRoute children={<DLJPage />} allowedRoles={[Roles.Admin, Roles.Professor, Roles.Aluno, Roles.Avaliador, Roles.Coordenador]} />
  },
  {
    path: RoutesNames.dljTeam,
    element: <ProtectedRoute children={<DLJEvaluationPage />} allowedRoles={[Roles.Admin, Roles.Professor, Roles.Aluno, Roles.Avaliador, Roles.Coordenador]} />
  },
  {
    path: RoutesNames.pitchTeams,
    element: <ProtectedRoute children={<PitchPage />} allowedRoles={[Roles.Admin, Roles.Professor, Roles.Aluno, Roles.Avaliador, Roles.Coordenador]} />
  },
  {
    path: RoutesNames.pitchTeam,
    element: <ProtectedRoute children={<PitchEvaluationPage />} allowedRoles={[Roles.Admin, Roles.Professor, Roles.Aluno, Roles.Avaliador, Roles.Coordenador]} />
  },
  {
    path: RoutesNames.sharkTankTeams,
    element: <ProtectedRoute children={<SharkTankPage />} allowedRoles={[Roles.Admin, Roles.Professor, Roles.Aluno, Roles.Avaliador, Roles.Coordenador]} />
  },
  {
    path: RoutesNames.sharkTankTeam,
    element: <ProtectedRoute children={<SharkTankEvaluationPage />} allowedRoles={[Roles.Admin, Roles.Professor, Roles.Aluno, Roles.Avaliador, Roles.Coordenador]} />
  },
  {
    path: RoutesNames.expoDleiTeams,
    element: <ProtectedRoute children={<ExpoDleiPage />} allowedRoles={[Roles.Admin, Roles.Professor, Roles.Aluno, Roles.Avaliador, Roles.Coordenador]} />
  },
  {
    path: RoutesNames.expoDleiTeam,
    element: <ProtectedRoute children={<ExpoDleiEvaluationPage />} allowedRoles={[Roles.Admin, Roles.Professor, Roles.Aluno, Roles.Avaliador, Roles.Coordenador]} />
  },
  {
    path: RoutesNames.prototyping,
    element: <ProtectedRoute children={<TeamPrototypingPage />} allowedRoles={[Roles.Admin, Roles.Professor, Roles.Aluno, Roles.Avaliador, Roles.Coordenador]} />
  },
  {
    path: RoutesNames.classification,
    element: <ProtectedRoute children={<ClassificationPage />} allowedRoles={[Roles.Admin, Roles.Professor, Roles.Aluno, Roles.Avaliador, Roles.Coordenador]} />
  },
  {
    path: RoutesNames.classificationDljTeams,
    element: <ProtectedRoute children={<DljClassificationPage />} allowedRoles={[Roles.Admin, Roles.Professor, Roles.Aluno, Roles.Avaliador, Roles.Coordenador]} />
  },
  {
    path: RoutesNames.classificationPitch,
    element: <ProtectedRoute children={<PitchClassificationPage />} allowedRoles={[Roles.Admin, Roles.Professor, Roles.Aluno, Roles.Avaliador, Roles.Coordenador]} />
  },
  {
    path: RoutesNames.classificationSharkTank,
    element: <ProtectedRoute children={<SharkTankClassificationPage />} allowedRoles={[Roles.Admin, Roles.Professor, Roles.Aluno, Roles.Avaliador, Roles.Coordenador]} />
  },
  {
    path: RoutesNames.classificationExpoDlei,
    element: <ProtectedRoute children={<ExpoDleiClassificationPage />} allowedRoles={[Roles.Admin, Roles.Professor, Roles.Aluno, Roles.Avaliador, Roles.Coordenador]} />
  },
  {
    path: RoutesNames.teamsNotes,
    element: <ProtectedRoute children={<TeamsNotesPage />} allowedRoles={[Roles.Admin, Roles.Professor, Roles.Aluno, Roles.Avaliador, Roles.Coordenador]} />
  },
  {
    path: RoutesNames.teamNotes,
    element: <ProtectedRoute children={<TeamNotesPage />} allowedRoles={[Roles.Admin, Roles.Professor, Roles.Aluno, Roles.Avaliador, Roles.Coordenador]} />
  },
  {
    path: RoutesNames.generalReport,
    element: <ProtectedRoute children={<GeneralReportPage />} allowedRoles={[Roles.Admin, Roles.Professor, Roles.Aluno, Roles.Avaliador, Roles.Coordenador]} />
  },
])
