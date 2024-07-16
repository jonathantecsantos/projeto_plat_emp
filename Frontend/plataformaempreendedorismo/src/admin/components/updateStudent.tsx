import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { LoadingButton } from "@mui/lab"
import { FormEvent, useEffect, useState } from "react"
import { useGetStudentQuery, useUpdateStudentMutation } from "../../api/studentApi"
import { CreateOrUpdateStudent, StudentIdResponse } from "../../model/student"
import { useSnackbar } from 'notistack'
import { formatCPF } from './createStudent'


export const UpdateStudent = ({ id }: Pick<StudentIdResponse, 'id'>) => {
  const { data, isLoading } = useGetStudentQuery(id)
  const [student, setStudent] = useState<StudentIdResponse | null>(null)
  const [updateStudent, { isSuccess }] = useUpdateStudentMutation()
  const [success, setSucess] = useState(isSuccess)
  const { enqueueSnackbar } = useSnackbar()

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
      idEquipe: student?.equipe.id || 0,
      idOds: student?.ods.id || 0,
      isLider: student?.isLider || false,
      isViceLider: student?.isViceLider || false
    }

    try {
      await updateStudent({ id, data: updatedStudent })
      enqueueSnackbar('Aluno editado com sucesso!', { variant: 'success' })
      setSucess(true)
    } catch (error: any) {
      console.log(error)
      enqueueSnackbar(`${error?.data}`, { variant: 'error' })
    }
  }

  console.log('UpdateStudent')

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-4">Atualizar Aluno</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              id="nome"
              type="text"
              value={student?.nome}
              onChange={(e) => handleInputChange('nome', e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">CPF</label>
            <input
              id="cpf"
              type="text"
              value={student?.cpf}
              onChange={(e) => handleInputChange('cpf', e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={student?.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="turma" className="block text-sm font-medium text-gray-700">Turma</label>
            <input
              id="turma"
              type="text"
              value={student?.turma}
              onChange={(e) => handleInputChange('turma', e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="ods" className="block text-sm font-medium text-gray-700">ID ODS</label>
            <input
              id="ods"
              type="number"
              value={student?.ods.id}
              onChange={(e) => handleInputChange('ods', {
                id: parseInt(e.target.value),
                codigo: student?.ods.codigo,
                descricao: student?.ods.descricao
              })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="equipe" className="block text-sm font-medium text-gray-700">ID Equipe</label>
            <input
              id="equipe"
              type="number"
              value={student?.equipe.id}
              onChange={(e) => handleInputChange('equipe', {
                id: parseInt(e.target.value),
                nome: student?.equipe.nome,
                linkPitch: student?.equipe.linkPitch
              })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex items-center">
            <input
              id="isLider"
              type="checkbox"
              checked={student?.isLider}
              onChange={(e) => handleCheckboxChange('isLider', e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="isLider" className="ml-2 block text-sm font-medium text-gray-700">Líder</label>
          </div>
          <div className="flex items-center">
            <input
              id="isViceLider"
              type="checkbox"
              checked={student?.isViceLider}
              onChange={(e) => handleCheckboxChange('isViceLider', e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="isViceLider" className="ml-2 block text-sm font-medium text-gray-700">Vice-Líder</label>
          </div>
        </div>
        <div className='my-4 flex justify-between text-sm'>
          <span>Equipe: {student?.equipe.nome}</span>
          <span>{student?.ods.codigo}: {student?.ods.descricao}</span>
        </div>

        <div className='flex items-center justify-end'>
          <LoadingButton
            className='bg-ring-custom normal-case mt-8 shadow-md hover:bg-[#8668FFCC]'
            variant='contained'
            loading={isLoading}
            type="submit"
            disabled={isLoading}
          >
            {success && <CheckCircleIcon style={{ color: 'lightgreen' }} className='mr-1' />}
            <span>Atualizar</span>
          </LoadingButton>
        </div>
      </form>
    </div>)
}