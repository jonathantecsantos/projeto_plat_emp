import { useGetTeamClassificationQuery } from "../../../api/studentApi"

export const ClassificationComponent = () => {
  const { data: classification } = useGetTeamClassificationQuery()

  return <div>
    {JSON.stringify(classification, null,2)}
    <p>ClassificationComponent</p>
  </div>
}