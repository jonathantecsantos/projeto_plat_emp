import CloudUploadIcon from '@mui/icons-material/CloudUpload'
// import MoreVertIcon from '@mui/icons-material/MoreVert'
import RemoveIcon from '@mui/icons-material/Remove';
// import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
// import ClearIcon from '@mui/icons-material/Clear';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, IconButton } from '@mui/material'
import { useSnackbar } from "notistack"
import { useEffect, useMemo, useRef, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useDeleteTeacherMutation, useGetTeachersQuery } from "../../../api/studentApi"
import { RoutesNames } from "../../../globals"
import { TeachersResponse } from "../../../model/teacher"
import { AdminHeader } from "../common/adminHeader"
import { TableComponent } from '../table'
import { TableComponentClickRowProps, TableComponentSetCurrPageProps } from "../table/common"

export const TeachersComponent = () => {
  const { data: teachers, isLoading, error, refetch } = useGetTeachersQuery()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchTerm = searchParams.get('search') || ''

  const [open, setOpen] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState<TeachersResponse>()
  const [deleteStudent] = useDeleteTeacherMutation()


  const navigate = useNavigate()
  const tableComponentSetCurrPageRef = useRef<TableComponentSetCurrPageProps>(() => { })
  const tableComponentSetCurrPage = tableComponentSetCurrPageRef.current
  if (tableComponentSetCurrPage) tableComponentSetCurrPage({ page: 0 })
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (teachers) {
      if (teachers?.length <= 0) {
        console.log('teachers refetch')
        refetch()
      }
    }
  }, [])


  const filteredStudents = useMemo(() => {
    if (!teachers) return []
    return teachers.filter((teacher) =>
      teacher.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.id.toString().includes(searchTerm)
    )
  }, [teachers, searchTerm])

  const handleSearch = (query: string) => {
    setSearchParams({ search: query })
  }

  const handleClickOpen = ({ teacher }: { teacher: TeachersResponse }) => {
    setSelectedTeacher(teacher)
    setOpen(true)
  }

  const handleDeleteStudent = async () => {
    if (selectedTeacher) {
      try {
        await deleteStudent(selectedTeacher.id)
        enqueueSnackbar(`Professor: ${selectedTeacher.nome}, excluído com sucesso!`, { variant: 'success' })
        refetch()
        setOpen(false)
      } catch (error) {
        enqueueSnackbar('Erro ao excluir, consulte um administrador.', { variant: 'error' })
      }
    }
  }

  if (isLoading) return <div className='text-center'><CircularProgress /></div>
  if (error) return <p className="text-center">Error loading teachers.</p>
  if (teachers!.length <= 0) return <div>
    <AdminHeader onSearch={handleSearch} onRefresh={refetch}
      onAdd={() => navigate(RoutesNames.teacher)}
      placeholder='Pesquisar por nome ou ID' />
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
              'ID',
              'CPF',
              'Nome',
              'Email',
              'Equipe ID',
              'Equipe Nome',
              ''
            ]}
            wrapperProps={{ style: { maxWidth: 'calc(100% - 10px)' } }}
            setCurrPageRef={tableComponentSetCurrPageRef}
            bodyList={filteredStudents!}
            bodyRowBuilder={(teacher: TeachersResponse) => (
              <>
                <td className="px-4 py-2">{teacher.id}</td>
                <td className="px-4 py-2">{teacher.cpf}</td>
                <td className="px-4 py-2 capitalize">{teacher.nome.toLowerCase()}</td>
                <td className="px-4 py-2">{teacher.email}</td>
                <td className="px-4 py-2">{teacher.equipeRecord.id}</td>
                <td className="px-4 py-2 capitalize">{teacher.equipeRecord.nome.toLowerCase()}</td>
                <td className="">
                  <IconButton
                    className='hover:text-white'
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={(event) => {
                      event.stopPropagation()
                      handleClickOpen({ teacher: teacher })
                    }}
                  >
                    <RemoveIcon />  
                  </IconButton>
                </td>
              </>
            )}
            onClickRow={(teacher: TableComponentClickRowProps<TeachersResponse>) => {
              navigate(RoutesNames.teacher.replace(':id', teacher.item?.id.toString()))
            }}
          />
        </div>
      </div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <span>
            Deseja realmente excluir o professor: {selectedTeacher?.nome.toLowerCase()}?
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