import { useLocation, useParams } from "react-router-dom"
import { AdminDefaultPage } from "../admin/components/common/defaultPage"
import { TeamPrototyping } from "../admin/components/teams/prototyping"


export const TeamPrototypingPage = () => {
  const { id } = useParams()
  const location = useLocation()
  const { state } = location
  return <AdminDefaultPage mainContent={<TeamPrototyping id={Number(id)} teamName={state} />} />
}