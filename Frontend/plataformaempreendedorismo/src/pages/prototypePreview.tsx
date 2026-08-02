import { useParams } from "react-router-dom"
import { PrototypePreviewComponent } from "../admin/components/teams/prototypePreview"

export const PrototypePreviewPage = () => {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-gray-200 p-4 print:p-0 print:bg-white">
      <PrototypePreviewComponent id={parseInt(id!)} disableAutoPrint={true} />
    </div>
  )
}

