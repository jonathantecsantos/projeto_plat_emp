import { useEffect, useRef, useState } from "react"
import { useGetTeamByIdQuery, useGetTeamPrototypingByIdQuery } from "../../../api/studentApi"
import { useTemplateImages } from "../../../hooks/useTemplateImages"
import { AnexoTypeDescription } from "../../../model/prototyping"
import { getImageUrl } from "../../../utils/types"

const formatTextWithDashes = (text?: string, scale = 1) => {
  if (!text) return null
  const s = (val: number) => val * scale
  const items = text.split('-').filter((item) => item.trim() !== '')
  return (
    <div className="flex flex-col">
      {items.map((item, index) => (
        <p key={index} className="break-words break-all" style={scale !== 1 ? { fontSize: `${s(12)}px` } : {}}>
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

export const PrototypePreviewComponent = ({ id, disableAutoPrint = false, forExport = false, scale = 1 }: { id: number; disableAutoPrint?: boolean; forExport?: boolean; scale?: number }) => {
  const prototypeRef = useRef<HTMLDivElement>(null)
  const { data: prototyping, isFetching: isFetchingPrototyping } = useGetTeamPrototypingByIdQuery(id)
  const { data: team, isFetching: isFetchingTeam } = useGetTeamByIdQuery(id)
  const { headerBannerUrl, footerUrl } = useTemplateImages(team?.ano)

  const [imagesLoaded, setImagesLoaded] = useState(false)
  const s = (value: number) => value * scale;

  const getScaledStyle = (styles: Record<string, any>): React.CSSProperties => {
    if (scale === 1) return styles as React.CSSProperties;
    const scaled: Record<string, any> = {};
    for (const [key, value] of Object.entries(styles)) {
      if (typeof value === 'number') {
        scaled[key] = `${s(value)}px`;
      } else {
        scaled[key] = value;
      }
    }
    return scaled as React.CSSProperties;
  };

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


  const baseStyles = scale !== 1 ? {
    width: `${s(994)}px`,
    fontSize: `${s(12)}px`,
    filter: 'none'
  } : (forExport ? { width: '994px', fontSize: '18px', filter: 'none' } : {});


  return (
    <div
      id="prototype-capture-container"
      ref={prototypeRef}
      style={{
        backgroundColor: '#fefefe',
        colorAdjust: 'exact',
        WebkitPrintColorAdjust: 'exact',
        '--tw-bg-opacity': '1',
        '--tw-text-opacity': '1',
        '--tw-border-opacity': '1',
        ...getScaledStyle({ padding: 16 }),
        ...baseStyles
      } as unknown as React.CSSProperties}
      className="w-full bg-[#fefefe] mx-auto relative p-4 flex flex-col justify-between overflow-hidden text-slate-800 print:w-[994px] print:text-[12px] [color-adjust:exact] [webkit-print-color-adjust:exact]"
    >
      <div className="w-full flex justify-center shrink-0 mb-3" style={getScaledStyle({ marginBottom: 12 })}>
        <img
          src={headerBannerUrl}
          alt="Header DLEI"
          className="w-full max-h-[75px] object-contain print:max-h-[60px]"
          crossOrigin="anonymous"
          style={getScaledStyle({ maxHeight: 60 })}
        />
      </div>

      <div
        className="w-full border-4 border-[#075e95] rounded-xl bg-[#075e95] text-white shrink-0 overflow-hidden shadow-sm p-2 flex flex-col gap-2 mb-3"
        style={{
          backgroundColor: '#075e95',
          borderColor: '#075e95',
          ...getScaledStyle({
            borderWidth: 8,
            borderRadius: 12,
            padding: 8,
            gap: 8,
            marginBottom: 12
          })
        }}
      >
        <div
          className="flex items-center justify-between bg-white text-slate-900 rounded-lg px-3 py-1.5 border border-[#075e95]"
          style={{
            backgroundColor: '#ffffff',
            borderColor: '#075e95',
            ...getScaledStyle({
              paddingLeft: 12,
              paddingRight: 12,
              paddingTop: 6,
              paddingBottom: 6,
              borderRadius: 8,
              borderWidth: 1
            })
          }}
        >
          <div className="flex items-center gap-2 overflow-hidden" style={getScaledStyle({ gap: 8 })}>
            <span
              className="font-bold text-xs text-[#075e95] uppercase tracking-wider shrink-0"
              style={getScaledStyle({ fontSize: 13 })}
            >
              Projeto / Time:
            </span>
            <h2
              className="font-extrabold text-sm md:text-base text-slate-900 leading-none truncate break-words whitespace-pre-wrap"
              style={getScaledStyle({ fontSize: 15 })}
            >
              {team?.nomeEquipe}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-2 text-xs" style={getScaledStyle({ gap: 8, fontSize: 12 })}>
          <div
            className="col-span-6 bg-white text-slate-800 p-2 rounded-lg border border-slate-200 flex items-start gap-1 overflow-hidden"
            style={{
              backgroundColor: '#ffffff',
              ...getScaledStyle({ padding: 8, borderRadius: 8 })
            }}
          >
            <span className="font-bold text-[#075e95] shrink-0" style={getScaledStyle({ fontSize: 12 })}>Alunos:</span>
            <div className="flex flex-wrap gap-x-1 font-medium text-slate-800 break-words whitespace-pre-wrap overflow-hidden" style={getScaledStyle({ fontSize: 12 })}>
              {team?.alunos && team.alunos.length > 0 ? (
                formatNameList(team.alunos, (a) => `${a.nome || (a.primeiroNome ? `${a.primeiroNome} ${a.sobrenome}` : '')}`)
              ) : null}
            </div>
          </div>

          <div
            className="col-span-6 bg-white text-slate-800 p-2 rounded-lg border border-slate-200 flex items-start gap-1 overflow-hidden"
            style={{
              backgroundColor: '#ffffff',
              ...getScaledStyle({ padding: 8, borderRadius: 8 })
            }}
          >
            <span className="font-bold text-[#075e95] shrink-0" style={getScaledStyle({ fontSize: 12 })}>Orientadores:</span>
            <div className="flex flex-wrap gap-x-1 font-semibold text-slate-900 break-words whitespace-pre-wrap overflow-hidden" style={getScaledStyle({ fontSize: 12 })}>
              {team?.professores && team.professores.length > 0 ? (
                formatNameList(team.professores, (p) => `${p.nome || (p.primeiroNome ? `${p.primeiroNome} ${p.sobrenome}` : '')}`)
              ) : (
                null
              )}
            </div>
          </div>

          <div
            className="col-span-6 bg-white text-slate-800 p-2.5 rounded-lg border border-slate-200 flex flex-col justify-start overflow-hidden min-h-44"
            style={{
              backgroundColor: '#ffffff',
              ...getScaledStyle({ padding: 10, borderRadius: 8, minHeight: 140 })
            }}
          >
            <span className="font-bold text-xs text-[#075e95] mb-1.5 shrink-0 print:text-[10px]" style={getScaledStyle({ fontSize: 12, marginBottom: 6 })}>
              Texto:
            </span>
            <div className="flex-1 overflow-y-auto text-xs text-slate-800 font-medium leading-relaxed break-words whitespace-pre-wrap" style={getScaledStyle({ fontSize: 12, lineHeight: 18 })}>
              {prototyping?.tipoApoio}
            </div>
          </div>

          <div
            className="col-span-6 bg-white text-slate-800 p-2.5 rounded-lg border border-slate-200 flex flex-col justify-start overflow-hidden min-h-44 print:p-1.5"
            style={{
              backgroundColor: '#ffffff',
              ...getScaledStyle({ padding: 10, borderRadius: 8, minHeight: 140 })
            }}
          >
            <span className="font-bold text-xs text-[#075e95] mb-1.5 shrink-0 print:text-[10px]" style={getScaledStyle({ fontSize: 12, marginBottom: 6 })}>
              Imagem:
            </span>
            <div className="flex-1 rounded p-1 flex items-center justify-center overflow-hidden" style={getScaledStyle({ padding: 4 })}>
              {anexosUrls.length > 0 ? (
                <div
                  className={`w-full h-full grid gap-1.5 ${anexosUrls.length === 1
                    ? 'grid-cols-1 grid-rows-1'
                    : 'grid-cols-2 grid-rows-2'
                    } items-center justify-items-center overflow-hidden`}
                  style={getScaledStyle({ gap: 6 })}
                >
                  {anexosUrls.slice(0, 4).map((url, idx) => (
                    <div
                      key={idx}
                      className={`w-full h-full flex items-center justify-center overflow-hidden rounded ${anexosUrls.length === 3 && idx === 2 ? 'col-span-2' : ''
                        }`}
                      style={getScaledStyle({ borderRadius: 4 })}
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
                <span className="text-slate-400 text-xs italic" style={getScaledStyle({ fontSize: 12 })}>Nenhuma imagem enviada</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className="bg-[#628e48] p-2.5 rounded-xl flex flex-col shadow-sm print:p-2 print:rounded-lg mb-3 [color-adjust:exact] [webkit-print-color-adjust:exact]"
        style={{
          backgroundColor: '#628e48',
          colorAdjust: 'exact',
          WebkitPrintColorAdjust: 'exact',
          ...getScaledStyle({
            padding: 24,
            borderRadius: 16,
            marginBottom: 16
          })
        }}
      >
        <div className="grid grid-cols-2 gap-2.5 flex-1 min-h-0 print:gap-2" style={getScaledStyle({ gap: 16 })}>
          <div className="flex flex-col gap-2 min-h-0" style={getScaledStyle({ gap: 12 })}>
            <div
              className="flex-1 bg-white rounded-lg p-2 flex flex-col min-h-0 shadow-sm overflow-hidden"
              style={{
                backgroundColor: '#ffffff',
                ...getScaledStyle({ padding: 20, borderRadius: 12 })
              }}
            >
              <span
                className="font-bold text-xs text-[#628e48] mb-1 shrink-0 print:text-[10px]"
                style={getScaledStyle({ fontSize: 16, marginBottom: 8 })}
              >
                Instituição de impacto social:
              </span>
              <h3
                className="font-extrabold text-xs text-slate-900 leading-snug break-words whitespace-pre-wrap overflow-hidden print:text-[10px]"
                style={getScaledStyle({ fontSize: 13, lineHeight: 18 })}
              >
                {team?.instituicoes?.[0]?.descricao || 'Casa da criança Dr. João Moura.'}
              </h3>
            </div>

            <div
              className="flex-1 bg-white rounded-lg p-2 flex flex-col min-h-0 shadow-sm overflow-hidden"
              style={{
                backgroundColor: '#ffffff',
                ...getScaledStyle({ padding: 20, borderRadius: 12 })
              }}
            >
              <span
                className="font-bold text-xs text-[#628e48] mb-1 shrink-0 print:text-[10px]"
                style={getScaledStyle({ fontSize: 16, marginBottom: 8 })}
              >
                Proposta de valor da solução:
              </span>
              <div
                className="flex-1 overflow-hidden text-xs text-slate-800 leading-relaxed font-normal break-words whitespace-pre-wrap print:text-[10px] print:leading-tight"
                style={getScaledStyle({ fontSize: 13, lineHeight: 18 })}
              >
                {prototyping?.propostaValor || 'A Bolsa do Saber Nordestino transforma a alfabetização em uma experiência cultural, lúdica e significativa.'}
              </div>
            </div>

            <div
              className="flex-1 bg-white rounded-lg p-2 flex flex-col min-h-0 shadow-sm overflow-hidden"
              style={{
                backgroundColor: '#ffffff',
                ...getScaledStyle({ padding: 20, borderRadius: 12 })
              }}
            >
              <span
                className="font-bold text-xs text-[#628e48] mb-1 shrink-0 print:text-[10px]"
                style={getScaledStyle({ fontSize: 16, marginBottom: 8 })}
              >
                Principais necessidades para o desenvolvimento:
              </span>
              <div
                className="flex-1 overflow-hidden text-xs text-slate-800 leading-relaxed font-normal break-words whitespace-pre-wrap print:text-[10px] print:leading-tight"
                style={getScaledStyle({ fontSize: 13, lineHeight: 18 })}
              >
                {formatTextWithDashes(prototyping?.principaisNecessidades, scale) || (
                  <p className="break-words whitespace-pre-wrap" style={getScaledStyle({ fontSize: 13, lineHeight: 18 })}>
                    {prototyping?.principaisNecessidades || 'A Bolsa do Saber Nordestino é uma eco bag que contém materiais voltados ao aprendizado lúdico e cultural.'}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 min-h-0" style={getScaledStyle({ gap: 12 })}>
            <div
              className="flex-1 bg-white rounded-lg p-2 flex flex-col min-h-0 shadow-sm overflow-hidden"
              style={{
                backgroundColor: '#ffffff',
                ...getScaledStyle({ padding: 20, borderRadius: 12 })
              }}
            >
              <span
                className="font-bold text-xs text-[#628e48] mb-1 shrink-0 print:text-[10px]"
                style={getScaledStyle({ fontSize: 16, marginBottom: 8 })}
              >
                Problema identificado:
              </span>
              <div
                className="flex-1 overflow-hidden text-xs text-slate-800 leading-relaxed font-normal break-words whitespace-pre-wrap print:text-[10px] print:leading-tight"
                style={getScaledStyle({ fontSize: 13, lineHeight: 18 })}
              >
                {prototyping?.problemaPrincipal || 'As crianças estão cada vez mais expostas às telas e menos envolvidas com a leitura e o convívio social.'}
              </div>
            </div>

            <div
              className="flex-1 bg-white rounded-lg p-2 flex flex-col min-h-0 shadow-sm overflow-hidden"
              style={{
                backgroundColor: '#ffffff',
                ...getScaledStyle({ padding: 20, borderRadius: 12 })
              }}
            >
              <span
                className="font-bold text-xs text-[#628e48] mb-1 shrink-0 print:text-[10px]"
                style={getScaledStyle({ fontSize: 16, marginBottom: 8 })}
              >
                Vantagens competitivas da solução:
              </span>
              <div
                className="flex-1 overflow-hidden text-xs text-slate-800 leading-relaxed font-normal break-words whitespace-pre-wrap print:text-[10px] print:leading-tight"
                style={getScaledStyle({ fontSize: 13, lineHeight: 18 })}
              >
                {prototyping?.vantagemCompetitiva || 'A Bolsa do Saber Nordestino se destaca por unir cultura, ludicidade e sustentabilidade.'}
              </div>
            </div>

            <div
              className="flex-1 bg-white rounded-lg p-2 flex flex-col min-h-0 shadow-sm overflow-hidden"
              style={{
                backgroundColor: '#ffffff',
                ...getScaledStyle({ padding: 20, borderRadius: 12 })
              }}
            >
              <span
                className="font-bold text-xs text-[#628e48] mb-1 shrink-0 print:text-[10px]"
                style={getScaledStyle({ fontSize: 16, marginBottom: 8 })}
              >
                Parcerias estratégicas para o desenvolvimento:
              </span>
              <div
                className="flex-1 overflow-hidden text-xs text-slate-800 leading-relaxed font-normal break-words whitespace-pre-wrap print:text-[10px] print:leading-tight"
                style={getScaledStyle({ fontSize: 13, lineHeight: 18 })}
              >
                {prototyping?.parcerias || 'A parceria com o Instituto Yandú Educação fortalece a proposta da Bolsa do Saber Nordestino.'}
              </div>
            </div>
          </div>
        </div>
      </div>


      <div
        className="bg-[#d56928] p-2.5 rounded-xl flex flex-col shadow-sm print:p-2 print:rounded-lg mb-3 [color-adjust:exact] [webkit-print-color-adjust:exact]"
        style={{
          backgroundColor: '#d56928',
          colorAdjust: 'exact',
          WebkitPrintColorAdjust: 'exact',
          ...getScaledStyle({
            padding: 24,
            borderRadius: 16,
            marginBottom: 16
          })
        }}
      >
        <div className="grid grid-cols-2 gap-2.5 flex-1 min-h-0 print:gap-2" style={getScaledStyle({ gap: 16 })}>
          <div
            className="bg-white rounded-lg p-2 flex flex-col min-h-0 shadow-sm overflow-hidden print:p-1.5"
            style={{
              backgroundColor: '#ffffff',
              ...getScaledStyle({ padding: 20, borderRadius: 12 })
            }}
          >
            <span
              className="font-bold text-xs text-[#d56928] mb-1 shrink-0 print:text-[10px]"
              style={getScaledStyle({ fontSize: 16, marginBottom: 8 })}
            >
              Cronograma de construção do protótipo:
            </span>
            <div
              className="flex-1 bg-slate-50 rounded p-1 flex items-center justify-center overflow-hidden min-h-36"
              style={{
                backgroundColor: '#f8fafc',
                ...getScaledStyle({ padding: 8, borderRadius: 8, minHeight: 180 })
              }}
            >
              {cronogramaUrl ? (
                <img
                  src={cronogramaUrl}
                  alt="Cronograma de Construção do Protótipo"
                  className="max-w-full max-h-full object-contain"
                  crossOrigin="anonymous"
                  style={getScaledStyle({ maxHeight: 220, borderRadius: 8 })}
                />
              ) : (
                <span className="text-slate-400 text-xs italic" style={getScaledStyle({ fontSize: 13 })}>
                  Nenhuma imagem de cronograma enviada
                </span>
              )}
            </div>
          </div>

          <div
            className="bg-white rounded-lg p-2 flex flex-col min-h-0 shadow-sm print:p-1.5"
            style={{
              backgroundColor: '#ffffff',
              ...getScaledStyle({ padding: 20, borderRadius: 12 })
            }}
          >
            <span
              className="font-bold text-xs text-[#d56928] mb-1 print:text-[10px]"
              style={getScaledStyle({ fontSize: 16, marginBottom: 8 })}
            >
              Memorial descritivo:
            </span>
            <div
              className="flex-1 bg-slate-50 rounded p-1 flex items-center justify-center overflow-hidden min-h-36"
              style={{
                backgroundColor: '#f8fafc',
                ...getScaledStyle({ padding: 8, borderRadius: 8, minHeight: 180 })
              }}
            >
              {memorialUrl ? (
                <img
                  src={memorialUrl}
                  alt="Memorial Descritivo"
                  className="max-w-full max-h-full object-contain"
                  crossOrigin="anonymous"
                  style={getScaledStyle({ maxHeight: 220, borderRadius: 8 })}
                />
              ) : (
                <span className="text-slate-400 text-xs italic" style={getScaledStyle({ fontSize: 13 })}>
                  Nenhuma imagem de memorial descritivo enviada
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center shrink-0">
        <img
          src={footerUrl}
          alt="Footer Realização e Parcerias"
          className="w-full max-h-[45px] object-contain print:max-h-[35px]"
          crossOrigin="anonymous"
          style={getScaledStyle({ maxHeight: 45 })}
        />
      </div>
    </div>
  )
}
