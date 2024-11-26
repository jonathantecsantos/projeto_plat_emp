import { useGetCoordinatorsQuery } from "../../../api/studentApi"

export const Coordinators = () => {
  const { data: coordinators } = useGetCoordinatorsQuery()

  return JSON.stringify(coordinators, null, 2)
}