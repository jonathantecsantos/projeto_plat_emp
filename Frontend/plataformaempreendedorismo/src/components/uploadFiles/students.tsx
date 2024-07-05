import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggleLoading } from '../../redux/reducers/loadingBar.slice'
import { ImportType } from '../../utils/types'
import { UploadComponent } from './uploadCard'
import { useUploadFileMutation } from '../../api/import.slice'



export const StudentsUpload = () => {
  const [file, setFile] = useState<File | null>(null)
  const dispatch = useDispatch()
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
      dispatch(toggleLoading())
      const formData = new FormData()
      formData.append('file', file)
      formData.append('tipo', ImportType.student)

      try {
        console.log('Enviando arquivo de alunos para o backend...')
        const response = await uploadFile(formData)
        if (!response.error) {
          enqueueSnackbar('Arquivo de alunos enviado com sucesso!', { variant: 'success' })
          setUploaded(true)
        }
      } catch (error) {
        console.error('Erro ao enviar o arquivo de alunos:', error)
        enqueueSnackbar('Erro ao enviar o arquivo de alunos. Por favor, tente novamente.', { variant: 'error' })
        setUploaded(false)
      } finally {
        dispatch(toggleLoading())
      }
    } else {
      enqueueSnackbar('Por favor, selecione um arquivo antes de enviar.', { variant: 'warning' })
    }
  }

  return (
    <UploadComponent
      title='Upload Alunos'
      onFileChange={handleFileChange}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      uploaded={uploaded}
    />
  )
}