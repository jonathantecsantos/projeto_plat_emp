import { zodResolver } from '@hookform/resolvers/zod'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { LoadingButton } from '@mui/lab'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import { useCreateCoordinatorMutation } from '../../../api/studentApi'
import { RoutesNames } from '../../../globals'
import { formatCPF } from '../../../utils/types'


const createCoordinatorSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  cpf: z.string().min(11, "CPF deve ter pelo menos 11 caracteres"),
  email: z.string().email("Email inválido"),
})

type CreateCoordinatorForm = z.infer<typeof createCoordinatorSchema>

export const CreateCoordinator = () => {
  const [createCoordinator, { isLoading, isSuccess }] = useCreateCoordinatorMutation()
  const [searchParams, setSearchParams] = useSearchParams()

  const [success, setSuccess] = useState(isSuccess)
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateCoordinatorForm>({
    resolver: zodResolver(createCoordinatorSchema),
    defaultValues: {
      nome: searchParams.get('nome') || '',
      cpf: searchParams.get('cpf') || '',
      email: searchParams.get('email') || '',
    },
  })

  const onSubmit = async (data: CreateCoordinatorForm) => {
    data.cpf = formatCPF(data.cpf)
    try {
      await createCoordinator(data).unwrap()
      enqueueSnackbar('Coordenador criado com sucesso!', { variant: 'success' })
      setSuccess(true)
    } catch (error: any) {
      console.error(error)
      enqueueSnackbar(`${error?.data}`, { variant: 'error' })
    }
  }

  const handleInputChange = (key: keyof CreateCoordinatorForm, value: string) => {
    setSearchParams({ ...Object.fromEntries(searchParams), [key]: value })
  }

  const handleReset = () => {
    reset({
      nome: '',
      cpf: '',
      email: '',
    })
    setSearchParams({})
    setSuccess(false)
  }

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md border-t-2">
      <h2 className="text-3xl font-bold text-center mb-4">Adicionar Coordenador</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              id="nome"
              type="text"
              {...register('nome')}
              onBlur={(e) => handleInputChange('nome', e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome.message}</p>}
          </div>
          <div>
            <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">CPF</label>
            <input
              id="cpf"
              type="text"
              {...register('cpf')}
              onBlur={(e) => handleInputChange('cpf', e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.cpf && <p className="text-red-500 text-sm mt-1">{errors.cpf.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              {...register('email')}
              onBlur={(e) => handleInputChange('email', e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate(RoutesNames.coordinators)}
              className="px-2 py-1 bg-gray-400 text-white rounded-lg hover:bg-gray-600 mt-8 text-sm"
            >
              <ArrowBackIcon />
            </button>

            {success && (
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 mt-8"
              >
                Limpar
              </button>
            )}
          </div>

          <LoadingButton
            className="bg-ring-custom normal-case mt-8 shadow-md hover:bg-[#8668FFCC]"
            variant="contained"
            loading={isLoading}
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            {success && <CheckCircleIcon style={{ color: 'lightgreen' }} className="mr-1" />}
            <span>Adicionar</span>
          </LoadingButton>
        </div>
      </form>
    </div>
  )
}
