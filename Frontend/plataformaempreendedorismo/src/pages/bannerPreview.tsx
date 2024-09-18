import { useParams } from "react-router-dom"
import { BannerPreviewComponent } from "../admin/components/banner/bannerPreview"

export const BannerPreviewPage = () => {
  const { id } = useParams()
  return <BannerPreviewComponent id={Number(id)} />
}