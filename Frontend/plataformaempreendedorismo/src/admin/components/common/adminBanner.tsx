import adminBanner from '@assets/adminBanner.png'

export const BannerImage = () => {

  return (
    <img
      className="object-cover w-full h-28"
      loading='lazy'
      alt='Banner'
      src={adminBanner}
    />
  )
}
