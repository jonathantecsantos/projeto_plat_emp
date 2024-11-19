import { useLocation } from "react-router-dom"
import { AdminDefaultPage } from "../admin/components/common/defaultPage"
import { StudentSettings } from "../admin/components/students/studentSettings"


export const StudentSettingsPage = () => {
  const location = useLocation()
  const state = location.state as { email?: string } // Explicitamente tipado
  const email = state?.email || ''
  return <AdminDefaultPage mainContent={<StudentSettings email={email} />} />
}