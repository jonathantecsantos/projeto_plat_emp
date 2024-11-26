import { useGetCoordinatorQuery } from "../../../api/studentApi"

interface UpdateCoordinatorProps {
  id: number
}


export const UpdateCoordinator = ({ id }: UpdateCoordinatorProps) => {
  const { data: coordinator } = useGetCoordinatorQuery(id)

  return <div>
    <p>Update Coordinator {id}</p>
    {JSON.stringify(coordinator, null, 2)}
  </div>
}