import { Autocomplete, LinearProgress, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useGetEvaluationTypesQuery } from '../../../api/studentApi'
import { FormatoAvaliacao } from '../../../model/evaluator'


interface EditEvaluationTypeProps {
  initialEvaluationTypes: FormatoAvaliacao[] | null
  onChange: (selectedEvaluationIds: number[]) => void
  reset: boolean
}

export const EditEvaluationType = ({ initialEvaluationTypes, onChange, reset }: EditEvaluationTypeProps) => {
  const [selectedEvaluationTypes, setSelectedEvaluationTypes] = useState<FormatoAvaliacao[] | null>(initialEvaluationTypes)
  const { data: evaluationTypes, isLoading } = useGetEvaluationTypesQuery()

  useEffect(() => {
    if (reset) {
      setSelectedEvaluationTypes([])
    }
  }, [reset])

  const handleSelectionChange = (_event: any, value: FormatoAvaliacao[]) => {
    setSelectedEvaluationTypes(value)
    onChange(value.map((evaluationType) => evaluationType.id))
  }


  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Formatos de Avaliação</label>
        {isLoading ? (
          <div className="text-center">
            <LinearProgress color="inherit" />
          </div>
        ) : (
          <Autocomplete
            multiple
            className="bg-white border border-gray-300 rounded-lg shadow-sm"
            options={evaluationTypes || []}
            value={selectedEvaluationTypes!}
            getOptionLabel={(option) => option.descricao}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={handleSelectionChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label=""
                variant="outlined"
                size="small"
                placeholder=""
                className="bg-white border border-gray-300 rounded-md"

              />
            )}
          />
        )}
      </div>
    </div>
  )
}
