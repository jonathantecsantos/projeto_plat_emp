import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CheckIcon from '@mui/icons-material/Check'
import { Typography } from "@mui/material"
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

  const handleBackToList = () => {
    // Extrai a parte antes do "/:id" para obter a rota da lista
    const listRoute = evaluationType.split('/:')[0];
    navigate(listRoute)
  }

  return (
    <div className="text-center p-4 mt-16">
      <Typography variant="h5" color="green">
        <CheckIcon />  Avaliação do time {state.teamData?.nomeEquipe} realizada com sucesso!
      </Typography>
      <Typography variant="h6" className='mt-4 text-[#3C14A4]'>
        Deseja prosseguir para o próximo time?
      </Typography>
      <div className="flex justify-center gap-4">
        <button
          type="button"
          onClick={handleBackToList}
          className="px-2 py-1 bg-gray-400 text-white rounded-lg hover:bg-gray-600 mt-8 text-sm h-10">
          <ArrowBackIcon />
        </button>

        <button
          type="button"
          onClick={handleNextTeam}
          className="px-4 py-1 rounded-md mt-8 cursor-pointer font-bold text-center text-white bg-gradient-to-r from-indigo-500 to-indigo-900  shadow-lg transform hover:scale-105 transition-transform duration-300">
          Avaliar próximo time <ArrowForwardIcon />
        </button>

      </div>
      {!teamAvailable ? (
        <Typography variant="body1" color="error" className="mt-4">
          Não há mais times para avaliar.
        </Typography>
      ) : null}
    </div>
  )
}
