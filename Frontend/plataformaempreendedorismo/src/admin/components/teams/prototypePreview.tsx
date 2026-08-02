import footer from '@assets/footer2025.png'
import header from '@assets/header.jpg'
import { useEffect, useRef, useState } from "react"
import { useGetTeamByIdQuery, useGetTeamPrototypingByIdQuery } from "../../../api/studentApi"
import { AnexoTypeDescription } from "../../../model/prototyping"
import { getImageUrl } from "../../../utils/types"

const formatTextWithDashes = (text?: string) => {
  if (!text) return null
  const items = text.split('-').filter((item) => item.trim() !== '')
  return (
    <div className="flex flex-col">
      {items.map((item, index) => (
        <p key={index} className="break-words break-all">
          - {item.trim()}
        </p>
      ))}
    </div>
  )
}

const formatName = (fullName?: string) => {
  if (!fullName) return ''
  const nameParts = fullName.trim().split(' ').filter(part => part.length > 0)
  if (nameParts.length <= 1) return fullName
  return `${nameParts[0]} ${nameParts[nameParts.length - 1]}`
}

const formatNameList = (items: any[], getName: (item: any) => string) => {
  if (!items || items.length === 0) return null
  return items.map((item, index) => {
    const isLast = index === items.length - 1
    const punctuation = isLast ? '.' : ','
    return (
      <span key={index} className="ml-1">
        {formatName(getName(item))}{punctuation}
      </span>
    )
  })
}

export const PrototypePreviewComponent = ({ id, disableAutoPrint = false, scale = 1 }: { id: number; disableAutoPrint?: boolean; scale?: number }) => {
  const bannerRef = useRef<HTMLDivElement>(null)
  const { data: prototyping, isFetching: isFetchingPrototyping } = useGetTeamPrototypingByIdQuery(id)
  const { data: team, isFetching: isFetchingTeam } = useGetTeamByIdQuery(id)

  const [imagesLoaded, setImagesLoaded] = useState(false)

  const UPLOAD_FOLDER = import.meta.env.VITE_UPLOAD_FOLDER
  const API_URL = import.meta.env.VITE_API_URL

  const cronogramaAnexo = prototyping?.anexos?.find((a) => a.tipoAnexoPrototipo?.descricao === AnexoTypeDescription.CRONOGRAMA_CONSTRUCAO && !a.caminhoAnexo.endsWith('.pdf'))
  const memorialAnexo = prototyping?.anexos?.find((a) => a.tipoAnexoPrototipo?.descricao === AnexoTypeDescription.MEMORIAL_DESCRITIVO && !a.caminhoAnexo.endsWith('.pdf'))

  const cronogramaUrl = cronogramaAnexo ? getImageUrl(cronogramaAnexo.caminhoAnexo, UPLOAD_FOLDER, API_URL) : null
  const memorialUrl = memorialAnexo ? getImageUrl(memorialAnexo.caminhoAnexo, UPLOAD_FOLDER, API_URL) : null

  const avatar = getImageUrl(team?.logomarcaTime || '', UPLOAD_FOLDER, API_URL)

  useEffect(() => {
    const imageUrls = [cronogramaUrl, memorialUrl, avatar].filter(Boolean) as string[]
    if (imageUrls.length > 0) {
      let loaded = 0
      imageUrls.forEach((url) => {
        const img = new Image()
        img.src = url
        img.crossOrigin = "anonymous"
        img.onload = () => {
          loaded++
          if (loaded === imageUrls.length) setImagesLoaded(true)
        }
        img.onerror = () => {
          loaded++
          if (loaded === imageUrls.length) setImagesLoaded(true)
        }
      })
    } else {
      setImagesLoaded(true)
    }
  }, [cronogramaUrl, memorialUrl, avatar])

  useEffect(() => {
    if (!disableAutoPrint && !isFetchingPrototyping && !isFetchingTeam && prototyping && imagesLoaded) {
      setTimeout(() => {
        if (window.opener) {
          window.opener.postMessage("ready-to-print-banner", "*")
        } else {
          window.print()
        }
      }, 800)
    }
  }, [isFetchingPrototyping, isFetchingTeam, prototyping, team, imagesLoaded, disableAutoPrint])

  return (
    <>
      <style>{`
        @media print {
          @page {
            margin: 0;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
          }
          .prototype-print-wrapper {
            width: 100vw !important;
            height: 100vh !important;
            max-height: 100vh !important;
            padding: 8px 12px !important;
            margin: 0 !important;
            box-shadow: none !important;
            border: none !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
          }
        }
      `}</style>
      <div
        ref={bannerRef}
        className="prototype-print-wrapper bg-[#fefefe] flex flex-col justify-between overflow-hidden shadow-2xl relative font-sans text-slate-800 w-[1120px] h-[790px] p-3 gap-2.5 print:w-screen print:h-screen print:max-h-screen print:p-2 print:gap-1.5 print:shadow-none"
        style={{
          transform: scale !== 1 ? `scale(${scale})` : undefined,
          transformOrigin: 'top left',
        }}
      >
        {/* Header Banner */}
        <div className="w-full flex justify-center shrink-0">
          <img src={header} alt="Header DLEI 2025" className="w-full max-h-[85px] object-contain print:max-h-[70px]" />
        </div>

        {/* Sessão 1: Informações do Time (Topo) */}
        <div className="w-full border-4 border-[#075e95] rounded-xl bg-white shrink-0 overflow-hidden shadow-sm">
          <div className="bg-white px-3 py-1.5 border-b-2 border-[#075e95] flex items-center gap-2">
            <span className="font-bold text-xs text-[#075e95] uppercase tracking-wider">Projeto:</span>
            <h2 className="font-extrabold text-base text-slate-900 leading-none">
              {team?.nomeEquipe || 'Aprender com Cordel'}
            </h2>
          </div>
          <div className="grid grid-cols-12 text-xs bg-white">
            <div className="col-span-7 p-2 border-r-2 border-[#075e95] flex items-start gap-1">
              <span className="font-bold text-[#075e95]">Alunos:</span>
              <div className="flex flex-wrap gap-x-1 font-medium text-slate-800">
                {team?.alunos && team.alunos.length > 0 ? (
                  formatNameList(team.alunos, (a) => `${a.nome || (a.primeiroNome ? `${a.primeiroNome} ${a.sobrenome}` : '')}`)
                ) : (
                  <span>Thiago Cabral, Yasmin Santos, Letícia Estrela, João Victor Procópio, Gustavo Curvêlo, Rafael Nascimento, Heitor Barros.</span>
                )}
              </div>
            </div>
            <div className="col-span-5 p-2 flex items-start gap-1">
              <span className="font-bold text-[#075e95]">Orientadores:</span>
              <div className="flex flex-wrap gap-x-1 font-semibold text-slate-900">
                {team?.professores && team.professores.length > 0 ? (
                  formatNameList(team.professores, (p) => `${p.nome || (p.primeiroNome ? `${p.primeiroNome} ${p.sobrenome}` : '')}`)
                ) : (
                  <span>Helder Alves</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sessão 2: Outer Box Verde (#628e48) com Divs Brancas Internas */}
        <div className="flex-1 bg-[#628e48] p-3 rounded-xl flex flex-col min-h-0 shadow-sm print:p-2 print:rounded-lg">
          <div className="grid grid-cols-2 gap-3 flex-1 min-h-0 print:gap-2">
            {/* Coluna Esquerda */}
            <div className="flex flex-col gap-2.5 min-h-0 print:gap-2 ">
              {/* Instituição de impacto social */}
              <div className="flex-1 bg-white rounded-lg p-2.5 flex flex-col min-h-0 shadow-sm print:p-2">
                <span className="font-bold text-xs text-[#628e48] mb-1 print:text-[10px]">
                  Instituição da impacto social:
                </span>
                <h3 className="font-extrabold text-sm text-slate-900 leading-snug print:text-xs">
                  {team?.instituicoes?.[0]?.descricao || team?.nomeEquipe || 'Casa da criança Dr. João Moura.'}
                </h3>
              </div>
              
              {/* Proposta de valor da solução */}
              <div className="flex-1 bg-white rounded-lg p-2.5 flex flex-col min-h-0 shadow-sm print:p-2">
                <span className="font-bold text-xs text-[#628e48] mb-1 print:text-[10px]">
                  Proposta de valor da solução:
                </span>
                <div className="flex-1 overflow-hidden text-xs text-slate-800 leading-relaxed font-normal print:text-[10px] print:leading-tight">
                  {prototyping?.propostaValor || 'A Bolsa do Saber Nordestino transforma a alfabetização em uma experiência cultural, lúdica e significativa. Ela une leitura de cordéis, jogos educativos e atividades criativas para estimular o aprendizado, a imaginação e o orgulho pela cultura nordestina.'}
                </div>
              </div>

              {/* Principais necessidades para o desenvolvimento */}
              <div className="flex-1 bg-white rounded-lg p-2.5 flex flex-col min-h-0 shadow-sm print:p-2">
                <span className="font-bold text-xs text-[#628e48] mb-1 print:text-[10px]">
                  Principais necessidades para o desenvolvimento:
                </span>
                <div className="flex-1 overflow-hidden text-xs text-slate-800 leading-relaxed font-normal print:text-[10px] print:leading-tight">
                  {formatTextWithDashes(prototyping?.principaisNecessidades) || (
                    <p>{prototyping?.principaisNecessidades || 'A Bolsa do Saber Nordestino é uma eco bag que contém materiais voltados ao aprendizado lúdico e cultural.'}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Coluna Direita */}
            <div className="flex flex-col gap-2.5 min-h-0 print:gap-2">
              {/* Problema identificado */}
              <div className="flex-1 bg-white rounded-lg p-2.5 flex flex-col min-h-0 shadow-sm print:p-2">
                <span className="font-bold text-xs text-[#628e48] mb-1 print:text-[10px]">
                  Problema identificado:
                </span>
                <div className="flex-1 overflow-hidden text-xs text-slate-800 leading-relaxed font-normal print:text-[10px] print:leading-tight">
                  {prototyping?.problemaPrincipal || 'As crianças estão cada vez mais expostas às telas e menos envolvidas com a leitura e o convívio social. Diante disso, surgiu a necessidade de criar um método mais dinâmico e cultural.'}
                </div>
              </div>

              {/* Vantagens competitivas da solução */}
              <div className="flex-1 bg-white rounded-lg p-2.5 flex flex-col min-h-0 shadow-sm print:p-2">
                <span className="font-bold text-xs text-[#628e48] mb-1 print:text-[10px]">
                  Vantagens competitivas da solução:
                </span>
                <div className="flex-1 overflow-hidden text-xs text-slate-800 leading-relaxed font-normal print:text-[10px] print:leading-tight">
                  {prototyping?.vantagemCompetitiva || 'A Bolsa do Saber Nordestino se destaca por unir cultura, ludicidade e sustentabilidade em um único material educativo.'}
                </div>
              </div>

              {/* Parcerias estratégicas para o desenvolvimento */}
              <div className="flex-1 bg-white rounded-lg p-2.5 flex flex-col min-h-0 shadow-sm print:p-2">
                <span className="font-bold text-xs text-[#628e48] mb-1 print:text-[10px]">
                  Parcerias estratégicas para o desenvolvimento:
                </span>
                <div className="flex-1 overflow-hidden text-xs text-slate-800 leading-relaxed font-normal print:text-[10px] print:leading-tight">
                  {prototyping?.parcerias || 'A parceria com o Instituto Yandú Educação fortalece a proposta da Bolsa do Saber Nordestino, unindo conhecimento pedagógico e experiência prática.'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sessão 3: Outer Box Laranja (#d56928) - Cronograma & Memorial */}
        <div className="bg-[#d56928] p-3 rounded-xl h-[26%] flex flex-col min-h-0 shrink-0 shadow-sm print:p-2 print:h-[25%] print:rounded-lg">
          <div className="grid grid-cols-2 gap-3 flex-1 min-h-0 print:gap-2">
            {/* Cronograma de construção do protótipo */}
            <div className="bg-white rounded-lg p-2 flex flex-col min-h-0 shadow-sm print:p-1.5">
              <span className="font-bold text-xs text-[#d56928] mb-1 print:text-[10px]">
                Cronograma de construção do protótipo:
              </span>
              <div className="flex-1 bg-slate-50 rounded p-1 flex items-center justify-center overflow-hidden">
                {cronogramaUrl ? (
                  <img
                    src={cronogramaUrl}
                    alt="Cronograma de Construção do Protótipo"
                    className="max-w-full max-h-full object-contain"
                    crossOrigin="anonymous"
                  />
                ) : (
                  <span className="text-slate-400 text-xs italic">Nenhuma imagem de cronograma enviada</span>
                )}
              </div>
            </div>

            {/* Memorial descritivo */}
            <div className="bg-white rounded-lg p-2 flex flex-col min-h-0 shadow-sm print:p-1.5">
              <span className="font-bold text-xs text-[#d56928] mb-1 print:text-[10px]">
                Memorial descritivo:
              </span>
              <div className="flex-1 bg-slate-50 rounded p-1 flex items-center justify-center overflow-hidden">
                {memorialUrl ? (
                  <img
                    src={memorialUrl}
                    alt="Memorial Descritivo"
                    className="max-w-full max-h-full object-contain"
                    crossOrigin="anonymous"
                  />
                ) : (
                  <span className="text-slate-400 text-xs italic">Nenhuma imagem de memorial descritivo enviada</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Banner */}
        <div className="w-full flex justify-center shrink-0">
          <img src={footer} alt="Footer Realização e Parcerias" className="w-full max-h-[50px] object-contain print:max-h-[40px]" />
        </div>
      </div>
    </>
  )
}


