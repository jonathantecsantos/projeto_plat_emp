import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './admin/components/common/protectedRoute'
import { RoutesNames } from './globals'
import { AdminConfigPage } from './pages/adminConfig'
import { AdminHomePage } from './pages/adminHome'
import { BannerPage } from './pages/banner'
import { BannerPreviewPage } from './pages/bannerPreview'
import { CanvasEvaluationPage } from './pages/canvasTeamEvaluation'
import { CanvasPage } from './pages/canvasTeams'
import { ClassificationPage } from './pages/classification'
import { CanvasClassificationPage } from './pages/classificationCanvas'
import { DljClassificationPage } from './pages/classificationDlj'
import { ExpoDleiClassificationPage } from './pages/classificationExpoDlei'
import { PitchClassificationPage } from './pages/classificationPitch'
import { SharkTankClassificationPage } from './pages/classificationSharkTank'
import { Top5ClassificationPage } from './pages/classificationTop5'
import { ContactPage } from './pages/contact'
import { CoordinatorPage } from './pages/coordinator'
import { CoordinatorsPage } from './pages/coordinators'
import { EvaluatorPage } from './pages/evaluator'
import { EvaluatorsPage } from './pages/evaluators'
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
import { TeachersTeamListSelection } from './pages/teachersLogin'
import { TeamPage } from './pages/team'
import { TeamNotesPage } from './pages/teamNotes'
import { TeamPrototypingPage } from './pages/teamPrototyping'
import { TeamRegisterPage } from './pages/teamRegister'
import { TeamRegisterPrintPage } from './pages/teamRegisterPrint'
import { TeamsPage } from './pages/teams'
import { TeamsNotesPage } from './pages/teamsNotes'
import { UploadFilesPage } from './pages/uploadFiles'
import { CookiePolicyComponent } from './site/components/cookiePolicy'
import { PrivacyPolicy } from './site/components/privacyPolicy'
import { TermsOfUse } from './site/components/termsOfUse'
import { Roles } from './utils/types'

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
    path: RoutesNames.repository,
    element: <RepositoryPage />
  },
  {
    path: RoutesNames.contact,
    element: <ContactPage />
  },
  {
    path: RoutesNames.register,
    element: <TeamRegisterPage />
  },
  {
    path: RoutesNames.bannerPreview,
    element: <ProtectedRoute children={<BannerPreviewPage />} allowedRoles={[Roles.Admin, Roles.Professor, Roles.Aluno, Roles.Avaliador, Roles.Coordenador]} />,
  },
  {
    path: RoutesNames.teamRegisterPrint,
    element: <ProtectedRoute children={<TeamRegisterPrintPage />} allowedRoles={[Roles.Admin, Roles.Professor, Roles.Aluno, Roles.Avaliador, Roles.Coordenador]} />,
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
    path: RoutesNames.adminConfig,
    element: <ProtectedRoute children={<AdminConfigPage />} allowedRoles={[Roles.Admin, Roles.Professor, Roles.Aluno, Roles.Avaliador, Roles.Coordenador]} />
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
    path: RoutesNames.coordinators,
    element: <ProtectedRoute children={<CoordinatorsPage />} allowedRoles={[Roles.Admin, Roles.Professor, Roles.Aluno, Roles.Avaliador, Roles.Coordenador]} />,
  },
  {
    path: RoutesNames.coordinator,
    element: <ProtectedRoute children={<CoordinatorPage />} allowedRoles={[Roles.Admin, Roles.Professor, Roles.Aluno, Roles.Avaliador, Roles.Coordenador]} />,
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
    path: RoutesNames.teamSelection,
    element: <ProtectedRoute children={<TeachersTeamListSelection />} allowedRoles={[Roles.Professor]} />
  },
  {
    path: RoutesNames.banner,
    element: <ProtectedRoute children={<BannerPage />} allowedRoles={[Roles.Admin, Roles.Professor, Roles.Aluno, Roles.Avaliador, Roles.Coordenador]} />
  },
  {
    path: RoutesNames.canvasTeams,
    element: <ProtectedRoute children={<CanvasPage />} allowedRoles={[Roles.Admin, Roles.Professor, Roles.Aluno, Roles.Avaliador, Roles.Coordenador]} />
  },
  {
    path: RoutesNames.canvasTeam,
    element: <ProtectedRoute children={<CanvasEvaluationPage />} allowedRoles={[Roles.Admin, Roles.Professor, Roles.Aluno, Roles.Avaliador, Roles.Coordenador]} />
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
    path: RoutesNames.classificationTop5,
    element: <ProtectedRoute children={<Top5ClassificationPage />} allowedRoles={[Roles.Admin, Roles.Coordenador]} />
  },
  {
    path: RoutesNames.classificationDljTeams,
    element: <ProtectedRoute children={<DljClassificationPage />} allowedRoles={[Roles.Admin, Roles.Professor, Roles.Aluno, Roles.Avaliador, Roles.Coordenador]} />
  },
  {
    path: RoutesNames.classificationCanvas,
    element: <ProtectedRoute children={<CanvasClassificationPage />} allowedRoles={[Roles.Admin, Roles.Professor, Roles.Aluno, Roles.Avaliador, Roles.Coordenador]} />
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
  {
    path: RoutesNames.privacyPolicy,
    element: <PrivacyPolicy />,
  },
  {
    path: RoutesNames.termsOfUse,
    element: <TermsOfUse />,
  },
  {
    path: RoutesNames.cookiePolicy,
    element: <CookiePolicyComponent />,
  },
])
