import { useSnackbar } from 'notistack'
import { useDispatch } from 'react-redux'
import { useDeleteStudentMutation, useGetStudentQuery, useUpdateStudentMutation } from '../../../api/studentApi'
import { Student } from '../../../model/student'
import { toggleLoading } from '../../../redux/reducers/loadingBar.slice'
import { ActionMenu } from '../common/actionMenuIcon'
import { useState } from 'react'
import { Dialog, DialogContent, DialogActions } from '@mui/material'
import { Button } from 'essencials'
import { useNavigate } from 'react-router-dom'
import { RoutesNames } from '../../../globals'

export const getRoleLabel = (student: Student) => {
  if (student?.isLider) return 'Líder'
  if (student?.isViceLider) return 'Vice-Líder'
  return 'Membro'
}

export interface StudentCard {
  student: Student
}

export const StudentCard = ({ student }: StudentCard) => {
  const [updateStudent] = useUpdateStudentMutation()
  const [deleteStudent] = useDeleteStudentMutation()
  const { data: updatedStudent } = useGetStudentQuery(student.id)

  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()



  const handlePromoteToLeader = async () => {
    try {
      dispatch(toggleLoading())
      await updateStudent({ id: student.id, data: { ...student, isLider: true, isViceLider: false } }).unwrap()
    } catch (error) {
      console.error('Failed to promote to leader:', error)
    } finally {
      dispatch(toggleLoading())
    }
  }

  const handlePromoteToViceLeader = async () => {
    try {
      dispatch(toggleLoading())
      await updateStudent({ id: student.id, data: { ...student, isLider: false, isViceLider: true } }).unwrap()
      enqueueSnackbar(`${student.nome}, promovido com sucesso!`, { variant: 'success' })
    } catch (error) {
      console.error('Failed to promote to vice leader:', error)
    } finally {
      dispatch(toggleLoading())
    }
  }

  const handlePromoteToMember = async () => {
    try {
      dispatch(toggleLoading())
      await updateStudent({ id: student.id, data: { ...student, isLider: false, isViceLider: false } }).unwrap()
      enqueueSnackbar(`${student.nome}, promovido com sucesso!`, { variant: 'success' })
    } catch (error) {
      console.error('Failed to promote to member:', error)
    } finally {
      dispatch(toggleLoading())
    }
  }

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
  return (
    <div key={student.id} className={`p-4 border rounded-lg shadow-md max-w-80 min-h-28 relative
  ${updatedStudent?.isLider || updatedStudent?.isViceLider ? 'bg-[#636C90] text-[#cecece]' : 'bg-gray-100'}`}>

      <div className='flex justify-between'>
        <p className={`text-lg font-bold capitalize mr-2 ${updatedStudent?.isLider || updatedStudent?.isViceLider ?
          'text-white' : 'text-slate-800'}`}>
          {updatedStudent?.nome?.toLowerCase()}
        </p>

        <ActionMenu
          onEdit={() => navigate(RoutesNames.student.replace(':id', student.id.toString()))}
          onRemove={() => setOpen(true)}
          onPromoteLeader={handlePromoteToLeader}
          onPromoteViceLeader={handlePromoteToViceLeader}
          onPromoteMember={handlePromoteToMember}
        />
      </div>

      <p>{getRoleLabel(updatedStudent as Student)}</p>
      {/* <p>Turma: {student.turma}</p> */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <span>
            Deseja realmente excluir o aluno: {student?.nome.toLowerCase()}?
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