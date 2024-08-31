import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './admin/components/common/protectedRoute'
import App from './App'
import { RoutesNames } from './globals'
import { AdminHomePage } from './pages/adminHome'
import { BannerPage } from './pages/banner'
import { BannerPreviewPage } from './pages/bannerPreview'
import { CompanyDetailsPage } from './pages/companyDetails'
import { ContactPage } from './pages/contact'
import { DLJPage } from './pages/dljTeams'
import { LoginPage } from './pages/login'
import { RepositoryPage } from './pages/repository'
import { StudentPage } from './pages/student'
import { StudentsDetailsPage } from './pages/students'
import { TeacherPage } from './pages/teacher'
import { TeachersPage } from './pages/teachers'
import { TeamPage } from './pages/team'
import { TeamsPage } from './pages/teams'
import { UploadFilesPage } from './pages/uploadFiles'
import { DLJEvaluationPage } from './pages/dljTeamEvaluation'
import { PitchPage } from './pages/pitchTeams'
import { PitchEvaluationPage } from './pages/pitchTeamEvaluation'

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
    element: <ProtectedRoute children={<BannerPreviewPage />} allowedRoles={['admin', 'aluno', 'professor']} />,
  },
  {
    path: RoutesNames.uploadFiles,
    element: <ProtectedRoute children={<UploadFilesPage />} allowedRoles={['admin', 'professor']} />,
  },
  {
    path: RoutesNames.students,
    element: <ProtectedRoute children={<StudentsDetailsPage />} allowedRoles={['admin', 'aluno', 'professor']} />
  },
  {
    path: RoutesNames.student,
    element: <ProtectedRoute children={<StudentPage />} allowedRoles={['admin', 'aluno', 'professor']} />
  },
  {
    path: RoutesNames.adminHome,
    element: <ProtectedRoute children={<AdminHomePage />} allowedRoles={['admin', 'aluno', 'professor']} />
  },
  {
    path: RoutesNames.teachers,
    element: <ProtectedRoute children={<TeachersPage />} allowedRoles={['admin', 'professor']} />
  },
  {
    path: RoutesNames.teacher,
    element: <ProtectedRoute children={<TeacherPage />} allowedRoles={['admin', 'aluno', 'professor']} />
  },
  {
    path: RoutesNames.teams,
    element: <ProtectedRoute children={<TeamsPage />} allowedRoles={['admin', 'professor', 'aluno']} />
  },
  {
    path: RoutesNames.team,
    element: <ProtectedRoute children={<TeamPage />} allowedRoles={['admin', 'professor', 'aluno']} />
  },
  {
    path: RoutesNames.banner,
    element: <ProtectedRoute children={<BannerPage />} allowedRoles={['admin', 'professor', 'aluno']} />
  },
  {
    path: RoutesNames.dljTeams,
    element: <ProtectedRoute children={<DLJPage />} allowedRoles={['admin', 'professor', 'aluno']} />
  },
  {
    path: RoutesNames.dljTeam,
    element: <ProtectedRoute children={<DLJEvaluationPage />} allowedRoles={['admin', 'professor', 'aluno']} />
  },

  {
    path: RoutesNames.pitchTeams,
    element: <ProtectedRoute children={<PitchPage />} allowedRoles={['admin', 'professor', 'aluno']} />
  },
  {
    path: RoutesNames.pitchTeam,
    element: <ProtectedRoute children={<PitchEvaluationPage />} allowedRoles={['admin', 'professor', 'aluno']} />
  },
])
