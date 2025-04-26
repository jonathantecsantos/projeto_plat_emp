import { zodResolver } from '@hookform/resolvers/zod'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { LoadingButton } from '@mui/lab'
import { ValidateUtils } from 'essencials'
import { useSnackbar } from "notistack"
import { useEffect, useState } from "react"
import { useFieldArray, useForm } from 'react-hook-form'
import { useDispatch } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom"
import { z } from "zod"
import { useCreateTeamMutation } from "../../api/studentApi"
import { RoutesNames } from '../../globals'
import { Student } from "../../model/student"
import { toggleLoading } from "../../redux/reducers/loadingBar.slice"
import { formatCPF, Institutions } from "../../utils/types"


const createTeamSchema = z.object({
  nomeTime: z.string().min(1, "Nome do time é obrigatório"),
  alunos: z.array(
    z.object({
      cpf: z.string().refine((cpf) => ValidateUtils.isValidCPF(cpf), { message: "CPF inválido", }),
      email: z.string().email("Email inválido").refine((email) => email.endsWith('@evl.com.br'), {
        message: "Email deve ser institucional (@evl.com.br)",
      }),
      nome: z.string().min(1, "Nome é obrigatório"),
      turma: z.string().min(1, "Turma é obrigatória"),
      isLider: z.boolean(),
      isViceLider: z.boolean(),
      idEquipe: z.number().optional(),
      dataNascimento: z.preprocess(
        (val) => {
          if (typeof val === 'string' && val.trim() !== "") return new Date(val);
          return val;
        },
        z.date().refine((date) => !isNaN(date.getTime()), { message: "Data inválida - utilize uma data real" })),
      tamanhoCamisa: z.nativeEnum(Student.ShirtSize, { errorMap: () => ({ message: "Tamanho inválido" }) }),
    })
  ).min(5, "Mínimo de 5 alunos").max(8, "Máximo de 8 alunos"),
  idProfessor: z.number(),
  listIdOds: z.array(
    z.object({
      id: z.number(),
    })
  ).min(1, "Selecione pelo menos 1 ODS"),

  tipoAtividades: z.array(z.string()).optional(),
  instituicaoImpactoSocial: z.string().min(1, "Instituição é obrigatória"),
  // captchaToken: z.string().min(1, "CAPTCHA obrigatório"),
})

type CreateTeamForm = z.infer<typeof createTeamSchema>


export const TeamRegister = () => {
  const [createTeam, { isSuccess, isLoading }] = useCreateTeamMutation()
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useDispatch()
  // TODO-WINNICIUS: falta capturar ods, professor, tipo de atividade e o captcha

  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const [success, setSuccess] = useState(isSuccess)

  const { control, register, handleSubmit, reset, formState: { errors } } = useForm<CreateTeamForm>({
    resolver: zodResolver(createTeamSchema),
    defaultValues: {
      nomeTime: searchParams.get('nomeTime') || '',
      alunos: JSON.parse(searchParams.get('alunos') || '[]'),
      idProfessor: Number(searchParams.get('idProfessor')) || 0,
      listIdOds: JSON.parse(searchParams.get('listIdOds') || '[]'),
      tipoAtividades: JSON.parse(searchParams.get('tipoAtividades') || '[]'),
      instituicaoImpactoSocial: searchParams.get('instituicaoImpactoSocial') || '',
    },
  })

  const { fields: studentsFields, append, remove } = useFieldArray({
    control,
    name: 'alunos',
  })

  const handleInputChange = (key: keyof CreateTeamForm, value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set(key, value)
    setSearchParams(params)
  }

  const handleArrayChange = (key: 'alunos' | 'listIdOds' | 'tipoAtividades', value: any[]) => {
    const params = new URLSearchParams(searchParams)
    params.set(key, JSON.stringify(value))
    setSearchParams(params)
  }

  const handleStudentChange = (index: number, field: string, value: any) => {
    const currentStudents = JSON.parse(searchParams.get('alunos') || '[]')
    currentStudents[index] = currentStudents[index] || {}
    currentStudents[index][field] = value

    const params = new URLSearchParams(searchParams)
    params.set('alunos', JSON.stringify(currentStudents))
    setSearchParams(params)
  }

  const handleCheckboxChange = (key: 'isLider' | 'isViceLider', index: number, checked: boolean) => {
    const currentStudents = JSON.parse(searchParams.get('alunos') || '[]')
    currentStudents[index] = currentStudents[index] || {}

    // Lógica para garantir apenas um líder e um vice-líder
    if (key === 'isLider' && checked) {
      // Desmarca outros líderes
      currentStudents.forEach((student: any, i: number) => {
        if (i !== index) student.isLider = false
      })
      // Se estiver marcando como líder, desmarca como vice
      currentStudents[index].isViceLider = false
    } else if (key === 'isViceLider' && checked) {
      // Desmarca outros vice-líderes
      currentStudents.forEach((student: any, i: number) => {
        if (i !== index) student.isViceLider = false
      })
      // Se estiver marcando como vice, desmarca como líder
      currentStudents[index].isLider = false
    }

    currentStudents[index][key] = checked

    const params = new URLSearchParams(searchParams)
    params.set('alunos', JSON.stringify(currentStudents))
    setSearchParams(params)
  }

  const handleReset = () => {
    reset()
    setSearchParams(new URLSearchParams(), { replace: true })
    setSuccess(false)
  }

  const showMinStudentsError = studentsFields.length < 5 && studentsFields.length > 0

  const onSubmit = async (data: CreateTeamForm) => {
    dispatch(toggleLoading())
    try {
      await createTeam({
        data: {
          alunos: data.alunos.map((student) => ({
            ...student,
            cpf: formatCPF(student.cpf),
            idEquipe: student.idEquipe ?? null,
          }))
        }, teacherId: data.idProfessor
      }).unwrap()
      enqueueSnackbar(`Time: ${data.nomeTime} criado com sucesso!`, { variant: 'success' })
      setSuccess(true)
    } catch (error) {
      console.error(error)
      enqueueSnackbar('Erro ao criar time', { variant: 'error' })
    } finally {
      dispatch(toggleLoading())
    }
  }

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.error("Erros de validação:", errors);
    }
  }, [errors]);

  return (
    <div className="flex flex-col max-w-3xl mx-auto my-8 p-4">
      <button
        className="flex items-center gap-2 mb-4 text-blue-600"
        onClick={() => navigate(RoutesNames.login)}
      >
        <ArrowBackIcon /> Voltar
      </button>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div>
          <label htmlFor="nomeTime" className="block text-lg font-medium text-gray-700">Nome do Time</label>
          <input
            {...register("nomeTime")}
            onChange={(e) => handleInputChange('nomeTime', e.target.value)}
            className="border rounded p-2 w-full"
          />
          {errors.nomeTime && <p className="text-red-500 text-sm">{errors.nomeTime.message}</p>}
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-lg">Alunos</h2>
          {showMinStudentsError && (
            <p className="text-red-500 text-sm">
              Mínimo de 5 alunos necessários (atualmente: {studentsFields.length})
            </p>
          )}
          {studentsFields.map((field, index) => (
            <div key={field.id} className="border p-4 rounded-md flex flex-col gap-2">
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome completo</label>
              <input
                {...register(`alunos.${index}.nome`)}
                onChange={(e) => handleStudentChange(index, 'nome', e.target.value)}
                placeholder="Nome completo"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.alunos?.[index]?.nome && <p className="text-red-500 text-sm">{errors.alunos[index]?.nome?.message}</p>}

              <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">CPF</label>
              <input
                {...register(`alunos.${index}.cpf`)}
                onChange={(e) => handleStudentChange(index, 'cpf', e.target.value)}
                placeholder="CPF"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.alunos?.[index]?.cpf && <p className="text-red-500 text-sm">{errors.alunos[index]?.cpf?.message}</p>}

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Data de Nascimento
                </label>
                <input
                  type="date"
                  {...register(`alunos.${index}.dataNascimento`, {
                    valueAsDate: true // Converte automaticamente para Date
                  })}
                  className="border rounded p-2 w-full"
                />
                {errors.alunos?.[index]?.dataNascimento && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.alunos[index]?.dataNascimento?.message}
                  </p>
                )}
              </div>

              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                {...register(`alunos.${index}.email`)}
                onChange={(e) => handleStudentChange(index, 'email', e.target.value)}
                placeholder="@evl.com.br"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.alunos?.[index]?.email && <p className="text-red-500 text-sm">{errors.alunos[index]?.email?.message}</p>}

              <label htmlFor="turma" className="block text-sm font-medium text-gray-700">Turma/Série</label>
              <input
                {...register(`alunos.${index}.turma`)}
                onChange={(e) => handleStudentChange(index, 'turma', e.target.value)}
                placeholder="Turma/Série"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.alunos?.[index]?.turma && <p className="text-red-500 text-sm">{errors.alunos[index]?.turma?.message}</p>}

              <label htmlFor="tamanhoCamisa" className="block text-sm font-medium text-gray-700">Tamanho da Camisa</label>
              <select
                {...register(`alunos.${index}.tamanhoCamisa`)}
                onChange={(e) => handleStudentChange(index, 'tamanhoCamisa', e.target.value)}
                className="border rounded p-2"
              >
                {Object.values(Student.ShirtSize).map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
              {errors.alunos?.[index]?.tamanhoCamisa && <p className="text-red-500 text-sm">{errors.alunos[index]?.tamanhoCamisa?.message}</p>}


              <div className="flex gap-4 items-center">
                <label>
                  <input
                    className='mr-1'
                    type="checkbox"
                    {...register(`alunos.${index}.isLider`)}
                    onChange={(e) => handleCheckboxChange('isLider', index, e.target.checked)}
                    checked={JSON.parse(searchParams.get('alunos') || '[]')[index]?.isLider || false}
                  /> Líder
                </label>
                <label>
                  <input
                    className='mr-1'
                    type="checkbox"
                    {...register(`alunos.${index}.isViceLider`)}
                    onChange={(e) => handleCheckboxChange('isViceLider', index, e.target.checked)}
                    checked={JSON.parse(searchParams.get('alunos') || '[]')[index]?.isViceLider || false}
                  /> Vice-Líder
                </label>
              </div>

              <button
                type="button"
                className="text-red-500 text-sm self-end"
                onClick={() => {
                  const currentStudents = JSON.parse(searchParams.get('alunos') || '[]')
                  currentStudents.splice(index, 1)
                  handleArrayChange('alunos', currentStudents)
                  remove(index)
                }}
              >
                Remover Aluno
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => {
              const newStudent = {
                cpf: '',
                email: '',
                nome: '',
                turma: '',
                isLider: false,
                isViceLider: false,
                dataNascimento: new Date(),
                tamanhoCamisa: Student.ShirtSize.M,
              }
              append(newStudent)
              const currentStudents = JSON.parse(searchParams.get('alunos') || '[]')
              handleArrayChange('alunos', [...currentStudents, newStudent])
            }}
            className="border rounded p-2 text-blue-600 w-fit"
            disabled={studentsFields.length >= 8}
          >
            Adicionar Aluno
          </button>
          {studentsFields.length >= 8 && (
            <p className="text-red-500 text-sm">Máximo de 8 alunos atingido</p>
          )}
        </div>

        <div>
          <select
            {...register("instituicaoImpactoSocial")}
            onChange={(e) => handleInputChange('instituicaoImpactoSocial', e.target.value)}
            className="border rounded p-2 w-full"
          >
            <option value="">Selecione a instituição</option>
            {Institutions.map((institution) => (
              <option key={institution} value={institution}>{institution}</option>
            ))}
          </select>
          {errors.instituicaoImpactoSocial && <p className="text-red-500 text-sm">{errors.instituicaoImpactoSocial.message}</p>}
        </div>

        <div className="flex justify-between">
          {success && (
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Limpar
            </button>
          )}

          <LoadingButton
            type="submit"
            variant="contained"
            loading={isLoading}
            onClick={handleSubmit(onSubmit)}
            className='bg-ring-custom normal-case mt-8 shadow-md hover:bg-[#8668FFCC]'
            startIcon={success ? <CheckCircleIcon /> : null}
          >
            {success ? 'Sucesso' : 'Cadastrar Time'}
          </LoadingButton>
        </div>
        <div>
        </div>
      </form>
    </div>
  )
}

