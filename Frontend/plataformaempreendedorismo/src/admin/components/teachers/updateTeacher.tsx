import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import { FormEvent, useEffect, useState } from "react"
import { useCreateTeacherMutation, useGetTeacherQuery, useUpdateTeacherMutation } from "../../../api/studentApi"
import { CreateOrUpdateTeacher, TeacherIdResponse } from "../../../model/teacher"
import { useSnackbar } from "notistack"
import { useNavigate } from "react-router-dom"
import { formatCPF } from "../../../utils/types"
import { CircularProgress } from "@mui/material"
import { LoadingButton } from '@mui/lab'

interface UpdateOrCreateTeacherProps {
  id: number
  teamData?: { id: number, nomeEquipe: string }
}

export const UpdateOrCreateTeacherByTeam = ({ id, teamData }: UpdateOrCreateTeacherProps) => {
  const { data, isLoading } = useGetTeacherQuery(id, { skip: !!teamData })

  const [teacher, setTeacher] = useState<TeacherIdResponse | null>(null)
  const [updateTeacher, { isSuccess }] = useUpdateTeacherMutation()
  const [createTecher] = useCreateTeacherMutation()
  const [success, setSucess] = useState(isSuccess)
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  useEffect(() => {
    if (data) {
      setTeacher(data)
    }
  }, [data])

  const handleInputChange = (field: string, value: any) => {
    setTeacher((prevData) => ({
      ...prevData!,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const updatedTeacher: CreateOrUpdateTeacher = {
      nome: teacher?.nome || '',
      cpf: formatCPF(teacher!.cpf) || '',
      email: teacher?.email || '',
      idEquipe: teacher?.equipe?.id || teamData?.id || 0,
    }

    if (teamData?.id) {
      try {
        await createTecher(updatedTeacher).unwrap()
        enqueueSnackbar(`Professor ${teacher?.nome} adicionado no time ${teamData?.nomeEquipe} com sucesso!`,
          { variant: 'success' })
        setSucess(true)
      } catch (error: any) {
        console.log(error)
        enqueueSnackbar(`${error?.data}`, { variant: 'error' })
      }
    } else {
      try {
        await updateTeacher({ id, data: updatedTeacher }).unwrap()
        enqueueSnackbar('Professor editado com sucesso!', { variant: 'success' })
        setSucess(true)
      } catch (error: any) {
        console.log(error)
        enqueueSnackbar(`${error?.data}`, { variant: 'error' })
      }
    }

  }



  if (isLoading) return <div className='text-center'><CircularProgress /></div>

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
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
          <div>
            <label htmlFor="idEquipe" className="block text-sm font-medium text-gray-700">ID Equipe</label>
            <input
              id="idEquipe"
              type="number"
              value={teacher?.equipe?.id || teamData?.id}
              disabled={!!teamData?.id}
              onChange={(e) => {
                const equipeId = parseInt(e.target.value)
                setTeacher((prevData) => ({
                  ...prevData!,
                  equipe: {
                    ...prevData!.equipe,
                    id: equipeId
                  }
                }))
              }}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className='my-4 flex justify-between text-sm'>
          <span>Equipe: {teacher?.equipe?.nome || teamData?.nomeEquipe}</span>
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
            loading={isLoading}
            type="submit"
            disabled={isLoading}
          >
            {success && <CheckCircleIcon style={{ color: 'lightgreen' }} className='mr-1' />}
            {teamData?.nomeEquipe ? <span>Adicionar</span> : <span>Editar</span>}
          </LoadingButton>
        </div>
      </form>
    </div>
  )
}