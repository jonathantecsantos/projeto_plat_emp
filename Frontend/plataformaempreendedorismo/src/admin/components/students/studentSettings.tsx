import { zodResolver } from '@hookform/resolvers/zod'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { LoadingButton } from '@mui/lab'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { z } from 'zod'
import { usePasswordStudentResetMutation } from '../../../api/studentApi'


const studentPasswordSchema = z.object({
  senhaAntiga: z.string().min(5, 'Senha antiga deve ter pelo menos 5 caracteres'),
  novaSenha: z.string().min(5, 'Nova senha deve ter pelo menos 6 caracteres'),
})

type StudentPasswordForm = z.infer<typeof studentPasswordSchema>

interface StudentSettingsProps {
  email: string
}

export const StudentSettings = ({ email }: StudentSettingsProps) => {
  const { enqueueSnackbar } = useSnackbar()
  const [passordReset, { isLoading, isSuccess }] = usePasswordStudentResetMutation()
  const [success, setSucess] = useState(isSuccess)
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentPasswordForm>({
    resolver: zodResolver(studentPasswordSchema),
  })

  const onSubmit = async (data: StudentPasswordForm) => {
    try {
      const response = await passordReset({
        emailUsuario: email,
        novaSenha: data.novaSenha,
        senhaAntiga: data.senhaAntiga,
      }).unwrap()
      if (response) {
        enqueueSnackbar('Senha redefinida com sucesso!', { variant: 'success' })
        setSucess(true)
      }
    } catch (error: any) {
      enqueueSnackbar(error?.data || 'Erro ao redefinir senha', { variant: 'error' })
    }
  }

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md  border-t-2">
      <h2 className="text-3xl font-bold text-center mb-4">Redefinir Senha</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="emailUsuario" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            disabled
            id="emailUsuario"
            type="email"
            value={email}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="senhaAntiga" className="block text-sm font-medium text-gray-700">
            Senha Antiga
          </label>
          <input
            id="senhaAntiga"
            type="password"
            {...register('senhaAntiga')}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.senhaAntiga && (
            <p className="text-red-500 text-sm mt-1">{errors.senhaAntiga.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="novaSenha" className="block text-sm font-medium text-gray-700">
            Nova Senha
          </label>
          <div className="relative">
            <input
              id="novaSenha"
              type={showPassword ? 'text' : 'password'} 
              {...register('novaSenha')}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)} 
              className="absolute inset-y-0 right-2 flex items-center text-gray-500"
            >
              {!showPassword ? <VisibilityOff /> : <Visibility />}
            </button>
          </div>
          {errors.novaSenha && (
            <p className="text-red-500 text-sm mt-1">{errors.novaSenha.message}</p>
          )}
        </div>

       
        <div className={`flex items-center justify-between`}>
          <div className='flex gap-4'>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-2 py-1 bg-gray-400 text-white rounded-lg hover:bg-gray-600 mt-8 text-sm">
              <ArrowBackIcon />
            </button>

          </div>
          <LoadingButton
            className="bg-ring-custom normal-case mt-8 shadow-md hover:bg-[#8668FFCC]"
            variant="contained"
            type="submit"
            loading={isLoading}
            disabled={isLoading}
          >
            {success && <CheckCircleIcon style={{ color: 'lightgreen' }} className=' mr-1' />}
            <span>Redefinir Senha</span>
          </LoadingButton>
  
        </div>
      </form>
    </div>
  )
}
