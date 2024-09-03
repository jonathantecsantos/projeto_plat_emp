import { Button, CircularProgress, Dialog, DialogActions, DialogContent } from "@mui/material"
import { useSnackbar } from "notistack"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { useGetEvaluationByIdQuery, usePostEvaluationMutation } from "../../../api/studentApi"
import { RoutesNames } from "../../../globals"
import { CriterioAvaliacao, Evaluation, SubcriterioAvaliacao } from "../../../model/evaluationFormat"
import { addEvaluation, checkIfTeamEvaluated, selectEvaluatedTeams } from "../../../redux/reducers/evaluations.slice"
import { toggleLoading } from "../../../redux/reducers/loadingBar.slice"
import { RootState } from "../../../redux/store"
import { EvaluationProps } from "../../../utils/types"
import { HandleNextTeamComponent } from "../common/handleNextTeam"


interface QuestionItemProps {
  subcriterio: SubcriterioAvaliacao
  isDisabled: boolean
  onSelectionChange: (id: number, isSelected: boolean, points: number) => void
}


export const QuestionItem = ({ subcriterio, isDisabled, onSelectionChange }: QuestionItemProps) => {
  const [isSelected, setIsSelected] = useState(subcriterio.valorPadrao)

  const handleOptionChange = (selected: boolean) => {
    setIsSelected(selected)
    onSelectionChange(subcriterio.id, selected, subcriterio.notaMaxima)
  }

  return (
    <div className={`border p-4 rounded-lg mb-4 flex justify-between items-center 
        ${isDisabled ? "opacity-50 pointer-events-none" : ""} ${isSelected ? "bg-gray-100" : "bg-white"}`
    }>
      <div>
        <p className="text-lg font-medium text-primary">{subcriterio.descricao}</p>
        <div className="flex mt-2">
          <label className="mr-4">
            <input
              className="mr-1"
              type="radio"
              name={`option-${subcriterio.id}`}
              checked={isSelected}
              onChange={() => handleOptionChange(true)}
              disabled={isDisabled}
            />
            Sim
          </label>
          <label>
            <input
              className="mr-1"
              type="radio"
              name={`option-${subcriterio.id}`}
              checked={!isSelected}
              onChange={() => handleOptionChange(false)}
            />
            Não
          </label>
        </div>
      </div>
      <div className="text-lg text-primary font-bold">
        {subcriterio.notaMaxima} pontos
      </div>
    </div>
  )
}

export const DljTeamEvaluation = ({ teamData }: EvaluationProps) => {
  const { data: dljQuestions, isLoading } = useGetEvaluationByIdQuery(1) //id dlj = 1
  const [postEvaluation] = usePostEvaluationMutation()
  const evaluatedTeams = useSelector(selectEvaluatedTeams)
  const [selectedOptions, setSelectedOptions] = useState<number[]>([])
  const [totalPoints, setTotalPoints] = useState(0)
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const [showSuccess, setShowSuccess] = useState(false)
  const location = useLocation()
  const { enqueueSnackbar } = useSnackbar()
  const currentTeamData = location.state?.teamData || teamData;


  const alreadyEvaluated = useSelector((state: RootState) => {
    const evaluatedTeams = selectEvaluatedTeams(state);
    return checkIfTeamEvaluated({
      evaluatedTeams,
      teamId: teamData.id,
      evaluationType: RoutesNames.dljTeam,
    });
  });


  useEffect(() => {
    if (dljQuestions) {
      const initialSelectedOptions: number[] = []
      let initialTotalPoints = 0

      dljQuestions.forEach((criterio: CriterioAvaliacao) => {
        criterio.subcriterioAvaliacaos.forEach((subcriterio: SubcriterioAvaliacao) => {
          if (subcriterio.valorPadrao) {
            initialSelectedOptions.push(subcriterio.id)
            initialTotalPoints += subcriterio.notaMaxima
          }
        })
      })

      setSelectedOptions(initialSelectedOptions)
      setTotalPoints(initialTotalPoints)
    }

    return () => {
      setSelectedOptions([]);
      setTotalPoints(0);
    };
  }, [dljQuestions, currentTeamData])

  const handleSelectionChange = (id: number, isSelected: boolean, points: number) => {
    let updatedSelectedOptions = [...selectedOptions]
    let updatedTotalPoints = totalPoints

    if (isSelected) {
      if (updatedTotalPoints + points > 100) return
      updatedSelectedOptions.push(id)
      updatedTotalPoints += points
    } else {
      updatedSelectedOptions = updatedSelectedOptions.filter((selectedId) => selectedId !== id)
      updatedTotalPoints -= points
    }

    setSelectedOptions(updatedSelectedOptions)
    setTotalPoints(updatedTotalPoints)
  }


  const handlePostEvaluation = async () => {
    if (!teamData || !dljQuestions || dljQuestions.length === 0) {
      enqueueSnackbar('Nenhuma alternativa disponível, consulte um admin.', { variant: 'info' })
      return
    }

    if (alreadyEvaluated) {
      enqueueSnackbar('Este time já foi avaliado', { variant: 'error' })
      return
    }

    const evaluations: Evaluation[] = dljQuestions[0].subcriterioAvaliacaos.map(subcriterio => ({
      idEquipe: teamData.id,
      idCriterioAvaliacao: dljQuestions[0].id,
      idSubcriterioAvaliacao: subcriterio.id,
      nota: selectedOptions.includes(subcriterio.id) ? subcriterio.notaMaxima : 0,
    }))

    try {
      dispatch(toggleLoading())
      await postEvaluation(evaluations).unwrap()
      setOpen(false)

      dispatch(addEvaluation({
        teamId: teamData.id,
        evaluationType: RoutesNames.dljTeam, 
      }));

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
    <div className="w-full mx-auto p-4 text-[#30168C]">
      {/* <div className="bg-red-200">teamId atual {JSON.stringify(teamData.id)}</div> */}
      {/* <div className="bg-blue-300">Times avaliados{JSON.stringify(evaluatedTeams)}</div> */}
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
          evaluationType={RoutesNames.dljTeam}
          onComplete={() => setShowSuccess(false)}
        />
      ) : (
        <>
          {dljQuestions?.map((criterio: CriterioAvaliacao) => (
            <div key={criterio.id} className="mb-6">
              {criterio.subcriterioAvaliacaos.map((subcriterio: SubcriterioAvaliacao) => (
                <QuestionItem
                  key={subcriterio.id}
                  subcriterio={subcriterio}
                  isDisabled={
                    (subcriterio.id === 2 && selectedOptions.includes(1)) ||
                    (subcriterio.id === 1 && selectedOptions.includes(2))
                  }
                  onSelectionChange={handleSelectionChange}
                />
              ))}
            </div>
          ))}
          <div className="flex flex-col justify-end gap-4 items-end mt-6">
            <p className="text-lg font-bold">
              Total do time {teamData?.nomeEquipe}: {totalPoints} pontos
            </p>
            {alreadyEvaluated && <p className="text-red-400">Este time já foi avaliado.</p>}
            <Button variant="contained" className="bg-[#5741A6] normal-case"
              disabled={totalPoints > 100 || alreadyEvaluated || isLoading} onClick={() => setOpen(true)}>
              Finalizar
            </Button>
          </div>
          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogContent>
              <span>
                Deseja finalizar a avaliação DLJ do time {teamData?.nomeEquipe}?
              </span>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)} style={{ textTransform: 'none', color: 'gray' }}>
                Cancelar
              </Button>
              <Button onClick={handlePostEvaluation}
                style={{ textTransform: 'none', color: 'white', backgroundColor: '#5741A6' }}>
                Finalizar
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  )
}