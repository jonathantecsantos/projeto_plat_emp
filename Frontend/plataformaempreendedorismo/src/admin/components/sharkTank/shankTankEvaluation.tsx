import { Button, CircularProgress, Dialog, DialogActions, DialogContent } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { useSnackbar } from "notistack"
import { useGetEvaluationByIdQuery, usePostEvaluationMutation } from "../../../api/studentApi"
import { RoutesNames } from "../../../globals"
import { CriterioAvaliacao } from "../../../model/evaluationFormat"
import { addEvaluation, checkIfTeamEvaluated, selectEvaluatedTeams } from "../../../redux/reducers/evaluations.slice"
import { toggleLoading } from "../../../redux/reducers/loadingBar.slice"
import { RootState } from "../../../redux/store"
import { EvaluationProps } from "../../../utils/types"
import { HandleNextTeamComponent } from "../common/handleNextTeam"
import { SubcriterionSlider } from "../common/subcriterioSlider"

export const SharkTankTeamEvaluation = ({ teamData }: EvaluationProps) => {

  const { data: sharkTankQuestions, isLoading } = useGetEvaluationByIdQuery(3) // id sharkTank = 3
  const [postEvaluation] = usePostEvaluationMutation()
  // const evaluatedTeams = useSelector(selectEvaluatedTeams)
  const [values, setValues] = useState<{ [key: number]: number }>({})
  const [totalPoints, setTotalPoints] = useState(0)
  const [open, setOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const location = useLocation()
  const currentTeamData = location.state?.teamData || teamData

  const alreadyEvaluated = useSelector((state: RootState) => {
    const evaluatedTeams = selectEvaluatedTeams(state)
    return checkIfTeamEvaluated({
      evaluatedTeams,
      teamId: teamData.id,
      evaluationType: RoutesNames.sharkTankTeam,
    })
  })

  useEffect(() => {
    if (sharkTankQuestions) {
      const initialValues: { [key: number]: number } = {}
      let initialTotalPoints = 0

      sharkTankQuestions.forEach((criterio) => {
        criterio.subcriterioAvaliacaos.forEach((subcriterio) => {
          const initialValue = 0
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
  }, [sharkTankQuestions, currentTeamData])

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
    if (alreadyEvaluated) {
      enqueueSnackbar('Este time já foi avaliado', { variant: 'error' })
      return
    }

    const payload = Object.keys(values).map((idSubcriterio) => {
      const subcriterioId = parseInt(idSubcriterio, 10)
      const criterio = sharkTankQuestions?.find((criterio) =>
        criterio.subcriterioAvaliacaos.some((sub) => sub.id === subcriterioId)
      )

      return {
        idEquipe: teamData?.id || 1,
        idCriterioAvaliacao: criterio?.id || 0,
        idSubcriterioAvaliacao: subcriterioId,
        nota: parseFloat(values[subcriterioId].toFixed(1)),
      }
    })

    try {
      dispatch(toggleLoading())
      await postEvaluation(payload).unwrap()
      setOpen(false)

      dispatch(addEvaluation({
        teamId: teamData.id,
        evaluationType: RoutesNames.sharkTankTeam,
      }))

      setShowSuccess(true)
    } catch (error) {
      console.error("Failed to submit evaluation", error)
      enqueueSnackbar('Falha ao enviar avaliação, consulte um admin.', { variant: 'error' })
    } finally {
      dispatch(toggleLoading())
    }
  }

  if (isLoading) return <div className='text-center'><CircularProgress /></div>

  return (
    <div className="max-w-4xl mx-auto p-4">
      {showSuccess ? (
        <HandleNextTeamComponent
          currentTeamId={teamData.id}
          state={{
            teamData: {
              id: teamData.id,
              nomeEquipe: teamData?.nomeEquipe,
              teams: teamData.teams,
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
                  key={subcriterio.id}
                  subcriterio={subcriterio}
                  value={values[subcriterio.id]}
                  onChange={handleSubcriterionChange}
                />
              ))}
            </div>
          ))}
          <div className="flex flex-col justify-end gap-4 items-end mt-6">
            <p className="text-lg font-bold text-[#30168C]">Total de pontos somados:  {totalPoints.toFixed(1)} pontos</p>
            {alreadyEvaluated && <p className="text-red-400">Este time já foi avaliado.</p>}
            <Button
              variant="contained"
              className="bg-[#5741A6] normal-case first-letter:capitalize"
              onClick={() => setOpen(true)}
              disabled={totalPoints > 400 || alreadyEvaluated || isLoading}
            >
              Finalizar
            </Button>
          </div>
          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogContent>
              <span>
                Deseja finalizar a avaliação Shark Tank do time {teamData?.nomeEquipe}?
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
                Finalizar
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  )
}
