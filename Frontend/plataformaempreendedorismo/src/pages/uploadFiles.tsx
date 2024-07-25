import { AdminDefaultPage } from "../admin/components/common/defaultPage"
import { UploadFilesComponent } from "../admin/components/uploadFiles/uploadFiles"

export const UploadFilesPage = () => {
  return <AdminDefaultPage mainContent={<UploadFilesComponent />} />
}