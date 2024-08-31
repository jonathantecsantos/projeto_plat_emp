import { RoutesNames } from "../../../globals";
import { TeamsTable } from "../common/teamsTableEvaluations";

export const DLJTeams = () => {
  return <TeamsTable routeName={RoutesNames.dljTeam} />;
};
