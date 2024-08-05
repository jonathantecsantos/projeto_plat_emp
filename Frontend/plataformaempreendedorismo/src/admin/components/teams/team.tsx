import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import DescriptionIcon from '@mui/icons-material/Description'
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary'
import SchoolIcon from '@mui/icons-material/School'

import LinkIcon from '@mui/icons-material/Link'
import PrintIcon from '@mui/icons-material/Print'
import WebIcon from '@mui/icons-material/Web'
import { CircularProgress, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material"
import { useNavigate } from 'react-router-dom'
import { useGetTeamByIdQuery } from '../../../api/studentApi'
import { RoutesNames } from '../../../globals'
import { TeamsResponse } from "../../../model/team"
import { StudentCard } from './studentCard'
import { TeacherCard } from './teacherCard'


export const TeamComponent = ({ id }: Pick<TeamsResponse, 'id'>) => {
  const { data: team, error, isLoading } = useGetTeamByIdQuery(id)
  const navigate = useNavigate()

  const actions = [
    {
      icon: < SchoolIcon />, name: 'Adicionar Aluno', onClick: () => navigate(RoutesNames.student,
        {
          state: {
            id: id,
            nomeEquipe: team?.nomeEquipe,
          }
        })
    },
    {
      icon: < LocalLibraryIcon />, name: 'Adicionar Professor', onClick: () => navigate(RoutesNames.teacher,
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

  //logica para permitir apenas um lider e um vice lider
  if (leader) sortedStudents.push(leader)
  if (viceLeader) sortedStudents.push(viceLeader)
  if (members) sortedStudents.push(...members)

  return (
    <div className="flex flex-col lg:flex-row relative border-t-2">
      <div className="p-4 text-[#3C14A4]">
        <h2 className="text-2xl font-bold mb-0 capitalize ">{team?.nomeEquipe.toLowerCase()}</h2>
        <h3>TIME</h3>
        <div className="mt-3 mb-4 capitalize">
          <p className='font-semibold'>{team?.professor && `${team?.professor?.equipe?.ods?.descricao}`}</p>
          <p>ODS</p>
        </div>
        <div className='flex flex-col gap-4 w-full'>
          {team?.professor && <TeacherCard teacher={team?.professor} />}
          {/* <Divider /> */}
          <div className='w-full relative'>
            <div className='grid md:grid-cols-2 gap-4 mb-14'>
              {sortedStudents.map((student, idx) => <StudentCard student={student} key={idx} />)}
            </div>
            <SpeedDial
              ariaLabel="SpeedDial"
              className="absolute right-4 -bottom-4 "
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

          {team?.professor?.equipe.linkPitch && <div className='bg-gray-100 p-4 border rounded-lg shadow-md lg:w-4/5 w-full'>
            <h3 className="text-lg font-bold">Pitch:</h3>
            <a href={team?.professor?.equipe.linkPitch} target="_blank" rel="noopener noreferrer">
              {team?.professor?.equipe.linkPitch}
            </a>
          </div>}
        </div>
      </div>
      <div className={`w-full lg:w-72 rounded-md p-4 lg:mt-0 lg:ml-4 lg:h-fit text-nowrap`}>
        <ul className="space-y-4 mt-32">
          <li className="bg-[#5741A6] text-white font-semibold p-4 rounded-md text-center cursor-pointer flex items-center justify-start space-x-5 ">
            <ContentPasteIcon fontSize='large' />
            <span>Relatório de inscrição</span>
          </li>
          <li className="bg-[#5741A6] text-white font-semibold p-4 rounded-md text-center cursor-pointer flex items-center justify-start space-x-5">
            <DescriptionIcon fontSize='large' />
            <span>Prototipação</span>
          </li>
          <li className="bg-[#5741A6] text-white font-semibold p-4 rounded-md text-center cursor-pointer flex items-center justify-start space-x-5">
            <WebIcon fontSize='large' />
            <span>Preencher banner</span>
          </li>
          <li className="bg-[#5741A6] text-white font-semibold p-4 rounded-md text-center cursor-pointer flex items-center justify-start space-x-5">
            <PrintIcon fontSize='large' />
            <span onClick={() => navigate(RoutesNames.bannerPreview)}>Imprimir banner</span>
          </li>
          {!team?.professor?.equipe.linkPitch && <li className="bg-[#5741A6] text-white font-semibold p-4 rounded-md text-center cursor-pointer flex items-center justify-start space-x-5">
            <LinkIcon fontSize='large' />
            <span>Enviar link do pitch</span>
          </li>}
        </ul>

      </div>

    </div>
  )
}