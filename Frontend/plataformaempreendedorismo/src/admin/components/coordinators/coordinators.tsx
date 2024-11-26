import CloseIcon from '@mui/icons-material/Close'
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { LoadingButton } from "@mui/lab"
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, IconButton, Menu, MenuItem } from "@mui/material"
import { useSnackbar } from "notistack"
import { useEffect, useMemo, useRef, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useDeleteCoordinatorMutation, useGetCoordinatorsQuery, usePasswordResetMutation } from "../../../api/studentApi"
import { RoutesNames } from "../../../globals"
import { Coordinator } from "../../../model/coordinators"
import { Roles } from "../../../utils/types"
import { AdminHeader } from "../common/adminHeader"
import { TableComponent } from "../table"
import { TableComponentClickRowProps, TableComponentSetCurrPageProps } from "../table/common"

export const Coordinators = () => {
  const { data: coordinators, isLoading, error, refetch } = useGetCoordinatorsQuery()
  const [deleteCoordinator, { isLoading: deleting }] = useDeleteCoordinatorMutation()
  const [passordReset, { isLoading: resetPassword }] = usePasswordResetMutation()

  const [searchParams, setSearchParams] = useSearchParams()
  const searchTerm = searchParams.get("search") || ""

  const [selectedCoordinator, setSelectedCoordinator] = useState<Coordinator>()
  const [actionType, setActionType] = useState<"delete" | "resetPassword" | null>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [openDialog, setOpenDialog] = useState(false)
  const navigate = useNavigate()
  const tableComponentSetCurrPageRef = useRef<TableComponentSetCurrPageProps>(() => { })
  const tableComponentSetCurrPage = tableComponentSetCurrPageRef.current
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  useEffect(() => {
    if (coordinators?.length === 0) {
      console.log("coordinators refetch")
      refetch()
    }
  }, [coordinators, refetch])

  useEffect(() => {
    if (tableComponentSetCurrPage) {
      tableComponentSetCurrPage({ page: 0 })
    }
  }, [coordinators])

  const filteredCoordinators = useMemo(() => {
    if (!coordinators) return []
    return coordinators.filter((coordinator) =>
      coordinator.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coordinator.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [coordinators, searchTerm])

  const handleSearch = (query: string) => {
    setSearchParams({ search: query })
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, coordinator: Coordinator) => {
    setSelectedCoordinator(coordinator)
    setAnchorEl(event.currentTarget)
  }

  const handleOpenDialog = (type: "delete" | "resetPassword", coordinator: Coordinator) => {
    setActionType(type)
    setOpenDialog(true)
    setSelectedCoordinator(coordinator)
    handleCloseMenu()
  }

  const handleCloseDialog = () => {
    setActionType(null)
    setSelectedCoordinator(undefined)
    setOpenDialog(false)
  }

  const handleConfirmAction = async () => {
    if (actionType === "delete" && selectedCoordinator) {
      try {
        await deleteCoordinator(selectedCoordinator.id)
        enqueueSnackbar(`Coordenador(a): ${selectedCoordinator.nome} excluído com sucesso!`, { variant: "success" })
        refetch()
      } catch (error) {
        enqueueSnackbar("Erro ao excluir o coordenador, consulte um administrador.", { variant: "error" })
      }
    }
    if (actionType === "resetPassword" && selectedCoordinator) {
      try {
        const response = await passordReset({
          idObjeto: selectedCoordinator.id,
          emailUsuario: selectedCoordinator.email,
          role: Roles.Coordenador,
        })
        enqueueSnackbar(`Senha do coordenador(a): ${selectedCoordinator.nome} foi resetada com sucesso!`, { variant: 'success' })
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

  if (isLoading) return <div className="text-center"><CircularProgress /></div>
  if (error) return <p className="text-center">Erro ao carregar os coordenadores.</p>

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 z-10">
        <AdminHeader
          onSearch={handleSearch}
          onRefresh={refetch}
          placeholder="Pesquisar por nome ou email do coordenador"
          onAdd={() => navigate(RoutesNames.coordinator)}
        />
      </div>
      <div className="flex-1 overflow-auto">
        <div className="overflow-x-auto p-4">
          <TableComponent
            colums={["Nome", "Email", "CPF", "Ações"]}
            wrapperProps={{ style: { maxWidth: "calc(100% - 10px)" } }}
            setCurrPageRef={tableComponentSetCurrPageRef}
            bodyList={filteredCoordinators!}
            bodyRowBuilder={(coordinator: Coordinator) => (
              <>
                <td className="px-4">{coordinator.nome}</td>
                <td className="px-4">{coordinator.email}</td>
                <td className="px-4">{coordinator.cpf}</td>
                <td className="px-4">
                  <IconButton
                    className="hover:text-white no-row-click"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={(event) => {
                      event.stopPropagation()
                      handleOpenMenu(event, coordinator)
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    className="no-row-click"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                  >
                    <MenuItem onClick={() => handleOpenDialog("delete", selectedCoordinator!)}>
                      Excluir
                    </MenuItem>
                    <MenuItem onClick={() => handleOpenDialog("resetPassword", selectedCoordinator!)}>
                      Resetar senha
                    </MenuItem>
                  </Menu>
                </td>
              </>
            )}
            onClickRow={(coordinator: TableComponentClickRowProps<Coordinator>) => {
              const target = coordinator.target as HTMLElement
              if (target.closest(".no-row-click")) {
                return
              }
              navigate(RoutesNames.coordinator.replace(":id", coordinator.item?.id.toString()))
            }}
          />
        </div>
      </div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent>
          {actionType === "delete" && (
            <span>Deseja realmente excluir o coordenador(a): {selectedCoordinator?.nome}?</span>
          )}
          {actionType === "resetPassword" && (
            <span>Deseja realmente resetar a senha do coordenador(a): {selectedCoordinator?.nome}</span>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} style={{ textTransform: "none", color: "gray" }}>
            Cancelar
          </Button>
          <LoadingButton
            style={{
              textTransform: "none",
              color: actionType === "delete" ? "red" : "blue",
              backgroundColor: 'transparent',
              borderRadius: '0.375rem',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'background-color 0.3s',
            }}
            variant="contained"
            loading={resetPassword || deleting}
            onClick={handleConfirmAction}
          >
            {actionType === "delete" ? "Excluir" : "Resetar senha"}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  )
}
