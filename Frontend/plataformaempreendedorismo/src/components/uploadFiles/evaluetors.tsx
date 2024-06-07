import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { LoadingButton } from '@mui/lab'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useEvaluatorsImportMutation } from '../../api/evaluatorsImport.Slice'
import { toggleLoading } from '../../redux/reducers/loadingBar.slice'
import { ImportType } from '../../utils/types'

export const EvaluatorsUpload = () => {
  const [file, setFile] = useState<File | null>(null)
  const dispatch = useDispatch()
  const [evaluatorsImport, { isLoading }] = useEvaluatorsImportMutation()
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
      formData.append('tipo', ImportType.evaluator)

      try {
        console.log('Enviando arquivo de avaliadores para o backend...')
        const response = await evaluatorsImport(formData)
        if (!response.error) {
          enqueueSnackbar('Arquivo de avaliadores enviado com sucesso!', { variant: 'success' })
          setUploaded(true)
        }
      } catch (error) {
        console.error('Erro ao enviar o arquivo de avaliadores:', error)
        enqueueSnackbar('Erro ao enviar o arquivo de avaliadores. Por favor, tente novamente.', { variant: 'error' })
        setUploaded(false)
      } finally {
        dispatch(toggleLoading())
      }
    } else {
      enqueueSnackbar('Por favor, selecione um arquivo antes de enviar.', { variant: 'warning' })
    }
  }

  return (
    <div className='shadow-md rounded w-fit p-2 bg-[#202020] '>
      <div className='flex justify-start space-x-1 p-4'>
        <h2>Upload Avaliadores</h2>
        {uploaded && <CheckCircleIcon style={{
          color: 'green',
        }} />}
      </div>
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

