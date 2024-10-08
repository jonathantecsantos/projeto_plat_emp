import { ReactNode } from "react"
import { ActionMenu } from "../common/actionMenuIcon"
import { Teacher } from "../../../model/teacher"

export interface TeacherCard {
  teacher?: Teacher
}

export const TeacherCard = ({ teacher }: TeacherCard): ReactNode => (

  <div key={teacher?.id} className={`p-4 border rounded-lg shadow-md w-fit min-h-20 relative bg-[#5741A6] text-[#cecece]`}>
    <div className='min-w-56 w-fit'>
      <p className={`text-lg font-bold capitalize text-white mr-2`}>
        {teacher?.nome.toLowerCase()}
      </p>
      <ActionMenu
        onEdit={() => console.log('Edit teacher')}
        onRemove={() => console.log('Remove teacher')}
        onPromoteLeader={() => console.log('Promote teacher to leader')}
        onPromoteViceLeader={() => console.log('Promote teacher to vice leader')}
        onPromoteMember={() => console.log('Promote teacher to vice leader')}
      />
    </div>
    <p>Professor/Orientador</p>
  </div>
)