import { AdminDefaultPage } from "../admin/components/common/defaultPage"
import { TeamsNotesComponent } from "../admin/components/notes/teamsNotes"

export const TeamsNotesPage = () => {
  return <AdminDefaultPage mainContent={<TeamsNotesComponent />} />
}