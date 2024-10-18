import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import DescriptionIcon from '@mui/icons-material/Description'
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import PrintIcon from '@mui/icons-material/Print'
import SchoolIcon from '@mui/icons-material/School'
import WebIcon from '@mui/icons-material/Web'
import { CircularProgress, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetTeamByIdQuery, useUpdateTeamMutation } from '../../../api/studentApi'
import { RoutesNames } from '../../../globals'
import { Ods } from '../../../model/ods'
import { TeamsResponse, UpdateTeam } from "../../../model/team"
import { EditOds } from './editOds'
import { StudentCard } from './studentCard'
import { TeacherCard } from './teacherCard'
import { useSnackbar } from 'notistack'
import { EditTeamName } from './editTeamName'


export const TeamComponent = ({ id }: Pick<TeamsResponse, 'id'>) => {
  const { data: team, error, isLoading } = useGetTeamByIdQuery(id)
  const [updateTeam, status] = useUpdateTeamMutation()
  const navigate = useNavigate()
  const [editOdsOpen, setEditOdsOpen] = useState(false)
  const [editTeamNameOpen, setEditTeamNameOpen] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const handleEditTeamNameOpen = (state: boolean) => {
    setEditTeamNameOpen(!state)
  }

  const handleEditOdsOpen = (state: boolean) => {
    setEditOdsOpen(!state)
  }

  const handleUpdateTeam = async (payload: UpdateTeam, successMessage: string) => {
    try {
      await updateTeam({ id: id, data: payload }).unwrap()
      enqueueSnackbar(successMessage, { variant: 'success' })
    } catch (error: any) {
      enqueueSnackbar(`${error?.data}`, { variant: 'error' })
    }
  }

  const handleEditOdsSave = async (selectedOds: Ods[]) => {
    const payload: UpdateTeam = {
      nome: team?.nomeEquipe || '',
      listIdOds: selectedOds?.map((ods) => ({
        id: ods.id
      }))
    }
    await handleUpdateTeam(payload, 'ODS editada com sucesso!')
    handleEditOdsOpen(editOdsOpen)
  }

  const handleEditTeamNameSave = async (newTeamName: string) => {
    const payload: UpdateTeam = {
      nome: newTeamName,  // Novo nome da equipe
      listIdOds: team?.odsList.map((ods) => ({ id: ods.id })) || [], // Manter ODS existentes
    }
    await handleUpdateTeam(payload, 'Nome da equipe atualizado com sucesso!')
    setEditTeamNameOpen(false)
  }


  const handleCancelEditOds = () => {
    setEditOdsOpen(false)
  }

  const handleCancelEditTeamName = () => {
    setEditTeamNameOpen(false)
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
  const leader = team?.alunos.find(aluno => aluno.isLider)
  const viceLeader = team?.alunos.find(aluno => aluno.isViceLider)
  const members = team?.alunos.filter(aluno => !aluno.isLider && !aluno.isViceLider)

  if (leader) sortedStudents.push(leader)
  if (viceLeader) sortedStudents.push(viceLeader)
  if (members) sortedStudents.push(...members)

  return (
    <div className="flex flex-col lg:flex-row relative border-t-2">
      <div className="p-4 text-[#3C14A4]">
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
              {team?.odsList.map((ods, index) => (
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
        <div className='flex flex-col gap-4 w-full'>
          {/* {team?.professor && <TeacherCard teacher={team?.professor} />} */}
          <div className='max-w-xl relative'>
            <div className='grid sm:grid-cols-2 gap-4 mb-14'>
              {sortedStudents.map((student, idx) => <StudentCard student={student} key={idx} />)}
            </div>
            <SpeedDial
              ariaLabel="SpeedDial"
              className={`absolute right-4 -bottom-4 ${!sortedStudents.length ? 'left-96' : ''}`}
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
            </SpeedDial>
          </div>

          {/* {team?.professor?.equipe.linkPitch && <div className='bg-gray-100 p-4 border rounded-lg shadow-md lg:w-4/5 w-full'>
            <h3 className="text-lg font-bold">Pitch:</h3>
            <a href={team?.professor?.equipe.linkPitch} target="_blank" rel="noopener noreferrer">
              {team?.professor?.equipe.linkPitch}
            </a>
          </div>} */}
        </div>
      </div>
      <div className={`w-full lg:w-72 rounded-md p-4  lg:h-fit text-nowrap ${!sortedStudents.length ? 'hidden' : ''}`}>
        <ul className="space-y-4 mt-36">
          <li className="bg-[#5741A6] text-white font-semibold p-4 rounded-md cursor-pointer flex items-center">
            <ContentPasteIcon fontSize='large' />
            <div className="flex-1 flex justify-center">
              <span>Relatório de inscrição</span>
            </div>
          </li>
          <li className="bg-[#5741A6] text-white font-semibold p-4 rounded-md cursor-pointer flex items-center"
            onClick={() => navigate(RoutesNames.prototyping.replace(':id', id.toString()))}
          >
            <DescriptionIcon fontSize='large' />
            <div className="flex-1 flex justify-center">
              <span>Prototipação</span>
            </div>
          </li>
          <li className="bg-[#5741A6] text-white font-semibold p-4 rounded-md cursor-pointer flex items-center">
            <WebIcon fontSize='large' />
            <div className="flex-1 flex justify-center">
              <span onClick={() => navigate(RoutesNames.banner.replace(':id', id.toString()))}>Preencher banner</span>
            </div>
          </li>
          <li className="bg-[#5741A6] text-white font-semibold p-4 rounded-md cursor-pointer flex items-center">
            <PrintIcon fontSize='large' />
            <div className="flex-1 flex justify-center">
              <span onClick={() => navigate(RoutesNames.bannerPreview.replace(':id', id.toString()))}>Imprimir banner</span>
            </div>
          </li>
          {/* {!team?.professor?.equipe.linkPitch && (
            <li className="bg-[#5741A6] text-white font-semibold p-4 rounded-md cursor-pointer flex items-center">
              <LinkIcon fontSize='large' />
              <div className="flex-1 flex justify-center">
                <span>Enviar link do pitch</span>
              </div>
            </li>
          )} */}
        </ul>
      </div>
    </div>
  )
}
