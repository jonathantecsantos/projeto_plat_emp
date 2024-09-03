import { Button, Typography } from "@mui/material"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { selectEvaluatedTeams } from "../../../redux/reducers/evaluations.slice"
import { EvaluationProps } from "../../../utils/types"

interface HandleNextTeamComponentProps {
  currentTeamId: number
  state: EvaluationProps
  evaluationType: string
  onComplete: () => void
}

export const HandleNextTeamComponent = ({
  currentTeamId,
  state,
  evaluationType,
  onComplete,
}: HandleNextTeamComponentProps) => {
  const navigate = useNavigate()
  const evaluatedTeams = useSelector(selectEvaluatedTeams)
  const [teamAvailable, setTeamAvailable] = useState(!false)

  const teamsEvaluationsList = [...state.teamData.teams] 

  const handleNextTeam = () => {
    const currentTeamIndex = teamsEvaluationsList.findIndex(
      (team) => team.id === currentTeamId
    )

    if (currentTeamIndex === -1) {
      console.error("Current team not found in teams array")
      return <p>Current team not found</p>
    }

    const nextAvailableTeam = teamsEvaluationsList.find(
      (team) =>
        !evaluatedTeams.some(
          (evaluation) =>
            evaluation.teamId === team.id &&
            evaluation.evaluationType === evaluationType
        )
    );

    if (nextAvailableTeam) {
      navigate(evaluationType.replace(":id", nextAvailableTeam?.id.toString()), {
        state: {
          id: nextAvailableTeam.id,
          nomeEquipe: nextAvailableTeam.nome,
          teams: teamsEvaluationsList, 
        },
      })
      onComplete()
    } else {
      setTeamAvailable(!true)
    }
  }

  return (
    <div className="text-center p-4 mt-10">
      <Typography variant="h5" color="green">
        Avaliação do time {state.teamData?.nomeEquipe} realizada com sucesso!
      </Typography>
      <Typography variant="h6">
        Deseja prosseguir para o próximo time? 
      </Typography>
      <div className="mt-4 flex justify-center gap-4">
        <Button
          variant="contained"
          color="primary"
          onClick={handleNextTeam}
        >
          Avaliar próximo time
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate(-1)}
        >
          Voltar
        </Button>
      </div>
      {!teamAvailable ? (
        <Typography variant="body1" color="error" className="mt-4">
          Não há mais times para avaliar.
        </Typography>
      ) : null}
    </div>
  )
}
