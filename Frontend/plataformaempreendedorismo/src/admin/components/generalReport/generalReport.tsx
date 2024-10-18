import { useGetTeamsReportItemsQuery, useGetTeamsReportsQuery } from "../../../api/studentApi"

export const GeneralReportComponent = () => {
  const { data: generalReport } = useGetTeamsReportsQuery()
  const { data: generalReportItems } = useGetTeamsReportItemsQuery()


  return <div>
    <h1>generalReport</h1>
    {JSON.stringify(generalReport, null, 2)}
    <h1 className="my-4 bg-red-300">----</h1>
    <h1>generalReportItems</h1>
    {JSON.stringify(generalReportItems, null, 2)}
  </div>
}