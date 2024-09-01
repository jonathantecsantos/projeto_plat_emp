import { Button, Dialog, DialogActions, DialogContent } from "@mui/material"
import { useEffect, useState } from "react"
import { useGetEvaluationByIdQuery, usePostEvaluationMutation } from "../../../api/studentApi"
import { CriterioAvaliacao, Evaluation, SubcriterioAvaliacao } from "../../../model/evaluationFormat"
import { EvaluationProps } from "../../../utils/types"


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
  const { data: dljQuestions } = useGetEvaluationByIdQuery(1) //id dlj = 1
  const [postEvaluation] = usePostEvaluationMutation()
  const [selectedOptions, setSelectedOptions] = useState<number[]>([])
  const [totalPoints, setTotalPoints] = useState(0)
  const [open, setOpen] = useState(false)
  //todo: winnicius => adicionar loading para os dados e loading para o button finalizar em todos componentes de avaliação

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
  }, [dljQuestions])

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
    if (!teamData || !dljQuestions || dljQuestions.length === 0) return

    const evaluations: Evaluation[] = dljQuestions[0].subcriterioAvaliacaos.map(subcriterio => ({
      idEquipe: teamData.id,
      idCriterioAvaliacao: dljQuestions[0].id,
      idSubcriterioAvaliacao: subcriterio.id,
      nota: selectedOptions.includes(subcriterio.id) ? subcriterio.notaMaxima : 0,
    }))

    try {
      await postEvaluation(evaluations).unwrap()
      setOpen(false)
      //Adicionar lógica para perguntar se o usuário deseja avaliar o proximo time ou voltar a lista de times
      //anotações de como pode ser essa lógica, primeiro contorlar a exibição por enum? segundo tela com o nome do time que foi avaliado e sua nota total e perguntar se o usuario deseja proceguir pro proximo time e o nome do time, componente que carregue a lista de times e verifique se o time fornecido já foi avaliado e em seguida perguntar e chamar a tela passando o id do time restante até não sobrar mais nenhum time e retornar a mensagem que não há mais nenhum time para ser avaliado.
      alert('Avaliação enviada com sucesso!')
    } catch (error) {
      console.error("Failed to submit evaluation", error)
      alert('Falha ao enviar avaliação!')
    }
  }

  return (
    <div className="w-full mx-auto p-4 text-[#30168C]">
      {/* <h2 className="p-2">Avaliação DLJ time: {teamData?.nomeEquipe}</h2> */}
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
          Total do time {teamData.nomeEquipe}: {totalPoints} pontos
        </p>
        <Button variant="contained" className="bg-[#5741A6] normal-case first-letter:capitalize" disabled={totalPoints > 100} onClick={() => setOpen(true)}>
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
          <Button onClick={handlePostEvaluation} style={{ textTransform: 'none', color: 'green' }}>
            Finalizar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}