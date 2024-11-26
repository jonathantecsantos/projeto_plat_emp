import { zodResolver } from '@hookform/resolvers/zod'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { LoadingButton } from '@mui/lab'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import { useCreateEvaluatorMutation } from '../../../api/studentApi'
import { RoutesNames } from '../../../globals'
import { EditEvaluationType } from './editEvaluationType'

const createEvaluatorSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  instituicao: z.string().min(1, "Instituição é obrigatória"),
  email: z.string().email("Email inválido"),
  idFormatosAvaliacoes: z.array(z.number()).nonempty("Pelo menos um formato de avaliação deve ser selecionado"),
})

type CreateEvaluatorForm = z.infer<typeof createEvaluatorSchema>

export const CreateEvaluator = () => {
  const [createEvaluator, { isLoading, isSuccess }] = useCreateEvaluatorMutation()
  const [searchParams, setSearchParams] = useSearchParams()

  const [success, setSuccess] = useState(isSuccess)
  const [resetTypes, setResetTypes] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  const { control, register, handleSubmit, reset, formState: { errors } } = useForm<CreateEvaluatorForm>({
    resolver: zodResolver(createEvaluatorSchema),
    defaultValues: {
      nome: searchParams.get('nome') || '',
      instituicao: searchParams.get('instituicao') || '',
      email: searchParams.get('email') || '',
      idFormatosAvaliacoes: [], // Default vazio
    },
  })

  const onSubmit = async (data: CreateEvaluatorForm) => {
    try {
      await createEvaluator(data).unwrap()
      enqueueSnackbar('Avaliador criado com sucesso!', { variant: 'success' })
      setSuccess(true)
    } catch (error: any) {
      console.error(error)
      enqueueSnackbar(`${error?.data}`, { variant: 'error' })
    }
  }

  const handleInputChange = (key: keyof CreateEvaluatorForm, value: string) => {
    setSearchParams({ ...Object.fromEntries(searchParams), [key]: value })
  }

  const handleReset = () => {
    reset({
      nome: '',
      instituicao: '',
      email: '',
      idFormatosAvaliacoes: [],
    })
    setSearchParams({})
    setSuccess(false)
    setResetTypes(true)
  }

  useEffect(() => {
    if (resetTypes) {
      setResetTypes(false)
    }
  }, [resetTypes])

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md border-t-2">
      <h2 className="text-3xl font-bold text-center mb-4">Adicionar Avaliador</h2>
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
            <label htmlFor="instituicao" className="block text-sm font-medium text-gray-700">Instituição</label>
            <input
              id="instituicao"
              type="text"
              {...register('instituicao')}
              onBlur={(e) => handleInputChange('instituicao', e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.instituicao && <p className="text-red-500 text-sm mt-1">{errors.instituicao.message}</p>}
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
          <div>
            <Controller
              name="idFormatosAvaliacoes"
              control={control}
              render={({ field }) => (
                <EditEvaluationType
                  initialEvaluationTypes={[]}
                  reset={resetTypes}
                  onChange={(selectedEvaluationIds) => field.onChange(selectedEvaluationIds)}
                />
              )}
            />
            {errors.idFormatosAvaliacoes && (
              <p className="text-red-500 text-sm mt-1">{errors.idFormatosAvaliacoes.message}</p>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate(RoutesNames.evaluators)}
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
