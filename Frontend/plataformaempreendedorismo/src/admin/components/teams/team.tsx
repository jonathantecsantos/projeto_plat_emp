import DescriptionIcon from '@mui/icons-material/Description'
import LinkIcon from '@mui/icons-material/Link'
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import PrintIcon from '@mui/icons-material/Print'
import SchoolIcon from '@mui/icons-material/School'
import WebIcon from '@mui/icons-material/Web'
import { CircularProgress, Divider, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material"
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useGetTeamByIdQuery, useLazyGetEventValidateByIdQuery, useUpdateTeamMutation } from '../../../api/studentApi'
import { RoutesNames } from '../../../globals'
import { ActivityType } from '../../../model/activityTypes'
import { EventsTypes } from '../../../model/config'
import { Institution } from '../../../model/institution'
import { Ods } from '../../../model/ods'
import { TeamsResponse, UpdateTeam } from "../../../model/team"
import { RootState } from '../../../redux/store'
import { Roles, TeamValidation } from '../../../utils/types'
import { FooterImage } from "../common/adminFooter"
import { EditActivityTypes } from './editActivityTypes'
import { EditInstitution } from './editInstitutions'
import { EditOds } from './editOds'
import { EditTeamName } from './editTeamName'
import { StudentCard } from './studentCard'
import { TeacherCard } from './teacherCard'


export const TeamComponent = ({ id }: Pick<TeamsResponse, 'id'>) => {
  const { data: team, error, isLoading } = useGetTeamByIdQuery(id)
  const [updateTeam, status] = useUpdateTeamMutation()
  const userGlobalState = useSelector((state: RootState) => state.userInfo)

  const navigate = useNavigate()
  const [editOdsOpen, setEditOdsOpen] = useState(false)
  const [editTeamNameOpen, setEditTeamNameOpen] = useState(false)
  const [editActivityTypesOpen, setEditActivityTypesOpen] = useState(false)
  const [editInstitutionsOpen, setEditInstitutionsOpen] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const [getEventById] = useLazyGetEventValidateByIdQuery()
  const [pitchValidated, setPitchValidated] = useState(false)


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

  const handlePrintBanner = () => {
    const bannerPreviewUrl = `/banner-preview/${id}`
    const printWindow = window.open(bannerPreviewUrl, "_blank")

    if (printWindow) {
      const handleMessage = (event: MessageEvent) => {
        if (event.origin === window.location.origin && event.data === "ready-to-print") {
          printWindow.print()
          window.removeEventListener("message", handleMessage) // Remove o listener após o uso
        }
      }

      // Escuta a mensagem da página de banner-preview
      window.addEventListener("message", handleMessage)
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
      enqueueSnackbar('Só é permitido até 3 ODS.', { variant: 'warning' })
      return false
    }
    if (activitties && activitties.length > 3) {
      enqueueSnackbar('Só é permitido até 3 atividades.', { variant: 'warning' })
      return false
    }
    if (institution && institution.length > 1) {
      enqueueSnackbar('Só é permitido 1 instituição.', { variant: 'warning' })
      return false
    }
    return true
  }

  const handleUpdateTeam = async (payload: UpdateTeam, successMessage: string) => {
    try {
      await updateTeam({ id: id, data: payload }).unwrap()
      enqueueSnackbar(successMessage, { variant: 'success' })
    } catch (error: any) {
      const errorMessage = `${error?.data?.error}` || 'Erro ao atualizar a equipe.'
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
    await handleUpdateTeam(payload, 'ODS editada com sucesso!')
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
    await handleUpdateTeam(payload, 'Nome da equipe atualizado com sucesso!')
    setEditTeamNameOpen(false)
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
      icon: <SchoolIcon />, name: 'Adicionar Aluno', onClick: () => navigate(RoutesNames.student,
        {
          state: {
            id: id,
            nomeEquipe: team?.nomeEquipe,
          }
        })
    },
    {
      icon: <LocalLibraryIcon />, name: 'Adicionar Professor', onClick: () => navigate(RoutesNames.teacher,
        {
          state: {
            id: id,
            nomeEquipe: team?.nomeEquipe,
          }
        })
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
      <div className="flex flex-col lg:flex-row relative border-t-2 min-h-screen">
        <div className="p-4 text-[#3C14A4] flex-1">
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
          <div className="mt-4 mb-6 capitalize">
            {editOdsOpen ? <EditOds
              loading={status.isLoading}
              initialOds={team?.odsList || []}
              onSave={handleEditOdsSave}
              onCancel={handleCancelEditOds}
            /> :
              <div className='flex-col'>
                {team?.odsList?.map((ods, index) => (
                  <p key={index} className="font-semibold">
                    {ods.descricao}
                  </p>
                ))}
              </div>}
            {!editOdsOpen ? <div className='flex gap-2 text-center'>
              <p>ODS</p>
              <ModeEditIcon onClick={() => handleEditOdsOpen(editOdsOpen)} className='cursor-pointer size-5' />
            </div> : null}
          </div>

          <div className="mt-4 mb-6 capitalize">
            {editActivityTypesOpen ? <EditActivityTypes
              loading={status.isLoading}
              value={team?.tipoAtividades || []}
              onSave={handleEditActivitySave}
              onCancel={handleCancelEditActivityTypes}
            /> :
              <div className='flex-col'>
                {team?.tipoAtividades?.map((activity, index) => (
                  <p key={index} className="font-semibold">
                    {activity.descricao}
                  </p>
                ))}
              </div>}
            {!editActivityTypesOpen ? <div className='flex gap-2 text-center'>
              <p>ATIVIDADES</p>
              <ModeEditIcon onClick={() => handleActivityTypesOpen(editActivityTypesOpen)} className='cursor-pointer size-5' />
            </div> : null}
          </div>
          <div className="mt-4 mb-6 capitalize">
            {editInstitutionsOpen ? <EditInstitution
              loading={status.isLoading}
              value={team?.instituicoes || []}
              onSave={handleEditInstitutionsSave}
              onCancel={handleCancelEditInstitutions}
            /> :
              <div className='flex-col'>
                {team?.instituicoes?.map((institution, index) => (
                  <p key={index} className="font-semibold">
                    {institution.descricao}
                  </p>
                ))}
              </div>}
            {!editInstitutionsOpen ? <div className='flex gap-2 text-center'>
              <p>INSTITUIÇÃO</p>
              <ModeEditIcon onClick={() => handleInstitutionsOpen(editInstitutionsOpen)} className='cursor-pointer size-5' />
            </div> : null}
          </div>
          <div className='flex flex-col xl:gap-2 gap-2 w-full relative'>
            <div className="flex gap-2 flex-wrap">
              {team?.professores && team.professores.map((teacher, idx) => (
                <TeacherCard key={idx} teacher={teacher} />
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
                className={`absolute right-0 -bottom-40 xl:-right-20 xl:-bottom-30 ${!sortedStudents.length ? 'left-96' : ''}`}
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

            {pitchValidated && <div className='bg-gray-100 p-2 border rounded-lg shadow-md lg:w-2/4 w-full'>
              <h3 className="text-lg font-bold">Pitch:</h3>
              <input type="text" placeholder=' Inserir link pitch'
                className='w-full rounded-lg py-2 mb-2'
                onBlur={(e) => {
                  if (e.target.value.length > 1) {
                    handlePitchSave(e.target.value)
                  }
                }}
              />
              <a
                href={team?.linkPitch?.startsWith("http") ? team.linkPitch : `https://${team?.linkPitch}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {team?.linkPitch}
              </a>

            </div>}
          </div>
        </div>
        <div className={`w-full lg:w-72 rounded-md p-4 lg:h-fit text-nowrap ${!sortedStudents.length ? 'hidden' : ''}`}>
          <ul className="space-y-4 mt-36">
            <li className="bg-[#5741A6] text-white font-semibold p-4 rounded-md cursor-pointer flex items-center"
              onClick={async () => {
                const response = await getEventById(EventsTypes.INSCRICAO)
                if (response.data == false || !response.data) {
                  snackBarEventsTypes(EventsTypes.INSCRICAO)
                  return
                }
                handlePrintRegister()
              }}>
              <PrintIcon fontSize='large' />
              <div className="flex-1 flex justify-center">
                <span>Imprimir Inscrição</span>
              </div>
            </li>
            <li className="bg-[#5741A6] text-white font-semibold p-4 rounded-md cursor-pointer flex items-center"
              onClick={async () => {
                const response = await getEventById(EventsTypes.PROTOTIPO)
                if (response.data == false || !response.data) {
                  snackBarEventsTypes(EventsTypes.PROTOTIPO)
                  return
                }
                navigate(RoutesNames.prototyping.replace(':id', id.toString()))
              }}
            >
              <DescriptionIcon fontSize='large' />
              <div className="flex-1 flex justify-center">
                <span>Prototipação</span>
              </div>
            </li>
            <li className="bg-[#5741A6] text-white font-semibold p-4 rounded-md cursor-pointer flex items-center"
              onClick={async () => {
                const response = await getEventById(EventsTypes.CANVAS)
                if (response.data == false || !response.data) {
                  snackBarEventsTypes(EventsTypes.CANVAS)
                  return
                }
                navigate(RoutesNames.banner.replace(':id', id.toString()), { state: team?.nomeEquipe })
              }}>
              <WebIcon fontSize='large' />
              <div className="flex-1 flex justify-center">
                <span>Preencher Canvas</span>
              </div>
            </li>
            <li className="bg-[#5741A6] text-white font-semibold p-4 rounded-md cursor-pointer flex items-center"
              onClick={async () => {
                const response = await getEventById(EventsTypes.CANVAS)
                if (response.data == false || !response.data) {
                  snackBarEventsTypes(EventsTypes.CANVAS)
                  return
                }
                handlePrintBanner()
              }}>
              <PrintIcon fontSize='large' />
              <div className="flex-1 flex justify-center">
                <span>Imprimir Canvas</span>
              </div>
            </li>
            <li className="bg-[#5741A6] text-white font-semibold p-4 rounded-md cursor-pointer flex items-center"
              onClick={async () => {
                const response = await getEventById(EventsTypes.PITCH)
                if (response.data == false || !response.data) {
                  snackBarEventsTypes(EventsTypes.PITCH)
                  return
                }

                setPitchValidated(true)
              }}>
              <LinkIcon fontSize='large' />
              <div className="flex-1 flex justify-center">
                <span>Link Pitch</span>
              </div>
            </li>

          </ul>
        </div>
      </div>
      <FooterImage />
    </div>
  )
}
