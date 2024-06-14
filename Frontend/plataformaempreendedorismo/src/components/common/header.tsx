import { useNavigate } from "react-router-dom"
import { RoutesNames } from "../../globals"

export const Header = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col justify-center w-full p-2 shadow-md">
      <div className="text-lg">
        <h2 className="cursor-pointer" onClick={() => navigate(RoutesNames.home)}>Plataforma Empreendedorismo</h2>
      </div>
      <div className="flex gap-4 p-4 w-full">
        <span className="cursor-pointer hover:text-ring-custom" onClick={() => navigate(RoutesNames.companyDetails)}>Quem somos</span>
        <span className="cursor-pointer hover:text-ring-custom" onClick={() => navigate(RoutesNames.repository)}>Repositorio</span>
        <span className="cursor-pointer hover:text-ring-custom" onClick={() => navigate(RoutesNames.contact)}>Contato</span>
      </div>
    </div>

  )
}