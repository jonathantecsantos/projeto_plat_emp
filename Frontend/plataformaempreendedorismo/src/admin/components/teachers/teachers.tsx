import CloseIcon from '@mui/icons-material/Close'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { LoadingButton } from '@mui/lab'
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, IconButton, Menu, MenuItem } from '@mui/material'
import { useSnackbar } from "notistack"
import { useEffect, useMemo, useRef, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useDeleteTeacherMutation, useGetTeachersQuery, usePasswordResetMutation } from "../../../api/studentApi"
import { RoutesNames } from "../../../globals"
import { TeachersResponse } from "../../../model/teacher"
import { Roles } from '../../../utils/types'
import { AdminHeader } from "../common/adminHeader"
import { TableComponent } from '../table'
import { TableComponentClickRowProps, TableComponentSetCurrPageProps } from "../table/common"

export const TeachersComponent = () => {
  const { data: teachers, isLoading, error, refetch } = useGetTeachersQuery()
  const [deleteTeacher, { isLoading: teacherDelete }] = useDeleteTeacherMutation()
  const [passordReset, { isLoading: resetPassword }] = usePasswordResetMutation()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchTerm = searchParams.get('search') || ''

  const [selectedTeacher, setSelectedTeacher] = useState<TeachersResponse>()
  const [actionType, setActionType] = useState<'delete' | 'resetPassword' | null>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [openDialog, setOpenDialog] = useState(false)

  const navigate = useNavigate()
  const tableComponentSetCurrPageRef = useRef<TableComponentSetCurrPageProps>(() => { })
  const tableComponentSetCurrPage = tableComponentSetCurrPageRef.current
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  useEffect(() => {
    if (teachers?.length === 0) {
      console.log('teachers refetch')
      refetch()
    }
  }, [])

  useEffect(() => {
    if (tableComponentSetCurrPage) {
      tableComponentSetCurrPage({ page: 0 });
    }
  }, [teachers])

  const filteredStudents = useMemo(() => {
    if (!teachers) return []
    return teachers.filter((teacher) =>
      teacher.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.cpf.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [teachers, searchTerm])

  const handleSearch = (query: string) => {
    setSearchParams({ search: query })
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, teacher: TeachersResponse) => {
    setSelectedTeacher(teacher)
    setAnchorEl(event.currentTarget)
  }


  const handleOpenDialog = (type: 'delete' | 'resetPassword', teacher: TeachersResponse) => {
    setActionType(type)
    setSelectedTeacher(teacher)
    setOpenDialog(true)
    handleCloseMenu()
  }

  const handleCloseDialog = () => {
    setActionType(null)
    setSelectedTeacher(undefined)
    setOpenDialog(false)
  }


  const handleConfirmAction = async () => {
    if (actionType === 'delete' && selectedTeacher) {
      try {
        await deleteTeacher(selectedTeacher.id)
        enqueueSnackbar(`Professor(a): ${selectedTeacher.nome} excluído(a) com sucesso!`, { variant: 'success' })
        refetch()
      } catch (error) {
        enqueueSnackbar('Erro ao excluir, consulte um administrador.', { variant: 'error' })
      }
    } else if (actionType === 'resetPassword' && selectedTeacher) {
      try {
        const response = await passordReset({
          idObjeto: selectedTeacher.id,
          emailUsuario: selectedTeacher.email,
          role: Roles.Professor,
        })
        enqueueSnackbar(`Senha do Professor(a): ${selectedTeacher.nome} foi resetada com sucesso!`, { variant: 'success' })
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
  if (error) return <p className="text-center">Error loading teachers.</p>
  if (teachers!.length <= 0) return <div>
    <AdminHeader onSearch={handleSearch} onRefresh={refetch}
      onAdd={() => navigate(RoutesNames.teacher)}
      placeholder='Pesquisar por nome, email ou cpf' />
    <div className="my-8 flex justify-center font-semibold gap-1">
      <p>Nenhum professor disponível, realize a</p>
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
          onAdd={() => navigate(RoutesNames.teacher)} />
      </div>
      <div className="flex-1 overflow-auto">
        <div className="overflow-x-auto p-4">
          <TableComponent
            colums={[
              'CPF',
              'Nome',
              'Email',
              'Equipe',
              'Ação'
            ]}
            wrapperProps={{ style: { maxWidth: 'calc(100% - 10px)' } }}
            setCurrPageRef={tableComponentSetCurrPageRef}
            bodyList={filteredStudents!}
            bodyRowBuilder={(teacher: TeachersResponse) => (
              <>
                <td className="px-4 py-2">{teacher.cpf}</td>
                <td className="px-4 py-2 capitalize text-nowrap">{teacher.nome.toLowerCase()}</td>
                <td className="px-4 py-2 text-nowrap">{teacher.email}</td>
                <td className="px-4 py-2 capitalize">{teacher.equipeRecord.nome.toLowerCase()}</td>
                <td className="">
                  <IconButton
                    className='hover:text-white no-row-click'
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={(event) => {
                      event.stopPropagation()
                      handleOpenMenu(event, teacher)
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
                      onClick={() => handleOpenDialog('delete', selectedTeacher!)}>
                      Excluir
                    </MenuItem>

                    <MenuItem className='no-row-click'
                      onClick={() => handleOpenDialog('resetPassword', selectedTeacher!)}>
                      Resetar Senha
                    </MenuItem>
                  </Menu>
                </td>
              </>
            )}
            onClickRow={(teacher: TableComponentClickRowProps<TeachersResponse>) => {
              const target = teacher.target as HTMLElement
              if (target.closest('.no-row-click')) {
                return
              }
              navigate(RoutesNames.teacher.replace(':id', teacher.item?.id.toString()))
            }}
          />
        </div>
      </div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent>
          {actionType === 'delete' && (
            <span>Deseja realmente excluir o aluno(a): {selectedTeacher?.nome.toLowerCase()}?</span>
          )}
          {actionType === 'resetPassword' && (
            <span>Deseja realmente resetar a senha do aluno(a): {selectedTeacher?.nome.toLowerCase()}?</span>
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
            loading={resetPassword || teacherDelete}
            disabled={resetPassword || teacherDelete}
            onClick={handleConfirmAction}
          >
            {actionType === 'delete' ? 'Excluir' : 'Resetar Senha'}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  )
}