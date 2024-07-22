import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import GroupIcon from '@mui/icons-material/Group';
import SchoolIcon from '@mui/icons-material/School';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export const AdminHomeComponent = () => {
  const userGlobalState = useSelector((state: RootState) => state.userInfo.data)

  return (<div className="flex">
    <div className="w-3/4 p-10 bg-white">
      <h1 className="text-2xl font-bold mb-6">Bem-vindo ao seu painel, {userGlobalState.username}</h1>
      <p className="mb-8">admin@escola.com</p>

      <div className="space-y-6">
        <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm bg-blue-50">
          <CloudUploadIcon className="text-blue-600" />
          <div>
            <h2 className="text-xl font-semibold">Importações</h2>
            <p className="text-gray-600">Importe dados de alunos, professores e avaliadores para o sistema.</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm bg-blue-50">
          <SchoolIcon className="text-blue-600" />
          <div>
            <h2 className="text-xl font-semibold">Gerenciamento de Alunos</h2>
            <p className="text-gray-600">Crie e edite informações de alunos no sistema.</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm bg-blue-50">
          <GroupIcon className="text-blue-600" />
          <div>
            <h2 className="text-xl font-semibold">Gerenciamento de Times</h2>
            <p className="text-gray-600">Crie e edite informações de times no sistema.</p>
          </div>
        </div>
      </div>
    </div>
  </div>)
}