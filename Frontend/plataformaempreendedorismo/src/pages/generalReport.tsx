import { AdminDefaultPage } from "../admin/components/common/defaultPage"
import { GeneralReportComponent } from "../admin/components/generalReport/generalReport"

export const GeneralReportPage = () => {
  return <AdminDefaultPage mainContent={<GeneralReportComponent />} />
}