import { useGetTeamReportQuery } from "../../../api/studentApi"

interface TeamNotesProps {
  id: number
}

export const TeamNotesComponent = ({ id }: TeamNotesProps) => {
  const { data: teamNotes } = useGetTeamReportQuery(id)
  return <div>
    {JSON.stringify(teamNotes, null, 2)}
    <p>TeamNotes teamID:{id}</p>
  </div>
}