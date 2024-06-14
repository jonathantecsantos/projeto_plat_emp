import { EvaluatorsUpload } from "./evaluators"
import { StudentsUpload } from "./students"

export const UploadFilesComponent = () => {
  return <div className="flex flex-col justify-center mt-20 items-center">
    <StudentsUpload />
    <div className='my-8'></div>
    <EvaluatorsUpload />
  </div>
}