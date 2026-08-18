import { useGetAnexoTemplateByAnoQuery } from '@/api/studentApi'
import { RootState } from '@/redux/store'
import { getImageUrl, TipoTemplate } from '@/utils/types'
import defaultAdminBanner from '@assets/adminBanner.jpg'
import defaultFooter from '@assets/footer.jpg'
import defaultFooter2025 from '@assets/footer2025.png'
import defaultHeader from '@assets/header.jpg'
import { useSelector } from 'react-redux'

export const useTemplateImages = (anoletivo?: number) => {
  const selectedYear = useSelector((state: RootState) => state.year.selectedYear)
  const year = anoletivo ?? selectedYear ?? new Date().getFullYear()

  const { data: templates, isLoading, isError } = useGetAnexoTemplateByAnoQuery(year)

  const UPLOAD_FOLDER = import.meta.env.VITE_UPLOAD_FOLDER
  const API_URL = import.meta.env.VITE_API_URL

  const headerRecord = templates?.find((t) => t.tipoTemplate === TipoTemplate.CABECALHO)
  const footerRecord = templates?.find((t) => t.tipoTemplate === TipoTemplate.RODAPE)
  const headerBannerRecord = templates?.find((t) => t.tipoTemplate === TipoTemplate.CABECALHO_BANNER)
  const footerBannerRecord = templates?.find((t) => t.tipoTemplate === TipoTemplate.RODAPE_BANNER)

  const headerDynamicUrl = headerRecord?.caminho
    ? getImageUrl(headerRecord.caminho, UPLOAD_FOLDER, API_URL)
    : null

  const footerDynamicUrl = footerRecord?.caminho
    ? getImageUrl(footerRecord.caminho, UPLOAD_FOLDER, API_URL)
    : null

  const headerBannerDynamicUrl = headerBannerRecord?.caminho
    ? getImageUrl(headerBannerRecord.caminho, UPLOAD_FOLDER, API_URL)
    : null

  const footerBannerDynamicUrl = footerBannerRecord?.caminho
    ? getImageUrl(footerBannerRecord.caminho, UPLOAD_FOLDER, API_URL)
    : null

  return {
    // URLs para uso em páginas administrativas (mantém retrocompatibilidade)
    headerAdminUrl: headerDynamicUrl || defaultAdminBanner,
    headerUrl: headerDynamicUrl || defaultHeader,
    footerUrl: footerDynamicUrl || defaultFooter,
    footer2025Url: footerDynamicUrl || defaultFooter2025,

    // URLs específicas para BannerPreview e PrototypePreview
    headerBannerUrl: headerBannerDynamicUrl || defaultHeader,
    footerBannerUrl: footerBannerDynamicUrl || defaultFooter,

    isLoading,
    isError,
  }
}
