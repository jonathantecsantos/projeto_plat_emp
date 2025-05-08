import { zodResolver } from '@hookform/resolvers/zod'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { LoadingButton } from '@mui/lab'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import { useCreateStudentMutation } from '../../../api/studentApi'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { RoutesNames } from '../../../globals'
import { ClassesSelectTypes, formatCPF } from '../../../utils/types'
import { TeamSelect } from '../common/teamSelect'
import { TeamConfig } from '../../../model/student'
import { ValidateUtils } from 'essencials'

export const createStudentSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  cpf: z.string().refine((cpf) => ValidateUtils.isValidCPF(cpf), { message: "CPF inválido", }),
  email: z.string().email("Email inválido").refine((email) => email.endsWith('@evl.com.br'), {
    message: "Email deve ser institucional (@evl.com.br)",
  }),
  turma: z.string().min(1, "Turma é obrigatória"),
  isLider: z.boolean(),
  isViceLider: z.boolean(),
  idEquipe: z.number({ required_error: "Selecione uma equipe" }),
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

type CreateStudentForm = z.infer<typeof createStudentSchema>


export const CreateStudent = () => {
  const [createStudent, { isLoading, isSuccess }] = useCreateStudentMutation()
  const [searchParams, setSearchParams] = useSearchParams()

  const [success, setSucess] = useState(isSuccess)
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  const { control, register, handleSubmit, reset, formState: { errors } } = useForm<CreateStudentForm>({
    resolver: zodResolver(createStudentSchema),
    defaultValues: {
      nome: searchParams.get('nome') || '',
      cpf: searchParams.get('cpf') || '',
      email: searchParams.get('email') || '',
      turma: searchParams.get('turma') || '',
      isLider: searchParams.get('isLider') === 'true',
      isViceLider: searchParams.get('isViceLider') === 'true',
      idEquipe: searchParams.get('idEquipe') ? Number(searchParams.get('idEquipe')) : undefined,
      dataNascimento: searchParams.get('dataNascimento') ? new Date(searchParams.get('dataNascimento')!) : undefined,
      tamanhoCamisa: searchParams.get('tamanhoCamisa') as TeamConfig.ShirtSize,
    },
  })

  const onSubmit = async (data: CreateStudentForm) => {
    data.cpf = formatCPF(data.cpf)
    try {
      await createStudent(data).unwrap()
      enqueueSnackbar('Aluno criado com sucesso!', { variant: 'success' })
      setSucess(true)
    } catch (error: any) {
      console.log(error)
      enqueueSnackbar(`${error?.data?.error}`, { variant: 'error' })
    }
  }

  const handleInputChange = (key: keyof CreateStudentForm, value: string) => {
    if (['idOds', 'idEquipe'].includes(key)) {
      setSearchParams({ ...Object.fromEntries(searchParams), [key]: value ? parseInt(value).toString() : '' })
    } else {
      setSearchParams({ ...Object.fromEntries(searchParams), [key]: value })
    }

  }

  const handleCheckboxChange = (key: 'isLider' | 'isViceLider', checked: boolean) => {
    const updatedParams: Record<string, string> = {
      ...Object.fromEntries(searchParams),
      [key]: checked.toString(),
    }

    if (key === 'isLider' && checked) {
      updatedParams.isViceLider = 'false'
    } else if (key === 'isViceLider' && checked) {
      updatedParams.isLider = 'false'
    }

    setSearchParams(updatedParams)
  }

  const handleReset = () => {
    reset()
    setSearchParams({})
    setSucess(false)
  }

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md border-t-2">
      <h2 className="text-3xl font-bold text-center mb-4">Adicionar Aluno</h2>
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
          <div>
            <label htmlFor="turma" className="block text-sm font-medium text-gray-700">Turma/Série</label>
            <select
              {...register('turma')}

              onChange={(e) => handleInputChange('turma', e.target.value)}

              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              {ClassesSelectTypes.map((turma) => (
                <option key={turma} value={turma}>{turma}</option>
              ))}
            </select>
            {errors.turma && <p className="text-red-500 text-sm mt-1">{errors.turma.message}</p>}
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
        <div>
          <Controller
            name="idEquipe"
            control={control}
            render={({ field }) => (
              <TeamSelect
                className='py-1 mt-2 rounded-md'
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex items-center">
            <input
              id="isLider"
              type="checkbox"
              {...register('isLider')}
              onChange={(e) => handleCheckboxChange('isLider', e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              checked={searchParams.get('isLider') === 'true'}
            />
            <label htmlFor="isLider" className="ml-2 block text-sm font-medium text-gray-700">Líder</label>
          </div>
          <div className="flex items-center">
            <input
              id="isViceLider"
              type="checkbox"
              {...register('isViceLider')}
              onChange={(e) => handleCheckboxChange('isViceLider', e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              checked={searchParams.get('isViceLider') === 'true'}
            />
            <label htmlFor="isViceLider" className="ml-2 block text-sm font-medium text-gray-700">Vice-Líder</label>
          </div>
        </div>
        <div className={`flex items-center justify-between`}>
          <div className='flex gap-4'>
            <button
              type="button"
              onClick={() => navigate(RoutesNames.students)}
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
