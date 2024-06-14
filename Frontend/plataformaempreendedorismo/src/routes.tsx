import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { RoutesNames } from "./globals";
import { BannerPreviewPage } from "./pages/bannerPreview";
import { CompanyDetailsPage } from "./pages/companyDetails";
import { LoginPage } from "./pages/login";
import { RepositoryPage } from "./pages/repository";
import { ContactPage } from "./pages/contact";
import { UploadFilesPage } from "./pages/uploadFiles";


export const router = createBrowserRouter([
  {
    path: RoutesNames.home,
    element: <App />,
  },
  {
    path: RoutesNames.bannerPreview,
    element: <BannerPreviewPage />
  },
  {
    path: RoutesNames.login,
    element: <LoginPage />
  },
  {
    path: RoutesNames.companyDetails,
    element: <CompanyDetailsPage />
  },
  {
    path: RoutesNames.repository,
    element: <RepositoryPage />,
  },
  {
    path: RoutesNames.contact,
    element: <ContactPage />
  },
  {
    path: RoutesNames.uploadFiles,
    element: <UploadFilesPage />
  }
]);