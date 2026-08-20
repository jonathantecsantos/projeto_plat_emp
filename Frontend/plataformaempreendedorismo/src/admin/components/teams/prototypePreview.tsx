import { Student } from "@/model/student"
import { Teacher } from "@/model/teacher"
import { useEffect, useRef, useState } from "react"
import { useGetTeamByIdQuery, useGetTeamPrototypingByIdQuery } from "../../../api/studentApi"
import { useTemplateImages } from "../../../hooks/useTemplateImages"
import { AnexoTypeDescription } from "../../../model/prototyping"
import { getImageUrl } from "../../../utils/types"


const formatName = (fullName?: string) => {
  if (!fullName) return ''
  const nameParts = fullName.trim().split(' ').filter(part => part.length > 0)
  if (nameParts.length <= 1) return fullName
  return `${nameParts[0]} ${nameParts[nameParts.length - 1]}`
}

export const PrototypePreviewComponent = ({
  id,
  disableAutoPrint = false,
  forExport = false,
  scale = 1
}: {
  id: number
  disableAutoPrint?: boolean
  forExport?: boolean
  scale?: number
}) => {
  const prototypeRef = useRef<HTMLDivElement>(null)
  const { data: prototyping, isFetching: isFetchingPrototyping } = useGetTeamPrototypingByIdQuery(id)
  const { data: team, isFetching: isFetchingTeam } = useGetTeamByIdQuery(id)
  const { headerBannerUrl, footerBannerUrl } = useTemplateImages(team?.ano)

  const [imagesLoaded, setImagesLoaded] = useState(false)
  const s = (value: number) => value * scale


  const UPLOAD_FOLDER = import.meta.env.VITE_UPLOAD_FOLDER
  const API_URL = import.meta.env.VITE_API_URL

  const cronogramaAnexo = prototyping?.anexos?.find(
    (a) => a.tipoAnexoPrototipo?.descricao === AnexoTypeDescription.CRONOGRAMA_CONSTRUCAO && !a.caminhoAnexo.endsWith('.pdf')
  )
  const memorialAnexo = prototyping?.anexos?.find(
    (a) => a.tipoAnexoPrototipo?.descricao === AnexoTypeDescription.MEMORIAL_DESCRITIVO && !a.caminhoAnexo.endsWith('.pdf')
  )
  const anexosList = prototyping?.anexos?.filter(
    (a) => a.tipoAnexoPrototipo?.descricao === AnexoTypeDescription.ANEXO && !a.caminhoAnexo.endsWith('.pdf')
  ) || []

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
    paddingInline: `${s(8)}px`,
    filter: 'none'
  } : (forExport ? { width: '994px', fontSize: '18px', filter: 'none' } : {})

  const students = team?.alunos || []
  const teachers = team?.professores || []

  return (
    <div className="w-full h-full mx-auto relative print:w-[994px] print:blur-none"
      ref={prototypeRef}
      id="prototype-capture-container"
      style={{
        backgroundColor: '#fefefe',
        ...baseStyles
      }}
    >
      <div className="w-full" style={{ position: 'relative', zIndex: 1, overflow: 'visible' }}>
        <img
          src={headerBannerUrl}
          alt="Header DLEI"
          className="w-full object-contain"
          crossOrigin="anonymous"
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain'
          }}
        />
      </div>

      <div className="flex flex-col p-[8px]" style={{
        backgroundColor: '#075e95',
        padding: `${s(8)}px`,
        marginTop: `${s(8)}px`
      }}>
        <div className="overflow-hidden flex flex-col" style={{
          backgroundColor: '#fefefe',
          border: `${s(4)}px solid #075e95`,
          borderRadius: `${s(12)}px`
        }}>
          <div className="flex items-center p-[8px]" style={{ padding: `${s(8)}px` }}>
            <span style={{ color: '#075e95', fontWeight: 'bold', fontSize: `${s(12)}px` }}>
              Projeto:
            </span>
            <h2 className="tracking-wider ml-4" style={{ color: '#1e293b', fontWeight: 'bold', fontSize: `${s(22)}px`, marginLeft: `${s(12)}px` }}>
              {team?.nomeEquipe}
            </h2>
          </div>

          <hr className="divider w-full" style={{ backgroundColor: '#075e95', height: `${s(4)}px`, border: 'none' }} />

          <div className="grid grid-cols-2 w-full">
            <div className="flex flex-col justify-start p-[6px]" style={{ borderRight: `${s(2)}px solid #075e95`, padding: `${s(6)}px`, }}>
              <span style={{ color: '#075e95', fontWeight: 'bold', fontSize: `${s(12)}px` }}>
                Alunos:
              </span>
              <div
                className="w-full grid"
                style={{
                  gridTemplateColumns: `repeat(${students?.length > 5 ? 3 : 2}, minmax(0, 1fr))`,
                }}>
                {students.length > 0 ? (
                  students.map((aluno: Student, index: number) => {
                    const name = aluno.nome
                    return (
                      <span
                        key={index}
                        className="truncate break-words ml-12"
                        style={{ color: '#1e293b', fontSize: `${s(14)}px`, marginLeft: `${s(12)}px` }}
                      >
                        {formatName(name)}
                      </span>
                    )
                  })
                ) : (
                  <span style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: `${s(14)}px` }}>
                    Nenhum aluno cadastrado
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col justify-start" style={{ borderLeft: `${s(2)}px solid #075e95`, padding: `${s(6)}px` }}>
              <span
                className="p-[6px]"
                style={{ color: '#075e95', fontWeight: 'bold', fontSize: `${s(12)}px` }}>
                Orientadores:
              </span>
              <div className="flex flex-col ml-28" style={{ marginLeft: `${s(28)}px` }}>
                {teachers.length > 0 ? (
                  teachers.map((prof: Teacher, index: number) => {
                    const name = prof.nome
                    return (
                      <span
                        key={index}
                        className="break-words truncate"
                        style={{ color: '#1e293b', fontSize: `${s(18)}px`, fontWeight: 'bold' }}>
                        {formatName(name)}
                      </span>
                    )
                  })
                ) : (
                  <span style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: `${s(14)}px` }}>
                    Nenhum orientador informado
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="divider w-full" style={{ backgroundColor: '#ffffff', height: `${s(6)}px`, border: 'none' }} />

      <div className="overflow-hidden grid grid-cols-2 min-h-32 p-[10px]" style={{
        backgroundColor: '#075e95', padding: `${s(10)}px`,
        minHeight: `${s(325)}px`
      }}>
        <div className="flex flex-col justify-start overflow-hidden" style={{ backgroundColor: '#fefefe', borderTopLeftRadius: `${s(12)}px`, borderBottomLeftRadius: `${s(12)}px`, borderRight: `${s(2)}px solid #075e95` }}>
          <span className="p-[6px]" style={{ color: '#075e95', fontWeight: 'bold', fontSize: `${s(12)}px`, padding: `${s(6)}px` }}>
            Texto:
          </span>
          <div className="flex-1 overflow-y-auto break-words whitespace-pre-wrap p-[6px]"
            style={{ color: '#334155', fontSize: `${s(13)}px`, lineHeight: `${s(14)}px`, padding: `${s(6)}px`, }}>
            {prototyping?.tipoApoio}
          </div>
        </div>

        <div className="flex flex-col justify-start overflow-hidden" style={{ backgroundColor: '#fefefe', borderTopRightRadius: `${s(12)}px`, borderBottomRightRadius: `${s(12)}px`, borderLeft: `${s(2)}px solid #075e95`, padding: `${s(6)}px` }}>
          <span className="p-[6px]" style={{ color: '#075e95', fontWeight: 'bold', fontSize: `${s(12)}px` }}>
            Imagem:
          </span>
          <div className="flex-1 flex items-center justify-center overflow-hidden px-6" style={{ paddingInline: `${s(12)}px` }}>
            {anexosUrls.length > 0 ? (
              <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-2 items-center justify-items-center overflow-hidden" style={{
                gap: `${s(2)}`,
                maxHeight: `${s(234)}px`
              }}>
                {anexosUrls.map((url, idx) => (
                  <div key={idx}
                    className="w-full h-full flex items-center justify-center overflow-hidden rounded-md"
                    style={scale !== 1 ? {
                      borderRadius: `${s(6)}px`,
                      maxHeight: `${s(125)}px`
                    } : { maxHeight: `${s(125)}px` }}>
                    <img
                      src={url}
                      alt={`Anexo ${idx + 1}`}
                      className="w-full h-full object-contain object-center"
                      style={{
                        objectFit: 'contain',
                        objectPosition: 'center',
                        width: '86%',
                        maxHeight: `${s(125)}px`,
                        marginInline: 'auto',
                      }}
                      crossOrigin="anonymous"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <span style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: `${s(14)}px` }}>
                Nenhuma imagem enviada
              </span>
            )}
          </div>
        </div>
      </div>

      <hr className="divider w-full" style={{ backgroundColor: '#ffffff', height: `${s(6)}px`, border: 'none' }} />

      <div className="flex flex-col p-[10px]" style={{ backgroundColor: '#628e48', padding: `${s(10)}px` }}>
        <div className="grid grid-cols-2 w-full">
          <div className="flex flex-col justify-start overflow-hidden p-[10px] mb-3" style={{
            backgroundColor: '#ffffff',
            borderRadius: `${s(8)}px 0 0 ${s(8)}px`, borderRight: `${s(2)}px solid #628e48`, padding: `${s(5)}px`, marginBottom: `${s(6)}px`
          }}>
            <span style={{ color: '#628e48', fontWeight: 'bold', fontSize: `${s(12)}px` }}>
              Instituição de impacto social:
            </span>
            <div className="flex-1 break-words whitespace-pre-wrap"
              style={{
                color: '#334155', fontSize: `${s(19)}px`, lineHeight: `${s(12)}px`, fontWeight: 'bold', marginTop: `${s(4)}px`, marginLeft: `${s(8)}px`
              }}>
              {team?.instituicoes?.[0]?.descricao}
            </div>
          </div>

          <div className="flex flex-col justify-start overflow-hidden p-[10px] mb-3"
            style={{ backgroundColor: '#ffffff', borderRadius: `0 ${s(8)}px ${s(8)}px 0`, borderLeft: `${s(2)}px solid #628e48`, padding: `${s(5)}px`, marginBottom: `${s(6)}px` }}>
            <span style={{ color: '#628e48', fontWeight: 'bold', fontSize: `${s(12)}px` }}>
              Problema identificado:
            </span>
            <div className="flex-1 break-words whitespace-pre-wrap" style={{ color: '#334155', fontSize: `${s(12)}px`, lineHeight: `${s(12)}px` }}>
              {prototyping?.problemaPrincipal}
            </div>
          </div>

          <div className="flex flex-col justify-start overflow-hidden p-[10px] mb-3"
            style={{ backgroundColor: '#ffffff', borderRadius: `${s(8)}px 0 0 ${s(8)}px`, borderRight: `${s(2)}px solid #628e48`, borderTop: `${s(2)}px solid #628e48`, padding: `${s(5)}px`, marginBottom: `${s(6)}px` }}>
            <span style={{ color: '#628e48', fontWeight: 'bold', fontSize: `${s(12)}px` }}>
              Proposta de valor da solução:
            </span>
            <div className="flex-1 break-words whitespace-pre-wrap" style={{ color: '#334155', fontSize: `${s(12)}px`, lineHeight: `${s(12)}px` }}>
              {prototyping?.propostaValor}
            </div>
          </div>

          <div className="flex flex-col justify-start overflow-hidden p-[10px] mb-3"
            style={{ backgroundColor: '#ffffff', borderRadius: `0 ${s(8)}px ${s(8)}px 0`, borderLeft: `${s(2)}px solid #628e48`, borderTop: `${s(2)}px solid #628e48`, padding: `${s(5)}px`, marginBottom: `${s(6)}px` }}>
            <span style={{ color: '#628e48', fontWeight: 'bold', fontSize: `${s(12)}px` }}>
              Vantagens competitivas da solução:
            </span>
            <div className="flex-1 break-words whitespace-pre-wrap" style={{ color: '#334155', fontSize: `${s(12)}px`, lineHeight: `${s(12)}px` }}>
              {prototyping?.vantagemCompetitiva}
            </div>
          </div>

          <div className="flex flex-col justify-start overflow-hidden p-[10px]"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: `${s(8)}px 0 0 ${s(8)}px`,
              borderRight: `${s(2)}px solid #628e48`,
              borderTop: `${s(2)}px solid #628e48`,
              padding: `${s(5)}px`,
            }}
          >
            <span style={{ color: '#628e48', fontWeight: 'bold', fontSize: `${s(12)}px` }}>
              Principais necessidades para o desenvolvimento:
            </span>
            <div className="flex-1 break-words whitespace-pre-wrap" style={{ color: '#334155', fontSize: `${s(12)}px`, lineHeight: `${s(12)}px` }}>
              <p className="break-words whitespace-pre-wrap">
                {prototyping?.principaisNecessidades}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-start overflow-hidden p-[10px]"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: `0 ${s(8)}px ${s(8)}px 0`,
              borderLeft: `${s(2)}px solid #628e48`,
              borderTop: `${s(2)}px solid #628e48`,
              padding: `${s(5)}px`,
            }}>
            <span style={{ color: '#628e48', fontWeight: 'bold', fontSize: `${s(12)}px` }}>
              Parcerias estratégicas para o desenvolvimento:
            </span>
            <div className="flex-1 break-words whitespace-pre-wrap" style={{ color: '#334155', fontSize: `${s(12)}px`, lineHeight: `${s(12)}px` }}>
              {prototyping?.parcerias}
            </div>
          </div>
        </div>
      </div>

      <hr className="divider w-full" style={{ backgroundColor: '#ffffff', height: `${s(6)}px`, border: 'none' }} />

      <div className="flex flex-col">
        <div className="grid grid-cols-2 w-full p-[8px]" style={{ backgroundColor: '#d56928', padding: `${s(8)}px`, }}>
          <div className="flex flex-col justify-start overflow-hidden p-[10px]"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: `${s(8)}px 0 0 ${s(8)}px`,
              borderRight: `${s(2)}px solid #d56928`,
              padding: `${s(5)}px`,
            }}>
            <span style={{ color: '#d56928', fontWeight: 'bold', fontSize: `${s(12)}px` }}>
              Cronograma de construção do protótipo:
            </span>
            <div className="flex-1 flex items-center justify-center overflow-hidden rounded-md">
              {cronogramaUrl ? (
                <img
                  src={cronogramaUrl}
                  alt="Cronograma de Construção do Protótipo"
                  // className="w-full h-full object-contain object-center"
                  style={{
                    objectFit: 'contain',
                    objectPosition: 'center',
                    width: '86%',
                    marginInline: 'auto',
                  }}
                  crossOrigin="anonymous"
                />
              ) : (
                <span style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: `${s(8.5)}px` }}>
                  Nenhuma imagem de cronograma enviada
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-start overflow-hidden p-[10px]"
            style={{ backgroundColor: '#ffffff', borderRadius: `0 ${s(8)}px ${s(8)}px 0`, borderLeft: `${s(2)}px solid #d56928`, padding: `${s(5)}px`, }}>
            <span style={{ color: '#d56928', fontWeight: 'bold', fontSize: `${s(12)}px` }}>
              Memorial descritivo:
            </span>
            <div className="flex-1 flex items-center justify-center overflow-hidden rounded-md">
              {memorialUrl ? (
                <img
                  src={memorialUrl}
                  alt="Memorial Descritivo"
                  // className="w-full h-full object-contain object-center"
                  style={{
                    objectFit: 'contain',
                    objectPosition: 'center',
                    width: '86%',
                    marginInline: 'auto',
                  }}
                  crossOrigin="anonymous"
                />
              ) : (
                <span style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: `${s(8.5)}px` }}>
                  Nenhuma imagem de memorial descritivo enviada
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center" style={{ paddingTop: `${s(2)}px` }}>
        <img
          src={footerBannerUrl}
          alt="Footer Realização e Parcerias"
          crossOrigin="anonymous"
          style={{
            objectFit: 'contain', width: '100%', height: 'auto', display: 'block',
            marginInline: 'auto'
          }}
        />
      </div>
    </div>
  )
}