import MoreVertIcon from '@mui/icons-material/MoreVert'
import { IconButton } from '@mui/material'
import { Student } from '../../../model/student'
import { ReactNode } from 'react'

export const getRoleLabel = (student: Student) => {
  if (student?.isLider) return 'Líder'
  if (student?.isViceLider) return 'Vice-Líder'
  return 'Membro'
}

export interface StudentCard {
  student: Student
}

export const StudentCard = ({ student }: StudentCard): ReactNode => (
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