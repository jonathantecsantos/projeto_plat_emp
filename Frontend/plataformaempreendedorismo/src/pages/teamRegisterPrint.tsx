import { useParams } from "react-router-dom"
import { TeamRegisterPrintComponent } from "../admin/components/teams/teamRegister"

export const TeamRegisterPrintPage = () => {
  const { id } = useParams()
  return <TeamRegisterPrintComponent id={Number(id)} />
}