import React, { useState } from 'react'

// Componente para o upload de alunos
const UploadAlunos = () => {
  const [file, setFile] = useState<File | null>(null)

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
      formData.append('tipo', 'aluno')

      try {
        console.log('Enviando arquivo de alunos para o backend...')
        const response = await fetch('http://localhost:8080/api/upload/arquivo', {
          method: 'POST',
          body: formData
        })
        const data = await response
        console.log(data)
        if (response.status == 200)
          alert('Arquivo de alunos enviado com sucesso!')
      } catch (error) {
        console.error('Erro ao enviar o arquivo de alunos:', error)
        alert('Erro ao enviar o arquivo de alunos. Por favor, tente novamente.')
      }
    } else {
      alert('Por favor, selecione um arquivo antes de enviar.')
    }
  }

  return (
    <div>
      <h2>Upload Alunos</h2>
      <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Enviar</button>
    </div>
  )
}


const UploadGrupos: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)

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

      try {
        console.log('Enviando arquivo de grupos para o backend...')
        const response = await fetch('http://localhost:8080/api/upload/arquivo', {
          method: 'POST',
          body: formData,
        })
        const data = await response.json()
        console.log(data)
        alert('Arquivo de grupos enviado com sucesso!')
      } catch (error) {
        console.error('Erro ao enviar o arquivo de grupos:', error)
        alert('Erro ao enviar o arquivo de grupos. Por favor, tente novamente.')
      }
    } else {
      alert('Por favor, selecione um arquivo antes de enviar.')
    }
  }

  return (
    <div>
      <h2>Upload Grupos</h2>
      <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Enviar</button>
    </div>
  )
}

export { UploadAlunos, UploadGrupos }
