import { useSelector } from "react-redux";
import { RoutesNames } from "../../../globals";
import { RootState } from "../../../redux/store";
import { EvaluationType } from "../../../utils/types";
import { TeamsTable } from "../common/teamsTableEvaluations";

export const ExpoDleiTeams = () => {
  const userGlobalStateID = useSelector((state: RootState) => state.userInfo.id)

  return <TeamsTable routeName={RoutesNames.expoDleiTeam}
    teamEvaluation={{
      evaluationTypeId: EvaluationType.EXPODLEI,
      evaluatorId: userGlobalStateID
    }} />
}
