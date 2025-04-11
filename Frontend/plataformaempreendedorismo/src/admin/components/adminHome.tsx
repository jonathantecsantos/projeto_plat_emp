import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import GroupIcon from '@mui/icons-material/Group'
import SchoolIcon from '@mui/icons-material/School'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RoutesNames } from '../../globals'
import { RootState } from '../../redux/store'
import { Roles } from '../../utils/types'
import { FooterImage } from './common/adminFooter'


export const AdminHomeComponent = () => {
  const navigate = useNavigate()
  const userGlobalState = useSelector((state: RootState) => state.userInfo)

  const coordinator = [Roles.Coordenador].includes(userGlobalState.enumRole!)
  const evaluator = [Roles.Avaliador].includes(userGlobalState.enumRole!)


  return (
    <div>
      <div className="flex min-h-screen">
        <div className="lg:w-3/4 w-full lg:p-4 p-1 bg-white">
          <h1 className="text-2xl font-bold mb-6">Bem-vindo(a) ao seu painel, <span className='capitalize'>{userGlobalState?.username.toLowerCase()}!</span>
          </h1>
          <p className="mb-8">{userGlobalState?.email}</p>

          <div className="space-y-6">
            {evaluator ?
              <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm bg-blue-50">
                <SchoolIcon className="text-blue-600" />
                <h2 className="text-xl font-semibold">Avaliações</h2>
                <p className="text-gray-600">Acesse o menu lateral para realizar as avaliações disponíveis no sistema.</p>
              </div> :
              <div className="space-y-6">
                {coordinator ? <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm bg-blue-50">
                  <SchoolIcon className="text-blue-600" />
                  <div>
                    <h2 className="text-xl font-semibold">Gerenciamento de Participantes</h2>
                    <p className="text-gray-600">Acesse o menu lateral para criar e editar informações de alunos, professores e avaliadores para o sistema.</p>
                  </div>
                </div> :
                  <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm bg-blue-50">
                    <CloudUploadIcon className="text-blue-600 hover:cursor-pointer" onClick={() => navigate(RoutesNames.uploadFiles)} />
                    <div>
                      <h2 className="text-xl font-semibold">Importações</h2>
                      <p className="text-gray-600">Importe dados de alunos, professores e avaliadores para o sistema.</p>
                    </div>
                  </div>}

                {coordinator ? null : <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm bg-blue-50">
                  <SchoolIcon className="text-blue-600 hover:cursor-pointer" onClick={() => navigate(RoutesNames.students)} />
                  <div>
                    <h2 className="text-xl font-semibold">Gerenciamento de Alunos</h2>
                    <p className="text-gray-600">Crie e edite informações de alunos no sistema.</p>
                  </div>
                </div>}
                <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm bg-blue-50">
                  <GroupIcon className="text-blue-600 hover:cursor-pointer" onClick={() => navigate(RoutesNames.teams)} />
                  <div>
                    <h2 className="text-xl font-semibold">Gerenciamento de Times</h2>
                    <p className="text-gray-600">Crie e edite informações de times no sistema.</p>
                  </div>
                </div>
              </div>}

          </div>
        </div>
      </div>
      <div className='mx-auto w-full'>
        <FooterImage />
      </div>
    </div>
  )
}