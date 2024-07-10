import { AdminDefaultPage } from "../admin/components/defaultPage"
import { UploadFilesComponent } from "../components/uploadFiles/uploadFiles"

export const UploadFilesPage = () => {
  return <AdminDefaultPage mainContent={<UploadFilesComponent />} title="Importações" />
}