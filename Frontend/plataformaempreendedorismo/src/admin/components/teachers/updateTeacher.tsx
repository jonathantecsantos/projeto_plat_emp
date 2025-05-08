import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import { LoadingButton } from '@mui/lab'
import { CircularProgress } from "@mui/material"
import { useSnackbar } from "notistack"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCreateTeacherMutation, useGetTeacherQuery, useUpdateTeacherMutation } from "../../../api/studentApi"
import { CreateOrUpdateTeacher, TeacherIdResponse } from "../../../model/teacher"
import { formatCPF, formatDateForInput, validateSchema } from "../../../utils/types"
import { TeamsSelect } from '../common/teamsSelect'
import { TeamConfig } from '../../../model/student'
import { createTeacherSchema } from './createTeacher'

interface UpdateOrCreateTeacherProps {
  id: number
  teamData?: { id: number, nomeEquipe: string }
}

export const UpdateOrCreateTeacherByTeam = ({ id, teamData }: UpdateOrCreateTeacherProps) => {
  const { data, isLoading } = useGetTeacherQuery(id, { skip: !!teamData })

  const [teacher, setTeacher] = useState<Partial<TeacherIdResponse> | null>(null)
  const [selectedTeamIds, setSelectedTeamIds] = useState<number[]>(teamData?.id ? [teamData.id] : [])
  const [updateTeacher, { isSuccess, isLoading: updating }] = useUpdateTeacherMutation()
  const [createTecher, { isLoading: creating }] = useCreateTeacherMutation()
  const [success, setSucess] = useState(isSuccess)
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  useEffect(() => {
    if (data) {
      setTeacher(data)
      setSelectedTeamIds(data.equipe.map(team => team.id))
    }
  }, [data])

  const handleInputChange = (field: string, value: any) => {
    setTeacher((prevData) => ({
      ...prevData!,
      [field]: value,
    }))
  }

  const handleTeamChange = (newTeamIds: number[]) => {
    if (teamData?.id && !id) {
      const updatedIds = Array.from(new Set([teamData.id, ...newTeamIds]))
      setSelectedTeamIds(updatedIds)
    }
    else {
      setSelectedTeamIds(newTeamIds)
    }
  }
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTeacher(prev => ({
      ...prev!,
      dataNascimento: new Date(value)
    }))
  }

  const handleShirtSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as TeamConfig.ShirtSize;
    setTeacher(prev => ({
      ...prev!,
      tamanhoCamisa: value || undefined
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const updatedTeacher: Partial<CreateOrUpdateTeacher> = {
      nome: teacher?.nome || '',
      cpf: formatCPF(teacher?.cpf!) || '',
      email: teacher?.email || '',
      idEquipe: selectedTeamIds,
      dataNascimento: teacher?.dataNascimento,
      tamanhoCamisa: teacher?.tamanhoCamisa
    }

    const validation = validateSchema(createTeacherSchema, updatedTeacher, (msg) => enqueueSnackbar(msg, { variant: 'error' }))
    if (!validation.success) return

    if (teamData?.id) {
      try {
        await createTecher(updatedTeacher).unwrap()
        enqueueSnackbar(`Professor ${teacher?.nome} adicionado no time ${teamData?.nomeEquipe} com sucesso!`,
          { variant: 'success' })
        setSucess(true)
      } catch (error: any) {
        enqueueSnackbar(`${error?.data}`, { variant: 'error' })
      }
    } else {
      try {
        await updateTeacher({ id, data: updatedTeacher }).unwrap()
        enqueueSnackbar('Professor editado com sucesso!', { variant: 'success' })
        setSucess(true)
      } catch (error: any) {
        enqueueSnackbar(`${error?.data}`, { variant: 'error' })
      }
    }

  }

  if (isLoading) return <div className='text-center'><CircularProgress /></div>

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md border-t-2">
      <h2 className="text-3xl font-bold text-center mb-4">{`${teamData ? 'Adicionar' : 'Editar'} Professor`}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              id="nome"
              type="text"
              value={teacher?.nome || ''}
              onChange={(e) => handleInputChange('nome', e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">CPF</label>
            <input
              id="cpf"
              type="text"
              value={teacher?.cpf || ''}
              onChange={(e) => handleInputChange('cpf', e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 lowercase">Email</label>
            <input
              id="email"
              type="email"
              value={teacher?.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className='mt-4'>
            <TeamsSelect
              value={selectedTeamIds}
              onChange={handleTeamChange}
              disable={!!teamData?.id}
              className='py-1 mt-2 rounded-md w-56'
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="dataNascimento" className="block text-sm font-medium text-gray-700">
              Data de Nascimento
            </label>
            <input
              id="dataNascimento"
              type="date"
              value={formatDateForInput(teacher?.dataNascimento!)}
              onChange={handleDateChange}
              max={new Date().toISOString().split('T')[0]}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="tamanhoCamisa" className="block text-sm font-medium text-gray-700">
              Tamanho da Camisa
            </label>
            <select
              id="tamanhoCamisa"
              value={teacher?.tamanhoCamisa || ''}
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
                setTeacher(null), setSucess(false)
              }}
              className="px-4 py-1 bg-gray-400 text-white rounded-md hover:bg-gray-600 mt-8">
              <PersonAddAlt1Icon /> Novo
            </button>}
          </div>
          <LoadingButton
            className='bg-ring-custom normal-case mt-8 shadow-md hover:bg-[#8668FFCC]'
            variant='contained'
            loading={updating || creating}
            type="submit"
            disabled={updating || creating}
          >
            {success && <CheckCircleIcon style={{ color: 'lightgreen' }} className='mr-1' />}
            {teamData?.nomeEquipe ? <span>Adicionar</span> : <span>Editar</span>}
          </LoadingButton>
        </div>
      </form>
    </div>
  )
}