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
    <div className='rounded w-fit p-4  text-[#cecece] bg-gradient-to-r from-indigo-500 to-indigo-900  shadow-lg transform hover:scale-105 transition-transform duration-300'>
      <div className='flex justify-start space-x-1 items-center'>
        <h2 className='text-white  p-2'>{title}</h2>
        {uploaded && <CheckCircleIcon className='rounded-full  text-green-300'/>}
      </div>
      <input
        className='p-2'
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
