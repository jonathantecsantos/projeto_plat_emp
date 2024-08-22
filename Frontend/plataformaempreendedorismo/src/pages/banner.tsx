import { useParams } from "react-router-dom"
import { BannerComponent } from "../admin/components/banner/banner"
import { AdminDefaultPage } from "../admin/components/common/defaultPage"

export const BannerPage = () => {
  const { id } = useParams()
  return <AdminDefaultPage mainContent={<BannerComponent id={Number(id)} />} />
}