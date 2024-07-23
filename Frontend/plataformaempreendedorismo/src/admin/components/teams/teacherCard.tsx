import { ReactNode } from "react"
import { Teacher } from "../../../model/teacher"
import { IconButton } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert'

export interface TeacherCard {
  teacher?: Teacher
}

export const TeacherCard = ({ teacher }: TeacherCard): ReactNode => (

  <div key={teacher?.id} className={`p-4 border rounded-lg shadow-md w-fit min-h-28 relative bg-[#3C4775] text-[#cecece]`}>
    <div className='w-fit'>
      <p className={`text-lg font-bold capitalize text-white mr-8`}>
        {teacher?.nome.toLowerCase()}
      </p>
      <IconButton
        className='hover:text-white text-[#cecece] absolute right-0 top-1 mx-1'
        onClick={(event) => {
          event.stopPropagation()
          // handleClickOpen({ student })
        }}>
        <MoreVertIcon />
      </IconButton>
    </div>
    <p>Professor/Orientador</p>
  </div>
)