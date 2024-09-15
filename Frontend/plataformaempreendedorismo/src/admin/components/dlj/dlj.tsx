import { useSelector } from "react-redux";
import { RoutesNames } from "../../../globals";
import { RootState } from "../../../redux/store";
import { EvalutionType } from "../../../utils/types";
import { TeamsTable } from "../common/teamsTableEvaluations";

export const DLJTeams = () => {
  const userGlobalState = useSelector((state: RootState) => state.userInfo.data)

  return <TeamsTable routeName={RoutesNames.dljTeam}
    teamEvaluation={{ evaluationTypeId: EvalutionType.DLJ, evaluatorId: userGlobalState.id }} />;
};
