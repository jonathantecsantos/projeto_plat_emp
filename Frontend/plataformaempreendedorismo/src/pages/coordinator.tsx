import { useParams } from "react-router-dom"
import { AdminDefaultPage } from "../admin/components/common/defaultPage"
import { CreateCoordinator } from "../admin/components/coordinators/createCoordinator"
import { UpdateCoordinator } from "../admin/components/coordinators/updateCoordinator"


export const CoordinatorPage = () => {
  const { id } = useParams()
  return <AdminDefaultPage mainContent={id !== ':id' ? <UpdateCoordinator id={Number(id)} /> : <CreateCoordinator />} />
}