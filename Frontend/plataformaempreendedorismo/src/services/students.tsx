import {
  useGetStudentsQuery,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
  useCreateStudentMutation,
  useGetStudentQuery,
} from '../api/studentsApi.slice'
import { Student } from '../model/student'

export const StudentApiService = () => {
  // const dispatch = useDispatch()

  const [createStudent, { isLoading: isCreating, isError: createError, data: createData }] = useCreateStudentMutation()
  const [updateStudent, { isLoading: isUpdating, isError: updateError, data: updateData }] = useUpdateStudentMutation()
  const [deleteStudent, { isLoading: isDeleting, isError: deleteError, data: deleteData }] = useDeleteStudentMutation()

  const getStudentById = (id: string) => {
    const { data: student, isLoading: isFetchingTeam, isError: fetchTeamError } = useGetStudentQuery(id)
    return { student, isFetchingTeam, fetchTeamError }
  }

  const { data: students, isLoading: isFetching, isError: fetchError } = useGetStudentsQuery()

  const create = async (data: Student) => {
    try {
      const result = await createStudent(data).unwrap()
      return result
    } catch (error) {
      console.error('StudentApiService => Error creating student:', error)
      throw error
    }
  }

  const update = async (id: any, data: Student) => {
    try {
      const result = await updateStudent({ id, data }).unwrap()
      return result
    } catch (error) {
      console.error('StudentApiService => Error updating student:', error)
      throw error
    }
  }

  const deleteUser = async (id: any) => {
    try {
      await deleteStudent(id).unwrap()
    } catch (error) {
      console.error('StudentApiService => Error deleting student:', error)
      throw error
    }
  }

  return {
    create,
    update,
    deleteUser,
    getStudentById,
    students,
    isFetching,
    fetchError,
    isCreating,
    createError,
    createData,
    isUpdating,
    updateError,
    updateData,
    isDeleting,
    deleteError,
    deleteData,
  }
}
