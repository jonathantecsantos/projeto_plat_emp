import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Autocomplete, LinearProgress, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useEffect, useState } from 'react'
import { useGetOdsQuery } from '../../../api/studentApi'
import { Ods } from '../../../model/ods'

interface EditOdsProps {
  initialOds: Ods[] 
  onSave: (selectedOds: Ods[]) => void
  onCancel: () => void
  loading: boolean | undefined
}

export const EditOds = ({ initialOds, onSave, onCancel, loading }: EditOdsProps) => {
  const { data: odsList, isLoading } = useGetOdsQuery()
  const [selectedOds, setSelectedOds] = useState<Ods[]>(initialOds)

  useEffect(() => {
    setSelectedOds(initialOds)
  }, [initialOds])

  const handleSave = () => {
    onSave(selectedOds)
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
          options={odsList || []}
          value={selectedOds}
          getOptionLabel={(option) => option.descricao}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(_event, value) => setSelectedOds(value)}
          renderInput={(params) => <TextField {...params} label="Editar ODS" variant='filled' />}
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
