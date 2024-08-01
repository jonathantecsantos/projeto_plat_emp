import { useRef } from "react"
import { Banner } from "../../../model/banner"


export const BannerPreviewComponent = ({ id }: Pick<Banner, 'id'>) => {
  console.log(id)
  const bannerRef = useRef<HTMLDivElement>(null)

  return (

    <div className="w-full h-full bg-[hsl(0,0%,83%)] mx-auto relative" ref={bannerRef}>
      <div className="h-[340px] border"><p>Header</p></div>

      {/* ----> Primeiro componente inicial parte azul */}
      <div className="px-8">
        <div className="border-[20px] border-[#10BBEF]">
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
      <div className="flex">
        <div className="CAPACIDADE ORGANIZACIONAL">
          <div className="relative ml-16 mt-16">
            <div className="absolute -top-2 -left-4 bg-white text-orange-500 w-[190px]  pl-2 py-1 rounded-md border-4 border-orange-500">
              Equipe
            </div>
            <div id="equipeq1" className="border-4 border-l-8 border-orange-500 rounded-md p-6 w-[305px] h-52 bg-white">
              <p className="py-2">teste</p>
            </div>
          </div>

          <div className="flex">
            <div className="relative ml-16 mt-4">
              <div className="absolute -top-2 -left-4 bg-white text-orange-500 pr-[72px] pl-2 py-1 rounded-md border-4 border-orange-500">
                Parceiros
              </div>
              <div id="parceiros" className="border-4 border-l-8 border-orange-500 rounded-md p-6 w-[130px] h-52 bg-white">
                <p className="py-2">teste</p>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="relative mx-6 mt-4">
                <div className="absolute -top-2 -left-4 bg-white text-orange-500 pr-10 pl-2 py-1 rounded-md border-4 border-orange-500 text-nowrap">
                  Atividade Chave
                </div>
                <div id="atividadeChave" className="border-4 border-l-8 border-orange-500 rounded-md p-6 w-[150px] h-24 bg-white">
                  <p className="py-2">teste</p>
                </div>
              </div>

              <div className="relative mx-6 mt-3">
                <div className="absolute -top-2 -left-4 bg-white text-orange-500 pr-[92px] pl-2 py-1 rounded-md border-4 border-orange-500">
                  Recursos
                </div>
                <div className="border-4 border-l-8 border-orange-500 rounded-md p-6 w-[150px] h-24 bg-white">
                  <p className="py-2">teste</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative ml-16 mt-4">
            <div className="absolute -top-2 -left-4 bg-white text-orange-500 w-[190px] pl-2 py-1 rounded-md border-4 border-orange-500">
              Custos
            </div>
            <div className="border-4 border-l-8 border-orange-500 rounded-md p-6 w-[305px] h-26 bg-white">
              <p className="py-2">teste</p>
            </div>
          </div>

          <div className="w-full mt-8">
            <div className="relative ml-16 mt-8 w-full">
              <div className="absolute z-10 -top-2 -left-4 bg-pink-500 text-white w-full pl-2 py-1 rounded-md border-4 border-pink-500 uppercase font-semibold text-nowrap text-center">
                Resultado Financeiro
              </div>
              <div className="absolute border-4  border-pink-500 rounded-md p-6 h-[330px] bg-white w-[875px]">
                <p className="py-2">teste</p>
              </div>
            </div>
          </div>
        </div>

        <div className="FLUXO DE NEGOCIO w-2/3">
          <div className="relative ml-1 mt-16 w-full">
            <div className="absolute -top-2 -left-4 bg-pink-500 text-white w-[290px]  pl-2 py-1 rounded-md border-4 border-pink-500 uppercase font-semibold text-nowrap">
              Oportunidade de mercado
            </div>
            <div id="oportunidadeMercado" className="oportunidadeMercadoDot border-y-4 border-l-8 border-pink-500 p-6  h-26 bg-white" >
              <p className="py-2">teste</p>
            </div>
          </div>

          <div className="relative ml-1 mt-4  w-full">
            <div className="absolute -top-2 -left-4 bg-white text-pink-500 w-[290px]  pl-2 py-1 rounded-md border-4 border-pink-500">
              Custos
            </div>
            <div id="custosq2" className="custosq2Dot border-y-4 border-l-8 border-pink-500  p-6  h-26 bg-white">
              <p className="py-2">teste</p>
            </div>
          </div>

          <div className="relative ml-1 mt-4  w-full">
            <div className="absolute -top-2 -left-4 bg-white text-pink-500 w-[290px]  pl-2 py-1 rounded-md border-4 border-pink-500">
              Proposta de valor
            </div>
            <div id="propostaValor" className="propostaValorDot border-y-4 border-l-8 border-pink-500  p-6  h-52 bg-white">
              <p className="py-2">teste</p>
            </div>
          </div>

          <div className="relative ml-1 mt-4">
            <div className="absolute -top-2 -left-4 bg-white text-pink-500 w-[290px] pl-2 py-1 rounded-md border-4 border-pink-500">
              Custos
            </div>
            <div className="border-4 border-l-8 border-pink-500 rounded-md p-6 w-11/12 h-26 bg-white">
              <p className="py-2">teste</p>
            </div>
          </div>

        </div>

        <div className="CONTEXTO E PROBLEMA w-full pr-14">
          <div className="relative ml-1 mt-16  w-full">
            <div className="absolute -top-2 -left-4 bg-[#6C4796] text-white w-[290px]  pl-2 py-1 rounded-md border-4 border-[#6C4796] uppercase font-semibold text-nowrap">
              Contexto e problema
            </div>
            <div id="contextoProblema" className="border-4 border-l-8 border-[#6C4796] rounded-md p-6  h-26 bg-white">
              <p className="py-2">teste</p>
            </div>
          </div>

          <div className="relative ml-1 mt-4  w-full">
            <div className="absolute -top-2 -left-4 bg-white text-[#6C4796] w-[290px]  pl-2 py-1 rounded-md border-4 border-[#6C4796]">
              Público / Foco do Impacto
            </div>
            <div id="publicoFoco" className="border-4 border-l-8 border-[#6C4796] rounded-md p-6  h-26 bg-white">
              <p className="py-2">teste</p>
            </div>
          </div>

          <div className="relative ml-1 mt-4  w-full">
            <div className="absolute -top-2 -left-4 bg-white text-[#6C4796] w-[290px]  pl-2 py-1 rounded-md border-4 border-[#6C4796]">
              Intervenções (estratégias)
            </div>
            <div id="intervencoesEstrategias" className="border-4 border-l-8 border-[#6C4796] rounded-md p-6  h-52 bg-white">
              <p className="py-2">teste</p>
            </div>
          </div>

          <div className="relative ml-1 mt-4">
            <div className="absolute -top-2 -left-4 bg-white text-[#6C4796] w-[290px] pl-2 py-1 rounded-md border-4 border-[#6C4796]">
              Saídas / Outputs
            </div>
            <div id="saidasOutputs" className="border-4 border-l-8 border-[#6C4796] rounded-md p-6 w-full h-26 bg-white">
              <p className="py-2">teste</p>
            </div>
          </div>

          <div className="relative ml-1 mt-8">
            <div className="absolute -top-2 -left-4 bg-white text-[#6C4796] w-[290px] pl-2 py-1 rounded-md border-4 border-[#6C4796]">
              Resultados Curto Prazo
            </div>
            <div className="border-x-4 border-t-4 border-l-8 border-[#6C4796] rounded-t-md p-6 w-full h-26 bg-white">
              <p className="py-2">teste</p>
            </div>
          </div>

          <div className="relative ml-1 mt-0">
            <div className="absolute -top-2 -left-4 bg-white text-[#6C4796] w-[290px] pl-2 py-1 rounded-md border-4 border-[#6C4796]">
              Resultados Curto Prazo
            </div>
            <div id="resultadosCurtoPrazo" className="border-x-4 border-b-4 border-l-8 border-[#6C4796] rounded-b-md p-6 w-full h-26 bg-white"
              style={{
                borderTop: 'dashed',
                borderColor: "#6C4796",
                borderTopWidth: 2,
              }}>
              <p className="py-2">teste</p>
            </div>
          </div>

          <div className="relative ml-1 mt-8 mb-80 w-full">
            <div className="absolute -top-2 -left-4 bg-[#6C4796] text-white w-[290px]  pl-2 py-1 rounded-md border-4 border-[#6C4796] uppercase font-semibold text-nowrap text-center">
              Visão de impacto
            </div>
            <div className="border-4  border-[#6C4796] rounded-md p-6  h-28 bg-white max-w-full">
              <p className="py-2">teste</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}