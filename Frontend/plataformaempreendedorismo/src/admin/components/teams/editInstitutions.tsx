import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { LoadingButton } from '@mui/lab'
import { Autocomplete, LinearProgress, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useGetInstitutionsQuery } from '../../../api/studentApi'
import { Institution } from '../../../model/institution'

interface EditInstitutionsProps {
  value: Institution[]
  onSave: (selectedActivityIds: Institution[]) => void
  onCancel: () => void
  loading: boolean | undefined
}

export const EditInstitution = ({ value, onSave, onCancel, loading }: EditInstitutionsProps) => {
  const { data: institutions, isLoading } = useGetInstitutionsQuery()
  const [selectedInstitution, setSelectedInstitution] = useState<Institution[]>(value)

  useEffect(() => {
    setSelectedInstitution(value)
  }, [value])

  const handleSave = () => {
    onSave(selectedInstitution.map((activity) => ({ id: activity.id } as Institution)))
  }

  const handleOnCancel = () => {
    onCancel()
  }

  return (
    <div>
      {isLoading ? (
        <div className='text-center'><LinearProgress color="inherit" /></div>
      ) : (
        <Autocomplete
          multiple
          className='max-w-2xl'
          options={institutions || []}
          value={selectedInstitution}
          getOptionLabel={(option) => option.descricao}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(_event, value) => setSelectedInstitution(value)}
          renderInput={(params) => <TextField {...params} label="Editar Instituição" />}
        />
      )}
      <div className='flex gap-4 w-full mt-2'>
        <button
          type="button"
          onClick={handleOnCancel}
          className="px-2 py-1 bg-gray-400 text-white rounded-lg hover:bg-gray-600 text-sm">
          <ArrowBackIcon />
        </button>

        <LoadingButton
          onClick={handleSave}
          className='bg-ring-custom normal-case  shadow-md hover:bg-[#8668FFCC]'
          variant='contained'
          loading={loading}
          type="submit"
          disabled={loading}
        >
          Salvar
        </LoadingButton>

      </div>
    </div>
  )
}
