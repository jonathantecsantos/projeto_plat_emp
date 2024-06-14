import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { Header } from "./header"
import { RoutesNames } from "../../globals"

export const AppBarOptions = () => {
  const navigate = useNavigate()

  return <div className="flex items-center justify-items-center">
    <Header />
    <div className="lg:absolute lg:right-4">
      <Button className="normal-case bg-[#8668FFCC] hover:bg-ring-custom" variant="contained" color="primary"
        onClick={() => navigate(RoutesNames.login)}>Painel</Button>
    </div>
  </div>
}