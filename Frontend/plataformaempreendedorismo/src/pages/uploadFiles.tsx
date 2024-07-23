import { AdminDefaultPage } from "../admin/components/defaultPage"
import { UploadFilesComponent } from "../admin/components/uploadFiles/uploadFiles"

export const UploadFilesPage = () => {
  return <AdminDefaultPage mainContent={<UploadFilesComponent />} />
}