import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, IconButton } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDeleteStudentMutation, useGetAllStudentsQuery } from '../../api/studentApi'
import { AdminHeader } from '../../components/common/adminHeader'
import { RoutesNames } from '../../globals'
import { StudentsResponse } from '../../model/student'
import { TableComponent } from './table'
import { TableComponentClickRowProps, TableComponentSetCurrPageProps } from './table/common'


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

  //TESTAR INVALIDATE TAG WORKING
  // useEffect(() => {
  //   if (students) {
  //     if (students?.length <= 0) {
  //       console.log('students refetch')
  //       refetch()
  //     }
  //   }
  // }, [])


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

  const handleClickOpen = ({ student }: { student: StudentsResponse }) => {
    setSelectedStudent(student)
    setOpen(true)
  }

  const handleDeleteStudent = async () => {
    if (selectedStudent) {
      try {
        await deleteStudent(selectedStudent.id).unwrap()
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
      onAdd={() => { }}
      // addButtonName='Adicionar Aluno'
      placeholder='Pesquisar por nome ou ID' />
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
      <div className="sticky top-0 z-10">
        <AdminHeader onSearch={handleSearch} onRefresh={refetch}
          placeholder='Pesquisar por nome ou ID'
          // addButtonName='Adicionar Aluno'
          onAdd={() => navigate(RoutesNames.student)} />
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
              ''
            ]}
            wrapperProps={{ style: { maxWidth: 'calc(100% - 10px)' } }}
            setCurrPageRef={tableComponentSetCurrPageRef}
            bodyList={filteredStudents!}
            bodyRowBuilder={(student: StudentsResponse) => (
              <>
                <td className="px-4 py-2">{student.id}</td>
                <td className="px-4 py-2">{student.cpf}</td>
                <td className="px-4 py-2 capitalize">{student.nome.toLowerCase()}</td>
                <td className="px-4 py-2">{student.email}</td>
                <td className="px-4 py-2 uppercase">{student.turma}</td>
                <td className="px-4 py-2">{student.isLider ? 'Sim' : 'Não'}</td>
                <td className="px-4 py-2">{student.isViceLider ? 'Sim' : 'Não'}</td>
                <td className="px-4 py-2">{student.idEquipe}</td>
                <td className="px-4 py-2 capitalize">{student.nomeEquipe.toLowerCase()}</td>
                <td className="px-4 py-2">{student.idObs}</td>
                <td className="">
                  <IconButton
                    className='hover:text-white'
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={(event) => {
                      event.stopPropagation()
                      handleClickOpen({ student })
                    }}
                  >
                    <MoreVertIcon />
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
