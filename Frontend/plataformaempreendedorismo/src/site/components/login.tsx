import { LoadingButton } from "@mui/lab"
import { LinearProgress } from "@mui/material"
import { jwtDecode } from "jwt-decode"
import { useSnackbar } from "notistack"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useGetEventValidateByIdQuery } from "../../api/studentApi"
import lampLogo from '../../assets/lamplogo.png'
import { Footer, Footer2 } from "../../components/common/footer"
import { RoutesNames } from "../../globals"
import { EventsTypes } from "../../model/config"
import { UserApiService } from "../../services/login"
import { Login, LoginTokenJWT, Roles } from "../../utils/types"



export const LoginComponent = () => {
  const [user, setUser] = useState<Login>()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const id = EventsTypes.INSCRICAO
  const { data: isValid, isLoading: registerLoading, } = useGetEventValidateByIdQuery(id)
  const { isLoading, login } = UserApiService()

  const handleLogin = async () => {
    try {
      const response = await login({
        login: user?.login!,
        senha: user?.senha!
      })
      if (response) {
        const { tokenJWT } = response
        const decodedToken: LoginTokenJWT = jwtDecode(tokenJWT)
        if ([Roles.Aluno, Roles.Professor].includes(decodedToken?.enumRole!)) {
          console.log('decodedRole', decodedToken.enumRole)
          navigate(RoutesNames.team.replace(':id', decodedToken?.idEquipe?.toString()!))
        } else {
          navigate(RoutesNames.adminHome)
        }
      }
    } catch (error: any) {
      enqueueSnackbar(error?.data || 'Erro ao realizar login', { variant: 'error' })
    }
  }

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value
    setUser({
      ...user,
      login: username
    } as Login)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value
    setUser({
      ...user,
      senha: password
    } as Login)
  }

  return (
    <div>
      <div className="flex justify-center w-full h-dvh">
        <div className="hidden lg:block w-2/3 h-dvh box-border rounded-md lg:mr-24">
          <img
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="w-dvw h-dvh object-cover"
          />
        </div>
        <form action="">
          <div className={`p-6 rounded-md h-fit ${isValid && isValid ? 'xl:mt-12 md:mt-4' : 'mt-20'} sm:w-96 shadow-xl w-full lg:m-28 lg:ml-12 border-t-2 `}>
            <img src={lampLogo} alt="Trophy" className="cursor-pointer mx-auto transform hover:scale-125 transition-transform duration-300 w-20 h-20 hover:rotate-12" />
            <h1 className="font-bold text-xl w-full my-6 cursor-pointer"
              onClick={() => navigate(RoutesNames.home)}>Plataforma Empreendedorismo</h1>

            <h2 className="font-medium mb-4 w-fit">Acesse sua conta</h2>
            <div className="flex flex-col gap-4 text-start">
              <div className="flex flex-col text-sm text-[#888]">
                <label htmlFor="">Usuário</label>
                <input type="text" placeholder="Seu usuário" className="rounded-md p-2 shadow-md "
                  onChange={handleUsernameChange}
                />
              </div>
              <div className="flex flex-col text-sm text-[#888]">
                <label htmlFor="">Senha</label>
                <input type="password" placeholder="Sua senha" className="rounded-md p-2 shadow-md "
                  onChange={handlePasswordChange}
                />
              </div>
              <LoadingButton loading={isLoading} disabled={isLoading}
                className="bg-ring-custom normal-case my-4 shadow-md hover:bg-[#8668FFCC]"
                variant="contained" onClick={handleLogin} >
                <span>Entrar</span>
              </LoadingButton>
            </div>
            {registerLoading ? <div className='text-center my-2'><LinearProgress /></div> :
              isValid && isValid ? <div className="flex flex-col gap-2 mt-8 text-center">
                <div className="text-sm text-[#888]">Inscrições abertas!</div>
                <div className="text-sm text-[#888]">Acesse o formulário e faça sua inscrição!</div>
                <LoadingButton
                  className="border-l-indigo-950 mx-auto normal-case w-full shadow-md hover:scale-105"
                  variant="text" onClick={() => navigate(RoutesNames.register)} >
                  <span>Inscrição DLEI</span>
                </LoadingButton>
              </div> : null}
          </div>
        </form>
      </div>
      <Footer />
    </div>

  )
}
