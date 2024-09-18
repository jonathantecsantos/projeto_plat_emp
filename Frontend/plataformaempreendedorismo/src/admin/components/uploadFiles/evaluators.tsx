import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import { useUploadFileMutation } from '../../../api/studentApi'
import { ImportType } from '../../../utils/types'
import { UploadComponent } from './uploadCard'

export const EvaluatorsUpload = () => {
  const [file, setFile] = useState<File | null>(null)
  const [uploadFile, { isLoading }] = useUploadFileMutation()
  const { enqueueSnackbar } = useSnackbar()
  const [uploaded, setUploaded] = useState(false)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0]
    if (uploadedFile) {
      setFile(uploadedFile)
    }
  }

  const handleSubmit = async () => {
    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('tipo', ImportType.evaluator)

      try {
        console.log('Enviando arquivo de avaliadores para o backend...')
        const response = await uploadFile(formData)
        if (!response.error) {
          enqueueSnackbar('Arquivo de avaliadores enviado com sucesso!', { variant: 'success' })
          setUploaded(true)
        }
      } catch (error) {
        console.error('Erro ao enviar o arquivo de avaliadores:', error)
        enqueueSnackbar('Erro ao enviar o arquivo de avaliadores. Por favor, tente novamente.', { variant: 'error' })
        setUploaded(false)
      }
    } else {
      enqueueSnackbar('Por favor, selecione um arquivo antes de enviar.', { variant: 'warning' })
    }
  }

  return (
    <UploadComponent
      title='Upload Avaliadores'
      onFileChange={handleFileChange}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      uploaded={uploaded}
    />
  )
}

