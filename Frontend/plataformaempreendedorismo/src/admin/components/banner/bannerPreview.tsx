import { useRef } from "react"
import { useGetBannerByIdQuery, useGetTeamByIdQuery } from "../../../api/studentApi"
import { Banner } from "../../../model/banner"


export const BannerPreviewComponent = ({ id }: Pick<Banner, 'id'>) => {
  //passar como props vindo da tela de team
  console.log(id)
  const bannerRef = useRef<HTMLDivElement>(null)
  const { data: banner } = useGetBannerByIdQuery(id)
  const { data: team } = useGetTeamByIdQuery(id)

  const imageURL = `http://localhost:8080/uploads/${banner?.anexos![0].nomeAnexo}`;

  return (

    <div className="w-full h-full bg-[hsl(0,0%,83%)] mx-auto relative 
    print:w-[950px] print:text-xs" ref={bannerRef}>

      <div className="relative h-[340px] print:h-[160px]">
        <img src="/src/assets/header.svg" alt="Header" className="w-[1980px] h-96 object-cover absolute
        print:h-[186px]" />
      </div>
      {/* ----> Primeiro componente inicial parte azul */}
      {/* {JSON.stringify(banner, null, 2)} */}
      {/* {JSON.stringify(banner?.anexos, null, 2)} */}
      <div className="relative px-8 print:px-4">
        <div className="border-[20px] print:border-[10px] border-[#10BBEF]">
          <div className="p-4 border-b-4 print:border-b-[2px]  border-[#10BBEF]  bg-white flex h-20
           print:px-4 print:pt-3 print:h-11">
            <p className="break-words break-all text-[#10BBEF]">Projeto:</p>
            <p className="break-words break-all px-2 print:px-1">{team?.nomeEquipe}</p>
          </div>
          <div className="flex text-start h-36 print:h-[70px] bg-white">
            <div className="w-full pt-2 border-r-2 print:border-r-0 border-[#10BBEF] flex break-words break-all gap-2 
            print:gap-[1px]">
              <p className="text-[#10BBEF] pl-4 print:pr-1">Alunos:</p>
              {team?.alunos.map((student) => <p className="h-fit">{student.nome},</p>)}
            </div>
            <div className="w-full pt-2 border-l-2 border-[#10BBEF] flex">
              <p className="text-[#10BBEF] pl-4 print:pl-2">Orientadores:</p>
              <p className="break-words break-all  px-2 print:px-1">{team?.professor.nome}</p>
            </div>
          </div>
        </div>
        <div className="border-[20px] print:border-[10px] border-[#10BBEF] mt-6 h-96 print:h-56 print:mt-3 bg-white">
          <div className="flex text-start h-full">
            <div className="p-4 border-r-2 print:border-r-0 border-[#10BBEF] flex w-full">
              <p className="text-[#10BBEF]">Texto</p>
              <p className="break-words break-all  px-2 print:px-1">{banner?.textoDescricaoQ0}</p>
            </div>
            <div className="p-4 border-l-2 border-[#10BBEF] flex w-full">
              <p className="text-[#10BBEF]">Imagem</p>
              {/* <p className="break-words break-all  px-2 print:px-1">teste</p> */}
              <img
                src={imageURL}
                alt="Imagem"
                // className="break-words break-all px-2 print:px-1"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="CAPACIDADE ORGANIZACIONAL">
          <div className="relative ml-16 print:ml-10 mt-16 print:mt-9">
            <p className="break-words break-all  font-bold text-orange-500 absolute -top-7 left-6 transform transform-x-1/2">CAPACIDADE ORGANIZACIONAL</p>
            <div className="absolute -top-2 -left-4 bg-white text-orange-500 w-[190px] print:w-[135px] pl-2 py-1 rounded-lg 
            border-4 print:border-[2px]  border-orange-500">
              Equipe
            </div>
            <div id="equipeq1" className="border-4 print:border-[2px]  border-l-8 print:border-l-[6px] border-orange-500 rounded-lg p-6 print:px-1 print:pt-3
             w-[305px] h-52 print:w-[240px] print:h-[155px] bg-white">
              <p className="break-words break-all  py-2">{banner?.equipeQ1}</p>
            </div>
          </div>

          <div className="flex">
            <div className="relative ml-16 print:ml-10 mt-4 print:mt-3 ">
              <div className="absolute -top-2 -left-4 bg-white text-orange-500 pr-[72px] print:pr-[40px] pl-2 py-1 rounded-lg border-4 print:border-[2px]  border-orange-500">
                Parceiros
              </div>
              <div id="parceiros" className="border-4 print:border-[2px]  border-l-8 print:border-l-[6px] border-orange-500 rounded-lg p-6 print:px-1 print:pt-3 w-[130px] 
              print:w-[90px] print:h-[156px] h-52 bg-white">
                <p className="break-words break-all py-2">{banner?.parceiroQ1}</p>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="relative mx-5 mt-4 print:mt-3">
                <div className="absolute -top-2 -left-4 bg-white text-orange-500 pr-10 pl-2 py-1 rounded-lg border-4 print:border-[2px]  border-orange-500 text-nowrap print:w-[147px]">
                  Atividade Chave
                </div>
                <div id="atividadeChave" className="border-4 print:border-[2px]  border-l-8 print:border-l-[6px] border-orange-500 rounded-lg p-6 print:px-1 print:pt-3 w-[150px]
                 print:w-[128px] h-24 print:h-[75px] bg-white">
                  <p className="break-words break-all  py-2">{banner?.atividadeChaveQ1}</p>
                </div>
              </div>

              <div className="relative mx-5 mt-3 print:mt-[10px]">
                <div className="absolute -top-2 -left-4 bg-white text-orange-500 pr-[88px] pl-2 py-1 rounded-lg border-4 print:border-[2px]  border-orange-500 print:w-[145px]">
                  Recursos
                </div>
                <div id="recursosArrow" className="border-4 print:border-[2px]  border-l-8 print:border-l-[6px] border-orange-500 rounded-lg p-6 print:px-1 print:pt-3 w-[145px] h-24 
                print:h-[70px] print:w-[125px] bg-white">
                  <p className="break-words break-all  py-2">{banner?.recursosQ1}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative ml-16 print:ml-10 mt-4 print:mt-3 ">
            <div className="absolute -top-2 -left-4 bg-white text-orange-500 w-[190px] pl-2 py-1 rounded-lg border-4 print:border-[2px]  border-orange-500 print:w-[150px]">
              Custos
            </div>
            <div id="custosq2Arrow" className="border-4 print:border-[2px]  border-l-8 print:border-l-[6px] border-orange-500 rounded-lg p-6 print:px-1 print:pt-3 w-[304px]
             print:h-[85px] bg-white print:w-[240px] h-[120px]">
              <p className="break-words break-all  py-2">{banner?.custosQ1}</p>
            </div>
          </div>

          <div className="w-full mt-8 print:mt-6">
            <div className="relative ml-16 print:ml-10  w-full">
              <div className="absolute z-10 -top-2 -left-4 bg-pink-500 text-white w-full pl-2 py-1 rounded-lg border-4 print:border-[2px]  border-pink-500 uppercase font-semibold text-nowrap text-center print:w-[350px]">
                Resultado Financeiro
              </div>
              <div className="absolute border-4 print:border-[2px]   border-pink-500 rounded-lg p-6  bg-white w-[875px] h-[330px] print:w-[490px] print:h-[212px] print:p-3">
                <p className="break-words break-all  py-2">{banner?.resultadoFinanceiroQ2}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="FLUXO DE NEGOCIO w-2/3 ">
          <div className="relative ml-1 mt-16 print:mt-9 w-full">
            <p className="break-words break-all  font-bold text-pink-500 absolute -top-7 left-1/3 transform transform-x-1/2">FLUXO DE NEGÓCIO</p>
            <div className="absolute -top-2 -left-4 bg-pink-500 text-white w-[290px]  pl-2 py-1 rounded-lg border-4 print:border-[2px]  border-pink-500 uppercase font-semibold text-nowrap print:w-[220px]">
              Oportunidade de mercado
            </div>
            <div id="oportunidadeMercado" className="oportunidadeMercadoDot border-y-4 print:border-y-[2px] border-l-8 print:border-l-[6px] border-pink-500 
            p-6 print:px-1 print:pt-3  print:h-16 h-[95px] bg-white">
              <p className="break-words break-all  py-2">{banner?.oportunidadeNegQ2}</p>
            </div>
          </div>

          <div className="relative ml-1 mt-4 print:mt-3 w-full">
            <div className="absolute -top-2 -left-4 bg-white text-pink-500 w-[290px]  pl-2 py-1 rounded-lg border-4 print:border-[2px]  border-pink-500 print:w-[220px]">
              Custos
            </div>
            <div id="custosq2" className="custosq2Dot border-y-4 print:border-y-[2px] border-l-8 print:border-l-[6px] border-pink-500  p-6 print:px-1 print:pt-3 h-24 bg-white print:h-[80px]">
              <p className="break-words break-all  py-2">{banner?.custoQ2}</p>
            </div>
          </div>

          <div className="relative ml-1 mt-4 print:mt-3  w-full">
            <div className="absolute -top-2 -left-4 bg-white text-pink-500 w-[290px]  pl-2 py-1 rounded-lg border-4 print:border-[2px]  border-pink-500 print:w-[220px]">
              Proposta de valor
            </div>
            <div id="propostaValor" className="propostaValorDot border-y-4 print:border-y-[2px] border-l-8 print:border-l-[6px] border-pink-500  p-6 print:px-1 print:pt-3 
            h-52 print:h-[150px] bg-white">
              <p className="break-words break-all  py-2">{banner?.propostaValorQ2}</p>
            </div>
          </div>

          <div className="relative ml-1 mt-4">
            <div className="absolute -top-2 -left-4 bg-white text-pink-500 w-[290px] pl-2 py-1 rounded-lg border-4 print:border-[2px]  border-pink-500 print:w-[220px]">
              Fontes de Receitas
            </div>
            <div id="custosq3Arrow" className="border-4 print:border-[2px]  border-l-8 print:border-l-[6px] border-pink-500 rounded-lg p-6 print:px-1 print:pt-3 w-11/12 bg-white print:h-[85px] h-[120px]">
              <p className="break-words break-all  py-2">{banner?.fonteReceitaQ2}</p>
            </div>
          </div>

        </div>

        <div className="CONTEXTO E PROBLEMA w-full pr-14 print:pr-8">
          <div className="relative ml-1 mt-16 print:mt-9 w-full">
            <p className="break-words break-all  font-bold text-[#6C4796] absolute -top-7 left-1/3 transform transform-x-1/2">TEORIA DE MUDANÇA</p>
            <div className="absolute -top-2 -left-4 bg-[#6C4796] text-white w-[290px]  pl-2 py-1 rounded-lg border-4 print:border-[2px]  border-[#6C4796] uppercase font-semibold text-nowrap print:w-[220px]">
              Contexto e problema
            </div>
            <div id="contextoProblema" className="border-4 print:border-[2px]  border-l-8 print:border-l-[6px] border-[#6C4796] rounded-lg p-6 print:px-1 print:pt-3  bg-white print:h-16 h-[95px]">
              <p className="break-words break-all  py-2">{banner?.contextoProblemaQ3}</p>
            </div>
          </div>

          <div className="relative ml-1 mt-4 print:mt-3  w-full">
            <div className="absolute -top-2 -left-4 bg-white text-[#6C4796] w-[290px]  pl-2 py-1 rounded-lg border-4 print:border-[2px]  border-[#6C4796] print:w-[220px]">
              Público / Foco do Impacto
            </div>
            <div id="publicoFoco" className="border-4 print:border-[2px]  border-l-8 print:border-l-[6px] border-[#6C4796] rounded-lg p-6 print:px-1 print:pt-3  bg-white print:h-[80px] h-[95px]">
              <p className="break-words break-all  py-2">{banner?.publicoFocoImpactoQ3}</p>
            </div>
          </div>

          <div className="relative ml-1 mt-4 print:mt-3  w-full">
            <div className="absolute -top-2 -left-4 bg-white text-[#6C4796] w-[290px]  pl-2 py-1 rounded-lg border-4 print:border-[2px]  border-[#6C4796] print:w-[220px]">
              Intervenções (estratégias)
            </div>
            <div id="intervencoesEstrategias" className="border-4 print:border-[2px]  border-l-8 print:border-l-[6px] border-[#6C4796] rounded-lg p-6 print:px-1 print:pt-3  h-52 bg-white print:h-[150px]">
              <p className="break-words break-all  py-2">{banner?.intervencoesQ3}</p>
            </div>
          </div>

          <div className="relative ml-1 mt-4">
            <div className="absolute -top-2 -left-4 bg-white text-[#6C4796] w-[290px] pl-2 py-1 rounded-lg border-4 print:border-[2px]  border-[#6C4796] print:w-[220px]">
              Saídas / Outputs
            </div>
            <div id="saidasOutputs" className="border-4 print:border-[2px]  border-l-8 print:border-l-[6px] border-[#6C4796] rounded-lg p-6 print:px-1 print:pt-3 w-full  bg-white print:h-[85px] h-[120px]">
              <p className="break-words break-all  py-2">{banner?.saidasQ3}</p>
            </div>
          </div>

          <div className="relative ml-1 mt-8 print:mt-4">
            <div className="absolute -top-2 -left-4 bg-white text-[#6C4796] w-[290px] pl-2 py-1 rounded-lg border-4 print:border-[2px]  border-[#6C4796] print:w-[220px]">
              Resultados Curto Prazo
            </div>
            <div className="border-x-4 print:border-x-[2px] border-t-4 print:border-t-[2px] border-l-8 print:border-l-[6px] border-[#6C4796] rounded-t-md print:rounded-t-lg p-6 print:px-1 print:pt-3 w-full  bg-white print:h-[65px]">
              <p className="break-words break-all  py-2">{banner?.resultadosCurtoPrazoQ3}</p>
            </div>
          </div>

          <div className="relative ml-1 mt-0">
            <div className="absolute -top-2 -left-4 bg-white text-[#6C4796] w-[290px] pl-2 py-1 rounded-lg border-4 print:border-[2px]  border-[#6C4796] print:w-[220px]">
              Resultados Médio Prazo
            </div>
            <div id="resultadosCurtoPrazo" className="border-x-4 print:border-x-[2px] border-b-4 print:border-b-[2px] border-l-8 print:border-l-[6px] border-[#6C4796] rounded-b-md print:rounded-b-lg p-6 print:px-1 print:pt-3 w-full  print:h-[65px] bg-white"
              style={{
                borderTop: 'dashed',
                borderColor: "#6C4796",
                borderTopWidth: 2,
              }}>
              <p className="break-words break-all  py-2">{banner?.resultadosMedioPrazoQ3}</p>
            </div>
          </div>

          <div className="relative ml-1 mt-8 mb-4 print:mb-[8px]  print:mt-4 w-full">
            <div className="absolute -top-2 -left-4 bg-[#6C4796] text-white w-[290px]  pl-2 py-1 rounded-lg border-4 print:border-[2px]  border-[#6C4796] uppercase font-semibold text-nowrap text-center print:w-[220px]">
              Visão de impacto
            </div>
            <div className="border-4 print:border-[2px]   border-[#6C4796] rounded-lg p-6 print:px-1 print:pt-3 h-28 bg-white max-w-full 
            print:h-[75px]">
              <p className="break-words break-all  py-2">{banner?.visaoImpactoQ3}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-28 bottom-0 print:h-20">
        <img src="/src/assets/footer.svg" alt="Header" className="object-cover absolute" />
      </div>
    </div>
  )
}