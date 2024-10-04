import DownloadIcon from "@mui/icons-material/Download"
import ImageIcon from "@mui/icons-material/Image"
import { AnexoPrototype, AnexoTypeDescription } from "../../../model/prototyping"

interface FileDownloadProps {
  anexos: AnexoPrototype[]
  type: AnexoTypeDescription
}

const downloadFile = (caminho: string, nomeAnexo: string) => {
  // Simulando o caminho local, deve ser adaptado conforme o servidor
  const url = caminho.replace(/\\/g, '/'); // Para lidar com o formato Windows de caminho
  const a = document.createElement('a');
  a.href = url;
  a.download = nomeAnexo;
  a.click();
};

export const FileDownload = ({ anexos, type }: FileDownloadProps) => {
  const anexosFiltrados = anexos?.filter(anexo => anexo.tipoAnexoPrototipo.descricao === type);
  return (
    <div>
      {anexosFiltrados.length > 0 && (
        <div className="mt-4 text-[#3C14A4] ">
          {anexosFiltrados.map(anexo => (
            <div key={anexo.id}
              className="flex items-center border border-gray-300 p-2 rounded-md mb-2 shadow-sm">
              <ImageIcon className="text-blue-500 mr-2" />
              <span className="flex-grow">{anexo.nomeAnexo}</span>
              <DownloadIcon className="text-green-500 cursor-pointer"
                onClick={() => downloadFile(anexo.caminhoAnexo, anexo.nomeAnexo)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
