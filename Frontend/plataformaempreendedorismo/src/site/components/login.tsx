import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RoutesNames } from "../../globals";
import { UserApiService } from "../../services/login";
import { Login, Roles } from "../../utils/types";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export const LoginComponent = () => {
  const [user, setUser] = useState<Login>()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const userGlobalState = useSelector((state: RootState) => state.userInfo)

  const { isLoading, login } = UserApiService()

  const handleLogin = async () => {
    try {
      const response = await login({
        login: user?.login!,
        senha: user?.senha!
      })
      if (response)
        if (userGlobalState?.enumRole == Roles.Aluno) {
          //change later for userGlobalState?.teamID
          navigate(RoutesNames.team.replace(':id', userGlobalState?.id?.toString()))
        } else {
          navigate(RoutesNames.adminHome)
        }
    } catch (error) {
      enqueueSnackbar('Erro ao realizar login', { variant: 'error' })
    }
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value
    setUser({
      ...user,
      login: username
    } as Login)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value
    setUser({
      ...user,
      senha: password
    } as Login)
  }

  return (
    <div className="flex justify-center w-full h-screen">
      <div className="hidden lg:block w-2/3 h-full box-border rounded-md lg:mr-24">
        <img
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="w-screen h-screen object-cover"
        />
      </div>
      <form action="">
        <div className="p-10 rounded-md h-fit lg:mt-40 mt-20 sm:w-96 md:shadow-xl w-full lg:m-28 lg:ml-12">
          <h1 className="font-bold text-xl w-full mb-20 cursor-pointer"
            onClick={() => navigate(RoutesNames.home)}>Plataforma Empreendedorismo</h1>
          <h2 className="font-medium mb-10 w-fit">Acesse sua conta</h2>
          <div className="flex flex-col gap-8 text-start">
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
              className="bg-ring-custom normal-case mt-8 shadow-md hover:bg-[#8668FFCC]"
              variant="contained" onClick={handleLogin} >
              <span>Entrar</span>
            </LoadingButton>
          </div>
        </div>
      </form>
    </div>
  );
};
