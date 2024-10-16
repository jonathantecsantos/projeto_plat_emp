import { useGetTeamReportClassificationByFormatQuery } from "../../../api/studentApi"

export const PitchClassificationComponent = () => {
  const { data: pitchClassification } = useGetTeamReportClassificationByFormatQuery(2)

  return <div>
    {JSON.stringify(pitchClassification, null, 2)}
    <p>PitchClassificationComponent</p>
  </div>
}