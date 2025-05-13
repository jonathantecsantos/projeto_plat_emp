import adminBanner from '../../../assets/adminBanner.svg'

export const BannerImage = () => {

  return (
    <div
      className="bg-cover bg-center w-full h-28"
      style={{ backgroundImage: `url(${adminBanner})` }}
    />
  )
}
