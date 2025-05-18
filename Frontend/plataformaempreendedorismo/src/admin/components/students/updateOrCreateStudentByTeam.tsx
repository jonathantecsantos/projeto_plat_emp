import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import { LoadingButton } from "@mui/lab"
import { CircularProgress } from '@mui/material'
import { useSnackbar } from 'notistack'
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useCreateStudentMutation, useGetStudentQuery, useUpdateStudentMutation } from '../../../api/studentApi'
import { CreateOrUpdateStudent, StudentIdResponse, TeamConfig } from '../../../model/student'
import { ClassesSelectTypes, formatCPF, validateSchema } from '../../../utils/types'
import { ClassesSelect } from '../common/classesSelect'
import { TeamSelect } from '../common/teamSelect'
import { createStudentSchema } from './createStudent'

interface UpdateOrCreateStudentProps {
  id: number;
  teamData?: { id: number; nomeEquipe: string };
}


export const UpdateOrCreateStudentByTeam = ({ id, teamData }: UpdateOrCreateStudentProps) => {
  const { data, isLoading } = useGetStudentQuery(id, { skip: !!teamData?.id })
  const [student, setStudent] = useState<StudentIdResponse | null>(null)
  const [updateStudent, { isSuccess, isLoading: updating }] = useUpdateStudentMutation()
  const [createStudent, { isLoading: creating }] = useCreateStudentMutation()
  const [success, setSucess] = useState(isSuccess)
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  useEffect(() => {
    if (data) {
      setStudent(data)
    }
  }, [data])

  const handleInputChange = (field: string, value: any) => {
    setStudent((prevData) => ({
      ...prevData!,
      [field]: value,
    }))
  }

  const handleSelectChange = (e: any) => {
    const selectedTeamId = e.target.value;
    setStudent((prevData) => ({
      ...prevData!,
      equipe: {
        ...prevData!.equipe,
        id: selectedTeamId,
      }
    }));
  };

  const handleCheckboxChange = (key: 'isLider' | 'isViceLider', checked: boolean) => {
    setStudent((prevData) => ({
      ...prevData!,
      isLider: key === 'isLider' ? checked : false,
      isViceLider: key === 'isViceLider' ? checked : false,
    }))
  }

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStudent(prev => ({
      ...prev!,
      dataNascimento: new Date(value)?.toISOString()
    }))
  }

  const handleShirtSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as TeamConfig.ShirtSize;
    setStudent(prev => ({
      ...prev!,
      tamanhoCamisa: value || undefined
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const updatedStudent: Partial<CreateOrUpdateStudent> = {
      nome: student?.nome || '',
      cpf: formatCPF(student?.cpf || '') || '',
      email: student?.email || '',
      turma: student?.turma || '',
      idEquipe: student?.equipe?.id || teamData?.id || 0,
      isLider: student?.isLider || false,
      isViceLider: student?.isViceLider || false,
      dataNascimento: student?.dataNascimento
        ? new Date(student.dataNascimento).toISOString().split('T')[0]
        : undefined,
      tamanhoCamisa: student?.tamanhoCamisa!,
    }

    const validation = validateSchema(createStudentSchema, updatedStudent, (msg) => enqueueSnackbar(msg, { variant: 'error' }))
    if (!validation.success) return

    if (teamData?.id) {
      try {
        await createStudent(updatedStudent).unwrap()
        enqueueSnackbar(`Membro ${student?.nome} adicionado no time ${teamData?.nomeEquipe} com sucesso!`,
          { variant: 'success' })
        setSucess(true)
      } catch (error: any) {
        enqueueSnackbar(`${error?.data}`, { variant: 'error' })
      }
    } else {
      try {
        await updateStudent({ id, data: updatedStudent }).unwrap()
        enqueueSnackbar('Aluno editado com sucesso!', { variant: 'success' })
        setSucess(true)
      } catch (error: any) {
        enqueueSnackbar(`${error?.data}`, { variant: 'error' })
      }
    }

  }

  if (isLoading) return <div className='text-center'><CircularProgress /></div>

  const turmaNormalizada = ClassesSelectTypes.find((t) => t.toLowerCase() === (student?.turma || '').toLowerCase().trim())

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md border-t-2">
      <h2 className="text-3xl font-bold text-center mb-4">{`${teamData ? 'Adicionar' : 'Editar'} Aluno`}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              id="nome"
              type="text"
              value={student?.nome || ''}
              onChange={(e) => handleInputChange('nome', e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">CPF</label>
            <input
              id="cpf"
              type="text"
              value={student?.cpf || ''}
              onChange={(e) => handleInputChange('cpf', e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 lowercase">Email</label>
            <input
              id="email"
              type="email"
              value={student?.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <ClassesSelect
            value={turmaNormalizada || ''}
            onChange={(e) => handleInputChange('turma', e.target.value)}
          />

        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="dataNascimento" className="block text-sm font-medium text-gray-700">
              Data de Nascimento
            </label>
            <input
              id="dataNascimento"
              type="date"
              value={student?.dataNascimento?.split('T')[0]}
              onChange={handleDateChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="tamanhoCamisa" className="block text-sm font-medium text-gray-700">
              Tamanho da Camisa
            </label>
            <select
              id="tamanhoCamisa"
              value={student?.tamanhoCamisa || ''}
              onChange={handleShirtSizeChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Camisa</option>
              {Object.values(TeamConfig.ShirtSize).map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
        <TeamSelect
          onChange={handleSelectChange}
          value={!!teamData?.id ? teamData.id : student?.equipe?.id || undefined}
          disable={!!teamData?.id}
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex items-center">
            <input
              id="isLider"
              type="checkbox"
              checked={student?.isLider || false}
              onChange={(e) => handleCheckboxChange('isLider', e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="isLider" className="ml-2 block text-sm font-medium text-gray-700">Líder</label>
          </div>
          <div className="flex items-center">
            <input
              id="isViceLider"
              type="checkbox"
              checked={student?.isViceLider || false}
              onChange={(e) => handleCheckboxChange('isViceLider', e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="isViceLider" className="ml-2 block text-sm font-medium text-gray-700">Vice-Líder</label>
          </div>
        </div>

        <div className={`flex items-center justify-between`}>
          <div className='flex gap-4'>
            {<button
              type="button"
              onClick={() => navigate(-1)}
              className="px-2 py-1 bg-gray-400 text-white rounded-lg hover:bg-gray-600 mt-8 text-sm">
              <ArrowBackIcon />
            </button>}
            {success && teamData && <button
              type="button"
              onClick={() => {
                setStudent(null), setSucess(false)
              }}
              className="px-4 py-1 bg-gray-400 text-white rounded-md hover:bg-gray-600 mt-8">
              <PersonAddAlt1Icon /> Novo
            </button>}
          </div>
          <LoadingButton
            className='bg-ring-custom normal-case mt-8 shadow-md hover:bg-[#8668FFCC]'
            variant='contained'
            loading={creating || updating}
            type="submit"
            disabled={creating || updating}
          >
            {success && <CheckCircleIcon style={{ color: 'lightgreen' }} className='mr-1' />}
            {teamData?.nomeEquipe ? <span>Adicionar</span> : <span>Editar</span>}
          </LoadingButton>
        </div>
      </form>
    </div>
  )
}