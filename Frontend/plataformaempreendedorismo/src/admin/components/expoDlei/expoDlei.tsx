import { useSelector } from "react-redux";
import { RoutesNames } from "../../../globals";
import { EvalutionType } from "../../../utils/types";
import { TeamsTable } from "../common/teamsTableEvaluations";
import { RootState } from "../../../redux/store";

export const ExpoDleiTeams = () => {
  const userGlobalState = useSelector((state: RootState) => state.userInfo.data)

  return <TeamsTable routeName={RoutesNames.expoDleiTeam}
    teamEvaluation={{
      evaluationTypeId: EvalutionType.EXPODLEI,
      evaluatorId: userGlobalState.id
    }} />
}
