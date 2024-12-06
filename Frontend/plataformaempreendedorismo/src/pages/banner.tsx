import { useLocation, useParams } from "react-router-dom"
import { BannerComponent } from "../admin/components/banner/banner"
import { AdminDefaultPage } from "../admin/components/common/defaultPage"

export const BannerPage = () => {
  const { id } = useParams()
  const location = useLocation()
  const { state } = location
  return <AdminDefaultPage mainContent={<BannerComponent id={Number(id)} teamName={state} />} />
}