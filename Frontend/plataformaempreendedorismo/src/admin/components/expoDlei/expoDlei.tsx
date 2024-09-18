import { RoutesNames } from "../../../globals";
import { EvalutionType } from "../../../utils/types";
import { TeamsTable } from "../common/teamsTableEvaluations";

export const ExpoDleiTeams = () => {
  // const userGlobalState = useSelector((state: RootState) => state.userInfo.data)

  return <TeamsTable routeName={RoutesNames.expoDleiTeam}
    teamEvaluation={{
      evaluationTypeId: EvalutionType.EXPODLEI,
      evaluatorId: import.meta.env.VITE_AVALIADOR_ID
    }} />
}
