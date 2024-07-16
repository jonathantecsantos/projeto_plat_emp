import { useGetStudentQuery } from "../../api/studentApi"
import { StudentIdResponse } from "../../model/student"

export const UpdateStudent = ({ id }: Pick<StudentIdResponse, 'id'>) => {
  const { data: student } = useGetStudentQuery(id)

  console.log(student)
  console.log('UpdateStudent')
  return <p>{id}</p>
}