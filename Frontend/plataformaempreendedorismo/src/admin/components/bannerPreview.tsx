import { Banner } from "../../model/banner";

export const BannerPreviewComponent = ({ svgFileName }: Pick<Banner, 'svgFileName'>) => {
  const backgroundImageUrl = `./src/assets/${svgFileName}`;

  //todo: fix impression footer banner

  return (
    <div
    //utils for styles texts
    // className="w-full h-full bg-no-repeat bg-center bg-cover"
    // style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <img
        src={backgroundImageUrl}
        className="w-full h-full opacity-1"
      />
    </div>)
}