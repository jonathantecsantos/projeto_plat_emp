import { CircularProgress } from '@mui/material'
import React, { useMemo, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useGetAllStudentsQuery } from '../../api/studentApi'
import { AdminHeader } from '../../components/common/adminHeader'
import { RoutesNames } from '../../globals'
import { Student, StudentsResponse } from '../../model/student'
import { TableComponent } from './table'
import { TableComponentClickRowProps, TableComponentSetCurrPageProps } from './table/common'


export const StudentsDetails: React.FC = () => {
  const { data: students, isLoading, error, refetch } = useGetAllStudentsQuery()
  const navigate = useNavigate()
  const tableComponentSetCurrPageRef = useRef<TableComponentSetCurrPageProps>(() => { })
  const tableComponentSetCurrPage = tableComponentSetCurrPageRef.current

  const [searchParams, setSearchParams] = useSearchParams()
  const searchTerm = searchParams.get('search') || ''

  const filteredStudents = useMemo(() => {
    if (!students) return []
    return students.filter((student) =>
      student.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toString().includes(searchTerm)
    )
  }, [students, searchTerm])

  const handleSearch = (query: string) => {
    setSearchParams({ search: query })
  }
  console.log('STUDENTS PAGE LOG')

  if (isLoading) return <div className='text-center'><CircularProgress /></div>
  if (error) return <p className="text-center">Error loading students.</p>

  if (tableComponentSetCurrPage) tableComponentSetCurrPage({ page: 0 })

  return (
    <div className="overflow-x-auto">
      <AdminHeader onSearch={handleSearch} onRefresh={refetch}/>
      <TableComponent
        colums={[
          'ID',
          'CPF',
          'Nome',
          'Email',
          'Turma',
          'Líder',
          'Vice Líder',
          'ID Equipe',
          'Nome Equipe',
          'ID Obs',
        ]}
        wrapperProps={{ style: { maxWidth: 'calc(100% - 10px)' } }}
        setCurrPageRef={tableComponentSetCurrPageRef}
        bodyList={filteredStudents!}
        bodyRowBuilder={(student: StudentsResponse) => (
          <>
            <td className="px-4 py-2">{student.id}</td>
            <td className="px-4 py-2">{student.cpf}</td>
            <td className="px-4 py-2">{student.nome}</td>
            <td className="px-4 py-2">{student.email}</td>
            <td className="px-4 py-2 uppercase">{student.turma}</td>
            <td className="px-4 py-2">{student.isLider ? 'Sim' : 'Não'}</td>
            <td className="px-4 py-2">{student.isViceLider ? 'Sim' : 'Não'}</td>
            <td className="px-4 py-2">{student.idEquipe}</td>
            <td className="px-4 py-2">{student.nomeEquipe}</td>
            <td className="px-4 py-2">{student.idObs}</td>
          </>
        )}
        onClickRow={(student: TableComponentClickRowProps<Student>) => {
          navigate(RoutesNames.student.replace(':id', student.item?.id.toString()))
        }}
      />
    </div>
  )
}
