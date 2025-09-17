import { useSelector } from "react-redux"
import { RoutesNames } from "../../../globals"
import { RootState } from "../../../redux/store"
import { EvaluationType } from "../../../utils/types"
import { TeamsTable } from "../common/teamsTableEvaluations"

export const CanvasTeams = () => {
  const userGlobalStateID = useSelector((state: RootState) => state.userInfo.id)

  return <TeamsTable routeName={RoutesNames.canvasTeam}
    teamEvaluation={{ evaluationTypeId: EvaluationType.CANVAS, evaluatorId: userGlobalStateID }} />
}