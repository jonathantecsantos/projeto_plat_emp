import { useParams } from "react-router-dom"
import { AdminDefaultPage } from "../admin/components/common/defaultPage"
import { TeamPrototyping } from "../admin/components/teams/prototyping"


export const TeamPrototypingPage = () => {
  const { id } = useParams()
  return <AdminDefaultPage mainContent={<TeamPrototyping id={Number(id)} />} />
}