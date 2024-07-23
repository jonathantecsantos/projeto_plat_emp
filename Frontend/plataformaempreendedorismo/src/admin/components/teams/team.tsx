import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import DescriptionIcon from '@mui/icons-material/Description'
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary'
import SchoolIcon from '@mui/icons-material/School'

import LinkIcon from '@mui/icons-material/Link'
import PrintIcon from '@mui/icons-material/Print'
import WebIcon from '@mui/icons-material/Web'
import { CircularProgress, Divider, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material"
import { useGetTeamByIdQuery } from '../../../api/studentApi'
import { TeamsResponse } from "../../../model/team"
import { StudentCard } from './studentCard'
import { TeacherCard } from './teacherCard'

const actions = [
  { icon: < SchoolIcon />, name: 'Adicionar Aluno' },
  { icon: < LocalLibraryIcon />, name: 'Adicionar Professor' },
];

export const TeamComponent = ({ id }: Pick<TeamsResponse, 'id'>) => {
  const { data: team, error, isLoading } = useGetTeamByIdQuery(id)

  if (isLoading) return <div className='text-center'><CircularProgress /></div>
  if (error) return <p>Error loading team</p>

  return (
    <div className="flex flex-col lg:flex-row relative ">
      <div className="flex-grow p-6 bg-[#EBF6FF] rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-0 capitalize">{team?.nomeEquipe.toLowerCase()}</h2>
        <p className="text-base font-thin mb-4 capitalize">
          {team?.professor && `ODS: ${team?.professor?.equipe?.ods?.descricao}`}
        </p>
        <div className='flex flex-col gap-4 w-full'>
          {team?.professor && <TeacherCard teacher={team?.professor} />}
          <Divider />
          <div className='grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2  gap-4'>
            {team?.alunos.map((student, idx) => <StudentCard student={student} key={idx} />)}
          </div>
          {team?.professor?.equipe.linkPitch && <div className='bg-gray-100 p-4 border rounded-lg shadow-md lg:w-4/5 w-full'>
            <h3 className="text-lg font-bold">Link do vídeo do Pitch:</h3>
            <a href={team?.professor?.equipe.linkPitch} target="_blank" rel="noopener noreferrer">
              {team?.professor?.equipe.linkPitch}
            </a>
          </div>}
        </div>
      </div>
      <div className={`w-full lg:w-64 shadow-md rounded-md p-4 ${!team?.professor?.equipe.linkPitch && 'mb-0'} mb-48 
      lg:mt-0 lg:ml-4 lg:h-fit text-nowrap`}>
        <ul className="space-y-4">
          <li className="bg-blue-800 text-white py-2 px-4 rounded-md text-center cursor-pointer flex items-center justify-start space-x-2 ">
            <ContentPasteIcon />
            <span>Relatório de inscrição</span>
          </li>
          <li className="bg-blue-800 text-white py-2 px-4 rounded-md text-center cursor-pointer flex items-center justify-start space-x-2">
            <DescriptionIcon />
            <span>Prototipação</span>
          </li>
          <li className="bg-blue-800 text-white py-2 px-4 rounded-md text-center cursor-pointer flex items-center justify-start space-x-2">
            <WebIcon />
            <span>Preencher banner</span>
          </li>
          <li className="bg-blue-800 text-white py-2 px-4 rounded-md text-center cursor-pointer flex items-center justify-start space-x-2">
            <PrintIcon />
            <span>Imprimir banner</span>
          </li>
          {team?.professor?.equipe.linkPitch && <li className="bg-blue-800 text-white py-2 px-4 rounded-md text-center cursor-pointer flex items-center justify-start space-x-2">
            <LinkIcon />
            <span>Enviar link do pitch</span>
          </li>}
        </ul>
      </div>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        className="absolute bottom-4 lg:right-72 right-4"
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </div>
  )
}