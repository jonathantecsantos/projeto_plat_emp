import { useSelector } from "react-redux"
import { RoutesNames } from "../../../globals"
import { EvalutionType } from "../../../utils/types"
import { TeamsTable } from "../common/teamsTableEvaluations"
import { RootState } from "../../../redux/store"

export const PitchTeams = () => {
  const userGlobalState = useSelector((state: RootState) => state.userInfo.data)

  return <TeamsTable routeName={RoutesNames.pitchTeam}
    teamEvaluation={{ evaluationTypeId: EvalutionType.PITCH, evaluatorId: userGlobalState.id }} />
}