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
  const { headerBannerUrl, footerUrl } = useTemplateImages(team?.ano)

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
    filter: 'none'
  } : (forExport ? { width: '994px', fontSize: '18px', filter: 'none' } : {})

  const students = team?.alunos || []
  const teachers = team?.professores || []

  return (
    <div className="w-full h-full bg-[#fefefe] mx-auto relative print:w-[994px] print:text-[18px] print:blur-none"
      id="prototype-capture-container"
      ref={prototypeRef}
      style={baseStyles}
    >
      <div className="w-full" >
        <img
          src={headerBannerUrl}
          alt="Header DLEI"
          className="w-full object-cover"
          crossOrigin="anonymous"
        />
      </div>

      <div className="flex flex-col bg-[#075e95] p-[16px]">
        <div className="overflow-hidden flex flex-col bg-[#fefefe] rounded-xl">
          <div className="flex items-center p-[12px]">
            <span className="font-bold text-[#075e95] text-[16px]">
              Projeto:
            </span>
            <h2 className="font-extrabold tracking-wider ml-4 text-2xl">
              {team?.nomeEquipe}
            </h2>
          </div>

          <hr className="divider border-[#075e95] border-2 w-full" />

          <div className="grid grid-cols-2 w-full">
            <div className="flex flex-col justify-start p-[12px] border-r-2 border-[#075e95]">
              <span className="font-bold text-[#075e95] text-[16px]">
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
                        className="truncate font-medium text-slate-800 break-words ml-12"
                      >
                        {formatName(name)}
                      </span>
                    )
                  })
                ) : (
                  <span className="text-slate-400 italic" >
                    Nenhum aluno cadastrado
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col justify-start border-l-2 border-[#075e95]">
              <span
                className="font-bold text-[#075e95] p-[12px] text-[16px] ">
                Orientadores:
              </span>
              <div className="flex flex-col ml-28 text-xl">
                {teachers.length > 0 ? (
                  teachers.map((prof: Teacher, index: number) => {
                    const name = prof.nome
                    return (
                      <span
                        key={index}
                        className="font-semibold text-slate-900 break-words truncate">
                        {formatName(name)}
                      </span>
                    )
                  })
                ) : (
                  <span className="text-slate-400 italic" >
                    Nenhum orientador informado
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="divider border-white border-8 w-full" />

      <div className="overflow-hidden grid grid-cols-2 min-h-44 p-[16px] bg-[#075e95]">
        <div className="flex flex-col justify-start overflow-hidden bg-[#fefefe] rounded-l-xl border-r-2 border-[#075e95]">
          <span className="font-bold text-[#075e95] p-[12px] text-[16px]">
            Texto:
          </span>
          <div className="flex-1 overflow-y-auto text-slate-800 font-medium leading-relaxed break-words whitespace-pre-wrap p-[12px]">
            {prototyping?.tipoApoio}
          </div>
        </div>

        <div className="flex flex-col justify-start overflow-hidden bg-[#fefefe] rounded-r-xl border-l-2 border-[#075e95]">
          <span className="font-bold text-[#075e95] p-[12px] text-[16px]">
            Imagem:
          </span>
          <div className="flex-1 flex items-center justify-center overflow-hidden px-8">
            {anexosUrls.length > 0 ? (
              <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-2 items-center justify-items-center overflow-hidden">
                {anexosUrls.slice(0, 4).map((url, idx) => (
                  <div key={idx}
                    className="w-full h-full flex items-center justify-center overflow-hidden">
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
              <span className="text-slate-400 italic">
                Nenhuma imagem enviada
              </span>
            )}
          </div>
        </div>
      </div>

      <hr className="divider border-white border-8 w-full" />
      
      <div className="flex flex-col bg-[#628e48] p-[16px]">
        <div className="grid grid-cols-2 w-ful">
          <div className="flex flex-col justify-start overflow-hidden p-[16px] bg-[#fefefe] border-r-2 border-[#628e48] rounded-l-xl mb-4">
            <span
              className="font-bold text-[#628e48]">
              Instituição de impacto social:
            </span>
            <div className="flex-1 font-semibold text-slate-900 leading-snug break-words whitespace-pre-wrap">
              {team?.instituicoes?.[0]?.descricao}
            </div>
          </div>

          <div className=" flex flex-col justify-start overflow-hidden p-[16px] bg-[#fefefe] border-l-2 border-[#628e48] rounded-r-xl  mb-4">
            <span className="font-bold text-[#628e48]">
              Problema identificado:
            </span>
            <div
              className="flex-1 text-slate-800 leading-relaxed font-normal break-words whitespace-pre-wrap">
              {prototyping?.problemaPrincipal}
            </div>
          </div>

          <div className=" flex flex-col justify-start overflow-hidden p-[16px] bg-[#fefefe] border-r-2 border-t-2 border-[#628e48] rounded-l-xl  mb-4">
            <span className="font-bold text-[#628e48]">
              Proposta de valor da solução:
            </span>
            <div className="flex-1 text-slate-800 leading-relaxed font-normal break-words whitespace-pre-wrap">
              {prototyping?.propostaValor}
            </div>
          </div>

          <div className=" flex flex-col justify-start overflow-hidden p-[16px] bg-[#fefefe] border-l-2 border-t-2 border-[#628e48] rounded-r-xl mb-4">
            <span className="font-bold text-[#628e48]">
              Vantagens competitivas da solução:
            </span>
            <div className="flex-1 text-slate-800 leading-relaxed font-normal break-words whitespace-pre-wrap">
              {prototyping?.vantagemCompetitiva}
            </div>
          </div>

          <div className=" flex flex-col justify-start overflow-hidden p-[16px] bg-[#fefefe] border-r-2 border-t-2 border-[#628e48] rounded-l-xl">
            <span className="font-bold text-[#628e48]">
              Principais necessidades para o desenvolvimento:
            </span>
            <div className="flex-1 text-slate-800 leading-relaxed font-normal break-words whitespace-pre-wrap">
                <p className="break-words whitespace-pre-wrap">
                  {prototyping?.principaisNecessidades}
                </p>
            </div>
          </div>

          <div className=" flex flex-col justify-start overflow-hidden p-[16px] bg-[#fefefe] border-l-2 border-t-2 border-[#628e48] rounded-r-xl">
            <span className="font-bold text-[#628e48]">
              Parcerias estratégicas para o desenvolvimento:
            </span>
            <div className="flex-1 text-slate-800 leading-relaxed font-normal break-words whitespace-pre-wrap">
              {prototyping?.parcerias}
            </div>
          </div>
        </div>
      </div>
      <hr className="divider border-white border-8 w-full" />

      <div className="flex flex-col ">
        <div className="grid grid-cols-2 w-full bg-[#d56928] p-[16px]">
          <div className="bg-white flex flex-col justify-start overflow-hidden p-[16px] border-r-2 border-[#d56928] rounded-l-xl">
            <span className="font-bold text-[#d56928]">
              Cronograma de construção do protótipo:
            </span>
            <div className="flex-1 flex items-center justify-center overflow-hidden">
              {cronogramaUrl ? (
                <img
                  src={cronogramaUrl}
                  alt="Cronograma de Construção do Protótipo"
                  className="max-w-full max-h-full object-contain"
                  crossOrigin="anonymous"
                />
              ) : (
                <span className="text-slate-400 italic" >
                  Nenhuma imagem de cronograma enviada
                </span>
              )}
            </div>
          </div>

          <div className="bg-white flex flex-col justify-start overflow-hidden p-[16px] border-l-2 border-[#d56928] rounded-r-xl">
            <span
              className="font-bold text-[#d56928]">
              Memorial descritivo:
            </span>
            <div className="flex-1 flex items-center justify-center overflow-hidden">
              {memorialUrl ? (
                <img
                  src={memorialUrl}
                  alt="Memorial Descritivo"
                  className="max-w-full max-h-full object-contain"
                  crossOrigin="anonymous"
                />
              ) : (
                <span className="text-slate-400 italic">
                  Nenhuma imagem de memorial descritivo enviada
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <img
          src={footerUrl}
          alt="Footer Realização e Parcerias"
          className="w-full object-contain"
          crossOrigin="anonymous"
        />
      </div>
    </div>
  )
}