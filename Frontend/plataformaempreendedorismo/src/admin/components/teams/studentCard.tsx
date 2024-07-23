import { useDispatch } from 'react-redux'
import { useGetStudentQuery, useUpdateStudentMutation } from '../../../api/studentApi'
import { Student } from '../../../model/student'
import { ActionMenu } from '../common/actionMenuIcon'
import { toggleLoading } from '../../../redux/reducers/loadingBar.slice'

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
  const { data: updatedStudent } = useGetStudentQuery(student.id)
  const dispatch = useDispatch()

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
    } catch (error) {
      console.error('Failed to promote to member:', error)
    } finally {
      dispatch(toggleLoading())
    }
  }
  return (
    <div key={student.id} className={`p-4 border rounded-lg shadow-md max-w-80 min-h-28 relative
  ${updatedStudent?.isLider || updatedStudent?.isViceLider ? 'bg-[#636C90] text-[#cecece]' : 'bg-gray-100'}`}>

      <div className='flex justify-between'>
        <p className={`text-lg font-bold capitalize mr-2 ${updatedStudent?.isLider || updatedStudent?.isViceLider ?
          'text-white' : 'text-slate-800'}`}>
          {updatedStudent?.nome.toLowerCase()}
        </p>

        <ActionMenu
          onEdit={() => console.log('Edit student')}
          onRemove={() => console.log('Remove student')}
          onDetails={() => console.log('Student details')}
          onPromoteLeader={handlePromoteToLeader}
          onPromoteViceLeader={handlePromoteToViceLeader}
          onPromoteMember={handlePromoteToMember}
        />
      </div>

      <p>{getRoleLabel(updatedStudent as Student)}</p>
      {/* <p>Turma: {student.turma}</p> */}
    </div>
  )
}