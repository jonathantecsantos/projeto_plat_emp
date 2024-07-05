import { Button } from "@mui/material"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { RoutesNames } from "../../globals"
import { RootState } from "../../redux/store"
import { AuthMenuComponent } from "./authMenu"

export const Header = () => {
  const navigate = useNavigate()
  // const dispatch = useDispatch()
  const userGlobalState = useSelector((state: RootState) => state.userInfo.data.username)
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

  // useLayoutEffect(() => {
  //   dispatch(checkAuth())
  // }, [dispatch])


  return (
    <div className="flex flex-col justify-center w-full p-2 shadow-md">
      <div className="text-lg text-center p-2 w-fit mx-auto">
        <h2 className="cursor-pointer" onClick={() => navigate(RoutesNames.home)}>Plataforma Empreendedorismo</h2>
      </div>
      <div className="flex gap-4 px-2 py-4 w-full items-center">
        <span className="cursor-pointer hover:text-ring-custom"
          onClick={() => navigate(RoutesNames.companyDetails)}>Quem somos</span>
        <span className="cursor-pointer hover:text-ring-custom"
          onClick={() => navigate(RoutesNames.repository)}>Repositorio</span>
        <span className="cursor-pointer hover:text-ring-custom"
          onClick={() => navigate(RoutesNames.contact)}>Contato</span>
        {isAuthenticated && userGlobalState && (
          <div className="sm:absolute sm:right-24">
            <AuthMenuComponent />
          </div>
        )}

        <div className="sm:absolute sm:right-4">
          <Button className="normal-case first-letter:uppercase bg-[#8668FFCC] hover:bg-ring-custom" variant="contained" color="primary"
            onClick={() => navigate(RoutesNames.login)}>{isAuthenticated && userGlobalState ? userGlobalState : 'Painel'}</Button>
        </div>
      </div>
    </div>

  )
}