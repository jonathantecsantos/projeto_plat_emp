import { CircularProgress } from '@mui/material'
import { useMemo, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useGetAllStudentsQuery } from '../../api/studentApi'
import { AdminHeader } from '../../components/common/adminHeader'
import { RoutesNames } from '../../globals'
import { StudentsResponse } from '../../model/student'
import { TableComponent } from './table'
import { TableComponentClickRowProps, TableComponentSetCurrPageProps } from './table/common'


export const Students = () => {
  const { data: students, isLoading, error, refetch } = useGetAllStudentsQuery()
  const navigate = useNavigate()
  const tableComponentSetCurrPageRef = useRef<TableComponentSetCurrPageProps>(() => { })
  const tableComponentSetCurrPage = tableComponentSetCurrPageRef.current
  if (tableComponentSetCurrPage) tableComponentSetCurrPage({ page: 0 })

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

  if (isLoading) return <div className='text-center'><CircularProgress /></div>
  if (error) return <p className="text-center">Error loading students.</p>


  console.log('STUDENTS')
  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 z-10">
        <AdminHeader onSearch={handleSearch} onRefresh={refetch} />
      </div>
      <div className="flex-1 overflow-auto">
        <div className="overflow-x-auto p-4">
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
            onClickRow={(student: TableComponentClickRowProps<StudentsResponse>) => {
              navigate(RoutesNames.student.replace(':id', student.item?.id.toString()))
            }}
          />
        </div>
      </div>
    </div>
  )
}
