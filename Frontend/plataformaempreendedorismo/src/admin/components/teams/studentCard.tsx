import { CircularProgress, Dialog, DialogActions, DialogContent } from '@mui/material'
import { Button } from 'essencials'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDeleteStudentMutation, useGetStudentQuery } from '../../../api/studentApi'
import { RoutesNames } from '../../../globals'
import { Student } from '../../../model/student'
import { ActionMenu } from '../common/actionMenuIcon'

export const getRoleLabel = (student: Student) => {
  if (student?.isLider) return 'Líder'
  if (student?.isViceLider) return 'Vice-Líder'
  return 'Membro'
}

export interface StudentCard {
  student: Student
}

export const StudentCard = ({ student }: StudentCard) => {
  // const [updateStudent] = useUpdateStudentMutation()
  const [deleteStudent] = useDeleteStudentMutation()
  //skip in use because stop handler update data in initiation component
  // const [skip, setSkip] = useState(true)
  // const { data: updatedStudent, isLoading } = useGetStudentQuery(student.id, { skip })
  const { data: updatedStudent, isLoading } = useGetStudentQuery(student.id)


  const [open, setOpen] = useState(false)
  // const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()


  // const handlePromoteToLeader = async () => {
  //   try {
  //     dispatch(toggleLoading())
  //     await updateStudent({ id: student.id, data: { ...student, isLider: true, isViceLider: false } }).unwrap()
  //     setSkip(false) // Allows fetch updated data from the API
  //     enqueueSnackbar(`${student.nome}, promovido com sucesso!`, { variant: 'success' })
  //   } catch (error) {
  //     console.error('Failed to promote to leader:', error)
  //   } finally {
  //     dispatch(toggleLoading())
  //   }
  // }

  // const handlePromoteToViceLeader = async () => {
  //   try {
  //     dispatch(toggleLoading())
  //     await updateStudent({ id: student.id, data: { ...student, isLider: false, isViceLider: true } }).unwrap()
  //     setSkip(false)
  //     enqueueSnackbar(`${student.nome}, promovido com sucesso!`, { variant: 'success' })
  //   } catch (error) {
  //     console.error('Failed to promote to vice leader:', error)
  //   } finally {
  //     dispatch(toggleLoading())
  //   }
  // }

  // const handlePromoteToMember = async () => {
  //   try {
  //     dispatch(toggleLoading())
  //     await updateStudent({ id: student.id, data: { ...student, isLider: false, isViceLider: false } }).unwrap()
  //     setSkip(false)
  //     enqueueSnackbar(`${student.nome}, promovido com sucesso!`, { variant: 'success' })
  //   } catch (error) {
  //     console.error('Failed to promote to member:', error)
  //   } finally {
  //     dispatch(toggleLoading())
  //   }
  // }

  const handleDeleteStudent = async () => {
    if (student) {
      try {
        await deleteStudent(student.id)
        enqueueSnackbar(`${student.nome}, excluído com sucesso!`, { variant: 'success' })
        setOpen(false)
      } catch (error) {
        enqueueSnackbar('Erro ao excluir, consulte um administrador.', { variant: 'error' })
      }
    }
  }

  if (isLoading) return <div className='text-center'><CircularProgress /></div>
  const displayStudent = updatedStudent || student;

  return (
    <div key={student.id} className={`p-4 border rounded-lg shadow-md max-w-80 min-h-20 relative
  ${displayStudent?.isLider || displayStudent?.isViceLider ? 'bg-[#9F8FD9] text-[#210077]' : 'bg-gray-100'}`}>

      <div className='flex justify-between'>
        <p className={`text-lg font-bold capitalize mr-2 text-[#210077] `}>
          {displayStudent?.nome?.toLowerCase()}
        </p>

        <ActionMenu
          onEdit={() => navigate(RoutesNames.student.replace(':id', student.id.toString()))}
          onRemove={() => setOpen(true)}
        // onPromoteLeader={handlePromoteToLeader}
        // onPromoteViceLeader={handlePromoteToViceLeader}
        // onPromoteMember={handlePromoteToMember}
        />
      </div>

      <p className='text-[#210077]'>{getRoleLabel(displayStudent as Student)}</p>
      {/* <p>Turma: {student.turma}</p> */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <span>
            Deseja realmente excluir o aluno: {displayStudent?.nome.toLowerCase()}?
          </span>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} style={{ textTransform: 'none', color: 'gray' }}>
            Cancelar
          </Button>
          <Button onClick={handleDeleteStudent} style={{ textTransform: 'none', color: 'red' }}>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}