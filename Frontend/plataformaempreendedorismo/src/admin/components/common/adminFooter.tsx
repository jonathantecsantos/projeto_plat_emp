import { useTemplateImages } from '../../../hooks/useTemplateImages'

export const FooterImage = () => {
  const { footerUrl } = useTemplateImages()
  return (
    <img
      src={footerUrl}
      className="object-contain  w-full h-40 mt-10"
      crossOrigin="anonymous"
    />
  )
}
