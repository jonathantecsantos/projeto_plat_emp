import CheckIcon from '@mui/icons-material/Check'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, IconButton, Menu, MenuItem } from '@mui/material'
import { useSnackbar } from 'notistack'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDeleteStudentMutation, useGetAllStudentsQuery, usePasswordResetMutation } from '../../../api/studentApi'
import { RoutesNames } from '../../../globals'
import { StudentsResponse } from '../../../model/student'
import { Roles } from '../../../utils/types'
import { AdminHeader } from '../common/adminHeader'
import { TableComponent } from '../table'
import { TableComponentClickRowProps, TableComponentSetCurrPageProps } from '../table/common'
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab'


export const Students = () => {
  const { data: students, isLoading, error, refetch } = useGetAllStudentsQuery()
  const [deleteStudent, { isLoading: studentDelet }] = useDeleteStudentMutation()
  const [passordReset, { isLoading: resetPassword }] = usePasswordResetMutation()
  // const studentsGlobalState = useSelector((state: RootState) => state.studentsApi)
  // const studentsData = studentsGlobalState.queries['getAllStudents(undefined)']?.data || []
  const [searchParams, setSearchParams] = useSearchParams()
  const searchTerm = searchParams.get('search') || ''

  const [selectedStudent, setSelectedStudent] = useState<StudentsResponse>()
  const [actionType, setActionType] = useState<'delete' | 'resetPassword' | null>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [openDialog, setOpenDialog] = useState(false)
  const navigate = useNavigate()
  const tableComponentSetCurrPageRef = useRef<TableComponentSetCurrPageProps>(() => { })
  const tableComponentSetCurrPage = tableComponentSetCurrPageRef.current
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  useEffect(() => {
    if (students?.length === 0) {
      console.log('students refetch')
      refetch()
    }
  }, [students, refetch])

  useEffect(() => {
    if (tableComponentSetCurrPage) {
      tableComponentSetCurrPage({ page: 0 });
    }
  }, [students])

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

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, student: StudentsResponse) => {
    setSelectedStudent(student)
    setAnchorEl(event.currentTarget)
  }

  const handleOpenDialog = (type: 'delete' | 'resetPassword', student: StudentsResponse) => {
    setActionType(type)
    setOpenDialog(true)
    setSelectedStudent(student)
    handleCloseMenu()
  }

  const handleCloseDialog = () => {
    setActionType(null)
    setSelectedStudent(undefined)
    setOpenDialog(false)
  }

  const handleConfirmAction = async () => {
    if (actionType === 'delete' && selectedStudent) {
      try {
        await deleteStudent(selectedStudent.id)
        enqueueSnackbar(`Aluno(a): ${selectedStudent.nome}, excluído com sucesso!`, { variant: 'success' })
        refetch()
      } catch (error) {
        enqueueSnackbar('Erro ao excluir, consulte um administrador.', { variant: 'error' })
      }
    } else if (actionType === 'resetPassword' && selectedStudent) {
      try {
        const response = await passordReset({
          idObjeto: selectedStudent.id,
          emailUsuario: selectedStudent.email,
          role: Roles.Aluno,
        })
        enqueueSnackbar(`Senha do aluno(a): ${selectedStudent.nome} foi resetada com sucesso!`, { variant: 'success' })
        enqueueSnackbar(
          <div>
            <p><strong>Login:</strong> {response?.data?.login}</p>
            <p><strong>Nova senha:</strong> {response?.data?.senha}</p>
          </div>,
          {
            variant: 'info',
            persist: true,
            action: (key) => (
              <CloseIcon className='hover:cursor-pointer hover:text-red-500' onClick={() => closeSnackbar(key)} color="primary" />
            ),
          }
        )
      } catch (error) {
        enqueueSnackbar('Erro ao resetar senha, consulte um administrador.', { variant: 'error' })
      }
    }
    handleCloseDialog()
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
                <td className="px-4">{student.cpf}</td>
                <td className="px-4 capitalize">{student.nome.toLowerCase()}</td>
                <td className="px-4">{student.email}</td>
                <td className="px-4 uppercase">{student.turma}</td>
                <td className="px-4">{student.isLider ? <CheckIcon className='text-green-500 hover:text-white' /> : ''}</td>
                <td className="px-4">{student.isViceLider ? <CheckIcon className='text-green-500 hover:text-white' /> : ''}</td>
                <td className="px-4 capitalize">{student.equipeRecord.nome.toLowerCase()}</td>
                <td className="px-4">
                  <IconButton
                    className='hover:text-white no-row-click'
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={(event) => {
                      event.stopPropagation()
                      handleOpenMenu(event, student)
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    className='no-row-click'
                    variant='selectedMenu'
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}>
                    <MenuItem className='no-row-click'
                      onClick={() => handleOpenDialog('delete', selectedStudent!)}>
                      Excluir
                    </MenuItem>

                    <MenuItem className='no-row-click'
                      onClick={() => handleOpenDialog('resetPassword', selectedStudent!)}>
                      Resetar Senha
                    </MenuItem>
                  </Menu>
                </td>
              </>
            )}
            onClickRow={(student: TableComponentClickRowProps<StudentsResponse>) => {
              //controle de envio de rotas no click da action
              const target = student.target as HTMLElement
              if (target.closest('.no-row-click')) {
                return
              }
              navigate(RoutesNames.student.replace(':id', student.item?.id.toString()))
            }}
          />
        </div>
      </div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent>
          {actionType === 'delete' && (
            <span>Deseja realmente excluir o aluno(a): {selectedStudent?.nome.toLowerCase()}?</span>
          )}
          {actionType === 'resetPassword' && (
            <span>Deseja realmente resetar a senha do aluno(a): {selectedStudent?.nome.toLowerCase()}?</span>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} style={{ textTransform: 'none', color: 'gray' }}>
            Cancelar
          </Button>
          <LoadingButton
            style={{
              textTransform: 'none',
              color: actionType === 'delete' ? 'red' : 'blue',
              backgroundColor: 'transparent',
              borderRadius: '0.375rem',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'background-color 0.3s',
            }}
            variant='contained'
            loading={resetPassword || studentDelet}
            disabled={resetPassword || studentDelet}
            onClick={handleConfirmAction}
          >
            {actionType === 'delete' ? 'Excluir' : 'Resetar Senha'}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  )
}
