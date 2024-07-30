import { Banner } from "../../../model/banner";



export const BannerPreviewComponent = ({ id }: Pick<Banner, 'id'>) => {

  console.log(id)
  // const backgroundImageUrl = banner;
  {/* <img
        src={backgroundImageUrl}
        className="w-11/12 h-11/12 opacity-15 mx-auto z-10 absolute left-0 top-0 right-0"
      /> */}


  return (
    <div className="w-11/12 h-11/12 bg-[hsl(0,0%,83%)] mx-auto relative">
      <div className="h-[340px] border"><p>Header</p></div>

      {/* ----> Primeiro componente inicial parte azul */}
      <div className="px-8">
        <div className="border-[20px] border-[#10BBEF] w-full">
          <div className="p-4 border-b-4 border-[#10BBEF]  bg-white flex h-20">
            <p className="text-[#10BBEF]">Projeto:</p>
            <p className="px-2">teste</p>
          </div>
          <div className="flex text-start h-36 bg-white">
            <div className="w-full p-4 border-r-2 border-[#10BBEF] flex">
              <p className="text-[#10BBEF]">Alunos:</p>
              <p className="px-2">teste</p>
            </div>
            <div className="w-full p-4 border-l-2 border-[#10BBEF] flex">
              <p className="text-[#10BBEF]">Orientadores:</p>
              <p className="px-2">teste</p>
            </div>
          </div>
        </div>
        <div className="border-[20px] border-[#10BBEF] w-full mt-6 h-96 bg-white">
          <div className="flex text-start h-full">
            <div className="w-full p-4 border-r-2 border-[#10BBEF] flex">
              <p className="text-[#10BBEF]">Texto</p>
              <p className="px-2">teste</p>
            </div>
            <div className="w-full p-4 border-l-2 border-[#10BBEF] flex">
              <p className="text-[#10BBEF]">Imagem</p>
              <p className="px-2">teste</p>
            </div>
          </div>
        </div>
      </div>
      {/* ----> Primeiro componente inicial parte azul */}

      <div className="relative mx-16 mt-16">
        <div className="absolute -top-2 -left-4 bg-white text-orange-500 pr-20 pl-2 py-1 rounded-md border-4 border-orange-500">
          Equipe
        </div>
        <div className="border-4 border-l-8 border-orange-500 rounded-md p-6 w-72 h-56 bg-white">
          <p className="py-2">teste</p>
        </div>
      </div>

      <div className="relative mx-16 mt-4">
        <div className="absolute -top-2 -left-4 bg-white text-orange-500 pr-14 pl-2 py-1 rounded-md border-4 border-orange-500">
          Parceiros
        </div>
        <div className="border-4 border-l-8 border-orange-500 rounded-md p-6 w-28 h-48 bg-white">
          <p className="py-2">teste</p>
        </div>
      </div>

    </div>)
}