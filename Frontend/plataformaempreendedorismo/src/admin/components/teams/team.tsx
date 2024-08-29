import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import DescriptionIcon from '@mui/icons-material/Description'
import LinkIcon from '@mui/icons-material/Link'
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary'
import PrintIcon from '@mui/icons-material/Print'
import SchoolIcon from '@mui/icons-material/School'
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
        <h2 className="text-2xl font-bold mb-0 capitalize">{team?.nomeEquipe.toLowerCase()}</h2>
        <h3>TIME</h3>
        <div className="mt-4 mb-6 capitalize">
          <p className='font-semibold'>
            {/* {team?.professor && `${team?.professor?.equipe?.odsList.map((ods) => ods.descricao)}`} */}
          </p>
          <p>ODS</p>
        </div>
        <div className='flex flex-col gap-4 w-full'>
          {team?.professor && <TeacherCard teacher={team?.professor} />}
          <div className='max-w-xl relative'>
            <div className='grid sm:grid-cols-2 gap-4 mb-14'>
              {sortedStudents.map((student, idx) => <StudentCard student={student} key={idx} />)}
            </div>
            <SpeedDial
              ariaLabel="SpeedDial"
              className="absolute right-4 -bottom-4"
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
      <div className={`w-full lg:w-72 rounded-md p-4  lg:h-fit text-nowrap`}>
        <ul className="space-y-4 mt-36">
          <li className="bg-[#5741A6] text-white font-semibold p-4 rounded-md cursor-pointer flex items-center">
            <ContentPasteIcon fontSize='large' />
            <div className="flex-1 flex justify-center">
              <span>Relatório de inscrição</span>
            </div>
          </li>
          <li className="bg-[#5741A6] text-white font-semibold p-4 rounded-md cursor-pointer flex items-center">
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
          {!team?.professor?.equipe.linkPitch && (
            <li className="bg-[#5741A6] text-white font-semibold p-4 rounded-md cursor-pointer flex items-center">
              <LinkIcon fontSize='large' />
              <div className="flex-1 flex justify-center">
                <span>Enviar link do pitch</span>
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}
