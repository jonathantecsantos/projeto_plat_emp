import { useEffect, useRef, useState } from "react"
import { useGetTeamByIdQuery, useGetTeamPrototypingByIdQuery } from "../../../api/studentApi"
import { useTemplateImages } from "../../../hooks/useTemplateImages"
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
  const { headerBannerUrl, footer2025Url } = useTemplateImages(team?.ano)

  const [imagesLoaded, setImagesLoaded] = useState(false)

  const UPLOAD_FOLDER = import.meta.env.VITE_UPLOAD_FOLDER
  const API_URL = import.meta.env.VITE_API_URL

  const cronogramaAnexo = prototyping?.anexos?.find((a) => a.tipoAnexoPrototipo?.descricao === AnexoTypeDescription.CRONOGRAMA_CONSTRUCAO && !a.caminhoAnexo.endsWith('.pdf'))
  const memorialAnexo = prototyping?.anexos?.find((a) => a.tipoAnexoPrototipo?.descricao === AnexoTypeDescription.MEMORIAL_DESCRITIVO && !a.caminhoAnexo.endsWith('.pdf'))
  const anexosList = prototyping?.anexos?.filter((a) => a.tipoAnexoPrototipo?.descricao === AnexoTypeDescription.ANEXO && !a.caminhoAnexo.endsWith('.pdf')) || []

  const cronogramaUrl = cronogramaAnexo ? getImageUrl(cronogramaAnexo.caminhoAnexo, UPLOAD_FOLDER, API_URL) : null
  const memorialUrl = memorialAnexo ? getImageUrl(memorialAnexo.caminhoAnexo, UPLOAD_FOLDER, API_URL) : null
  const anexosUrls = anexosList.map((a) => getImageUrl(a.caminhoAnexo, UPLOAD_FOLDER, API_URL)).filter(Boolean) as string[]

  useEffect(() => {
    const imageUrls = [cronogramaUrl, memorialUrl, ...anexosUrls].filter(Boolean) as string[]
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
  }, [cronogramaUrl, memorialUrl, JSON.stringify(anexosUrls)])

  useEffect(() => {
    if (disableAutoPrint) return

    const handleAfterPrint = () => {
      window.close()
    }

    window.onafterprint = handleAfterPrint

    if (!isFetchingPrototyping && !isFetchingTeam && prototyping && imagesLoaded) {
      window.print()
    }

    return () => {
      window.onafterprint = null
    }
  }, [isFetchingPrototyping, isFetchingTeam, prototyping, team, imagesLoaded, disableAutoPrint])

  useEffect(() => {
    if (disableAutoPrint) return

    if (!isFetchingPrototyping && !isFetchingTeam && prototyping && imagesLoaded) {
      window.opener?.postMessage("ready-to-print-prototype", window.location.origin)
    }
  }, [isFetchingPrototyping, isFetchingTeam, prototyping, imagesLoaded, disableAutoPrint])

  return (
    <>
      <div
        ref={bannerRef}
        className="p-4 flex flex-col justify-between overflow-hidden relative text-slate-800 w-full h-full max-h-screen print:w-screen print:h-screen print:max-h-screen"
        style={{
          transform: scale !== 1 ? `scale(${scale})` : undefined,
          transformOrigin: 'top left',
        }}>
        <div className="w-full flex justify-center shrink-0">
          <img src={headerBannerUrl} alt="Header DLEI" className="w-full max-h-[75px] object-contain print:max-h-[60px]" crossOrigin="anonymous" />
        </div>

        <div className="w-full border-4 border-[#075e95] rounded-xl bg-[#075e95] text-white shrink-0 overflow-hidden shadow-sm p-2 flex flex-col gap-2">
          <div className="flex items-center justify-between bg-white text-slate-900 rounded-lg px-3 py-1.5 border border-[#075e95]">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="font-bold text-xs text-[#075e95] uppercase tracking-wider shrink-0">Projeto / Time:</span>
              <h2 className="font-extrabold text-sm md:text-base text-slate-900 leading-none truncate break-words whitespace-pre-wrap">
                {team?.nomeEquipe}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-2 text-xs">
            <div className="col-span-6 bg-white text-slate-800 p-2 rounded-lg border border-slate-200 flex items-start gap-1 overflow-hidden">
              <span className="font-bold text-[#075e95] shrink-0">Alunos:</span>
              <div className="flex flex-wrap gap-x-1 font-medium text-slate-800 break-words whitespace-pre-wrap overflow-hidden">
                {team?.alunos && team.alunos.length > 0 ? (
                  formatNameList(team.alunos, (a) => `${a.nome || (a.primeiroNome ? `${a.primeiroNome} ${a.sobrenome}` : '')}`)
                ) : (
                  <span>Thiago Cabral, Yasmin Santos, Letícia Estrela, João Victor Procópio, Gustavo Curvêlo, Rafael Nascimento, Heitor Barros.</span>
                )}
              </div>
            </div>
            <div className="col-span-6 bg-white text-slate-800 p-2 rounded-lg border border-slate-200 flex items-start gap-1 overflow-hidden">
              <span className="font-bold text-[#075e95] shrink-0">Orientadores:</span>
              <div className="flex flex-wrap gap-x-1 font-semibold text-slate-900 break-words whitespace-pre-wrap overflow-hidden">
                {team?.professores && team.professores.length > 0 ? (
                  formatNameList(team.professores, (p) => `${p.nome || (p.primeiroNome ? `${p.primeiroNome} ${p.sobrenome}` : '')}`)
                ) : (
                  <span>Helder Alves</span>
                )}
              </div>
            </div>
            <div className="col-span-6 bg-white text-slate-800 p-2.5 rounded-lg border border-slate-200 flex flex-col justify-start overflow-hidden h-44">
              <span className="font-bold text-xs text-[#075e95] mb-1.5 shrink-0 print:text-[10px]">
                Texto:
              </span>
              <div className="flex-1 overflow-y-auto text-xs text-slate-800 font-medium leading-relaxed break-words whitespace-pre-wrap">
                {prototyping?.tipoApoio || 'O projeto é desenvolvido pelos alunos, que assumem papel ativo na criação, produção e apresentação dos cordéis. Mais que um produto, é uma ideia, um método de ensino e aprendizagem.'}
              </div>
            </div>

            <div className="col-span-6 bg-white text-slate-800 p-2.5 rounded-lg border border-slate-200 flex flex-col justify-start overflow-hidden h-44 print:p-1.5">
              <span className="font-bold text-xs text-[#075e95] mb-1.5 shrink-0 print:text-[10px]">
                Imagem:
              </span>
              <div className="flex-1 rounded p-1 flex items-center justify-center overflow-hidden">
                {anexosUrls.length > 0 ? (
                  <div
                    className={`w-full h-full grid gap-1.5 ${anexosUrls.length === 1
                      ? 'grid-cols-1 grid-rows-1'
                      : 'grid-cols-2 grid-rows-2'
                      } items-center justify-items-center overflow-hidden`}
                  >
                    {anexosUrls.slice(0, 4).map((url, idx) => (
                      <div
                        key={idx}
                        className={`w-full h-full flex items-center justify-center overflow-hidden rounded ${anexosUrls.length === 3 && idx === 2 ? 'col-span-2' : ''
                          }`}
                      >
                        <img
                          src={url}
                          alt={`Anexo ${idx + 1}`}
                          className="max-w-full max-h-full object-contain"
                          crossOrigin="anonymous"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-slate-400 text-xs italic">Nenhuma imagem enviada</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-[#628e48] p-2.5 rounded-xl flex flex-col min-h-0 shadow-sm print:p-2 print:rounded-lg">
          <div className="grid grid-cols-2 gap-2.5 flex-1 min-h-0 print:gap-2">
            <div className="flex flex-col gap-2 min-h-0">
              <div className="flex-1 bg-white rounded-lg p-2 flex flex-col min-h-0 shadow-sm overflow-hidden">
                <span className="font-bold text-xs text-[#628e48] mb-1 shrink-0 print:text-[10px]">
                  Instituição de impacto social:
                </span>
                <h3 className="font-extrabold text-xs text-slate-900 leading-snug break-words whitespace-pre-wrap overflow-hidden print:text-[10px]">
                  {team?.instituicoes?.[0]?.descricao}
                </h3>
              </div>

              <div className="flex-1 bg-white rounded-lg p-2 flex flex-col min-h-0 shadow-sm overflow-hidden">
                <span className="font-bold text-xs text-[#628e48] mb-1 shrink-0 print:text-[10px]">
                  Proposta de valor da solução:
                </span>
                <div className="flex-1 overflow-hidden text-xs text-slate-800 leading-relaxed font-normal break-words whitespace-pre-wrap print:text-[10px] print:leading-tight">
                  {prototyping?.propostaValor || 'A Bolsa do Saber Nordestino transforma a alfabetização em uma experiência cultural, lúdica e significativa.'}
                </div>
              </div>

              <div className="flex-1 bg-white rounded-lg p-2 flex flex-col min-h-0 shadow-sm overflow-hidden">
                <span className="font-bold text-xs text-[#628e48] mb-1 shrink-0 print:text-[10px]">
                  Principais necessidades para o desenvolvimento:
                </span>
                <div className="flex-1 overflow-hidden text-xs text-slate-800 leading-relaxed font-normal break-words whitespace-pre-wrap print:text-[10px] print:leading-tight">
                  {formatTextWithDashes(prototyping?.principaisNecessidades) || (
                    <p className="break-words whitespace-pre-wrap">{prototyping?.principaisNecessidades || 'A Bolsa do Saber Nordestino é uma eco bag que contém materiais voltados ao aprendizado lúdico e cultural.'}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 min-h-0">
              <div className="flex-1 bg-white rounded-lg p-2 flex flex-col min-h-0 shadow-sm overflow-hidden">
                <span className="font-bold text-xs text-[#628e48] mb-1 shrink-0 print:text-[10px]">
                  Problema identificado:
                </span>
                <div className="flex-1 overflow-hidden text-xs text-slate-800 leading-relaxed font-normal break-words whitespace-pre-wrap print:text-[10px] print:leading-tight">
                  {prototyping?.problemaPrincipal || 'As crianças estão cada vez mais expostas às telas e menos envolvidas com a leitura e o convívio social.'}
                </div>
              </div>

              <div className="flex-1 bg-white rounded-lg p-2 flex flex-col min-h-0 shadow-sm overflow-hidden">
                <span className="font-bold text-xs text-[#628e48] mb-1 shrink-0 print:text-[10px]">
                  Vantagens competitivas da solução:
                </span>
                <div className="flex-1 overflow-hidden text-xs text-slate-800 leading-relaxed font-normal break-words whitespace-pre-wrap print:text-[10px] print:leading-tight">
                  {prototyping?.vantagemCompetitiva || 'A Bolsa do Saber Nordestino se destaca por unir cultura, ludicidade e sustentabilidade.'}
                </div>
              </div>

              <div className="flex-1 bg-white rounded-lg p-2 flex flex-col min-h-0 shadow-sm overflow-hidden">
                <span className="font-bold text-xs text-[#628e48] mb-1 shrink-0 print:text-[10px]">
                  Parcerias estratégicas para o desenvolvimento:
                </span>
                <div className="flex-1 overflow-hidden text-xs text-slate-800 leading-relaxed font-normal break-words whitespace-pre-wrap print:text-[10px] print:leading-tight">
                  {prototyping?.parcerias || 'A parceria com o Instituto Yandú Educação fortalece a proposta da Bolsa do Saber Nordestino.'}
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="bg-[#d56928] p-2.5 rounded-xl h-[26%] flex flex-col min-h-0 shrink-0 shadow-sm print:p-2 print:h-[25%] print:rounded-lg">
          <div className="grid grid-cols-2 gap-2.5 flex-1 min-h-0 print:gap-2">
            <div className="bg-white rounded-lg p-2 flex flex-col min-h-0 shadow-sm overflow-hidden print:p-1.5">
              <span className="font-bold text-xs text-[#d56928] mb-1 shrink-0 print:text-[10px]">
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

        <div className="w-full flex justify-center shrink-0">
          <img src={footer2025Url} alt="Footer Realização e Parcerias" className="w-full max-h-[45px] object-contain print:max-h-[35px]" crossOrigin="anonymous" />
        </div>
      </div>
    </>
  )
}



