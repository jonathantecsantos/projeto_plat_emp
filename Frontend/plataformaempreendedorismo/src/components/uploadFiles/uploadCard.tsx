import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { LoadingButton } from '@mui/lab'
import React from 'react'

interface UploadComponent {
  title: string
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: () => void
  isLoading: boolean
  uploaded: boolean
}

export const UploadComponent = ({ title, onFileChange, onSubmit, isLoading, uploaded }: UploadComponent) => {
  return (
    <div className='shadow-md rounded w-fit p-2 bg-[#202020] '>
      <div className='flex justify-start space-x-1 p-4'>
        <h2>{title}</h2>
        {uploaded && <CheckCircleIcon style={{ color: 'green' }} />}
      </div>
      <input
        style={{ paddingInline: 20 }}
        type="file"
        accept=".xlsx,.xls"
        onChange={onFileChange}
      />
      <LoadingButton
        style={{ textTransform: 'none', background: '#8668FFCC' }}
        loading={isLoading}
        variant="contained"
        onClick={onSubmit}
        disabled={isLoading}
      >
        <span>Enviar</span>
      </LoadingButton>
    </div>
  )
}
