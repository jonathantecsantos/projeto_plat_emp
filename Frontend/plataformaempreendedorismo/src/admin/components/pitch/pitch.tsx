import { RoutesNames } from "../../../globals"
import { TeamsTable } from "../common/teamsTableEvaluations"

export const PitchTeams = () => {
  return <TeamsTable routeName={RoutesNames.pitchTeam} />
}