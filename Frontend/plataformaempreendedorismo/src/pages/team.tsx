import { useParams } from "react-router-dom"
import { AdminDefaultPage } from "../admin/components/defaultPage"
import { TeamComponent } from "../admin/components/teams/team"


export const TeamPage = () => {
  const { id } = useParams()
  return <AdminDefaultPage mainContent={<TeamComponent id={Number(id)} />} />
}