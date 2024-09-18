import { RoutesNames } from "../../../globals"
import { EvalutionType } from "../../../utils/types"
import { TeamsTable } from "../common/teamsTableEvaluations"

export const PitchTeams = () => {
  // const userGlobalState = useSelector((state: RootState) => state.userInfo.data)

  return <TeamsTable routeName={RoutesNames.pitchTeam}
    teamEvaluation={{ evaluationTypeId: EvalutionType.PITCH, evaluatorId: import.meta.env.VITE_AVALIADOR_ID }} />
}