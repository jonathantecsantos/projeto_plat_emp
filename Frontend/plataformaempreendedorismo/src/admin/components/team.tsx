import MoreVertIcon from '@mui/icons-material/MoreVert'
import { IconButton } from "@mui/material"
import { ReactNode } from "react"
import { useGetTeamByIdQuery } from "../../api/teamApi.slice"
import { Student } from "../../model/student"
import { Team } from "../../model/team"



export const getRoleLabel = (student: Student) => {
  if (student.isLider) return 'Líder'
  if (student.isViceLider) return 'Vice-Líder'
  return 'Membro'
}

export const TeamCardView = ({ student }: { student: Student }): ReactNode => (
  <div key={student.id} className={`p-4 border rounded-lg shadow-md max-w-96 relative
  ${student.isLider || student.isViceLider ? 'bg-[#3C4775] text-[#cecece]' : 'bg-gray-100'}`}>

    <div className='flex justify-between'>
      <p className={`text-lg font-bold capitalize ${student.isLider || student.isViceLider ?
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
    <p>Turma: {student.turma}</p>
    <p>ODS: {student.ods.descricao}</p>

  </div>
)


export const TeamComponent = ({ id }: Pick<Team, 'id'>) => {
  const { data: team, error, isLoading } = useGetTeamByIdQuery(id)

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading team data</p>

  return (
    <div className="p-6 bg-[#EBF6FF] rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 capitalize">{team?.nomeEquipe.toLowerCase()}</h2>
      <div>
        <h3 className="text-xl font-semibold mb-2">Alunos:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {team?.alunos.map((student, idx) => <TeamCardView student={student} key={idx} />)}
        </div>
      </div>
    </div>
  )
}