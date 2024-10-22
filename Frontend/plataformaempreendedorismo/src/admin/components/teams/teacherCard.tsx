import { Dialog, DialogActions, DialogContent } from "@mui/material"
import { Button } from "essencials"
import { useSnackbar } from "notistack"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDeleteTeacherMutation } from "../../../api/studentApi"
import { RoutesNames } from "../../../globals"
import { Teacher } from "../../../model/teacher"
import { ActionMenu } from "../common/actionMenuIcon"

export interface TeacherCard {
  teacher?: Teacher
}

export const TeacherCard = ({ teacher }: TeacherCard) => {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const [open, setOpen] = useState(false)  
  const [deleteTeacher] = useDeleteTeacherMutation()

  const handleDeleteTeacher = async () => {
    if (teacher) {
      try {
        await deleteTeacher(teacher.id)
        enqueueSnackbar(`${teacher.nome}, excluído com sucesso!`, { variant: 'success' })
        setOpen(false)
      } catch (error) {
        enqueueSnackbar('Erro ao excluir, consulte um administrador.', { variant: 'error' })
      }
    }
  }

  return <div key={teacher?.id} className={`p-4 border rounded-lg shadow-md w-fit min-h-20 relative bg-[#5741A6] text-[#cecece]`}>
    <div className='min-w-56 w-fit'>
      <p className={`text-lg font-bold capitalize text-white mr-2`}>
        {teacher?.nome.toLowerCase()}
      </p>
      <ActionMenu
        onEdit={() => navigate(RoutesNames.teacher.replace(':id', teacher!.id.toString()))}
        onRemove={() => setOpen(true)}
      />
    </div>
    <p>Professor/Orientador</p>
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogContent>
        <span>
          Deseja realmente excluir o professor(a): {teacher?.nome.toLowerCase()}?
        </span>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} style={{ textTransform: 'none', color: 'gray' }}>
          Cancelar
        </Button>
        <Button onClick={handleDeleteTeacher} style={{ textTransform: 'none', color: 'red' }}>
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  </div>
}
