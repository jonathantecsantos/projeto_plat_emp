import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { LoadingButton } from '@mui/lab'
import { useState } from 'react'

interface EditLogomarcasAndParceirosProps {
  initialNomeParceiro1: string
  initialNomeParceiro2: string
  onSave: (data: {
    nomeParceiro1: string
    nomeParceiro2: string
    logomarcaTime?: File
    logomarcaParceiro1?: File
    logomarcaParceiro2?: File
  }) => Promise<void>
  onCancel: () => void
  loading: boolean | undefined
}

export const EditLogomarcasAndParceiros = ({
  initialNomeParceiro1,
  initialNomeParceiro2,
  onSave,
  onCancel,
  loading,
}: EditLogomarcasAndParceirosProps) => {
  const [nomeParceiro1, setNomeParceiro1] = useState(initialNomeParceiro1)
  const [nomeParceiro2, setNomeParceiro2] = useState(initialNomeParceiro2)
  const [logomarcaTime, setLogomarcaTime] = useState<File | null>(null)
  const [logomarcaParceiro1, setLogomarcaParceiro1] = useState<File | null>(null)
  const [logomarcaParceiro2, setLogomarcaParceiro2] = useState<File | null>(null)

  const handleSave = async () => {
    await onSave({
      nomeParceiro1,
      nomeParceiro2,
      logomarcaTime: logomarcaTime || undefined,
      logomarcaParceiro1: logomarcaParceiro1 || undefined,
      logomarcaParceiro2: logomarcaParceiro2 || undefined,
    })
  }

  return (
    <div className="flex flex-col gap-4 border p-4 rounded-md bg-white shadow-sm max-w-xl">
      <h3 className="font-semibold text-lg text-[#383691]">Editar Logomarcas e Parceiros</h3>
      
      <div>
        <label htmlFor="editLogomarcaTime" className="block text-sm font-medium text-[#383691] mb-1">Nova Logomarca do Time</label>
        <input
          type="file"
          id="editLogomarcaTime"
          accept="image/*"
          onChange={(e) => setLogomarcaTime(e.target.files?.[0] || null)}
          className="block w-full p-2 border border-gray-300 rounded-md text-sm"
        />
      </div>

      <div className="border-t pt-2">
        <h4 className="font-medium text-sm text-[#383691] mb-2">Parceiro 1</h4>
        <div className="flex flex-col gap-2">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Nome do Parceiro 1</label>
            <input
              type="text"
              value={nomeParceiro1}
              onChange={(e) => setNomeParceiro1(e.target.value)}
              className="border rounded p-2 w-full text-sm"
              placeholder="Nome do Parceiro 1"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Nova Logomarca do Parceiro 1</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setLogomarcaParceiro1(e.target.files?.[0] || null)}
              className="block w-full p-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        </div>
      </div>

      <div className="border-t pt-2">
        <h4 className="font-medium text-sm text-[#383691] mb-2">Parceiro 2</h4>
        <div className="flex flex-col gap-2">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Nome do Parceiro 2</label>
            <input
              type="text"
              value={nomeParceiro2}
              onChange={(e) => setNomeParceiro2(e.target.value)}
              className="border rounded p-2 w-full text-sm"
              placeholder="Nome do Parceiro 2"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Nova Logomarca do Parceiro 2</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setLogomarcaParceiro2(e.target.files?.[0] || null)}
              className="block w-full p-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 w-full mt-2 border-t pt-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-2 py-1 bg-gray-400 text-white rounded-lg hover:bg-gray-600 text-sm"
        >
          <ArrowBackIcon />
        </button>

        <LoadingButton
          onClick={handleSave}
          className="bg-ring-custom normal-case shadow-md hover:bg-[#8668FFCC]"
          variant="contained"
          loading={loading}
          disabled={loading}
        >
          Salvar Alterações
        </LoadingButton>
      </div>
    </div>
  )
}
