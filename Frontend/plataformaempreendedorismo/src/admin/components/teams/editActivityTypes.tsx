import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { LoadingButton } from '@mui/lab'
import { Autocomplete, LinearProgress, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useGetActivityTypesQuery } from '../../../api/studentApi'
import { ActivityType } from '../../../model/activityTypes'

interface EditActivityTypesSelectProps {
  value: ActivityType[]
  onSave: (selectedActivityIds: ActivityType[]) => void
  onCancel: () => void
  loading: boolean | undefined
}

export const EditActivityTypes = ({ value, onSave, onCancel, loading }: EditActivityTypesSelectProps) => {
  const { data: activityTypes, isLoading } = useGetActivityTypesQuery()

  const [selectedActivity, setSelectedActivity] = useState<ActivityType[]>(value)

  useEffect(() => {
    setSelectedActivity(value)
  }, [value])

  const handleSave = () => {
    onSave(selectedActivity.map((activity) => ({ id: activity.id } as ActivityType)))
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
          options={activityTypes || []}
          value={selectedActivity}
          getOptionLabel={(option) => option.descricao}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(_event, value) => setSelectedActivity(value)}
          renderInput={(params) => <TextField {...params} label="Editar Atividade" />}
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
