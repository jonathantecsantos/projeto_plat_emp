import { useSelector } from "react-redux";
import { RoutesNames } from "../../../globals";
import { EvalutionType } from "../../../utils/types";
import { TeamsTable } from "../common/teamsTableEvaluations";
import { RootState } from "../../../redux/store";

export const SharkTankTeams = () => {
  const userGlobalStateID = useSelector((state: RootState) => state.userInfo.id)

  return <TeamsTable routeName={RoutesNames.sharkTankTeam}
    teamEvaluation={{ evaluationTypeId: EvalutionType.SHARKTANK, evaluatorId: userGlobalStateID }} />;
};
