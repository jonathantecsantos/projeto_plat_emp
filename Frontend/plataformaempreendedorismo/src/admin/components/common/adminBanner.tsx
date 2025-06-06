import adminBanner from '@assets/adminBanner.jpg'

export const BannerImage = () => {

  return (
    <div className="w-full overflow-hidden">
      <img
        className="w-full object-cover md:object-contain h-28"
        loading='lazy'
        alt='Banner'
        src={adminBanner}
      />
    </div>
  )
}
