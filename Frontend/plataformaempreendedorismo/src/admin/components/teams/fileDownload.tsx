import DownloadIcon from "@mui/icons-material/Download"
import ImageIcon from "@mui/icons-material/Image"
import { AnexoPrototype, AnexoTypeDescription } from "../../../model/prototyping"

interface FileDownloadProps {
  anexos: AnexoPrototype[]
  type: AnexoTypeDescription
}

const downloadFile = (nomeAnexo: string) => {
  const url = `${import.meta.env.VITE_API_URL}/download/${nomeAnexo}`
  const a = document.createElement('a')
  a.href = url
  a.download = nomeAnexo
  a.click()
}

export const FileDownload = ({ anexos, type }: FileDownloadProps) => {
  const anexosFiltrados = anexos?.filter(anexo => anexo.tipoAnexoPrototipo.descricao === type)
  return (
    <div>
      {anexosFiltrados.length > 0 && (
        <div className="mt-4 text-[#3C14A4]">
          <div className="flex flex-wrap space-x-2">
            {anexosFiltrados.map(anexo => (
              <div key={anexo.id}
                className="flex items-center border border-gray-300 p-2 rounded-md shadow-sm flex-shrink-0 flex-grow w-32 h-12">
                <ImageIcon className="text-indigo-700 mr-2" />
                <span className="flex-grow overflow-hidden whitespace-nowrap text-ellipsis">
                  {anexo.nomeAnexo}
                </span>
                <DownloadIcon
                  className="text-ring-custom cursor-pointer"
                  onClick={() => downloadFile(anexo.nomeAnexo)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
