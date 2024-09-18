import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { LoadingButton } from '@mui/lab'
import { useEffect, useState } from 'react'

interface EditTeamNameProps {
  initialTeamName: string
  onSave: (teamName: string) => void
  onCancel: () => void
  loading: boolean | undefined
}

export const EditTeamName = ({ initialTeamName, onSave, onCancel, loading }: EditTeamNameProps) => {
  const [teamName, setTeamName] = useState<string>(initialTeamName)

  useEffect(() => {
    setTeamName(initialTeamName)
  }, [initialTeamName])

  const handleSave = () => {
    onSave(teamName)
  }

  const handleOnCancel = () => {
    onCancel()
  }

  return (
    <div>
      <input
        id="nome"
        placeholder="Editar Nome do Time"
        type="text"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        className="mt-1 sm:w-96 p-2 border border-[#3C14A4] rounded-md"
      />

      <div className='flex gap-4 w-full mt-2'>
        <button
          type="button"
          onClick={handleOnCancel}
          className="px-2 py-1 bg-gray-400 text-white rounded-lg hover:bg-gray-600 text-sm"
        >
          <ArrowBackIcon />
        </button>

        <LoadingButton
          onClick={handleSave}
          className='bg-ring-custom normal-case shadow-md hover:bg-[#8668FFCC]'
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
