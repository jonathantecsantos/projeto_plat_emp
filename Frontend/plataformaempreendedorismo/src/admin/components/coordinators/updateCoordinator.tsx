import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { LoadingButton } from '@mui/lab'
import { CircularProgress } from '@mui/material'
import { useSnackbar } from 'notistack'
import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetCoordinatorQuery, useUpdateCoordinatorMutation } from "../../../api/studentApi"
import { Coordinator } from '../../../model/coordinators'
import { formatCPF } from '../../../utils/types'


interface UpdateCoordinatorProps {
  id: number
}

export const UpdateCoordinator = ({ id }: UpdateCoordinatorProps) => {
  const { data, isLoading } = useGetCoordinatorQuery(id)

  const [coordinator, setCoordinator] = useState<Coordinator | null>(null)
  const [updateCoordinator, { isSuccess, isLoading: updating }] = useUpdateCoordinatorMutation()
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  useEffect(() => {
    if (data) {
      setCoordinator(data)
    }
  }, [data])

  const handleInputChange = (field: keyof Coordinator, value: any) => {
    setCoordinator((prevData) => ({
      ...prevData!,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!coordinator) return

    const payload = {
      id,
      nome: coordinator.nome,
      email: coordinator.email,
      cpf: formatCPF(coordinator.cpf) || '',
    }

    try {
      await updateCoordinator({ id, data: payload }).unwrap()
      enqueueSnackbar('Avaliador editado com sucesso!', { variant: 'success' })
    } catch (error: any) {
      enqueueSnackbar(error?.data || 'Erro ao editar avaliador', { variant: 'error' })
    }
  }

  if (isLoading || !coordinator) {
    return (
      <div className="text-center">
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md border-t-2">
      <h2 className="text-3xl font-bold text-center mb-4">Editar Avaliador</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              id="nome"
              type="text"
              value={coordinator.nome}
              onChange={(e) => handleInputChange('nome', e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">CPF</label>
            <input
              id="cpf"
              type="text"
              value={coordinator.cpf || ''}
              onChange={(e) => handleInputChange('cpf', e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={coordinator.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-600 flex items-center gap-2"
          >
            <ArrowBackIcon />
            Voltar
          </button>
          <LoadingButton
            className="bg-ring-custom normal-case shadow-md hover:bg-[#8668FFCC]"
            variant="contained"
            loading={updating}
            type="submit"
            disabled={updating}
          >
            {isSuccess && <CheckCircleIcon style={{ color: 'lightgreen' }} className="mr-1" />}
            <span>Editar</span>
          </LoadingButton>
        </div>
      </form>
    </div>
  )
}
