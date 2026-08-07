import { useTemplateImages } from '../../../hooks/useTemplateImages'

export const BannerImage = () => {
  const { headerAdminUrl } = useTemplateImages()

  return (
    <div className="w-full overflow-hidden">
      <img
        className="w-full object-cover md:object-contain h-28"
        loading='lazy'
        alt='Banner'
        src={headerAdminUrl}
        crossOrigin="anonymous"
      />
    </div>
  )
}
