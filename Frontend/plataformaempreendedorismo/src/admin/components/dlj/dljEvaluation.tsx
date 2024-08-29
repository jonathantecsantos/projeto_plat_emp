import React, { useEffect, useState } from "react"
import { Button } from "@mui/material"
import { useGetEvaluationByIdQuery } from "../../../api/studentApi"
import { CriterioAvaliacao, SubcriterioAvaliacao } from "../../../model/evaluationFormat"

interface QuestionItemProps {
  subcriterio: SubcriterioAvaliacao
  isDisabled: boolean
  onSelectionChange: (id: number, isSelected: boolean, points: number) => void
}

interface DljTeamEvaluationProps {
  id: number;
  teamData?: { id: number; nomeEquipe: string };
}


export const QuestionItem: React.FC<QuestionItemProps> = ({
  subcriterio,
  isDisabled,
  onSelectionChange,
}) => {
  const [isSelected, setIsSelected] = useState(subcriterio.valorPadrao)

  const handleOptionChange = (selected: boolean) => {
    setIsSelected(selected)
    onSelectionChange(subcriterio.id, selected, subcriterio.notaMaxima)
  }

  return (
    <div
      className={`border p-4 rounded-lg mb-4 flex justify-between items-center ${isDisabled ? "opacity-50 pointer-events-none" : ""
        } ${isSelected ? "bg-gray-100" : "bg-white"}`}
    >
      <div>
        <p className="text-lg font-medium text-primary">{subcriterio.descricao}</p>
        <div className="flex mt-2">
          <label className="mr-4">
            <input
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

export const DljTeamEvaluation = ({ id, teamData }: DljTeamEvaluationProps) => {
  const { data: dljQuestions } = useGetEvaluationByIdQuery(id)
  const [selectedOptions, setSelectedOptions] = useState<number[]>([])
  const [totalPoints, setTotalPoints] = useState(0)

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

  return (
    <div className="w-full mx-auto p-4">
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
      <div className="flex justify-between items-center mt-6">
        <p className="text-lg font-bold text-primary">
          Total de pontos somados: {totalPoints} pontos
        </p>
        <Button variant="contained" color="primary" disabled={totalPoints > 100}>
          Finalizar
        </Button>
      </div>
    </div>
  )
}