import { zodResolver } from '@hookform/resolvers/zod'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { LoadingButton } from '@mui/lab'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import { useCreateStudentMutation } from '../../api/studentApi'

const createStudentSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  cpf: z.string().min(11, "CPF deve ter pelo menos 11 caracteres"),
  email: z.string().email("Email inválido"),
  turma: z.string().min(1, "Turma é obrigatória"),
  isLider: z.boolean(),
  isViceLider: z.boolean(),
  idOds: z.preprocess((val) => Number(val), z.number().int().nullable()),
  idEquipe: z.preprocess((val) => Number(val), z.number().int().nullable()),
})

type CreateStudentForm = z.infer<typeof createStudentSchema>

export const formatCPF = (cpf: string) => cpf.replace(/[^\d]/g, '')

export const CreateStudent = () => {
  const [createStudent, { isLoading, isSuccess }] = useCreateStudentMutation()
  const [searchParams, setSearchParams] = useSearchParams()

  const [success, setSucess] = useState(isSuccess)
  const { enqueueSnackbar } = useSnackbar()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateStudentForm>({
    resolver: zodResolver(createStudentSchema),
    defaultValues: {
      nome: searchParams.get('nome') || '',
      cpf: searchParams.get('cpf') || '',
      email: searchParams.get('email') || '',
      turma: searchParams.get('turma') || '',
      isLider: searchParams.get('isLider') === 'true',
      isViceLider: searchParams.get('isViceLider') === 'true',
      idOds: searchParams.get('idOds') ? Number(searchParams.get('idOds')) : null,
      idEquipe: searchParams.get('idEquipe') ? Number(searchParams.get('idEquipe')) : null,
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
      enqueueSnackbar(`${error?.data}`, { variant: 'error' })
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

  console.log('admin>createStudent.tsx')
  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
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
            <label htmlFor="turma" className="block text-sm font-medium text-gray-700">Turma</label>
            <input
              id="turma"
              type="text"
              {...register('turma')}
              onChange={(e) => handleInputChange('turma', e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.turma && <p className="text-red-500 text-sm mt-1">{errors.turma.message}</p>}
          </div>
          <div>
            <label htmlFor="idOds" className="block text-sm font-medium text-gray-700">ID ODS</label>
            <input
              id="idOds"
              type="number"
              {...register('idOds')}
              onChange={(e) => handleInputChange('idOds', e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.idOds && <p className="text-red-500 text-sm mt-1">{errors.idOds.message}</p>}
          </div>
          <div>
            <label htmlFor="idEquipe" className="block text-sm font-medium text-gray-700">ID Equipe</label>
            <input
              id="idEquipe"
              type="number"
              {...register('idEquipe')}
              onChange={(e) => handleInputChange('idEquipe', e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.idEquipe && <p className="text-red-500 text-sm mt-1">{errors.idEquipe.message}</p>}
          </div>
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
        <div className={`flex items-center  ${success ? 'justify-between' : 'justify-end'}`}>
          {success && <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 mt-8"
          >
            Limpar
          </button>}


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
