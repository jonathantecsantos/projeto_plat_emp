import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import DescriptionIcon from '@mui/icons-material/Description'
import LinkIcon from '@mui/icons-material/Link'
import PrintIcon from '@mui/icons-material/Print'
import WebIcon from '@mui/icons-material/Web'
import { CircularProgress, Divider } from "@mui/material"
import { useGetTeamByIdQuery } from '../../../api/studentApi'
import { TeamsResponse } from "../../../model/team"
import { StudentCard } from './studentCard'
import { TeacherCard } from './teacherCard'



export const TeamComponent = ({ id }: Pick<TeamsResponse, 'id'>) => {
  const { data: team, error, isLoading } = useGetTeamByIdQuery(id)

  if (isLoading) return <div className='text-center'><CircularProgress /></div>
  if (error) return <p>Error loading team</p>

  return (
    <div className="p-6 bg-[#EBF6FF] rounded-lg shadow-lg flex flex-col lg:flex-row">
      <div className="flex-grow">
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
          <div className='bg-gray-100 p-4 border rounded-lg shadow-md'>
            <h3 className="text-lg font-bold">Link do vídeo do Pitch:</h3>
            <a href={team?.professor?.equipe.linkPitch} target="_blank" rel="noopener noreferrer">
              {team?.professor?.equipe.linkPitch}
            </a>
          </div>
        </div>
      </div>
      <div className='w-full lg:w-64 bg-transparent shadow-md rounded-md p-4 mt-4 lg:mt-0 lg:ml-4 lg:h-fit text-nowrap'>
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
          <li className="bg-blue-800 text-white py-2 px-4 rounded-md text-center cursor-pointer flex items-center justify-start space-x-2">
            <LinkIcon />
            <span>Enviar link do pitch</span>
          </li>
        </ul>
      </div>
    </div>
  )
}