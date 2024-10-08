import { Button, CircularProgress, Dialog, DialogActions, DialogContent } from "@mui/material"
import { useSnackbar } from "notistack"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useGetEvaluationByIdQuery, useGetEvaluationDataQuery, useGetTeamsEvaluationsQuery, usePostEvaluationMutation, usePutEvaluationMutation } from "../../../api/studentApi"
import { RoutesNames } from "../../../globals"
import { CriterioAvaliacao, Evaluation } from "../../../model/evaluationFormat"
import { toggleLoading } from "../../../redux/reducers/loadingBar.slice"
import { EvaluationProps } from "../../../utils/types"
import { EvaluationHeader } from "../common/evaluationHeader"
import { HandleNextTeamComponent } from "../common/handleNextTeam"
import { SubcriterionSlider } from "../common/subcriterioSlider"
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from "react-router-dom"


export const SharkTankTeamEvaluation = ({ teamData }: EvaluationProps) => {

  const { data: sharkTankQuestions, isLoading } = useGetEvaluationByIdQuery(3) // id sharkTank = 3
  const { data: teams, } = useGetTeamsEvaluationsQuery(
    {
      evaluationTypeId: teamData.teamEvaluation.evaluationTypeId,
      evaluatorId: teamData.teamEvaluation.evaluatorId
    })

  const { data: sharkTankResponse, isLoading: sharkTankLoading } = useGetEvaluationDataQuery({
    idAvaliador: teamData.teamEvaluation.evaluatorId,
    idFormatoAvaliacao: teamData.teamEvaluation.evaluationTypeId,
    idEquipe: teamData.id
  })

  const [postEvaluation] = usePostEvaluationMutation()
  const [putEvaluation] = usePutEvaluationMutation()

  const [values, setValues] = useState<{ [key: number]: number }>({})
  const [totalPoints, setTotalPoints] = useState(0)
  const [open, setOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const alreadyEvaluated = teams?.some(team => team.id === teamData.id && team.equipeAvaliada === true)

  useEffect(() => {
    if (sharkTankQuestions && sharkTankResponse) {
      const initialValues: { [key: number]: number } = {}
      let initialTotalPoints = 0

      sharkTankQuestions.forEach((criterio) => {
        criterio.subcriterioAvaliacaos.forEach((subcriterio) => {
          const matchingEvaluation = sharkTankResponse?.find(
            (evaluation) => evaluation.idSubcriterioAvaliacao === subcriterio.id
          )
          const initialValue = matchingEvaluation ? matchingEvaluation.nota : 0 // Pega a nota do payload se existir
          initialValues[subcriterio.id] = initialValue
          initialTotalPoints += initialValue
        })
      })

      setValues(initialValues)
      setTotalPoints(initialTotalPoints)
    }

    return () => {
      setValues({})
      setTotalPoints(0)
    }
  }, [sharkTankQuestions, sharkTankResponse])

  const handleSubcriterionChange = (idSubcriterio: number, value: number) => {
    const previousValue = values[idSubcriterio] || 0
    const newTotalPoints = parseFloat((totalPoints - previousValue + value).toFixed(1))

    setValues((prevValues) => ({
      ...prevValues,
      [idSubcriterio]: value,
    }))
    setTotalPoints(newTotalPoints)
  }

  const handlePostEvaluation = async () => {
    if (!teamData || !sharkTankQuestions || sharkTankQuestions.length === 0) {
      enqueueSnackbar('Nenhuma alternativa disponível, consulte um admin.', { variant: 'info' })
      return
    }
    const payload: Evaluation[] = Object.keys(values).map((idSubcriterio) => {
      const subcriterioId = parseInt(idSubcriterio, 10)
      const criterio = sharkTankQuestions?.find((criterio) =>
        criterio.subcriterioAvaliacaos.some((sub) => sub.id === subcriterioId)
      )

      return {
        idEquipe: teamData?.id || 1,
        idCriterioAvaliacao: criterio?.id || 0,
        idSubcriterioAvaliacao: subcriterioId,
        nota: parseFloat(values[subcriterioId].toFixed(1)),
        idAvaliador: teamData.teamEvaluation.evaluatorId,
        idTipoAvaliacao: teamData.teamEvaluation.evaluationTypeId
      }
    })

    try {
      dispatch(toggleLoading())

      alreadyEvaluated ?
        await putEvaluation({
          data: payload,
          evaluationTypeId: teamData.teamEvaluation.evaluationTypeId,
          idAvaliador: teamData.teamEvaluation.evaluatorId,
          idEquipe: teamData.id,
          idFormatoAvaliacao: teamData.teamEvaluation.evaluationTypeId
        }).unwrap() :
        await postEvaluation({
          data: payload,
          evaluationTypeId: teamData.teamEvaluation.evaluationTypeId,
          idAvaliador: teamData.teamEvaluation.evaluatorId,
          idEquipe: teamData.id,
          idFormatoAvaliacao: teamData.teamEvaluation.evaluationTypeId
        }).unwrap()

      setShowSuccess(true)
    } catch (error) {
      console.error("Failed to submit evaluation", error)
      enqueueSnackbar('Falha ao enviar avaliação, consulte um admin.', { variant: 'error' })
    } finally {
      setOpen(false)
      dispatch(toggleLoading())
    }
  }
  const handleBackToList = () => {
    navigate(RoutesNames.sharkTankTeams)
  }

  if (isLoading) return <div className='text-center'><CircularProgress /></div>

  return (
    <div className="max-w-7xl mx-auto p-4 text-[#3C14A4]">
      {!showSuccess ? <EvaluationHeader teamName={teamData?.nomeEquipe || ''} /> : null}

      {showSuccess ? (
        <HandleNextTeamComponent
          currentTeamId={teamData.id}
          state={{
            teamData: {
              id: teamData.id,
              nomeEquipe: teamData?.nomeEquipe,
              teams: teams || [],
              teamEvaluation: teamData.teamEvaluation
            }
          }}
          evaluationType={RoutesNames.sharkTankTeam}
          onComplete={() => setShowSuccess(false)}
        />
      ) : (
        <>
          {sharkTankQuestions?.map((criterio: CriterioAvaliacao) => (
            <div key={criterio.id} className="mb-6 border rounded-lg shadow-md">

              <h3 className="text-xl font-semibold bg-[#5741A6] p-2 rounded-t-lg text-white">Critério: {criterio.descricao}</h3>
              {criterio.subcriterioAvaliacaos.map((subcriterio) => (
                <SubcriterionSlider
                  isLoading={sharkTankLoading}
                  key={subcriterio.id}
                  subcriterio={subcriterio}
                  value={values[subcriterio.id]}
                  onChange={handleSubcriterionChange}
                />
              ))}
            </div>
          ))}
          <div className="flex flex-col justify-end gap-4 items-end mt-6">
            <p className="text-lg font-bold">
              Pontuação total: {totalPoints} pontos
            </p>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleBackToList}
                className="px-2 py-1 bg-gray-400 text-white rounded-lg hover:bg-gray-600  text-sm h-10">
                <ArrowBackIcon />
              </button>
              <Button variant="contained" className="bg-[#5741A6] normal-case"
                disabled={totalPoints > 400 || isLoading} onClick={() => setOpen(true)}>
                {alreadyEvaluated ? 'Editar' : 'Finalizar'}
              </Button>
            </div>
            {alreadyEvaluated && <p className="text-red-300">Avaliado!</p>}
          </div>
          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogContent>
              <span>
                Deseja {alreadyEvaluated ? 'editar' : 'finalizar'} a avaliação Shark Tank do time {teamData?.nomeEquipe}?
              </span>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)} style={{ textTransform: 'none', color: 'gray' }}>
                Cancelar
              </Button>
              <Button
                onClick={handlePostEvaluation}
                style={{ textTransform: 'none', color: 'white', backgroundColor: '#5741A6' }}
              >
                {alreadyEvaluated ? 'Editar' : 'Finalizar'}
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  )
}
