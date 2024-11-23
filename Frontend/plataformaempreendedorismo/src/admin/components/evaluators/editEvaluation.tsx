import { Autocomplete, LinearProgress, TextField } from '@mui/material'
import { useState } from 'react'
import { useGetEvaluationTypesQuery } from '../../../api/studentApi'
import { FormatoAvaliacao } from '../../../model/evaluator'


interface EditEvaluationTypeProps {
  initialEvaluationTypes: FormatoAvaliacao[] | null
  onChange: (selectedEvaluationIds: number[]) => void
}

export const EditEvaluationType = ({ initialEvaluationTypes, onChange }: EditEvaluationTypeProps) => {
  const [selectedEvaluationTypes, setSelectedEvaluationTypes] = useState<FormatoAvaliacao[] | null>(initialEvaluationTypes)
  const { data: evaluationTypes, isLoading } = useGetEvaluationTypesQuery()



  const handleSelectionChange = (_event: any, value: FormatoAvaliacao[]) => {
    setSelectedEvaluationTypes(value)
    onChange(value.map((evaluationType) => evaluationType.id))
  }


  return (
    <div>
      {isLoading ? (
        <div className="text-center">
          <LinearProgress color="inherit" />
        </div>
      ) : (
        <Autocomplete
          multiple
          className="max-w-2xl"
          options={evaluationTypes || []}
          value={selectedEvaluationTypes!}
          getOptionLabel={(option) => option.descricao}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={handleSelectionChange}
          // onChange={(_event, value) => setSelectedEvaluationTypes(value)}
          renderInput={(params) => <TextField {...params} label="Selecionar Tipos de Avaliação" />}
        />
      )}
    </div>
  )
}
