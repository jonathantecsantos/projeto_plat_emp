import { zodResolver } from '@hookform/resolvers/zod'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { LoadingButton } from '@mui/lab'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import { useCreateTeacherMutation } from '../../../api/studentApi'
import { RoutesNames } from '../../../globals'
import { formatCPF } from '../../../utils/types'
import { TeamMultipleSelect } from './teamMultipleSelect'
import { TeamConfig } from '../../../model/student'
import { ValidateUtils } from 'essencials'

export const createTeacherSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  cpf: z.string().refine((cpf) => ValidateUtils.isValidCPF(cpf), { message: "CPF inválido", }),
  email: z.string().email("Email inválido").refine((email) => email.endsWith('@evl.com.br'), {
    message: "Email deve ser institucional (@evl.com.br)",
  }),
  idEquipe: z.array(z.number().min(1, "ID de equipe inválido")), // Permitir múltiplas equipes regra professor
  dataNascimento: z.preprocess(
    (val) => {
      if (!val) return undefined;
      // Remove a parte do tempo se existir
      if (val instanceof Date) {
        return new Date(val.toISOString().split('T')[0]);
      }
      if (typeof val === 'string') {
        return new Date(val.split('T')[0]);
      }
      return undefined;
    },
    z.date({
      required_error: 'Data de nascimento é obrigatória',
      invalid_type_error: 'Data inválida',
    })
      .refine(date => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date <= today;
      }, { message: "Data não pode ser no futuro" })
  ),
  tamanhoCamisa: z.nativeEnum(TeamConfig.ShirtSize, {
    errorMap: () => ({ message: "Tamanho inválido" })
  }),
})

type CreateTeacherForm = z.infer<typeof createTeacherSchema>

export const CreateTeacher = () => {
  const [createTeacher, { isLoading, isSuccess }] = useCreateTeacherMutation()
  const [searchParams, setSearchParams] = useSearchParams()

  const [success, setSucess] = useState(isSuccess)
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  const { control, register, handleSubmit, reset, formState: { errors } } = useForm<CreateTeacherForm>({
    resolver: zodResolver(createTeacherSchema),
    defaultValues: {
      nome: searchParams.get('nome') || '',
      cpf: searchParams.get('cpf') || '',
      email: searchParams.get('email') || '',
      idEquipe: searchParams.get('idEquipe')
        ? searchParams.get('idEquipe')!.split(',').map(Number)
        : [],
      dataNascimento: searchParams.get('dataNascimento') ? new Date(searchParams.get('dataNascimento')!) : undefined,
      tamanhoCamisa: searchParams.get('tamanhoCamisa') as TeamConfig.ShirtSize,
    },
  })

  const onSubmit = async (data: CreateTeacherForm) => {
    data.cpf = formatCPF(data.cpf)
    try {
      await createTeacher({
        ...data,
        dataNascimento: data.dataNascimento?.toISOString()?.split('T')[0],
      }).unwrap()
      enqueueSnackbar('Professor criado com sucesso!', { variant: 'success' })
      setSucess(true)
    } catch (error: any) {
      enqueueSnackbar(`${error?.data}`, { variant: 'error' })
    }
  }

  const handleInputChange = (key: keyof CreateTeacherForm, value: string | number[]) => {
    if (key === 'idEquipe') {
      setSearchParams({
        ...Object.fromEntries(searchParams),
        [key]: (value as number[]).join(',') // Serializar array para string
      })
    } else {
      setSearchParams({ ...Object.fromEntries(searchParams), [key]: value as string })
    }
  }

  const handleReset = () => {
    reset()
    setSearchParams({})
    setSucess(false)
  }

  console.log('admin>createTeacher.tsx')
  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md border-t-2">
      <h2 className="text-3xl font-bold text-center mb-4">Adicionar Professor</h2>
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
          <div className='mt-4'>
            <Controller
              name="idEquipe"
              control={control}
              render={({ field }) => (
                <TeamMultipleSelect
                  className='w-56 py-1 rounded-md mt-2'
                  value={field.value ?? []}
                  onChange={(teamIds) => {
                    field.onChange(teamIds)
                    handleInputChange('idEquipe', teamIds)
                  }}
                />
              )}
            />
            {errors.idEquipe && <p className="text-red-500 text-sm mt-1">{errors.idEquipe.message}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="dataNascimento" className="block text-sm font-medium text-gray-700">
              Data de Nascimento
            </label>
            <Controller
              name="dataNascimento"
              control={control}
              render={({ field }) => (
                <input
                  type="date"
                  value={field.value ? field.value.toISOString().split('T')[0] : ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    const dateValue = value ? new Date(value) : null;
                    field.onChange(dateValue);
                    handleInputChange('dataNascimento', value);
                  }}
                  max={new Date().toISOString().split('T')[0]}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              )}
            />
            {errors.dataNascimento && (
              <p className="text-red-500 text-sm mt-1">{errors.dataNascimento.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="tamanhoCamisa" className="block text-sm font-medium text-gray-700">
              Tamanho da Camisa
            </label>
            <select
              {...register('tamanhoCamisa')}
              onChange={(e) => handleInputChange('tamanhoCamisa', e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              {Object.values(TeamConfig.ShirtSize).map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            {errors.tamanhoCamisa && (
              <p className="text-red-500 text-sm mt-1">{errors.tamanhoCamisa.message}</p>
            )}
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
