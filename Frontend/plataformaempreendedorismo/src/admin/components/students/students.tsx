import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import ClearIcon from '@mui/icons-material/Clear'
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, IconButton } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDeleteStudentMutation, useGetAllStudentsQuery } from '../../../api/studentApi'
import { RoutesNames } from '../../../globals'
import { StudentsResponse } from '../../../model/student'
import { AdminHeader } from '../common/adminHeader'
import { TableComponent } from '../table'
import { TableComponentClickRowProps, TableComponentSetCurrPageProps } from '../table/common'
import CheckIcon from '@mui/icons-material/Check'


export const Students = () => {
  const { data: students, isLoading, error, refetch } = useGetAllStudentsQuery()
  // const studentsGlobalState = useSelector((state: RootState) => state.studentsApi);
  // const studentsData = studentsGlobalState.queries['getAllStudents(undefined)']?.data || [];
  const [searchParams, setSearchParams] = useSearchParams()
  const searchTerm = searchParams.get('search') || ''

  const [open, setOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<StudentsResponse>()
  const [deleteStudent] = useDeleteStudentMutation()


  const navigate = useNavigate()
  const tableComponentSetCurrPageRef = useRef<TableComponentSetCurrPageProps>(() => { })
  const tableComponentSetCurrPage = tableComponentSetCurrPageRef.current
  if (tableComponentSetCurrPage) tableComponentSetCurrPage({ page: 0 })
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (students) {
      if (students?.length <= 0) {
        console.log('students refetch')
        refetch()
      }
    }
  }, [])


  const filteredStudents = useMemo(() => {
    if (!students) return []
    return students.filter((student) =>
      student.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.equipeRecord.nome.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [students, searchTerm])

  const handleSearch = (query: string) => {
    setSearchParams({ search: query })
  }

  const handleClickOpen = ({ student }: { student: StudentsResponse }) => {
    setSelectedStudent(student)
    setOpen(true)
  }

  const handleDeleteStudent = async () => {
    if (selectedStudent) {
      try {
        await deleteStudent(selectedStudent.id)
        enqueueSnackbar(`Aluno: ${selectedStudent.nome}, excluído com sucesso!`, { variant: 'success' })
        refetch()
        setOpen(false)
      } catch (error) {
        enqueueSnackbar('Erro ao excluir, consulte um administrador.', { variant: 'error' })
      }
    }
  }

  if (isLoading) return <div className='text-center'><CircularProgress /></div>
  if (error) return <p className="text-center">Error loading students.</p>
  if (students!.length <= 0) return <div>
    <AdminHeader onSearch={handleSearch} onRefresh={refetch}
      onAdd={() => navigate(RoutesNames.student)}
      // addButtonName='Adicionar Aluno'
      placeholder='Pesquisar por nome do aluno ou turma' />
    <div className="my-8 flex justify-center font-semibold gap-1">
      <p>Nenhum aluno disponível, realize a</p>
      <span onClick={() => navigate(RoutesNames.uploadFiles)}
        className='hover:font-bold cursor-pointer'>
        importação
      </span>
      <CloudUploadIcon color='action' className='cursor-pointer'
        onClick={() => navigate(RoutesNames.uploadFiles)}
      />
    </div>
  </div>


  return (
    <div className="flex flex-col h-full">
      {/* {JSON.stringify(students![0])} */}
      <div className="sticky top-0 z-10">
        <AdminHeader onSearch={handleSearch} onRefresh={refetch}
          placeholder='Pesquisar por nome do aluno ou turma'
          // addButtonName='Adicionar Aluno'
          onAdd={() => navigate(RoutesNames.student)} />
      </div>
      <div className="flex-1 overflow-auto">
        <div className="overflow-x-auto p-4">
          <TableComponent
            colums={[
              // 'ID',
              'CPF',
              'Nome',
              'Email',
              'Turma',
              'Líder',
              'Vice Líder',
              // 'ID Equipe',
              'Equipe',
              // 'ID Obs',
              'Ação'
            ]}
            wrapperProps={{ style: { maxWidth: 'calc(100% - 10px)' } }}
            setCurrPageRef={tableComponentSetCurrPageRef}
            bodyList={filteredStudents!}
            bodyRowBuilder={(student: StudentsResponse) => (
              <>
                {/* <td className="px-4 py-2">{student.id}</td> */}
                <td className="px-4 py-2">{student.cpf}</td>
                <td className="px-4 py-2 capitalize">{student.nome.toLowerCase()}</td>
                <td className="px-4 py-2">{student.email}</td>
                <td className="px-4 py-2 uppercase">{student.turma}</td>
                <td className="px-4 py-2">{student.isLider ? <CheckIcon className='text-green-500 hover:text-white' /> : ''}</td>
                <td className="px-4 py-2">{student.isViceLider ? <CheckIcon className='text-green-500 hover:text-white' /> : ''}</td>
                <td className="px-4 py-2 capitalize">{student.equipeRecord.nome.toLowerCase()}</td>
                <td className="">
                  <IconButton
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={(event) => {
                      event.stopPropagation()
                      handleClickOpen({ student })

                    }}
                  >
                    <ClearIcon style={{
                      width: 15,
                      height: 15,
                    }} className='hover:text-red-500' />
                  </IconButton>
                </td>
              </>
            )}
            onClickRow={(student: TableComponentClickRowProps<StudentsResponse>) => {
              navigate(RoutesNames.student.replace(':id', student.item?.id.toString()))
            }}
          />
        </div>
      </div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <span>
            Deseja realmente excluir o aluno: {selectedStudent?.nome.toLowerCase()}?
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
