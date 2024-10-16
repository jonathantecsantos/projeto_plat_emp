import { useGetTeamReportClassificationByFormatQuery } from "../../../api/studentApi"

export const DljClassificationComponent = () => {
  const { data: dljClassification } = useGetTeamReportClassificationByFormatQuery(1)

  return <div>
    {JSON.stringify(dljClassification, null, 2)}
    <p>DLJClassificationComponent</p>
  </div>
}