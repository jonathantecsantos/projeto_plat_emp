import { Banner } from "../../model/banner";
import banner from '../../assets/banner.svg';


export const BannerPreviewComponent = ({ id }: Pick<Banner, 'id'>) => {
  // const backgroundImageUrl = `./src/assets/${svgFileName}`;
  console.log(id)
  const backgroundImageUrl = banner;


  //todo: fix impression footer banner

  // -----> todo:winnicius 02 /07

  // criar rotas com controle de autorização
  // fazer o user api slice / services funcionar no endpoint user do go(exemplo, user para apagar um user, editar um user e listar todos os users)
  // criar endpoints de manipulação dos alunos -> api go
  // criar o api slice / services para o aluno

  //   ------>
  return (
    <div
    //utils for styles texts
    // className="w-full h-full bg-no-repeat bg-center bg-cover"
    // style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <img
        src={backgroundImageUrl}
        className="w-11/12 h-11/12 opacity-1 mx-auto"
      />
    </div>)
}