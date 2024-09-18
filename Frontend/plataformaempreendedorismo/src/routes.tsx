import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './admin/components/common/protectedRoute'
import App from './App'
import { RoutesNames } from './globals'
import { AdminHomePage } from './pages/adminHome'
import { BannerPage } from './pages/banner'
import { BannerPreviewPage } from './pages/bannerPreview'
import { CompanyDetailsPage } from './pages/companyDetails'
import { ContactPage } from './pages/contact'
import { DLJEvaluationPage } from './pages/dljTeamEvaluation'
import { DLJPage } from './pages/dljTeams'
import { ExpoDleiEvaluationPage } from './pages/expoDleiTeamEvaluation'
import { ExpoDleiPage } from './pages/expoDleiTeams'
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
import { TeamsPage } from './pages/teams'
import { UploadFilesPage } from './pages/uploadFiles'

export const router = createBrowserRouter([
  {
    path: RoutesNames.home,
    element: <App />,
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
    element: <ProtectedRoute children={<BannerPreviewPage />} allowedRoles={[]} />,
  },
  {
    path: RoutesNames.uploadFiles,
    element: <ProtectedRoute children={<UploadFilesPage />} allowedRoles={[]} />,
  },
  {
    path: RoutesNames.students,
    element: <ProtectedRoute children={<StudentsDetailsPage />} allowedRoles={[]} />,
  },
  {
    path: RoutesNames.student,
    element: <ProtectedRoute children={<StudentPage />} allowedRoles={[]} />
  },
  {
    path: RoutesNames.adminHome,
    element: <ProtectedRoute children={<AdminHomePage />} allowedRoles={[]} />
  },
  {
    path: RoutesNames.teachers,
    element: <ProtectedRoute children={<TeachersPage />} allowedRoles={[]} />,
  },
  {
    path: RoutesNames.teacher,
    element: <ProtectedRoute children={<TeacherPage />} allowedRoles={[]} />
  },
  {
    path: RoutesNames.teams,
    element: <ProtectedRoute children={<TeamsPage />} allowedRoles={[]} />
  },
  {
    path: RoutesNames.team,
    element: <ProtectedRoute children={<TeamPage />} allowedRoles={[]} />
  },
  {
    path: RoutesNames.banner,
    element: <ProtectedRoute children={<BannerPage />} allowedRoles={[]} />
  },
  {
    path: RoutesNames.dljTeams,
    element: <ProtectedRoute children={<DLJPage />} allowedRoles={[]} />
  },
  {
    path: RoutesNames.dljTeam,
    element: <ProtectedRoute children={<DLJEvaluationPage />} allowedRoles={[]} />
  },
  {
    path: RoutesNames.pitchTeams,
    element: <ProtectedRoute children={<PitchPage />} allowedRoles={[]} />
  },
  {
    path: RoutesNames.pitchTeam,
    element: <ProtectedRoute children={<PitchEvaluationPage />} allowedRoles={[]} />
  },
  {
    path: RoutesNames.sharkTankTeams,
    element: <ProtectedRoute children={<SharkTankPage />} allowedRoles={[]} />
  },
  {
    path: RoutesNames.sharkTankTeam,
    element: <ProtectedRoute children={<SharkTankEvaluationPage />} allowedRoles={[]} />
  },
  {
    path: RoutesNames.expoDleiTeams,
    element: <ProtectedRoute children={<ExpoDleiPage />} allowedRoles={[]} />
  },
  {
    path: RoutesNames.expoDleiTeam,
    element: <ProtectedRoute children={<ExpoDleiEvaluationPage />} allowedRoles={[]} />
  },
])
