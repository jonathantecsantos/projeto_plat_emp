import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import ProtectedRoute from './components/common/protectedRoute'
import { RoutesNames } from './globals'
import { AdminHomePage } from './pages/adminHome'
import { BannerPreviewPage } from './pages/bannerPreview'
import { CompanyDetailsPage } from './pages/companyDetails'
import { ContactPage } from './pages/contact'
import { LoginPage } from './pages/login'
import { RepositoryPage } from './pages/repository'
import { StudentPage } from './pages/student'
import { StudentsDetailsPage } from './pages/students'
import { TeachersPage } from './pages/teachers'
import { UploadFilesPage } from './pages/uploadFiles'
import { TeamsPage } from './pages/teams'
import { TeamPage } from './pages/team'

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
    element: <ProtectedRoute children={<BannerPreviewPage />} allowedRoles={['admin', 'aluno']} />,
  },
  {
    path: RoutesNames.uploadFiles,
    element: <ProtectedRoute children={<UploadFilesPage />} allowedRoles={['admin']} />,
  },
  {
    path: RoutesNames.students,
    element: <ProtectedRoute children={<StudentsDetailsPage />} allowedRoles={['admin', 'aluno', 'professor']} />
  },
  {
    path: RoutesNames.student,
    element: <ProtectedRoute children={<StudentPage />} allowedRoles={['admin']} />
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
    path: RoutesNames.teams,
    element: <ProtectedRoute children={<TeamsPage />} allowedRoles={['admin', 'professor', 'aluno']} />
  },
  {
    path: RoutesNames.team,
    element: <ProtectedRoute children={<TeamPage />} allowedRoles={['admin', 'professor', 'aluno']} />
  },
])
