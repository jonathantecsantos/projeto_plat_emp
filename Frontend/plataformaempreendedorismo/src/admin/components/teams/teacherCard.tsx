import { ReactNode } from "react"
import { Teacher } from "../../../model/teacher"
import { ActionMenu } from "../common/actionMenuIcon"

export interface TeacherCard {
  teacher?: Teacher
}

export const TeacherCard = ({ teacher }: TeacherCard): ReactNode => (

  <div key={teacher?.id} className={`p-4 border rounded-lg shadow-md w-fit min-h-28 relative bg-[#3C4775] text-[#cecece]`}>
    <div className='w-fit'>
      <p className={`text-lg font-bold capitalize text-white mr-8`}>
        {teacher?.nome.toLowerCase()}
      </p>
      <ActionMenu
        onEdit={() => console.log('Edit teacher')}
        onRemove={() => console.log('Remove teacher')}
        onDetails={() => console.log('Teacher details')}
        onPromoteLeader={() => console.log('Promote teacher to leader')}
        onPromoteViceLeader={() => console.log('Promote teacher to vice leader')}
        onPromoteMember={() => console.log('Promote teacher to vice leader')}
      />
    </div>
    <p>Professor/Orientador</p>
  </div>
)