import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, LinearProgress } from "@mui/material"
import { useSnackbar } from "notistack"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useGetEvaluationByIdQuery, useGetEvaluationDataQuery, useGetTeamsEvaluationsQuery, usePostEvaluationMutation, usePutEvaluationMutation } from "../../../api/studentApi"
import { RoutesNames } from "../../../globals"
import { CriterioAvaliacao, Evaluation, EvaluationData, SubcriterioAvaliacao } from "../../../model/evaluationFormat"
import { toggleLoading } from "../../../redux/reducers/loadingBar.slice"
import { EvaluationProps } from "../../../utils/types"
import { EvaluationHeader } from "../common/evaluationHeader"
import { HandleNextTeamComponent } from "../common/handleNextTeam"

interface QuestionItemProps {
  subcriterio: SubcriterioAvaliacao
  isDisabled: boolean
  dljResponse: EvaluationData[]
  isLoading: boolean
  onSelectionChange: (id: number, isSelected: boolean, points: number) => void
}
export const QuestionItem = ({ subcriterio, isDisabled, onSelectionChange, dljResponse, isLoading }: QuestionItemProps) => {
  const [isSelected, setIsSelected] = useState(subcriterio.valorPadrao)

  // Sempre que dljResponse mudar, atualize a seleção se houver dados
  useEffect(() => {
    const responseItem = dljResponse.find(
      (item) => item.idSubcriterioAvaliacao === subcriterio.id
    )
    if (responseItem) {
      setIsSelected(responseItem.nota > 0) // Atualizando o estado visual baseado no dljResponse
    } else {
      setIsSelected(subcriterio.valorPadrao)
    }
  }, [dljResponse, subcriterio.id])

  const handleOptionChange = (selected: boolean) => {
    setIsSelected(selected)
    onSelectionChange(subcriterio.id, selected, subcriterio.notaMaxima)
  }

  if (isLoading) return <div className='text-center'><LinearProgress color="inherit" style={{ height: '1px' }} /></div>

  return (
    <div className={`border p-4 rounded-lg mb-4 flex justify-between items-center 
        ${isDisabled ? "opacity-50 pointer-events-none" : ""} ${isSelected ? "bg-gray-100" : "bg-white"}`}
    >
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
  const { data: teams, } = useGetTeamsEvaluationsQuery(
    {
      evaluationTypeId: teamData.teamEvaluation.evaluationTypeId,
      evaluatorId: teamData.teamEvaluation.evaluatorId
    })

  const { data: dljResponse, isLoading: dljLoading } = useGetEvaluationDataQuery({
    idAvaliador: teamData.teamEvaluation.evaluatorId,
    idFormatoAvaliacao: teamData.teamEvaluation.evaluationTypeId,
    idEquipe: teamData.id
  }, )
  const navigate = useNavigate()

  const [postEvaluation] = usePostEvaluationMutation()
  const [putEvaluation] = usePutEvaluationMutation()

  const [selectedOptions, setSelectedOptions] = useState<number[]>([])
  const [totalPoints, setTotalPoints] = useState(0)
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const [showSuccess, setShowSuccess] = useState(false)
  const { enqueueSnackbar } = useSnackbar()


  const alreadyEvaluated = teams?.some(team => team.id === teamData.id && team.equipeAvaliada === true)


  useEffect(() => {
    if (dljQuestions && dljResponse) {
      const initialSelectedOptions: number[] = []
      let initialTotalPoints = 0

      dljQuestions.forEach((criterio: CriterioAvaliacao) => {
        criterio.subcriterioAvaliacaos.forEach((subcriterio: SubcriterioAvaliacao) => {
          // Verifica se existe uma resposta no dljResponse para o subcritério
          const responseItem = dljResponse.find(
            (item) => item.idSubcriterioAvaliacao === subcriterio.id
          )

          if (responseItem) {
            // Se a nota for maior que 0, considera como selecionado e soma os pontos
            if (responseItem.nota > 0) {
              initialSelectedOptions.push(subcriterio.id)
              initialTotalPoints += responseItem.nota
            }
          } else if (subcriterio.valorPadrao) {
            // Se não houver resposta no dljResponse, usa o valor padrão
            initialSelectedOptions.push(subcriterio.id)
            initialTotalPoints += subcriterio.notaMaxima
          }
        })
      })

      setSelectedOptions(initialSelectedOptions)
      setTotalPoints(initialTotalPoints)
    }

    return () => {
      setSelectedOptions([])
      setTotalPoints(0)
    }
  }, [dljQuestions, dljResponse])



  const handleSelectionChange = (id: number, isSelected: boolean, points: number) => {
    let updatedSelectedOptions = [...selectedOptions]
    let updatedTotalPoints = totalPoints

    // Verifique se o item foi selecionado
    if (isSelected) {
      if (!updatedSelectedOptions.includes(id)) {
        // Verifica se adicionar os pontos ultrapassa 100
        if (updatedTotalPoints + points <= 100) {
          updatedSelectedOptions.push(id)
          updatedTotalPoints += points
        } else {
          enqueueSnackbar('A pontuação total não pode exceder 100 pontos.', { variant: 'warning' })
          return
        }
      }
    } else {
      // Se estiver desmarcando, subtraia os pontos
      if (updatedSelectedOptions.includes(id)) {
        updatedSelectedOptions = updatedSelectedOptions.filter((selectedId) => selectedId !== id)
        updatedTotalPoints = Math.max(0, updatedTotalPoints - points) // Garante que não seja negativo
      }
    }

    setSelectedOptions(updatedSelectedOptions)
    setTotalPoints(updatedTotalPoints)
  }

  const handlePostEvaluation = async () => {
    if (!teamData || !dljQuestions || dljQuestions.length === 0) {
      enqueueSnackbar('Nenhuma alternativa disponível, consulte um admin.', { variant: 'info' })
      return
    }

    const payload: Evaluation[] = dljQuestions[0].subcriterioAvaliacaos.map(subcriterio => ({
      idEquipe: teamData.id,
      idCriterioAvaliacao: dljQuestions[0].id,
      idSubcriterioAvaliacao: subcriterio.id,
      nota: selectedOptions.includes(subcriterio.id) ? subcriterio.notaMaxima : 0,
      idAvaliador: teamData.teamEvaluation.evaluatorId,
      idTipoAvaliacao: teamData.teamEvaluation.evaluationTypeId
    }))

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

      setOpen(false)
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
    navigate(RoutesNames.dljTeams)
  }

  if (isLoading) return <div className='text-center'><CircularProgress /></div>

  return (
    <div className="max-w-7xl mx-auto p-4 text-[#30168C]">

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
          evaluationType={RoutesNames.dljTeam}
          onComplete={() => setShowSuccess(false)}
        />
      ) : (
        <>
          {dljQuestions?.map((criterio: CriterioAvaliacao) => (

            <div key={criterio.id} className="mb-6">
              {criterio.subcriterioAvaliacaos.map((subcriterio: SubcriterioAvaliacao) => (
                <QuestionItem
                  isLoading={dljLoading}
                  key={subcriterio.id}
                  subcriterio={subcriterio}
                  dljResponse={dljResponse || []}
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
                disabled={totalPoints > 100 || isLoading} onClick={() => setOpen(true)}>
                {alreadyEvaluated ? 'Editar' : 'Finalizar'}
              </Button>
            </div>
            {alreadyEvaluated && <p className="text-red-300">Avaliado!</p>}
          </div>
          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogContent>
              <span>
                Deseja {alreadyEvaluated ? 'editar' : 'finalizar'} a avaliação DLJ do time {teamData?.nomeEquipe}?
              </span>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)} style={{ textTransform: 'none', color: 'gray' }}>
                Cancelar
              </Button>
              <Button onClick={handlePostEvaluation}
                style={{ textTransform: 'none', color: 'white', backgroundColor: '#5741A6' }}>
                {alreadyEvaluated ? 'Editar' : 'Finalizar'}
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  )
}