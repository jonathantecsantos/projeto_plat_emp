import { zodResolver } from '@hookform/resolvers/zod'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { LoadingButton } from '@mui/lab'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { RoutesNames } from '../../../globals'
import { useCreateTeacherMutation } from '../../../api/studentApi'
import { formatCPF } from '../../../utils/types'
import { TeamSelect } from '../common/teamSelect'

const createTeacherSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  cpf: z.string().min(11, "CPF deve ter pelo menos 11 caracteres"),
  email: z.string().email("Email inválido"),
  idEquipe: z.preprocess((val) => Number(val), z.number().int().nullable()),
})

type CreateTeacherForm = z.infer<typeof createTeacherSchema>


export const CreateTeacher = () => {
  const [createTeacher, { isLoading, isSuccess }] = useCreateTeacherMutation()
  const [searchParams, setSearchParams] = useSearchParams()

  const [success, setSucess] = useState(isSuccess)
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  const { control,register, handleSubmit, reset, formState: { errors } } = useForm<CreateTeacherForm>({
    resolver: zodResolver(createTeacherSchema),
    defaultValues: {
      nome: searchParams.get('nome') || '',
      cpf: searchParams.get('cpf') || '',
      email: searchParams.get('email') || '',
      idEquipe: searchParams.get('idEquipe') ? Number(searchParams.get('idEquipe')) : null,
    },
  })

  const onSubmit = async (data: CreateTeacherForm) => {
    data.cpf = formatCPF(data.cpf)
    try {
      await createTeacher(data).unwrap()
      enqueueSnackbar('Professor criado com sucesso!', { variant: 'success' })
      setSucess(true)
    } catch (error: any) {
      console.log(error)
      enqueueSnackbar(`${error?.data}`, { variant: 'error' })
    }
  }

  const handleInputChange = (key: keyof CreateTeacherForm, value: string) => {
    if (key === 'idEquipe') {
      setSearchParams({ ...Object.fromEntries(searchParams), [key]: value ? parseInt(value).toString() : '' })
    } else {
      setSearchParams({ ...Object.fromEntries(searchParams), [key]: value })
    }
  }

  const handleReset = () => {
    reset()
    setSearchParams({})
    setSucess(false)
  }

  console.log('admin>createTeacher.tsx')
  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-4">Adicionar Professor</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              id="nome"
              type="text"
              {...register('nome')}
              onChange={(e) => handleInputChange('nome', e.target.value)}
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
              onChange={(e) => handleInputChange('cpf', e.target.value)}
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
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div className='mt-4'>
            <Controller
              name="idEquipe"
              control={control}
              render={({ field }) => (
                <TeamSelect
                  className='w-56 py-1 rounded-md mt-2'
                  value={field.value}  // Valor atual
                  onChange={(teamId) => {
                    field.onChange(teamId)
                    handleInputChange('idEquipe', teamId.toString())
                    // Sincronizando com o searchParams
                  }}
                />
              )}
            />
            {errors.idEquipe && <p className="text-red-500 text-sm mt-1">{errors.idEquipe.message}</p>}
          </div>
        </div>
        <div className={`flex items-center justify-between`}>
          <div className='flex gap-4'>
            <button
              type="button"
              onClick={() => navigate(RoutesNames.teachers)}
              className="px-2 py-1 bg-gray-400 text-white rounded-lg hover:bg-gray-600 mt-8 text-sm">
              <ArrowBackIcon />
            </button>

            {success && <button
              type="button"
              onClick={handleReset}
              className="px-4 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 mt-8"
            >
              Limpar
            </button>}
          </div>

          <LoadingButton
            className='bg-ring-custom normal-case mt-8 shadow-md hover:bg-[#8668FFCC]'
            variant='contained'
            loading={isLoading}
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            {success && <CheckCircleIcon style={{ color: 'lightgreen' }} className=' mr-1' />}
            <span>Adicionar</span>
          </LoadingButton>
        </div>
      </form>
    </div>
  )
}
