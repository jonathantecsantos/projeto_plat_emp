import { useSelector } from "react-redux"
import { EvaluatorsUpload } from "./evaluators"
import { StudentsUpload } from "./students"
import { TeachersUpload } from "./teachers"
import { RootState } from "../../../redux/store"
import { CoordinatorsUpload } from "./coordinators"

export const UploadFilesComponent = () => {
  const userGlobalState = useSelector((state: RootState) => state.userInfo)

  return <div className="flex flex-col justify-center mt-20 items-center">
    <StudentsUpload userID={userGlobalState.id} />
    <div className='my-4'></div>
    <EvaluatorsUpload userID={userGlobalState.id} />
    <div className='my-4'></div>
    <TeachersUpload userID={userGlobalState.id} />
    <div className='my-4'></div>
    <CoordinatorsUpload userID={userGlobalState.id} />
    <div className='my-4'></div>
  </div>
}