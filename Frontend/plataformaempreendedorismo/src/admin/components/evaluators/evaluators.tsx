import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CloseIcon from '@mui/icons-material/Close';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, IconButton, Menu, MenuItem } from '@mui/material'
import { useSnackbar } from "notistack"
import { useState, useRef, useEffect, useMemo } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { RoutesNames } from "../../../globals"
import { Roles } from "../../../utils/types"
import { AdminHeader } from "../common/adminHeader"
import { TableComponentClickRowProps, TableComponentSetCurrPageProps } from "../table/common"
import { useDeleteEvaluatorMutation, useGetEvaluatorsQuery, usePasswordResetMutation } from "../../../api/studentApi"
import { TableComponent } from '../table';
import { LoadingButton } from '@mui/lab';
import { Evaluator } from '../../../model/evaluator';

export const EvaluatorsComponent = () => {
  const { data: evaluators, isLoading, error, refetch } = useGetEvaluatorsQuery()
  const [deleteEvaluator, { isLoading: evaluatorDelete }] = useDeleteEvaluatorMutation()
  const [passordReset, { isLoading: resetPassword }] = usePasswordResetMutation()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchTerm = searchParams.get('search') || ''

  const [selectedEvaluator, setSelectedEvaluator] = useState<Evaluator>()
  const [actionType, setActionType] = useState<'delete' | 'resetPassword' | null>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [openDialog, setOpenDialog] = useState(false)
  const navigate = useNavigate()
  const tableComponentSetCurrPageRef = useRef<TableComponentSetCurrPageProps>(() => { })
  const tableComponentSetCurrPage = tableComponentSetCurrPageRef.current
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  useEffect(() => {
    if (evaluators?.length === 0) {
      console.log('evaluators refetch')
      refetch()
    }
  }, [evaluators, refetch])

  useEffect(() => {
    if (tableComponentSetCurrPage) {
      tableComponentSetCurrPage({ page: 0 });
    }
  }, [evaluators])

  const filteredEvaluators = useMemo(() => {
    if (!evaluators) return []
    return evaluators.filter((evaluator) =>
      evaluator.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evaluator.instituicao.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [evaluators, searchTerm])

  const handleSearch = (query: string) => {
    setSearchParams({ search: query })
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, evaluator: Evaluator) => {
    setSelectedEvaluator(evaluator)
    setAnchorEl(event.currentTarget)
  }

  const handleOpenDialog = (type: 'delete' | 'resetPassword', evaluator: Evaluator) => {
    setActionType(type)
    setOpenDialog(true)
    setSelectedEvaluator(evaluator)
    handleCloseMenu()
  }

  const handleCloseDialog = () => {
    setActionType(null)
    setSelectedEvaluator(undefined)
    setOpenDialog(false)
  }

  const handleConfirmAction = async () => {
    if (actionType === 'delete' && selectedEvaluator) {
      try {
        await deleteEvaluator(selectedEvaluator.id)
        enqueueSnackbar(`Avaliador(a): ${selectedEvaluator.nome}, excluído com sucesso!`, { variant: 'success' })
        refetch()
      } catch (error) {
        enqueueSnackbar('Erro ao excluir, consulte um administrador.', { variant: 'error' })
      }
    } else if (actionType === 'resetPassword' && selectedEvaluator) {
      try {
        const response = await passordReset({
          idObjeto: selectedEvaluator.id,
          emailUsuario: selectedEvaluator.instituicao,
          role: Roles.Avaliador,
        })
        enqueueSnackbar(`Senha do avaliador(a): ${selectedEvaluator.nome} foi resetada com sucesso!`, { variant: 'success' })
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
  if (error) return <p className="text-center">Error loading evaluators.</p>
  if (evaluators!.length <= 0) return <div>
    <AdminHeader onSearch={handleSearch} onRefresh={refetch}
      onAdd={() => navigate(RoutesNames.student)}
      // addButtonName='Adicionar Aluno'
      placeholder='Pesquisar por nome do avaliador ou instituição' />
    <div className="my-8 flex justify-center font-semibold gap-1">
      <p>Nenhum avaliador disponível, realize a </p>
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
          placeholder='Pesquisar por nome do avaliador ou instituição'
          // addButtonName='Adicionar Aluno'
          onAdd={() => navigate(RoutesNames.student)} />
      </div>
      <div className="flex-1 overflow-auto">
        <div className="overflow-x-auto p-4">
          <TableComponent
            colums={[
              // 'ID',
              // 'CPF',
              'Nome',
              'Instituição',
              // 'Turma',
              // 'Líder',
              // 'Vice Líder',
              // 'ID Equipe',
              // 'Equipe',
              // 'ID Obs',
              'Ação'
            ]}
            wrapperProps={{ style: { maxWidth: 'calc(100% - 10px)' } }}
            setCurrPageRef={tableComponentSetCurrPageRef}
            bodyList={filteredEvaluators!}
            bodyRowBuilder={(evaluator: Evaluator) => (
              <>
                {/* <td className="px-4 py-2">{student.id}</td> */}
                {/* <td className="px-4">{evaluator.cpf}</td> */}
                <td className="px-4 capitalize">{evaluator?.nome?.toLowerCase()}</td>
                <td className="px-4 capitalize">{evaluator?.instituicao?.toLowerCase()}</td>

                {/* <td className="px-4">{evaluator.email}</td> */}
                {/* <td className="px-4 uppercase">{evaluator.instituição}</td> */}
                {/* <td className="px-4">{evaluator.isLider ? <CheckIcon className='text-green-500 hover:text-white' /> : ''}</td> */}
                {/* <td className="px-4">{evaluator.isViceLider ? <CheckIcon className='text-green-500 hover:text-white' /> : ''}</td> */}
                {/* <td className="px-4 capitalize">{evaluator.equipeRecord.nome.toLowerCase()}</td> */}
                <td className="px-4">
                  <IconButton
                    className='hover:text-white no-row-click'
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={(event) => {
                      event.stopPropagation()
                      handleOpenMenu(event, evaluator)
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
                      onClick={() => handleOpenDialog('delete', selectedEvaluator!)}>
                      Excluir
                    </MenuItem>

                    <MenuItem className='no-row-click'
                      onClick={() => handleOpenDialog('resetPassword', selectedEvaluator!)}>
                      Resetar Senha
                    </MenuItem>
                  </Menu>
                </td>
              </>
            )}
            onClickRow={(student: TableComponentClickRowProps<Evaluator>) => {
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
            <span>Deseja realmente excluir o avaliador(a): {selectedEvaluator?.nome.toLowerCase()}?</span>
          )}
          {actionType === 'resetPassword' && (
            <span>Deseja realmente resetar a senha do avaliador(a): {selectedEvaluator?.nome.toLowerCase()}?</span>
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
            loading={resetPassword || evaluatorDelete}
            disabled={resetPassword || evaluatorDelete}
            onClick={handleConfirmAction}
          >
            {actionType === 'delete' ? 'Excluir' : 'Resetar Senha'}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  )
}