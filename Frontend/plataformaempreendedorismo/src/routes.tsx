import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ProtectedRoute from './components/common/protectedRoute';
import { RoutesNames } from './globals';
import { AdminHomePage } from './pages/adminHome';
import { BannerPreviewPage } from './pages/bannerPreview';
import { CompanyDetailsPage } from './pages/companyDetails';
import { ContactPage } from './pages/contact';
import { CreateStudentPage } from './pages/createStudent';
import { LoginPage } from './pages/login';
import { RepositoryPage } from './pages/repository';
import { StudentsDetailsPage } from './pages/studentsDetails';
import { UploadFilesPage } from './pages/uploadFiles';

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
    path: RoutesNames.createStudent,
    element: <ProtectedRoute children={<CreateStudentPage />} allowedRoles={['admin']} />
  },
  {
    path: RoutesNames.adminHome,
    element: <ProtectedRoute children={<AdminHomePage />} allowedRoles={['admin']} />
  }
]);
