import DescriptionIcon from '@mui/icons-material/Description'
import DownloadIcon from '@mui/icons-material/Download'
import LinkIcon from '@mui/icons-material/Link'
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import PrintIcon from '@mui/icons-material/Print'
import SchoolIcon from '@mui/icons-material/School'
import WebIcon from '@mui/icons-material/Web'
import { CircularProgress, Dialog, DialogContent, DialogContentText, Divider, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material"
import { toPng } from 'html-to-image'
import { useSnackbar } from 'notistack'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useGetBannerByIdQuery, useGetTeamByIdQuery, useLazyGetEventValidateByIdQuery, useUpdateTeamMutation } from '../../../api/studentApi'
import { RoutesNames } from '../../../globals'
import { ActivityType } from '../../../model/activityTypes'
import { EventsTypes } from '../../../model/config'
import { Institution } from '../../../model/institution'
import { Ods } from '../../../model/ods'
import { TeamsResponse, UpdateTeam } from "../../../model/team"
import { RootState } from '../../../redux/store'
import { Roles, TeamValidation } from '../../../utils/types'
import { BannerPreviewComponent } from '../banner/bannerPreview'
import { FooterImage } from "../common/adminFooter"
import { EditActivityTypes } from './editActivityTypes'
import { EditInstitution } from './editInstitutions'
import { EditOds } from './editOds'
import { EditTeamName } from './editTeamName'
import { EditLogomarcasAndParceiros } from './editLogomarcasAndParceiros'
import { StudentCard } from './studentCard'
import { TeacherCard } from './teacherCard'


export const TeamComponent = ({ id }: Pick<TeamsResponse, 'id'>) => {
  const { data: team, error, isLoading } = useGetTeamByIdQuery(id)
  const { data: banner } = useGetBannerByIdQuery(id)
  const [updateTeam, status] = useUpdateTeamMutation()
  const userGlobalState = useSelector((state: RootState) => state.userInfo)

  const navigate = useNavigate()
  const [editOdsOpen, setEditOdsOpen] = useState(false)
  const [editTeamNameOpen, setEditTeamNameOpen] = useState(false)
  const [editActivityTypesOpen, setEditActivityTypesOpen] = useState(false)
  const [editInstitutionsOpen, setEditInstitutionsOpen] = useState(false)
  const [editLogomarcasOpen, setEditLogomarcasOpen] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const [getEventById] = useLazyGetEventValidateByIdQuery()
  const [pitchValidated, setPitchValidated] = useState(false)
  const pitchRef = useRef<HTMLDivElement>(null)
  const hiddenBannerRef = useRef<HTMLDivElement>(null)
  const [showHiddenBanner, setShowHiddenBanner] = useState(false)
  const [isDownloadingBanner, setIsDownloadingBanner] = useState(false)

  useEffect(() => {
    if (pitchValidated && pitchRef.current) {
      pitchRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [pitchValidated])

  const handlePrintRegister = () => {
    const registerPrintUrl = `/register-print/${id}`
    const printWindow = window.open(registerPrintUrl, "_blank")

    if (printWindow) {
      const handleMessage = (event: MessageEvent) => {
        if (event.origin === window.location.origin && event.data === "ready-to-print-register") {
          printWindow.print()
          window.removeEventListener("message", handleMessage) // Remove o listener após o uso
        }
      }

      // Escuta a mensagem da página de TeamRegisterPrintComponent
      window.addEventListener("message", handleMessage)
    }
  }

  // const handlePrintBanner = () => {
  //   const bannerPreviewUrl = `/banner-preview/${id}`
  //   const printWindow = window.open(bannerPreviewUrl, "_blank")

  //   if (printWindow) {
  //     const handleMessage = (event: MessageEvent) => {
  //       if (event.origin === window.location.origin && event.data === "ready-to-print") {
  //         printWindow.print()
  //         window.removeEventListener("message", handleMessage) // Remove o listener após o uso
  //       }
  //     }

  //     // Escuta a mensagem da página de banner-preview
  //     window.addEventListener("message", handleMessage)
  //   }
  // }

  const handleDownloadBannerSVG = async () => {
    try {
      if (isDownloadingBanner) {
        return
      }

      if (!banner) {
        enqueueSnackbar('Banner não encontrado. Preencha o canvas primeiro.', { variant: 'warning' })
        return
      }

      setIsDownloadingBanner(true)

      // Mostra o banner oculto para renderizar
      setShowHiddenBanner(true)

      // Aguarda o banner renderizar e as imagens carregarem
      await new Promise(resolve => setTimeout(resolve, 5000)) // Aumentado para 5s com 600 DPI

      if (!hiddenBannerRef.current) {
        enqueueSnackbar('Erro ao preparar o banner.', { variant: 'error' })
        setShowHiddenBanner(false)
        setIsDownloadingBanner(false)
        return
      }

      // Captura o elemento do banner
      const bannerElement = hiddenBannerRef.current.querySelector('div[class*="bg-[#fefefe]"]') as HTMLElement

      if (!bannerElement) {
        throw new Error('Elemento do banner não encontrado')
      }

      // IMPORTANTE: Dimensões para impressão gráfica (0.80m x 1.20m)
      // Usando 600 DPI (dots per inch) para qualidade de gráfica ULTRA PREMIUM
      // 1 polegada = 2.54 cm
      // 0.80m = 80cm = 31.496 polegadas × 600 DPI = 18,898 pixels
      // 1.20m = 120cm = 47.244 polegadas × 600 DPI = 28,346 pixels

      // Dimensões finais para o arquivo de impressão
      const targetWidth = 18898   // 0.80m em 600 DPI
      const targetHeight = 28346  // 1.20m em 600 DPI

      // Vamos usar o elemento renderizado e escalar proporcionalmente
      const width = targetWidth
      const height = targetHeight

      // Gera a imagem PNG de altíssima qualidade com todas as fontes e imagens embutidas
      const dataUrl = await toPng(bannerElement, {
        quality: 1.0,
        pixelRatio: 1, // Não multiplica pois já estamos usando dimensões finais grandes
        width: width,
        height: height,
        cacheBust: true,
        canvasWidth: width,
        canvasHeight: height,
        skipFonts: false, // Garante que as fontes sejam capturadas
        includeQueryParams: true,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
          width: `${width}px`,
          height: `${height}px`,
        }
      })

      // Cria um link para download
      const link = document.createElement('a')
      const fileName = `canvas-${team?.nomeEquipe?.replace(/\s+/g, '-')}.png`
      link.download = fileName
      link.href = dataUrl
      link.click()

      enqueueSnackbar('Download iniciado com sucesso!', { variant: 'success' })

      // Esconde o banner novamente
      setShowHiddenBanner(false)
      setIsDownloadingBanner(false)
    } catch (error) {
      console.error('Erro ao gerar banner:', error)
      enqueueSnackbar('Erro ao gerar o banner. Tente novamente.', { variant: 'error' })
      setShowHiddenBanner(false)
      setIsDownloadingBanner(false)
    }
  }

  const handleEditTeamNameOpen = (state: boolean) => {
    setEditTeamNameOpen(!state)
  }

  const handleEditOdsOpen = (state: boolean) => {
    setEditOdsOpen(!state)
  }

  const handleActivityTypesOpen = (state: boolean) => {
    setEditActivityTypesOpen(!state)
  }

  const handleInstitutionsOpen = (state: boolean) => {
    setEditInstitutionsOpen(!state)
  }

  const validateTeamEdit = ({ ods, activitties, institution }: Partial<TeamValidation>) => {
    if (ods && ods.length > 3) {
      enqueueSnackbar('Permitido até três ODS.', { variant: 'warning' })
      return false
    }
    if (activitties && activitties.length > 3) {
      enqueueSnackbar('Permitido até três Atividades.', { variant: 'warning' })
      return false
    }
    if (institution && institution.length > 1) {
      enqueueSnackbar('Permitido apenas uma Instituição.', { variant: 'warning' })
      return false
    }
    return true
  }

  const handleUpdateTeam = async (payload: UpdateTeam, successMessage: string) => {
    try {
      await updateTeam({ id: id, data: payload }).unwrap()
      enqueueSnackbar(successMessage, { variant: 'success' })
    } catch (error: any) {
      const errorMessage = `${error?.data?.error}` || 'Erro ao atualizar a Equipe.'
      enqueueSnackbar(errorMessage, { variant: 'error' })
    }
  }

  const handleEditOdsSave = async (selectedOds: Ods[]) => {
    if (!validateTeamEdit({ ods: selectedOds })) {
      return
    }
    const payload: UpdateTeam = {
      nome: team?.nomeEquipe || '',
      listIdOds: selectedOds?.map((ods) => ({
        id: ods.id
      }))
    }
    await handleUpdateTeam(payload, 'ODS atualizada com sucesso!')
    handleEditOdsOpen(editOdsOpen)
  }

  const handleEditActivitySave = async (selectedActivities: { id: number }[]) => {
    if (!validateTeamEdit({ activitties: selectedActivities })) {
      return
    }
    const payload: UpdateTeam = {
      nome: team?.nomeEquipe || '',
      tipoAtividadeList: selectedActivities as ActivityType[],
    }
    await handleUpdateTeam(payload, 'Atividade atualizada com sucesso!')
    handleActivityTypesOpen(editActivityTypesOpen)
  }

  const handleEditInstitutionsSave = async (selectedInstitution: { id: number }[]) => {
    if (!validateTeamEdit({ institution: selectedInstitution })) {
      return
    }
    const payload: UpdateTeam = {
      nome: team?.nomeEquipe || '',
      instituicoes: selectedInstitution as Institution[],
    };
    await handleUpdateTeam(payload, 'Instituição atualizada com sucesso!');
    handleInstitutionsOpen(editInstitutionsOpen);
  }

  const handleEditTeamNameSave = async (newTeamName: string) => {
    const payload: UpdateTeam = {
      nome: newTeamName,  // Novo nome da equipe
      listIdOds: team?.odsList.map((ods) => ({ id: ods.id })) || [], // Manter ODS existentes
    }
    await handleUpdateTeam(payload, 'Nome da Equipe atualizada com sucesso!')
    setEditTeamNameOpen(false)
  }

  const handleEditLogomarcasSave = async (data: {
    nomeParceiro1: string
    nomeParceiro2: string
    logomarcaTime?: File
    logomarcaParceiro1?: File
    logomarcaParceiro2?: File
  }) => {
    const payload: UpdateTeam = {
      nome: team?.nomeEquipe || '',
      nomeParceiro1: data.nomeParceiro1,
      nomeParceiro2: data.nomeParceiro2,
      listIdOds: team?.odsList.map((ods) => ({ id: ods.id })) || [], // Manter ODS existentes
    }
    try {
      await updateTeam({
        id: id,
        data: payload,
        logomarcaTime: data.logomarcaTime,
        logomarcaParceiro1: data.logomarcaParceiro1,
        logomarcaParceiro2: data.logomarcaParceiro2
      }).unwrap()
      enqueueSnackbar('Logomarcas e Parceiros atualizados com sucesso!', { variant: 'success' })
      setEditLogomarcasOpen(false)
    } catch (error: any) {
      const errorMessage = `${error?.data?.error}` || 'Erro ao atualizar a Equipe.'
      enqueueSnackbar(errorMessage, { variant: 'error' })
    }
  }

  const handlePitchSave = async (linkPitch: string) => {
    const payload: UpdateTeam = {
      nome: team?.nomeEquipe,
      listIdOds: team?.odsList.map((ods) => ({ id: ods.id })) || [], // Manter ODS existentes
      linkPitch,
    }
    await handleUpdateTeam(payload, 'Pitch enviado com sucesso!')
  }

  const handleCancelEditOds = () => {
    setEditOdsOpen(false)
  }

  const handleCancelEditActivityTypes = () => {
    setEditActivityTypesOpen(false)
  }

  const handleCancelEditTeamName = () => {
    setEditTeamNameOpen(false)
  }

  const handleCancelEditInstitutions = () => {
    setEditInstitutionsOpen(false)
  }


  const snackBarEventsTypes = (event: EventsTypes) => {
    return enqueueSnackbar(`${EventsTypes[event]} fora da data de validade`)
  }


  const actions = [
    {
      icon: <SchoolIcon />, name: 'Adicionar Aluno', onClick: () => {
        if (team?.alunos && team.alunos.length >= 8) {
          enqueueSnackbar('Permitido até 8 Alunos por Time', { variant: 'warning' })
          return
        }
        navigate(RoutesNames.student,
          {
            state: {
              id: id,
              nomeEquipe: team?.nomeEquipe,
            }
          })
      }
    },
    {
      icon: <LocalLibraryIcon />, name: 'Adicionar Professor', onClick: () => {
        if (team?.professores && team.professores.length > 0) {
          enqueueSnackbar('Permitido apenas um Professor por Time', { variant: 'warning' })
          return
        }
        navigate(RoutesNames.teacher,
          {
            state: {
              id: id,
              nomeEquipe: team?.nomeEquipe,
            }
          })
      }

    },
  ]

  if (isLoading) return <div className='text-center'><CircularProgress /></div>
  if (error) return <p>Error loading team</p>

  const sortedStudents = []
  const leader = team?.alunos?.find(aluno => aluno?.isLider)
  const viceLeader = team?.alunos?.find(aluno => aluno?.isViceLider)
  const members = team?.alunos?.filter(aluno => !aluno?.isLider && !aluno?.isViceLider)

  if (leader) sortedStudents?.push(leader)
  if (viceLeader) sortedStudents?.push(viceLeader)
  if (members) sortedStudents?.push(...members)

  return (
    <div>
      <div className="flex flex-col relative border-t-2 min-h-screen">
        <div className="p-4 text-[#3C14A4] w-full">
          {/* Seção de Ações no Topo */}
          {sortedStudents.length > 0 && (
            <div className="mb-6 border-b pb-4">
              <ul className="flex flex-row gap-3 flex-wrap items-center">
                <li className="bg-[#5741A6] text-white font-semibold py-2 px-4 rounded-md cursor-pointer flex items-center gap-2 hover:bg-[#5222A2] transition-all duration-200 shadow-sm text-sm"
                  onClick={async () => {
                    const response = await getEventById(EventsTypes.INSCRICAO)
                    if (response.data == false || !response.data) {
                      snackBarEventsTypes(EventsTypes.INSCRICAO)
                      return
                    }
                    handlePrintRegister()
                  }}>
                  <PrintIcon fontSize='medium' />
                  <span>Imprimir Inscrição</span>
                </li>
                <li className="bg-[#5741A6] text-white font-semibold py-2 px-4 rounded-md cursor-pointer flex items-center gap-2 hover:bg-[#5222A2] transition-all duration-200 shadow-sm text-sm"
                  onClick={async () => {
                    const response = await getEventById(EventsTypes.PROTOTIPO)
                    if (response.data == false || !response.data) {
                      snackBarEventsTypes(EventsTypes.PROTOTIPO)
                      return
                    }
                    navigate(RoutesNames.prototyping?.replace(':id', id?.toString()), { state: team?.nomeEquipe })
                  }}
                >
                  <DescriptionIcon fontSize='medium' />
                  <span>Prototipação</span>
                </li>
                <li className="bg-[#5741A6] text-white font-semibold py-2 px-4 rounded-md cursor-pointer flex items-center gap-2 hover:bg-[#5222A2] transition-all duration-200 shadow-sm text-sm"
                  onClick={async () => {
                    const response = await getEventById(EventsTypes.CANVAS)
                    if (response.data == false || !response.data) {
                      snackBarEventsTypes(EventsTypes.CANVAS)
                      return
                    }
                    navigate(RoutesNames.banner?.replace(':id', id?.toString()), { state: team?.nomeEquipe })
                  }}>
                  <WebIcon fontSize='medium' />
                  <span>Preencher Canvas</span>
                </li>
                <li className="bg-[#5741A6] text-white font-semibold py-2 px-4 rounded-md cursor-pointer flex items-center gap-2 hover:bg-[#5222A2] transition-all duration-200 shadow-sm text-sm"
                  onClick={async () => {
                    const response = await getEventById(EventsTypes.CANVAS)
                    if (response.data == false || !response.data) {
                      snackBarEventsTypes(EventsTypes.CANVAS)
                      return
                    }
                    handleDownloadBannerSVG()
                  }}>
                  <DownloadIcon fontSize='medium' />
                  <span>Download Canvas</span>
                </li>
                <li className="bg-[#5741A6] text-white font-semibold py-2 px-4 rounded-md cursor-pointer flex items-center gap-2 hover:bg-[#5222A2] transition-all duration-200 shadow-sm text-sm"
                  onClick={async () => {
                    const response = await getEventById(EventsTypes.PITCH)
                    if (response.data == false || !response.data) {
                      snackBarEventsTypes(EventsTypes.PITCH)
                      return
                    }
                    setPitchValidated(true)
                  }}>
                  <LinkIcon fontSize='medium' />
                  <span>Link Pitch</span>
                </li>
              </ul>
            </div>
          )}

          <div className='flex gap-2'>
            {editTeamNameOpen ? (
              <EditTeamName
                loading={status.isLoading}
                initialTeamName={team?.nomeEquipe || ''}
                onSave={handleEditTeamNameSave}
                onCancel={handleCancelEditTeamName}
              />
            ) : (
              <h2 className="text-2xl font-bold capitalize">{team?.nomeEquipe}</h2>
            )}
          </div>
          {!editTeamNameOpen ? <div className='flex gap-1 text-center' >
            <h3 >TIME</h3>
            <ModeEditIcon className='cursor-pointer size-5'
              onClick={() => handleEditTeamNameOpen(editTeamNameOpen)} />
          </div> : null}

          {/* Seção de Logomarcas e Parceiros */}
          <div className="mt-2 mb-3">
            {editLogomarcasOpen ? (
              <EditLogomarcasAndParceiros
                loading={status.isLoading}
                initialNomeParceiro1={team?.nomeParceiro1 || ''}
                initialNomeParceiro2={team?.nomeParceiro2 || ''}
                onSave={handleEditLogomarcasSave}
                onCancel={() => setEditLogomarcasOpen(false)}
              />
            ) : (
              <div className="border p-3 rounded-lg bg-gray-50/50 w-full">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-base font-semibold text-[#383691]">Logomarcas e Parceiros</h3>
                  <ModeEditIcon className="cursor-pointer size-4 text-[#3C14A4]" onClick={() => setEditLogomarcasOpen(true)} />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  {/* Logomarca do time */}
                  <div className="flex items-center justify-between gap-2 bg-white p-2 rounded shadow-sm border border-gray-100 flex-1 min-w-[180px]">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-10 h-10 border rounded bg-gray-50 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {team?.logomarcaTime ? (
                          <img src={`${import.meta.env.VITE_API_URL}/uploads/${team.logomarcaTime}`} alt="Logomarca do Time" className="w-full h-full object-contain" />
                        ) : (
                          <span className="text-[9px] text-gray-400">Sem logo</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-[#383691] text-xs">Logomarca do Time</p>
                      </div>
                    </div>
                    {team?.logomarcaTime && (
                      <a href={`${import.meta.env.VITE_API_URL}/uploads/${team.logomarcaTime}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 flex-shrink-0 p-1 hover:bg-blue-50 rounded" title="Baixar Logomarca do Time">
                        <DownloadIcon fontSize="small" />
                      </a>
                    )}
                  </div>

                  {/* Parceiro 1 */}
                  <div className="flex items-center justify-between gap-2 bg-white p-2 rounded shadow-sm border border-gray-100 flex-1 min-w-[180px]">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-10 h-10 border rounded bg-gray-50 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {team?.logomarcaParceiro1 ? (
                          <img src={`${import.meta.env.VITE_API_URL}/uploads/${team.logomarcaParceiro1}`} alt="Logomarca Parceiro 1" className="w-full h-full object-contain" />
                        ) : (
                          <span className="text-[9px] text-gray-400">Sem logo</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-[#383691] text-xs">Parceiro 1</p>
                        <p className="text-xs text-gray-700 truncate max-w-[120px]">{team?.nomeParceiro1 || 'Não informado'}</p>
                      </div>
                    </div>
                    {team?.logomarcaParceiro1 && (
                      <a href={`${import.meta.env.VITE_API_URL}/uploads/${team.logomarcaParceiro1}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 flex-shrink-0 p-1 hover:bg-blue-50 rounded" title="Baixar Logomarca do Parceiro 1">
                        <DownloadIcon fontSize="small" />
                      </a>
                    )}
                  </div>

                  {/* Parceiro 2 */}
                  <div className="flex items-center justify-between gap-2 bg-white p-2 rounded shadow-sm border border-gray-100 flex-1 min-w-[180px]">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-10 h-10 border rounded bg-gray-50 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {team?.logomarcaParceiro2 ? (
                          <img src={`${import.meta.env.VITE_API_URL}/uploads/${team.logomarcaParceiro2}`} alt="Logomarca Parceiro 2" className="w-full h-full object-contain" />
                        ) : (
                          <span className="text-[9px] text-gray-400">Sem logo</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-[#383691] text-xs">Parceiro 2</p>
                        <p className="text-xs text-gray-700 truncate max-w-[120px]">{team?.nomeParceiro2 || 'Não informado'}</p>
                      </div>
                    </div>
                    {team?.logomarcaParceiro2 && (
                      <a href={`${import.meta.env.VITE_API_URL}/uploads/${team.logomarcaParceiro2}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 flex-shrink-0 p-1 hover:bg-blue-50 rounded" title="Baixar Logomarca do Parceiro 2">
                        <DownloadIcon fontSize="small" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Seção de ODS e Atividades (Lado a Lado) */}
          <div className="flex flex-col md:flex-row gap-3 w-full mt-2 mb-3">
            {/* ODS */}
            <div className="flex-1 min-w-0 capitalize">
              {editOdsOpen ? (
                <EditOds
                  loading={status.isLoading}
                  initialOds={team?.odsList || []}
                  onSave={handleEditOdsSave}
                  onCancel={handleCancelEditOds}
                />
              ) : (
                <div className="border p-3 rounded-lg bg-gray-50/50 w-full h-full flex flex-col">
                  <div className="flex justify-between items-center mb-2 flex-shrink-0">
                    <h3 className="text-base font-semibold text-[#383691]">ODS</h3>
                    <ModeEditIcon className="cursor-pointer size-4 text-[#3C14A4]" onClick={() => handleEditOdsOpen(editOdsOpen)} />
                  </div>
                  
                  <div className="flex flex-wrap gap-2 flex-grow items-start">
                    {team?.odsList && team.odsList.length > 0 ? (
                      team.odsList.map((ods, index) => (
                        <div key={index} className="flex items-center gap-2 bg-white p-2 rounded shadow-sm border border-gray-100 flex-grow sm:flex-initial">
                          <div className="min-w-0 flex items-center gap-1.5 text-xs">
                            <span className="font-semibold text-[#383691] whitespace-nowrap">ODS {index + 1}:</span>
                            <span className="text-gray-700 truncate max-w-[120px]" title={ods.descricao}>{ods.descricao}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <span className="text-xs text-gray-400">Nenhuma ODS informada</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Atividades */}
            <div className="flex-1 min-w-0 capitalize">
              {editActivityTypesOpen ? (
                <EditActivityTypes
                  loading={status.isLoading}
                  value={team?.tipoAtividades || []}
                  onSave={handleEditActivitySave}
                  onCancel={handleCancelEditActivityTypes}
                />
              ) : (
                <div className="border p-3 rounded-lg bg-gray-50/50 w-full h-full flex flex-col">
                  <div className="flex justify-between items-center mb-2 flex-shrink-0">
                    <h3 className="text-base font-semibold text-[#383691]">Atividades</h3>
                    <ModeEditIcon className="cursor-pointer size-4 text-[#3C14A4]" onClick={() => handleActivityTypesOpen(editActivityTypesOpen)} />
                  </div>
                  
                  <div className="flex flex-wrap gap-2 flex-grow items-start">
                    {team?.tipoAtividades && team.tipoAtividades.length > 0 ? (
                      team.tipoAtividades.map((activity, index) => (
                        <div key={index} className="flex items-center gap-2 bg-white p-2 rounded shadow-sm border border-gray-100 flex-grow sm:flex-initial">
                          <div className="min-w-0 flex items-center text-xs">
                            <span className="text-gray-700 truncate max-w-[140px]" title={activity.descricao}>{activity.descricao}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <span className="text-xs text-gray-400">Nenhuma atividade informada</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Seção de Instituição */}
          <div className="mt-2 mb-3 capitalize">
            {editInstitutionsOpen ? (
              <EditInstitution
                loading={status.isLoading}
                value={team?.instituicoes || []}
                onSave={handleEditInstitutionsSave}
                onCancel={handleCancelEditInstitutions}
              />
            ) : (
              <div className="border p-3 rounded-lg bg-gray-50/50 w-full">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-base font-semibold text-[#383691]">Instituição</h3>
                  <ModeEditIcon className="cursor-pointer size-4 text-[#3C14A4]" onClick={() => handleInstitutionsOpen(editInstitutionsOpen)} />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {team?.instituicoes && team.instituicoes.length > 0 ? (
                    team.instituicoes.map((institution, index) => (
                      <div key={index} className="flex items-center gap-2 bg-white p-2 rounded shadow-sm border border-gray-100 flex-grow sm:flex-initial">
                        <div className="min-w-0">
                          <p className="font-semibold text-[#383691] text-xs">Instituição</p>
                          <p className="text-xs text-gray-700" title={institution.descricao}>{institution.descricao}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <span className="text-xs text-gray-400">Nenhuma instituição informada</span>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className='flex flex-col xl:gap-2 gap-2 w-full relative'>
            <div className="flex gap-2 flex-wrap">
              {team?.professores && team.professores.map((teacher, idx) => (
                <TeacherCard key={idx} teacher={teacher} role={userGlobalState?.enumRole!} />
              ))}
            </div>
            <Divider />

            <div className='flex xl:gap-2 gap-2 flex-wrap'>
              {leader && <StudentCard student={leader} />}
              {viceLeader && <StudentCard student={viceLeader} />}
            </div>
            <Divider />

            <div className="mt-4 flex xl:gap-2 gap-2 flex-wrap">
              {members?.map((member, idx) => (
                <StudentCard key={idx} student={member} />
              ))}
            </div>
            {[Roles.Aluno, Roles.Professor].includes(userGlobalState.enumRole!) ? null
              : <SpeedDial
                ariaLabel="SpeedDial"
                className="fixed right-6 bottom-6 z-50"
                sx={{
                  '& .MuiFab-primary': {
                    backgroundColor: '#5741A6',
                    '&:hover': {
                      backgroundColor: '#5222A2',
                    },
                  },
                }}
                icon={<SpeedDialIcon />}>
                {actions.map((action) => (
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={action.onClick}
                  />
                ))}
              </SpeedDial>}

            {/* Exibe o campo de pitch se foi validado OU se já existe link do pitch */}
            {(pitchValidated || team?.linkPitch) && (
              <div ref={pitchRef} className='bg-gray-100 p-2 border rounded-lg shadow-md w-full max-w-96 animate-pop-in'>
                <h3 className="text-lg font-bold">Pitch:</h3>

                {/* Input só aparece se: não for avaliador */}
                {![Roles.Avaliador].includes(userGlobalState.enumRole!) && (
                  <input
                    type="text"
                    placeholder=' Inserir link pitch'
                    className='w-full rounded-lg py-2 mb-2'
                    onBlur={(e) => {
                      if (e.target.value.length > 1) {
                        handlePitchSave(e.target.value)
                      }
                    }}
                  />
                )}

                {/* Link sempre aparece quando existe */}
                {team?.linkPitch && (
                  <a
                    href={team?.linkPitch?.startsWith("http") ? team.linkPitch : `https://${team?.linkPitch}`}
                    className='text-blue-500 underline break-all'
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {team?.linkPitch}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Banner oculto para download em alta resolução */}
      {showHiddenBanner && (
        <div
          ref={hiddenBannerRef}
          style={{
            position: 'fixed',
            top: '-30000px',
            left: '-30000px',
            width: '18898px',  // 0.80m em 600 DPI
            height: '28346px', // 1.20m em 600 DPI
            zIndex: -9999,
            overflow: 'hidden'
          }}
        >
          {/* Fator de escala: 18898 / 994 ≈ 19.0 */}
          <BannerPreviewComponent id={id} disableAutoPrint={true} forExport={true} scale={19.0} />
        </div>
      )}

      {/* Dialog de loading durante o download */}
      <Dialog
        open={isDownloadingBanner}
        PaperProps={{
          style: {
            backgroundColor: '#5741A6',
            borderRadius: '12px',
            padding: '16px',
            minWidth: '320px'
          }
        }}
        sx={{
          '& .MuiDialog-container': {
            alignItems: 'center',
            justifyContent: 'center'
          }
        }}
      >
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px !important'
          }}
        >
          <div className="flex flex-col items-center justify-center gap-4 w-full">
            <CircularProgress
              size={56}
              thickness={4}
              sx={{
                color: '#ffffff',
                display: 'block',
                margin: '0 auto'
              }}
            />
            <DialogContentText
              sx={{
                color: '#ffffff',
                fontSize: '1rem',
                fontWeight: 500,
                textAlign: 'center',
                width: '100%'
              }}
            >
              Configurando arquivo para download, por favor aguarde...
            </DialogContentText>
          </div>
        </DialogContent>
      </Dialog>

      <FooterImage />
    </div>
  )
}