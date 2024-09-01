import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import { useGetEvaluationByIdQuery, usePostEvaluationMutation } from "../../../api/studentApi"
import { CriterioAvaliacao } from "../../../model/evaluationFormat"
import { EvaluationProps } from "../../../utils/types"
import { SubcriterionSlider } from "../common/subcriterioSlider"

export const ExpoDleiTeamEvaluation = ({ teamData }: EvaluationProps) => {
  const { data: expoDleiQuestions } = useGetEvaluationByIdQuery(4)
  const [postEvaluation] = usePostEvaluationMutation()
  const [values, setValues] = useState<{ [key: number]: number }>({})
  const [totalPoints, setTotalPoints] = useState(0)

  useEffect(() => {
    if (expoDleiQuestions) {
      const initialValues: { [key: number]: number } = {}
      let initialTotalPoints = 0

      expoDleiQuestions.forEach((criterio) => {
        criterio.subcriterioAvaliacaos.forEach((subcriterio) => {
          const initialValue = 0
          initialValues[subcriterio.id] = initialValue
          initialTotalPoints += initialValue
        })
      })

      setValues(initialValues)
      setTotalPoints(initialTotalPoints)
    }
  }, [expoDleiQuestions])

  const handleSubcriterionChange = (idSubcriterio: number, value: number) => {
    const previousValue = values[idSubcriterio] || 0

    // Calcula o novo total de pontos
    const newTotalPoints = parseFloat((totalPoints - previousValue + value).toFixed(1))

    // Verifica se o novo valor é válido, ou seja, não ultrapassa o máximo permitido para o critério
    expoDleiQuestions?.find(c => c.subcriterioAvaliacaos.some(s => s.id === idSubcriterio))
    setValues((prevValues) => ({
      ...prevValues,
      [idSubcriterio]: value,
    }))
    setTotalPoints(newTotalPoints)
  }

  const handlePostEvaluation = async () => {
    const payload = Object.keys(values).map((idSubcriterio) => {
      const subcriterioId = parseInt(idSubcriterio, 10)
      const criterio = expoDleiQuestions?.find((criterio) =>
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
      await postEvaluation(payload).unwrap()
      alert("Avaliação enviada com sucesso!")
    } catch (error) {
      console.error("Failed to submit evaluation", error)
      alert("Falha ao enviar avaliação!")
    }
  }


  return (
    <div className="max-w-4xl mx-auto p-4">
      {expoDleiQuestions?.map((criterio: CriterioAvaliacao) => (
        <div key={criterio.id} className="mb-6 border rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-primary bg-[#5741A6] p-2 rounded-t-lg text-white">Critério: {criterio.descricao}</h3>
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
      <div className="flex justify-between items-center mt-6">
        <p className="text-lg font-bold text-primary">Total de pontos somados:  {totalPoints.toFixed(1)} pontos</p>
        <Button variant="contained" color="primary" onClick={handlePostEvaluation} disabled={totalPoints > 400}>
          Finalizar
        </Button>
      </div>
    </div>
  )
}