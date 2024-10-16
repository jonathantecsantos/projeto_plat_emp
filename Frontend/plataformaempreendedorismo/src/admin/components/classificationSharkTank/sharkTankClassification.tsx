import { useGetTeamReportClassificationByFormatQuery } from "../../../api/studentApi"

export const SharkTankClassificationComponent = () => {
  const { data: sharkTankClassification } = useGetTeamReportClassificationByFormatQuery(3)

  return <div>
    {JSON.stringify(sharkTankClassification, null, 2)}
    <p>SharkTankClassificationComponent</p>
  </div>
}