import { LoadingButton } from '@mui/lab'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useStudentsImportMutation } from '../../api/studentsImport.Slice'
import { toggleLoading } from '../../redux/reducers/loadingBar.slice'
import { ImportType } from '../../utils/types'


export const StudentsUpload = () => {
  const [file, setFile] = useState<File | null>(null)
  const dispatch = useDispatch()
  const [studentsImport, { isLoading }] = useStudentsImportMutation()
  const { enqueueSnackbar } = useSnackbar()


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
        const response = await studentsImport(formData)
        if (!response.error)
          enqueueSnackbar('Arquivo de alunos enviado com sucesso!', { variant: 'success' })
      } catch (error) {
        console.error('Erro ao enviar o arquivo de alunos:', error)
        enqueueSnackbar('Erro ao enviar o arquivo de alunos. Por favor, tente novamente.', { variant: 'error' })
      } finally {
        dispatch(toggleLoading())
      }
    } else {
      enqueueSnackbar('Por favor, selecione um arquivo antes de enviar.', { variant: 'warning' })
    }
  }

  return (
    <div>
      <h2 className='font-medium'>Upload Alunos</h2>
      <input
        style={{
          paddingInline: 20,
        }}
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileChange}
      />
      <LoadingButton style={{ textTransform: 'none', background: '#8668FFCC' }}
        loading={isLoading} variant="contained" onClick={handleSubmit} disabled={isLoading}>
        <span>Enviar</span> 
      </LoadingButton>
    </div>
  )
}