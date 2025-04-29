import { zodResolver } from '@hookform/resolvers/zod'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CancelIcon from '@mui/icons-material/Cancel'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import { LoadingButton } from '@mui/lab'
import { ValidateUtils } from 'essencials'
import { useSnackbar } from "notistack"
import { useEffect, useState } from "react"
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { useDispatch } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom"
import { z } from "zod"
import { useCreateTeamMutation } from "../../../api/studentApi"
import { RoutesNames } from '../../../globals'
import { Student } from "../../../model/student"
import { TeamRegisterPayload } from '../../../model/team'
import { toggleLoading } from "../../../redux/reducers/loadingBar.slice"
import { ActivityTypeValue, ClassesSelectTypes, formatCPF } from "../../../utils/types"
import { ActivityTypesSelect } from './activityTypesSelect'
import { InstitutionsSelect } from './institutionSelect'
import { OdsSelect } from './odsSelect'
import { TeacherSelect } from './teacherSelect'

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
      tamanhoCamisa: z.nativeEnum(Student.ShirtSize, {
        errorMap: () => ({ message: "Tamanho inválido" })
      }),
    })
  ).min(5, "Mínimo de 5 alunos").max(8, "Máximo de 8 alunos").refine(
    (alunos) => alunos.filter((a) => a.isLider).length <= 1,
    "Só pode haver um líder no time"
  )
    .refine(
      (alunos) => alunos.filter((a) => a.isViceLider).length <= 1,
      "Só pode haver um vice-líder no time"
    )
    .refine(
      (alunos) => !alunos.some((a) => a.isLider && a.isViceLider),
      "Um aluno não pode ser líder e vice-líder ao mesmo tempo"
    ).refine(
      (alunos) => alunos.some((a) => a.isLider || a.isViceLider),
      "O time deve ter pelo menos um líder ou vice-líder"
    ),
  idProfessor: z.number().min(1, "Selecione pelo menos 1 rofessor"),
  listIdOds: z.array(
    z.object({
      id: z.number(),
    })
  ).min(1, "Selecione pelo menos 1 ODS").max(3, "Selecione no máximo 3 ODS"),

  tipoAtividades: z.array(
    z.object({
      id: z.number(),
      descricao: z.string().optional(), // Adiciona o campo descricao como opcional
    })
  ).min(1, "Selecione pelo menos 1 tipo de atividade"),
  instituicoes: z.array(
    z.object({
      id: z.number(),
      descricao: z.string().optional(), // Adiciona o campo descricao como opcional
    })
  ).min(1, "Instituição é obrigatória"),
})

type CreateTeamForm = z.infer<typeof createTeamSchema>



export const TeamRegister = () => {
  const [createTeam, { isSuccess, isLoading }] = useCreateTeamMutation()
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const [success, setSuccess] = useState(isSuccess)

  const { control, watch, register, handleSubmit, reset, formState: { errors } } = useForm<CreateTeamForm>({
    resolver: zodResolver(createTeamSchema),
    defaultValues: {
      nomeTime: searchParams.get('nomeTime') || '',
      alunos: JSON.parse(searchParams.get('alunos') || '[]').map((aluno: any) => ({
        ...aluno,
        dataNascimento: aluno.dataNascimento ? new Date(aluno.dataNascimento) : undefined
      })),
      idProfessor: Number(searchParams.get('idProfessor')) || 0,
      listIdOds: searchParams.get('listIdOds') ? JSON.parse(searchParams.get('listIdOds') as string) : [],
      tipoAtividades: searchParams.get('tipoAtividades') ? JSON.parse(searchParams.get('tipoAtividades') as string) : [],
      instituicoes: searchParams.get('instituicoes') ? JSON.parse(searchParams.get('instituicoes') as string) : [],
    },
  })

  const { fields: studentsFields, append, remove } = useFieldArray({
    control,
    name: 'alunos',
  })

  const handleInputChange = (key: keyof CreateTeamForm, value: string | ActivityTypeValue) => {
    const params = new URLSearchParams(searchParams)
    if (Array.isArray(value)) {
      params.set(key, JSON.stringify(value))
    } else {
      params.set(key, value)
    }
    setSearchParams(params)
  }

  const handleArrayChange = (key: 'alunos' | 'listIdOds' | 'tipoAtividades' | 'instituicoes', value: any[]) => {
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

  const handleTeacherSelectChange = (value: number | null) => {
    const params = new URLSearchParams(searchParams)
    if (value !== null) {
      params.set('idProfessor', value.toString())
    } else {
      params.delete('idProfessor') // Se o valor for nulo, remove o parâmetro da URL
    }
    setSearchParams(params) // Atualiza a URL com o novo valor de idProfessor
  }

  const handleCheckboxChange = (key: 'isLider' | 'isViceLider', index: number, checked: boolean) => {
    const currentStudents = JSON.parse(searchParams.get('alunos') || '[]')
    currentStudents[index] = currentStudents[index] || {}

    if (checked) {
      if (key === 'isLider') {
        const hasOtherLeader = currentStudents.some((student: any, i: number) =>
          i !== index && student.isLider === true
        )

        if (hasOtherLeader) {
          enqueueSnackbar('Já existe um líder no time', { variant: 'warning' })
          return
        }

        currentStudents[index].isViceLider = false
      }
      else if (key === 'isViceLider') {
        const hasOtherViceLeader = currentStudents.some((student: any, i: number) =>
          i !== index && student.isViceLider === true
        )

        if (hasOtherViceLeader) {
          enqueueSnackbar('Já existe um vice-líder no time', { variant: 'warning' })
          return
        }

        currentStudents[index].isLider = false
      }
    }

    currentStudents[index][key] = checked

    const params = new URLSearchParams(searchParams)
    params.set('alunos', JSON.stringify(currentStudents))
    setSearchParams(params)
  }

  const handleReset = () => {
    reset({
      nomeTime: '',
      alunos: [],
      idProfessor: 0,
      listIdOds: [],
      tipoAtividades: [],
      instituicoes: [],
    })

    setSearchParams({
      nomeTime: '',
      alunos: '[]',
      idProfessor: '0',
      listIdOds: '[]',
      tipoAtividades: '[]',
      instituicoes: '[]',
    })
    setSuccess(false)
  }

  const onSubmit = async (data: CreateTeamForm) => {
    dispatch(toggleLoading())
    try {
      const formatedStudents = data.alunos.map((student) => ({
        ...student,
        cpf: formatCPF(student.cpf),
        dataNascimento: student.dataNascimento.toISOString().split('T')[0]
      }))

      const payload: TeamRegisterPayload = {
        nomeTime: data.nomeTime,
        alunos: formatedStudents,
        idProfessor: data.idProfessor,
        listIdOds: data.listIdOds,
        instituicoes: data.instituicoes,
        tipoAtividades: data.tipoAtividades,
      }

      console.log(payload)

      await createTeam(payload).unwrap()
      enqueueSnackbar(`Time: ${data.nomeTime} criado com sucesso!`, { variant: 'success' })
      setSuccess(true)
    } catch (error: any) {
      console.error(error)
      enqueueSnackbar(`${error?.data}`, { variant: 'error' })
    } finally {
      dispatch(toggleLoading())
    }
  }

  const showMinStudentsError = studentsFields.length < 5 && studentsFields.length > 0

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.error("Erros de validação:", errors)
    }
  }, [errors])
  console.log("Formulário de inscrição DLEI", watch())

  return (
    <div className="flex flex-col max-w-4xl mx-auto my-8 sm:p-4 p-2 sm:border-t-2 sm:rounded sm:shadow-md ">
      <h2 className="text-3xl font-bold text-center mb-4 text-[#383691]">Formulário de Inscrição DLEI</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label htmlFor="nomeTime" className="block text-lg font-medium text-[#383691]">Nome do Time</label>
          <input
            {...register("nomeTime")}
            onChange={(e) => handleInputChange('nomeTime', e.target.value)}
            className="border rounded p-2 w-full"
          />
          {errors.nomeTime && <p className="text-red-500 text-sm">{errors.nomeTime.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-lg text-[#383691]">Alunos</h2>
          {studentsFields.map((field, index) => (
            <div key={field.id} className="border p-2 rounded-md flex flex-col gap-2">
              <label htmlFor="nome" className="block  text-sm font-medium text-[#383691]">Nome completo</label>
              <input
                {...register(`alunos.${index}.nome`)}
                onChange={(e) => handleStudentChange(index, 'nome', e.target.value)}
                placeholder="Nome completo"
                className="block w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.alunos?.[index]?.nome && <p className="text-red-500 text-sm">{errors.alunos[index]?.nome?.message}</p>}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 w-full'>
                <div className=''>
                  <label htmlFor="cpf" className="block text-sm font-medium text-[#383691]">CPF</label>
                  <input
                    {...register(`alunos.${index}.cpf`)}
                    onChange={(e) => handleStudentChange(index, 'cpf', e.target.value)}
                    placeholder="CPF"
                    className="block w-full p-2 border border-gray-300 rounded-md"
                  />
                  {errors.alunos?.[index]?.cpf && <p className="text-red-500 text-sm">{errors.alunos[index]?.cpf?.message}</p>}

                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#383691]">Email</label>
                  <input
                    {...register(`alunos.${index}.email`)}
                    onChange={(e) => handleStudentChange(index, 'email', e.target.value)}
                    placeholder="@evl.com.br"
                    className="block w-full p-2 border border-gray-300 rounded-md"
                  />
                  {errors.alunos?.[index]?.email && <p className="text-red-500 text-sm">{errors.alunos[index]?.email?.message}</p>}
                </div>

              </div>



              <div className='flex flex-col gap-4 sm:flex-row justify-start sm:items-center'>
                <div className="">
                  <label className="block text-sm font-medium mb-1 text-[#383691]">
                    Data de Nascimento
                  </label>
                  <Controller
                    name={`alunos.${index}.dataNascimento`}
                    control={control}
                    render={({ field }) => {
                      // Converter o valor para string de data segura
                      const dateValue = field.value instanceof Date
                        ? field.value.toISOString().split('T')[0]
                        : '';

                      return (
                        <input
                          type="date"
                          value={dateValue}
                          onChange={(e) => {
                            const value = e.target.value;
                            const dateValue = value ? new Date(value) : null;

                            // Atualiza o formulário e os searchParams
                            field.onChange(dateValue);
                            handleStudentChange(index, 'dataNascimento', dateValue);
                          }}
                          className="border rounded p-2 w-full"
                          max={new Date().toISOString().split('T')[0]} // Impede datas futuras
                        />
                      );
                    }}
                  />
                  {errors.alunos?.[index]?.dataNascimento && (
                    <p className="text-red-500 text-sm">
                      {errors.alunos[index]?.dataNascimento?.message}
                    </p>
                  )}
                </div>

                <div className='flex gap-4 sm:flex-row sm:justify-between'>
                  <div>
                    <label htmlFor="tamanhoCamisa" className="block text-nowrap text-sm font-medium text-[#383691] mb-1">Tam. da Camisa</label>
                    <select
                      {...register(`alunos.${index}.tamanhoCamisa`)}
                      onChange={(e) => handleStudentChange(index, 'tamanhoCamisa', e.target.value)}
                      className="border rounded-md p-2 sm:w-28 w-full"
                    >
                      {Object.values(Student.ShirtSize).map((size) => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                    {errors.alunos?.[index]?.tamanhoCamisa && <p className="text-red-500 text-sm">{errors.alunos[index]?.tamanhoCamisa?.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="turma" className="block text-nowrap text-sm font-medium text-[#383691] mb-1">Turma/Série</label>
                    <select
                      {...register(`alunos.${index}.turma`)}
                      onChange={(e) => handleStudentChange(index, 'turma', e.target.value)}
                      className="border rounded-md p-2 sm:w-28 w-full"
                    >
                      {Object.values(ClassesSelectTypes).map((size) => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                    {errors.alunos?.[index]?.turma && <p className="text-red-500 text-sm">{errors.alunos[index]?.turma?.message}</p>}
                  </div>
                </div>


              </div>

              <div className="flex gap-4 items-center">
                <label>
                  <input
                    className='mr-1'
                    type="checkbox"
                    {...register(`alunos.${index}.isLider`)}
                    onChange={(e) => handleCheckboxChange('isLider', index, e.target.checked)}
                    checked={JSON.parse(searchParams.get('alunos') || '[]')[index]?.isLider || false}
                    disabled={
                      JSON.parse(searchParams.get('alunos') || '[]').some((s: any, i: number) =>
                        i !== index && s.isLider
                      ) && !JSON.parse(searchParams.get('alunos') || '[]')[index]?.isLider
                    }
                  />
                  Líder
                </label>
                <label>
                  <input
                    className='mr-1'
                    type="checkbox"
                    {...register(`alunos.${index}.isViceLider`)}
                    onChange={(e) => handleCheckboxChange('isViceLider', index, e.target.checked)}
                    checked={JSON.parse(searchParams.get('alunos') || '[]')[index]?.isViceLider || false}
                    disabled={
                      JSON.parse(searchParams.get('alunos') || '[]').some((s: any, i: number) =>
                        i !== index && s.isViceLider
                      ) && !JSON.parse(searchParams.get('alunos') || '[]')[index]?.isViceLider
                    }
                  />
                  Vice-Líder

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
                <CancelIcon />
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
                dataNascimento: undefined as unknown as Date,
                tamanhoCamisa: '' as Student.ShirtSize,
              }
              append(newStudent)
              const currentStudents = JSON.parse(searchParams.get('alunos') || '[]')
              handleArrayChange('alunos', [...currentStudents, newStudent])
            }}
            className="border rounded-full p-2 text-blue-600 w-1/6  bg-gradient-to-r from-indigo-500 to-indigo-900  shadow-lg transform hover:scale-105 transition-transform duration-300"
            disabled={studentsFields.length >= 8}
          >
            <PersonAddAlt1Icon style={{ color: 'white' }} />
          </button>
          {studentsFields.length >= 8 && (
            <p className="text-red-500 text-sm">Máximo de 8 alunos atingido</p>
          )}
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <div>
              <Controller
                name="instituicoes"
                control={control}
                render={({ field }) => (
                  <InstitutionsSelect
                    className="border rounded-md p-2 w-full"
                    value={field.value.map((institution: { id: number }) => institution.id) || []}
                    onChange={(e) => {
                      const institutionSelected = e.target.value.map((id: string) => ({ id: Number(id) })); // Converte para número
                      if (institutionSelected.length > 1) {
                        enqueueSnackbar("Você pode selecionar no máximo 1 instituição.", { variant: 'warning' });
                        return;
                      }
                      field.onChange(institutionSelected);
                      handleArrayChange('instituicoes', institutionSelected);
                    }}
                  />
                )}
              />
              {errors.instituicoes && (
                <p className="text-red-500 text-sm">{errors.instituicoes.message}</p>
              )}
            </div>

            <div>
              <Controller
                name="tipoAtividades"
                control={control}
                render={({ field }) => (
                  <ActivityTypesSelect
                    className="border rounded-md p-2 w-full"
                    value={field.value.map((activity: { id: number }) => activity.id) || []}
                    onChange={(e) => {
                      const activitySelected = e.target.value.map((id: string) => ({ id: Number(id) })); // Converte para número
                      if (activitySelected.length > 3) {
                        enqueueSnackbar("Você pode selecionar no máximo 3 tipos de atividade.", { variant: 'warning' });
                        return;
                      }
                      field.onChange(activitySelected);
                      handleArrayChange('tipoAtividades', activitySelected);
                    }}
                  />
                )}
              />
              {errors.tipoAtividades && (
                <p className="text-red-500 text-sm">{errors.tipoAtividades.message}</p>
              )}
            </div>

            <div>
              <Controller
                name="idProfessor"
                control={control}
                render={({ field }) => (
                  <TeacherSelect
                    className="border rounded-md p-2 w-full"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      handleTeacherSelectChange(e.target.value);
                    }}
                  />
                )}
              />
              {errors.idProfessor && (
                <p className="text-red-500 text-sm">{errors.idProfessor.message}</p>
              )}
            </div>

            <div>
              <Controller
                name="listIdOds"
                control={control}
                render={({ field }) => (
                  <OdsSelect
                    className="border rounded-md p-2 w-full"
                    value={field.value.map((ods: { id: number }) => ods.id) || []}
                    onChange={(e) => {
                      const selectedOds = e.target.value;
                      if (selectedOds.length <= 3) {
                        const odsObjects = selectedOds.map((id: number) => ({ id }));
                        field.onChange(odsObjects);
                        handleArrayChange('listIdOds', odsObjects);
                      } else {
                        enqueueSnackbar("Você pode selecionar no máximo 3 ODS.", { variant: 'warning' });
                      }
                    }}
                  />
                )}
              />
              {errors.listIdOds && (
                <p className="text-red-500 text-sm">{errors.listIdOds.message}</p>
              )}
            </div>
          </div>
        </div>


        {showMinStudentsError && (
          <p className="text-red-500 text-sm text-end">
            Mínimo de 5 alunos necessários (atualmente: {studentsFields.length})
          </p>
        )}
        {errors.alunos?.root?.message && (
          <p className="text-red-500 text-sm text-end">{errors.alunos.root.message}</p>
        )}

        <div className="flex justify-between relative">
          <button
            className="px-2 bg-gray-400 text-white rounded-lg hover:bg-gray-600 text-sm w-fit"
            onClick={() => navigate(RoutesNames.login)}
          >
            <ArrowBackIcon />
          </button>

          <LoadingButton
            type="submit"
            variant="contained"
            loading={isLoading}
            disabled={isLoading || showMinStudentsError}
            onClick={handleSubmit(onSubmit)}
            className='bg-ring-custom normal-case shadow-md hover:bg-[#8668FFCC]'
            startIcon={success ? <CheckCircleIcon style={{ color: 'lightgreen' }} className='mr-1' /> : null}
          >
            {success ? 'Sucesso' : 'Cadastrar Time'}
          </LoadingButton>
        </div>
        {success && <button
          type="button"
          onClick={handleReset}
          className="px-2 w-fit py-1  bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          <GroupAddIcon /> Novo Time
        </button>}
        <div>
        </div>
      </form>
    </div>
  )
}