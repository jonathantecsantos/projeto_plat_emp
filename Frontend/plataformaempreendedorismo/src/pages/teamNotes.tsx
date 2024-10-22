import { useParams } from "react-router-dom"
import { AdminDefaultPage } from "../admin/components/common/defaultPage"
import { TeamNotesComponent } from "../admin/components/notes/teamNotes"


export const TeamNotesPage = () => {
  const { id } = useParams()
  return <AdminDefaultPage mainContent={<TeamNotesComponent id={Number(id)} />} />
}


