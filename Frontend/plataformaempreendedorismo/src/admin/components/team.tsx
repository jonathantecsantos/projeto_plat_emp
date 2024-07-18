import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import DescriptionIcon from '@mui/icons-material/Description'
import LinkIcon from '@mui/icons-material/Link'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import PrintIcon from '@mui/icons-material/Print'
import WebIcon from '@mui/icons-material/Web'
import { Divider, IconButton } from "@mui/material"
import { ReactNode } from "react"
import { useGetTeamByIdQuery } from '../../api/studentApi'
import { Student } from "../../model/student"
import { Teacher } from '../../model/teacher'
import { TeamsResponse } from "../../model/team"


export const getRoleLabel = (student: Student) => {
  if (student?.isLider) return 'Líder'
  if (student?.isViceLider) return 'Vice-Líder'
  return 'Membro'
}

export const StudentCard = ({ student }: { student: Student }): ReactNode => (
  <div key={student.id} className={`p-4 border rounded-lg shadow-md max-w-80 min-h-28 relative
  ${student.isLider || student.isViceLider ? 'bg-[#636C90] text-[#cecece]' : 'bg-gray-100'}`}>

    <div className='flex justify-between'>
      <p className={`text-lg font-bold capitalize mr-2 ${student.isLider || student.isViceLider ?
        'text-white' : 'text-slate-800'}`}>
        {student.nome.toLowerCase()}
      </p>

      <IconButton
        className='hover:text-white text-[#cecece] absolute right-0 top-1'
        onClick={(event) => {
          event.stopPropagation()
          // handleClickOpen({ student })
        }}>
        <MoreVertIcon />
      </IconButton>
    </div>

    <p>{getRoleLabel(student)}</p>
    {/* <p>Turma: {student.turma}</p> */}
  </div>
)

export const TeacherCard = ({ teacher }: { teacher?: Teacher }): ReactNode => (
  <div key={teacher?.id} className={`p-4 border rounded-lg shadow-md w-fit min-h-28 relative bg-[#3C4775] text-[#cecece]`}>
    <div className='w-fit'>
      <p className={`text-lg font-bold capitalize text-white mr-8`}>
        {teacher?.nome.toLowerCase()}
      </p>
      <IconButton
        className='hover:text-white text-[#cecece] absolute right-0 top-1 mx-1'
        onClick={(event) => {
          event.stopPropagation()
          // handleClickOpen({ student })
        }}>
        <MoreVertIcon />
      </IconButton>
    </div>
    <p>Professor/Orientador</p>
  </div>
)


export const TeamComponent = ({ id }: Pick<TeamsResponse, 'id'>) => {
  const { data: team, error, isLoading } = useGetTeamByIdQuery(id)

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading team data</p>

  return (
    <div className="p-6 bg-[#EBF6FF] rounded-lg shadow-lg flex flex-col lg:flex-row">
      <div className="flex-grow">
        <h2 className="text-2xl font-bold mb-0 capitalize">{team?.nomeEquipe.toLowerCase()}</h2>
        <p className="text-base font-thin mb-4 capitalize">ODS: {team?.professor?.equipe?.ods?.descricao}</p>
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