import { useGetTeamReportClassificationByFormatQuery } from "../../../api/studentApi"

export const ExpoDleiClassificationComponent = () => {
  const { data: expoDleiClassification } = useGetTeamReportClassificationByFormatQuery(4)

  return <div>
    {JSON.stringify(expoDleiClassification, null, 2)}
    <p>ExpoDleiClassificationComponent</p>
  </div>
}