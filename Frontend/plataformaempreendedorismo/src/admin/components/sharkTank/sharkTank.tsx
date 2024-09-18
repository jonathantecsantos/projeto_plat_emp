import { RoutesNames } from "../../../globals";
import { EvalutionType } from "../../../utils/types";
import { TeamsTable } from "../common/teamsTableEvaluations";

export const SharkTankTeams = () => {
  // const userGlobalState = useSelector((state: RootState) => state.userInfo.data)

  return <TeamsTable routeName={RoutesNames.sharkTankTeam}
    teamEvaluation={{ evaluationTypeId: EvalutionType.SHARKTANK, evaluatorId: import.meta.env.VITE_AVALIADOR_ID }} />;
};
