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
import { TeacherPage } from './pages/teacher'
import { TeachersPage } from './pages/teachers'
import { TeamPage } from './pages/team'
import { TeamNotesPage } from './pages/teamNotes'
import { TeamPrototypingPage } from './pages/teamPrototyping'
import { TeamsPage } from './pages/teams'
import { TeamsNotesPage } from './pages/teamsNotes'
import { UploadFilesPage } from './pages/uploadFiles'
import { roles } from './utils/types'

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
    element: <ProtectedRoute children={<BannerPreviewPage />} allowedRoles={[roles.admin]} />,
  },
  {
    path: RoutesNames.uploadFiles,
    element: <ProtectedRoute children={<UploadFilesPage />} allowedRoles={[roles.admin]} />,
  },
  {
    path: RoutesNames.students,
    element: <ProtectedRoute children={<StudentsDetailsPage />} allowedRoles={[roles.admin]} />,
  },
  {
    path: RoutesNames.student,
    element: <ProtectedRoute children={<StudentPage />} allowedRoles={[roles.admin]} />
  },
  {
    path: RoutesNames.adminHome,
    element: <ProtectedRoute children={<AdminHomePage />} allowedRoles={[roles.admin]} />
  },
  {
    path: RoutesNames.teachers,
    element: <ProtectedRoute children={<TeachersPage />} allowedRoles={[roles.admin]} />,
  },
  {
    path: RoutesNames.teacher,
    element: <ProtectedRoute children={<TeacherPage />} allowedRoles={[roles.admin]} />
  },
  {
    path: RoutesNames.teams,
    element: <ProtectedRoute children={<TeamsPage />} allowedRoles={[roles.admin]} />
  },
  {
    path: RoutesNames.team,
    element: <ProtectedRoute children={<TeamPage />} allowedRoles={[roles.admin]} />
  },
  {
    path: RoutesNames.banner,
    element: <ProtectedRoute children={<BannerPage />} allowedRoles={[roles.admin]} />
  },
  {
    path: RoutesNames.dljTeams,
    element: <ProtectedRoute children={<DLJPage />} allowedRoles={[roles.admin]} />
  },
  {
    path: RoutesNames.dljTeam,
    element: <ProtectedRoute children={<DLJEvaluationPage />} allowedRoles={[roles.admin]} />
  },
  {
    path: RoutesNames.pitchTeams,
    element: <ProtectedRoute children={<PitchPage />} allowedRoles={[roles.admin]} />
  },
  {
    path: RoutesNames.pitchTeam,
    element: <ProtectedRoute children={<PitchEvaluationPage />} allowedRoles={[roles.admin]} />
  },
  {
    path: RoutesNames.sharkTankTeams,
    element: <ProtectedRoute children={<SharkTankPage />} allowedRoles={[roles.admin]} />
  },
  {
    path: RoutesNames.sharkTankTeam,
    element: <ProtectedRoute children={<SharkTankEvaluationPage />} allowedRoles={[roles.admin]} />
  },
  {
    path: RoutesNames.expoDleiTeams,
    element: <ProtectedRoute children={<ExpoDleiPage />} allowedRoles={[roles.admin]} />
  },
  {
    path: RoutesNames.expoDleiTeam,
    element: <ProtectedRoute children={<ExpoDleiEvaluationPage />} allowedRoles={[roles.admin]} />
  },
  {
    path: RoutesNames.prototyping,
    element: <ProtectedRoute children={<TeamPrototypingPage />} allowedRoles={[roles.admin]} />
  },
  {
    path: RoutesNames.classification,
    element: <ProtectedRoute children={<ClassificationPage />} allowedRoles={[roles.admin]} />
  },
  {
    path: RoutesNames.classificationDljTeams,
    element: <ProtectedRoute children={<DljClassificationPage />} allowedRoles={[roles.admin]} />
  },
  {
    path: RoutesNames.classificationPitch,
    element: <ProtectedRoute children={<PitchClassificationPage />} allowedRoles={[roles.admin]} />
  },
  {
    path: RoutesNames.classificationSharkTank,
    element: <ProtectedRoute children={<SharkTankClassificationPage />} allowedRoles={[roles.admin]} />
  },
  {
    path: RoutesNames.classificationExpoDlei,
    element: <ProtectedRoute children={<ExpoDleiClassificationPage />} allowedRoles={[roles.admin]} />
  },
  {
    path: RoutesNames.teamsNotes,
    element: <ProtectedRoute children={<TeamsNotesPage />} allowedRoles={[roles.admin]} />
  },
  {
    path: RoutesNames.teamNotes,
    element: <ProtectedRoute children={<TeamNotesPage />} allowedRoles={[roles.admin]} />
  },
  {
    path: RoutesNames.generalReport,
    element: <ProtectedRoute children={<GeneralReportPage />} allowedRoles={[roles.admin]} />
  },
])
