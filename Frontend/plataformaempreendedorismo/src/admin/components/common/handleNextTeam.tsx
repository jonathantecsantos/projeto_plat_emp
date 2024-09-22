import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CheckIcon from '@mui/icons-material/Check'
import { Typography } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
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
  const [teamAvailable, setTeamAvailable] = useState(!false)

  const teamsEvaluationsList = [...state.teamData.teams]

  const teamEvaluationAvailable = teamsEvaluationsList.some(
    (team) => !team.equipeAvaliada
  )

  const handleNextTeam = () => {
    const currentTeamIndex = teamsEvaluationsList.findIndex(
      (team) => team.id === currentTeamId
    );

    if (currentTeamIndex === -1) {
      console.error("Current team not found in teams array");
      return;
    }

    const nextAvailableTeam = teamsEvaluationsList.find((team) => !team.equipeAvaliada && team.id != currentTeamId);

    // const nextAvailableTeam = teamsEvaluationsList.slice(currentTeamIndex + 1).find(
    //   (team) => !team.equipeAvaliada
    // );

    if (nextAvailableTeam) {
      navigate(evaluationType.replace(":id", nextAvailableTeam?.id.toString()), {
        state: {
          id: nextAvailableTeam.id,
          nomeEquipe: nextAvailableTeam.nome,
          teams: teamsEvaluationsList,
          teamEvaluation: state.teamData.teamEvaluation,
          resetSelection: true,
        },
      });
      onComplete();
    } else {
      setTeamAvailable(false);
    }
  }

  const handleBackToList = () => {
    // Extrai a parte antes do "/:id" para obter a rota da lista
    const listRoute = evaluationType.split('/:')[0];
    navigate(listRoute)
  }

  return (
    <div>
      {teamEvaluationAvailable ? <div className="text-center p-4 mt-16">
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
      </div> : 'Todos os times já foram avaliados.'}
    </div>
  )
}
