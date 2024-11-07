import { useSelector } from "react-redux"
import { RoutesNames } from "../../../globals"
import { RootState } from "../../../redux/store"
import { EvalutionType } from "../../../utils/types"
import { TeamsTable } from "../common/teamsTableEvaluations"

export const PitchTeams = () => {
  const userGlobalStateID = useSelector((state: RootState) => state.userInfo.id)

  return <TeamsTable routeName={RoutesNames.pitchTeam}
    teamEvaluation={{ evaluationTypeId: EvalutionType.PITCH, evaluatorId: userGlobalStateID }} />
}