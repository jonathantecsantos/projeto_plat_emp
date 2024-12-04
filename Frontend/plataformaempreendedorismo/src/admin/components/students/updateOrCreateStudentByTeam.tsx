import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import { LoadingButton } from "@mui/lab"
import { CircularProgress } from '@mui/material'
import { useSnackbar } from 'notistack'
import { FormEvent, useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useCreateStudentMutation, useGetStudentQuery, useUpdateStudentMutation } from '../../../api/studentApi'
import { CreateOrUpdateStudent, StudentIdResponse } from '../../../model/student'
import { formatCPF } from '../../../utils/types'
import { TeamSelect } from '../common/teamSelect'

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


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const updatedStudent: CreateOrUpdateStudent = {
      nome: student?.nome || '',
      cpf: formatCPF(student!.cpf) || '',
      email: student?.email || '',
      turma: student?.turma || '',
      idEquipe: student?.equipe?.id || teamData?.id || 0,
      // idOds: student?.equipe?.odsList?.id || 0,
      isLider: student?.isLider || false,
      isViceLider: student?.isViceLider || false
    }

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
          <div>
            <label htmlFor="turma" className="block text-sm font-medium text-gray-700">Turma</label>
            <input
              id="turma"
              type="text"
              value={student?.turma || ''}
              onChange={(e) => handleInputChange('turma', e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <TeamSelect
          onChange={handleSelectChange}
          value={!!teamData?.id ? teamData.id : student?.equipe?.id || null}
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
        <div className='my-4 flex justify-between text-sm'>
          {/* <span>Equipe: {student?.equipe?.nome || teamData?.nomeEquipe}</span> */}
          {/* {student?.equipe?.odsList && <span>{student?.equipe.odsList?.codigo}: {student?.equipe.odsList?.descricao}</span>} */}
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